import React from "react";
import { useState, useEffect } from "react";
import { ApiGet,ApiDelete, ApiPut, ApiPost } from "../../../helpers/API/ApiData"
import { toast, ToastContainer } from "react-toastify";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DatePicker from "react-datepicker";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getUserInfo } from "../../../utils/user.util";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import moment from "moment";
import UpdateOnform from "./UpdateOnform";
// import ManageRecruiting2 from "../../../components/ManageRecruiting/ManageRecruiting2/ManageRecruiting2";

export default function Onform() {

    const [getAllCompany, setGetAllCompany] = useState<any>({});
    const [showMore, setShowMore] = useState<any>(false);
    const [showMoreDetail, setShowMoreDetail] = useState<any>({});
    //for pagation
    const [search, setSearch] = useState<any>();
    const [page, setPage] = useState<any>(1);
    const [count, setCount] = useState<any>(0);
    const [countPerPage, setCountPerPage] = useState<any>(10);
    const [loaderForGetAll, setLoaderForGetAll] = useState<any>(false);
    const [adsData, setAdsData] = useState<any>(false);
    const [idForAdsData, setIdForAdsData] = useState<any>({});
    const [perentEditData, setPerentEditData] = useState<any>({});
    const [show, setShow] = useState<any>(false);
    const [storeData, setStoreData] = useState({});

    let userInfo = getUserInfo();
    var date = new Date();
    var firstDay = new Date(2022, 9, 1);
    var lastDay = new Date();
    const [startDate, setStartDate] = useState<any>(firstDay);
    console.log("getAllCompany",getAllCompany);
    

    // const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState(lastDay);
    const onChangeDate = (dates: any) => {
        console.log("dates", dates)
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Zeilen pro Seite',
        rangeSeparatorText: 'von',

    }



    useEffect(() => {
        getAllCompanyData();

    }, [page, countPerPage, startDate, endDate]);

    const getAllCompanyData = async () => {
        setLoaderForGetAll(true)
        if (!search) {
            await ApiGet(`find?page=${page}&limit=${countPerPage}`)
            // &startDate=${(moment(startDate).format("YYYY-MM-DD"))}&endDate=${(moment(endDate).format("YYYY-MM-DD"))}`)
                .then((res: any) => {
                    console.log("resresres", res);
                    setGetAllCompany(res?.data?.data);
                    setCount(res?.data?.total);
                    setLoaderForGetAll(false)
                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)
                })
        }
        else {
            await ApiGet(`find?search=${search}&page=${page}&limit=${countPerPage}`)
                .then((res: any) => {
                    setGetAllCompany(res?.data?.data);
                    setCount(res?.data?.total);
                    setLoaderForGetAll(false)
                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)
                })
        }

    }
    const deleteGreenData = async () => {
        await ApiDelete(`delete?id=${idForAdsData}`)
            .then((res: any) => {
                if (res?.status === 200) {
                    toast.success("Vielen Dank, Ihre Daten wurden erfolgreich eingereicht.");
                    setShow(false);
                    getAllCompanyData();

                } else {
                    toast.error("Etwas ist schief gelaufen.Bitte versuche es erneut");
                }
            })
            .catch((err:any) => {
                toast.error("Etwas ist schief gelaufen.Bitte versuche es erneut");
            });

    }

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (csvdata: any, Verbraucherstelle: any) => {
        const ws = XLSX.utils.json_to_sheet(csvdata);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, Verbraucherstelle + fileExtension);
    };

    const showmoreModelClose = (e: any) => {
        setShowMore(false)
    }

    //For search and pegination

    const handleSearch = (e: any) => {
        // let val = e.target.value.replace(/[^\w\s]/gi, "");
        setSearch(e.target.value);
    };
    const debouncedSearchTerm = useDebounce(search, 500);
    function useDebounce(value: any, delay: any) {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                // Update debounced value after delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                // Cancel the timeout if value changes (also on delay change or unmount)
                // This is how we prevent debounced value from updating if value is changed ...
                // .. within the delay period. Timeout gets cleared and restarted.
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay] // Only re-call effect if value or delay changes
        );
        return debouncedValue;
    }
    useEffect(() => {
        if (debouncedSearchTerm) {
            //setIsLoaderVisible(true);
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllCompanyData();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllCompanyData();
        }
    }, [debouncedSearchTerm]);
    const showAdsDataClose = (e: any) => {
        setAdsData(false)
    }

    const handleClose = () => {
        setShow(false);
    };


    // -------------------------DATA TABLE--------------------
    const customStyles = {
        header: {
            style: {
                minHeight: "56px",
            },
        },
        headRow: {
            style: {
                borderTopStyle: "solid",
                borderTopWidth: "1px",
                borderTopColor: defaultThemes.default.divider.default,
            },
        },
        headCells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },

        language: {
            oPaginate: {
                sNext: '<i class="fa fa-forward"></i>',
                sPrevious: '<i class="fa fa-backward"></i>',
                sFirst: '<i class="fa fa-step-backward"></i>',
                sLast: '<i class="fa fa-step-forward"></i>'
            }
        },
        cells: {
            style: {
                "&:not(:last-of-type)": {
                    borderRightStyle: "solid",
                    borderRightWidth: "1px",
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },


        pagination: {
            style: {
                minHeight: '40px',
            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
            },
        },
    };

    const handleOnChnageAddImg = async(e: any) => {
        console.log("eeffefef",e);
        
        if (e.target.files[0]) {
            let formData = new FormData();
            formData.append("uploadExcel", e.target.files[0]);
           
            await ApiPost("bulk-write", formData)
                .then((res) => {
                   toast.success("Vielen Dank, Ihre Daten wurden erfolgreich eingereicht.")
                   getAllCompanyData();
                e.preventDefault();
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message?.startsWith("Ungültiger") ? err?.response?.data?.message  : "Etwas ist schief gelaufen.Bitte versuche es erneut");
                });
        } else {
            toast.error("Please Select Excel File !");
        }
    };

    const columns = [
        {
            name: "SNo",
            cell: (row: any, index: any) => {
                return (
                    <>
                        <div style={{ whiteSpace: "nowrap", display: "flex", width: "100%", justifyContent: "space-between" }}>
                            {(page - 1) * countPerPage + (index + 1)}


                            {row?.pv === true ?
                                <div className="color-pink"></div>
                                :
                                <>


                                    {
                                        row?.nichtGeeignet === false && row?.emailFailed === null  ?

                                            !row?.pv && !row?.sms && !row?.contactedBy && !row?.contactedOn && !row?.contactedAgain && !row?.lastContact && !row?.reached && !row?.makeAppointment && !row?.usefulInformation && !row?.appointmentDate && !row?.appointmentTime ?
                                                <div className="color-red"></div>
                                                :
                                                row?.appointmentDate || row?.appointmentTime ?
                                                    <div className="color-green"></div> :
                                                    <div className="color-orange"></div>

                                            :


                                            row?.nichtGeeignet === true || row?.emailFailed === true || row?.emailFailed === null ?
                                                (<div className="color-black"></div>)
                                                :
                                                row?.appointmentDate || row?.appointmentTime ?
                                                    <div className="color-green"></div> :

                                                    row?.sms || row?.contactedBy || row?.contactedOn || row?.contactedAgain || row?.lastContact || row?.reached || row?.makeAppointment || row?.usefulInformation ?
                                                        <div className="color-orange"></div>
                                                        :
                                                        <div className="color-red"></div>

                                    }

                                </>
                            }


                        </div>
                    </>
                )
            },
            width: "3%",
        },
        {
            name: "Action",
            cell: (row: any) => {
                return (
                    <>
                        <div>

                            <i className="fa-solid fa-pencil" style={{ cursor: "pointer", color: "black" }} onClick={(e) => {
                                setAdsData(true)
                                setIdForAdsData(row?._id)

                                setPerentEditData({
                                    sms: row?.sms,
                                    contactedBy: row?.contactedBy,
                                    contactedOn: row?.contactedOn,
                                    contactedAgain: row?.contactedAgain,
                                    lastContact: row?.lastContact,
                                    emailFailed: row?.emailFailed,
                                    reached: row?.reached,
                                    appointmentDate: row?.appointmentDate,
                                    appointmentTime: row?.appointmentTime,
                                    makeAppointment: row?.makeAppointment,
                                    usefulInformation: row?.usefulInformation,
                                    nichtGeeignet: row?.nichtGeeignet,
                                    pv: row?.pv,

                                })

                            }}></i>
                        </div>

                        {userInfo?.adminEmail === "admin@jesamconsulting.com" && (
                            <div
                                data-toggle="modal"
                                data-target="#exampleModal"
                                className="cursor-pointer"
                                onClick={(e) => {
                                    setIdForAdsData(row?._id)
                                    setShow(true);
                                }}
                            >
                                <Tooltip title="Arbeit löschen" arrow>
                                    <DeleteIcon />
                                </Tooltip>
                            </div>
                        )}
                    </>
                );
            },
            sortable: true,

        },
         {
            name: "Datum",
            selector: (row: any) => moment(row?.createdAt).format("DD/MM/YYYY"),
            width: "4%"
        },
        {
            name: "Vorname",
            selector: (row: any) => (row?.fname ? row?.fname : "-"),
            sortable: true,
        },
        {
            name: "Nachname",
            selector: (row: any) => (row?.lname ? row?.lname : "-"),
            sortable: true,
        },
        {
            name: "E-mail",
            cell: (row: any, index: any) => {
                return (

                    <>
                        <div className="showmore-class text-justify p-2">
                            {!row.email ? "-" : row?.email}
                        </div>
                    </>
                );
            },
            width: "9%",
        },
        {
            name: "Kontakt",
            cell: (row:any) =>{
                return(
                    <>
                      <a href={`tel:${row?.phone}`} style={{color:"black"}}>
                      <p>{(row?.phone ? row?.phone : "-")}</p>
                      </a>
                    </>
                )
            },
            width: "7%",

        },
        {
            name: "Bundesland",
            // selector: (row: any) => (row?.bundesland ? row?.bundesland : "-"),
            cell: (row: any, index: any) => {
                return (

                    <>
                        <div className="showmore-class text-justify p-2">
                            {!row.bundesland ? "-" : row?.bundesland}
                        </div>
                    </>
                );
            },
            width: "5%"
        },
       
        // {
        //     name: "FormId",
        //     // selector: (row: any) => (row?.formId ? row?.formId : "-"),
        //     cell: (row: any, index: any) => {
        //         return (

        //             <>
        //                 <div className="showmore-class text-justify p-2">
        //                     {!row.formId ? "-" : row?.formId}
        //                 </div>
        //             </>
        //         );
        //     },
        //     width: "6%"
        // },
        // {
        //     name: "Formularname",
        //     // selector: (row: any) => (row?.formName ? row?.formName : "-"),
        //     cell: (row: any, index: any) => {
        //         return (

        //             <>
        //                 <div className="showmore-class text-justify p-2">
        //                     {!row.formName ? "-" : row?.formName}
        //                 </div>
        //             </>
        //         );
        //     },
        //     width: "8%"
        // },

        // AD - fields 
        // {
        //     name: "AdId",
        //     selector: (row: any) => (row?.adId ? row?.adId : "-"),
            
        //     sortable: true,
        // },
        // {
        //     name: "Adname",
        //     selector: (row: any) => (row?.adName ? row?.adName : "-"),
        //     sortable: true,
        // },
        // {
        //     name: "Adsetname",
        //     selector: (row: any) => (row?.adsetName ? row?.adsetName : "-"),
        //     sortable: true,
        // },
        // {
        //     name: "AdsetId",
        //     selector: (row: any) => (row?.adsetId ? row?.adsetId : "-"),
        //     sortable: true,
        // },

        // {
        //     name: "Kampagne Id",
        //     selector: (row: any) => (row?.campaignId ? row?.campaignId : "-"),
        //     sortable: true,
        // },
        // {
        //     name: "Kampagne name",
        //     selector: (row: any) => (row?.campaignName ? row?.campaignName : "-"),
        //     sortable: true,
        // },



        // {
        //     name: "istBio",
        //     selector: (row: any) => (row?.isOrganic ? row?.isOrganic : "-"),
        //     sortable: true,
        // },

        // wewewewe
        {
            name: "hast_du_bereits_vertriebserfahrung?",
            selector: (row: any) => (row?.hast ? row?.hast : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "wann_könntest_du_starten?",
            selector: (row: any) => (row?.hastNo ? row?.hastNo : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        
        {
            name: "SMS vorher ",
            selector: (row: any) => (row?.sms ? (row?.sms === true ? "Ja" : "Nein") : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "Kontaktiert durch",
            selector: (row: any) => (row?.contactedBy ? row?.contactedBy : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "Kontaktiert am",
            selector: (row: any) => (row?.contactedOn ? `${moment(row?.contactedOn).utc().format("DD/MM/YYYY")}` : "-"),
            // selector: (row: any) => row?.createdAt,
        },

        {
            name: "erneut kontaktiert",
            selector: (row: any) => (row?.contactedAgain ? `${moment(row?.contactedAgain).utc().format("DD/MM/YYYY")}` : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "letzmalige Kontaktaufnahme",
            selector: (row: any) => (row?.lastContact ? `${moment(row?.lastContact).utc().format("DD/MM/YYYY")}` : "-"),
            // selector: (row: any) => row?.createdAt,
        },

        {
            name: "E-Mail bei 3 mal nicht erreicht",
            selector: (row: any) => (row?.emailFailed ? (row?.emailFailed === true ? "yes" : "no") : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "PV",
            selector: (row: any) => (row?.pv ? (row?.pv === true ? "yes" : "no") : "-"),
            // selector: (row: any) => row?.createdAt,
        },

        {
            name: "Erreicht ",
            selector: (row: any) => (row?.reached ? (row?.reached === true ? "yes" : "no") : "-"),
            // selector: (row: any) => row?.createdAt,

        },
        {
            name: "Termin am",
            selector: (row: any) => (row?.appointmentDate ? `${moment(row?.appointmentDate).utc().format("DD/MM/YYYY")}` : "-"),
            // selector: (row: any) => row?.createdAt,


        },
        {
            name: "Termin Uhrzeit",
            selector: (row: any) => (row?.appointmentTime ? row?.appointmentTime : "-"),
            // selector: (row: any) => row?.createdAt,


        },
        {
            name: "Termin macht",
            selector: (row: any) => (row?.makeAppointment ? row?.makeAppointment : "-"),
            // selector: (row: any) => row?.createdAt,


        },
        {
            name: "Wissenswertes",
            selector: (row: any) => (row?.usefulInformation ? row?.usefulInformation : "-"),
            // selector: (row: any) => row?.createdAt,
        },
        {
            name: "nicht geeignet",
            selector: (row: any) => (row?.nichtGeeignet ? (row?.nichtGeeignet === true ? "yes" : "no") : "-"),
            // selector: (row: any) => row?.createdAt,
        },



    ];

    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">On form</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 new-margin-bottom-alignment">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    onChange={(e) => handleSearch(e)}
                                    placeholder="Suche"
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 new-margin-bottom-alignment">
                            {/* <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                className={`form-control form-control-lg form-control-solid `}
                                onChange={(e) => onChangeDate(e)}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                            /> */}


                        </div>
                        <div className="col-lg-2 d-flex justify-content-end align-items-center button-mobile-view-center-alignment">
                            {/* <button
                                className="btn btn-success"
                                onClick={() => {
                                    exportToCSV(getAllCompany, "Verbraucherstelle");
                                }}

                                style={{
                                    backgroundColor: "#9dbc78",
                                    border: "none"
                                }}
                            >
                                Excel Download
                            </button> */}
                            <div>
                            {userInfo?.role === "superadmin" && (
                                <Tooltip title="Dokument hochladen" arrow>
                                        <div className="add-alignment">

                                            <i className="fa-solid fa-plus plus-icon"></i>
                                            <input type="file"
                                            name="uploadExcel"
                                            id="uploadStoreImage"
                                            accept=".csv"
                                                onChange={(e) => handleOnChnageAddImg(e)} />
                                        </div>

                                </Tooltip>
                            )}
                            </div>

                        </div>
                        {/* <button className="btn btn-success" style={{
                            backgroundColor: "#9dbc78",
                            border: "none",
                        }}
                            onClick={() => {
                                exportToCSV(getAllCompany?.filter((e: any) => e?.pv === true), "Verbraucherstelle");
                            }}>Download with PV</button> */}

                    </div>

                </div>
                {loaderForGetAll ?
                    <div className="text-center">
                        <div className="spinner-border">
                        </div>
                    </div> :
                    //Data Table

                    <DataTable
                        columns={columns}
                        data={getAllCompany}
                        customStyles={customStyles}
                        // pagination
                        highlightOnHover
                        pagination
                        paginationServer
                        paginationComponentOptions={paginationComponentOptions}
                        paginationTotalRows={count}
                        paginationPerPage={countPerPage}
                        paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
                        paginationDefaultPage={page}
                        onChangePage={(page) => {
                            setPage(page);
                        }}
                        onChangeRowsPerPage={(rowPerPage) => {
                            setCountPerPage(rowPerPage);
                        }}
                    />}
                      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Alarm!</Modal.Title>
                </Modal.Header>
                <Modal.Body> Sind Sie sicher, dass Sie diese Daten löschen möchten?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nein
                    </Button>
                    <Button
                        variant="success"
                        className="ja-button-background-color"
                        onClick={() => deleteGreenData()}
                    >
                        Ja
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
            {
                showMore === true ? (

                    <Dialog
                        fullScreen
                        open={showMore}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"

                                aria-label="close"
                            >
                                <CloseIcon onClick={(e) => showmoreModelClose(e)} />
                            </IconButton>
                        </Toolbar>

                        <div className="p-8 poin">
                            <div className="shadow-none p-3 mb-5 bg-light rounded">
                                <h3 className="text-success mb-4">Frage : 1</h3>
                                <h4>Wofür interessieren Sie sich?</h4>
                                <h6>{showMoreDetail?.option1 ? showMoreDetail?.option1 : "-"}</h6>
                            </div>

                            <div className="shadow-none p-3 mb-5 bg-light rounded">
                                <h3 className="text-success mb-4">Frage : 2</h3>
                                <h4>Wurden Sie schon beraten?</h4>
                                <h6>{showMoreDetail?.option2 ? showMoreDetail?.option2 : "-"}</h6>
                            </div>

                            {/* <div className="card p-4"> */}
                            <div className="shadow-none p-3 mb-5 bg-light rounded">
                                <h3 className="text-success mb-4">Frage : 3</h3>
                                <h4>Wurdest du Verbraucherschutz konform beraten?</h4>
                                <h6>{showMoreDetail?.option3 ? showMoreDetail?.option3 : "-"}</h6>
                            </div>
                            {/* </div> */}

                        </div>
                    </Dialog>
                ) : null}

            {adsData === true ? (
                <Dialog
                    fullScreen
                    open={adsData}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"

                            aria-label="close"
                        >
                            <CloseIcon onClick={(e) => showAdsDataClose(e)} />
                        </IconButton>
                    </Toolbar>

                    <div>
                        <UpdateOnform perentEditData={perentEditData} idForAdsData={idForAdsData} setAdsData={setAdsData} getAllCompanyData={getAllCompanyData} setPerentEditData={setPerentEditData} />
                    </div>
                </Dialog>
            ) : null}
        </>
    );
}
