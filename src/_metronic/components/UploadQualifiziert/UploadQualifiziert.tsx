import React from "react";
import { useState, useEffect } from "react";
import { ApiGet, ApiPost, ApiPut, ApiDelete } from "../../../helpers/API/ApiData"
import { toast,  } from "react-toastify";
import  { defaultThemes } from "react-data-table-component";
import moment from "moment";




export default function UploadQualifiziert(props: any) {
    const { idForAdsData, setAdsData, perentEditData ,getAllCompanyData,setPerentEditData,colorFilter} = props

    console.log("perentEditData3", perentEditData);

    const [teamData, setTeamData] = useState<any>({
        sms: (perentEditData?.sms === null ? "" : (perentEditData?.sms === true ? true : false)),
        contactedBy: perentEditData?.contactedBy,
        contactedOn: (moment(perentEditData?.contactedOn).format("YYYY-MM-DD")),
        contactedAgain: (moment(perentEditData?.contactedAgain).format("YYYY-MM-DD")),
        lastContact: (moment(perentEditData?.lastContact).format("YYYY-MM-DD")),
        emailFailed: perentEditData?.emailFailed,
        reached: perentEditData?.reached,
        appointmentDate:(moment(perentEditData?.appointmentDate).format("YYYY-MM-DD")),
        appointmentTime: perentEditData?.appointmentTime,
        makeAppointment: perentEditData?.makeAppointment,
        usefulInformation: perentEditData?.usefulInformation,
        nichtGeeignet: perentEditData?.nichtGeeignet,
        pv: perentEditData?.pv,
        starterSeminar: perentEditData?.starterSeminar

    });

    

    const [addTeamData, setAddTeamData] = useState<any>(false);
    const [errors, setErrors] = useState<any>({});
    const [getAllTeam, setGetAllTeam] = useState<any>({});
    const [isEditApi, setIsEditApi] = useState<any>(false);
    //for pagation
    const [search, setSearch] = useState<any>();
    const [page, setPage] = useState<any>(1);
    const [count, setCount] = useState<any>(0);
    const [teamId, setTeamId] = useState<any>();
    const [countPerPage, setCountPerPage] = useState<any>(10);
    const [loader, setLoader] = useState<any>(false);
    const [loaderForGetAll, setLoaderForGetAll] = useState<any>(false);
    const [errorsForPhoto, setErrorsForPhoto] = useState<any>({});
    const [show, setShow] = useState<any>(false);

    const paginationComponentOptions = {
        rowsPerPageText: 'Zeilen pro Seite',
    }
    //for valied description
    //eslint-disable-next-line
    //For gell all company
    //eslint-disable-next-line
    useEffect(() => {
        getAllTeamData();
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [page, countPerPage]);
    //For close company model
    const addCompanyModelClose = (e: any) => {
        setAddTeamData(false)
        setIsEditApi(false)
        setErrors(false)
        setTeamData({})
    }
    const onhandleChange = (e: any) => {

        // e.target.value.replace(/[^a-zA-Z]/g, "");
        const { name, value } = e.target;
        if (name === "emailFailed" || name === "nichtGeeignet" || name === "pv" || name === "starterSeminar") {
            setTeamData({ ...teamData, [name]: e.target.checked })
        }
        else {
            setTeamData({ ...teamData, [name]: value })
        }
        setErrors({ ...errors, [name]: "" })

    }

    console.log("teamDat34a",teamData);
    
   
    // Form validation

    //Api for get all companydata
    const getAllTeamData = async () => {
        setLoaderForGetAll(true)
        if (!search) {
            await ApiGet(`city/find?page=${page}&limit=${countPerPage}`)
                .then((res: any) => {
                    setGetAllTeam(res?.data?.payload?.data);
                    setCount(res?.data?.payload?.count);
                    setLoaderForGetAll(false)
                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)
                })
        }
        else {
            await ApiGet(`city/find?letter=${search}&page=${page}&limit=${countPerPage}`)
                .then((res: any) => {
                    setGetAllTeam(res?.data?.payload?.data);
                    setCount(res?.data?.payload?.count);
                    setLoaderForGetAll(false)
                })
                .catch((err: any) => {
                    setLoaderForGetAll(false)
                })
        }

    }

    console.log("teamDatadsf", teamData);
    console.log("sdfsdgs",teamData?.appointmentDate);


    const handleStatusColor = () => {

        console.log("****",!teamData?.reached || teamData?.reached === false);
        
        
                let color = "red";
                console.log("colorcolor",color);
                
                if (teamData.starterSeminar === true) {
                  return (color = "pink");
                } else {
                  if (
                    (teamData?.nichtGeeignet === false || teamData?.nichtGeeignet === null) &&
                    teamData?.emailFailed === null
                  ) {
                    if (
                      (!teamData.starterSeminar || teamData?.starterSeminar === false) &&
                      (!teamData.sms ||teamData.sms === false) &&
                      !teamData?.contactedBy &&
                      (!teamData.contactedOn || teamData.contactedOn === "Invalid date") &&
                       ( !teamData?.contactedAgain || teamData.contactedAgain === "Invalid date" )   &&
                       ( !teamData?.lastContact || teamData?.lastContact === "Invalid date" )   &&
                      (!teamData?.reached || teamData?.reached === false) &&
                      !teamData?.makeAppointment &&
                      !teamData?.usefulInformation &&
                      ( !teamData?.appointmentDate ||  teamData?.appointmentDate === "Invalid date" ) &&
                      !teamData?.appointmentTime
                    ) {
                      console.log("first");
                      return (color = "red");
                    } else {
                      if (
                        (teamData.appointmentDate && teamData.appointmentDate !== "Invalid date") ||
                        (teamData.appointmentTime && teamData.appointmentTime!==null)
                      ) {
                        console.log("second");
                        return (color = "green");
                      } else {
                        console.log("third");
                        return (color = "orange");
                      }
                    }
                  } else {
                    if (
                      teamData.nichtGeeignet === true ||
                      teamData.emailFailed === true ||
                      teamData.emailFailed === null
                    ) {
                      console.log("fifth");
                      return (color = "black");
                    } else {
                      if (
                        (teamData.appointmentDate !== "Invalid date" &&
                          teamData?.appointmentDate?.length !== 0 &&
                          teamData?.appointmentDate !== null) ||
                        teamData?.appointmentTime
                      ) {
                        console.log("sixth");
                        return (color = "green");
                      } else {
                        if (
                          teamData.sms ||
                          teamData.contactedBy ||
                          (teamData.contactedOn !== "Invalid date" &&
                            teamData?.contactedOn?.length !== 0 &&
                            teamData?.contactedOn !== null) ||
                          (teamData.contactedAgain !== "Invalid date" &&
                            teamData?.contactedAgain?.length !== 0 &&
                            teamData?.contactedAgain !== null) ||
                          (teamData.lastContact !== "Invalid date" &&
                            teamData.lastContact?.length !== 0 &&
                            teamData.lastContact !== null) ||
                          teamData.reached ||
                          teamData.makeAppointment ||
                          teamData.usefulInformation
                        ) {
                          console.log("seventh");
                          return (color = "orange");
                        } else {
                          console.log("eigth");
                          return (color = "red");
                        }
                      }
                    }
                  }
                }
              };
    //Api For add company data
    const addTeam = async (e: any) => {
        setIsEditApi(false)
       
            const color = await handleStatusColor()

        console.log('@@@data', color)
            
        setLoader(true)
        let data = {
            sms: teamData?.sms === "true" ||  teamData?.sms === true  ? true : teamData?.sms === "false" ||  teamData?.sms === false ? false : null,
            contactedBy: teamData?.contactedBy,
            contactedOn: teamData?.contactedOn === "Invalid date" ? null : teamData?.contactedOn,
            contactedAgain: teamData?.contactedAgain === "Invalid date" ? null : teamData?.contactedAgain,
            lastContact: teamData?.lastContact === "Invalid date" ? null : teamData?.lastContact,
            emailFailed: teamData?.emailFailed,
            reached: teamData?.reached === "true" || teamData?.reached === true ? true : teamData?.reached === "false" || teamData?.reached === false ? false : null,
            appointmentDate: teamData?.appointmentDate === "Invalid date" ? null : teamData?.appointmentDate ,
            appointmentTime: teamData?.appointmentTime,
            makeAppointment: teamData?.makeAppointment,
            usefulInformation: teamData?.usefulInformation,
            nichtGeeignet: teamData?.nichtGeeignet,
            pv: teamData?.pv,
            starterSeminar: teamData?.starterSeminar,
            color: color,
        }

        console.log('@@@dataColor', color)


        await ApiPut(`applyNow/update/${idForAdsData}`, data)
            .then((res: any) => {
                toast.success("Vielen Dank, Ihre Daten wurden erfolgreich eingereicht.")
                setAdsData(false)
                setIsEditApi(false);
                setTeamData({});
                getAllCompanyData(colorFilter);
                getAllTeamData()
                // setTeamData({});
                setLoader(false)

            })
            .catch((err:any) => {
                toast.error("Etwas ist schief gelaufen. Bitte versuche es erneut")
                setLoader(false)

            })
       

    }
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
            getAllTeamData();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllTeamData();
        }
    }, [debouncedSearchTerm]);

    // -------------------------DATA TABLE--------------------
   
    return (
        <>

            <div className="ml-40 margin-left-remove">


                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                        SMS vorher
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div >
                            <select
                                className={`form-control form-control-lg form-control-solid `}
                                onChange={(e) => {
                                    onhandleChange(e);
                                }}
                                name="sms"
                                defaultValue={teamData?.sms === true ? "true" : "false"}
                            >
                                <option value="select for sms" selected disabled>
                                    Auswahl
                                </option>
                                <option value="true">Ja</option>
                                <option value="false">Nein</option>
                            </select>
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["sms"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Kontaktiert durch
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="text"
                                className={`form-control form-control-lg form-control-solid `}
                                id="makeAppointment"
                                name="contactedBy"
                                value={teamData?.contactedBy}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["Kontaktiert durch "]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Kontaktiert am
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="date"
                                className={`form-control form-control-lg form-control-solid `}
                                id="contactedOn"
                                name="contactedOn"
                                value={teamData?.contactedOn}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["contactedOn"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        erneut kontaktiert
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="date"
                                className={`form-control form-control-lg form-control-solid `}
                                id="contactedAgain"
                                name="contactedAgain"
                                value={teamData?.contactedAgain}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["contactedAgain"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        letzmalige Kontaktaufnahme
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="date"
                                className={`form-control form-control-lg form-control-solid `}
                                id="lastContact"
                                name="lastContact"
                                value={teamData?.lastContact}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["lastContact"]}
                        </span>
                    </div>
                </div>

                {console.log("teamData?.reached",teamData?.emailFailed)}


                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        E-Mail bei 3 mal nicht erreicht
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="checkbox"
                                className={`form-control form-control-lg form-control-solid `}
                                id="emailFailed"
                                name="emailFailed"
                                value={teamData?.emailFailed}
                                checked= {teamData?.emailFailed}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["emailFailed"]}
                        </span>
                    </div>
                </div>
                {/* <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                    pv
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="checkbox"
                                className={`form-control form-control-lg form-control-solid `}
                                id="pv"
                                name="pv"
                                value={teamData?.pv}
                                checked= {teamData?.pv}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["pv"]}
                        </span>
                    </div>
                </div> */}


                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                        Erreicht
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div >
                            <select
                                className={`form-control form-control-lg form-control-solid `}
                                onChange={(e) => {
                                    onhandleChange(e);
                                }}
                                name="reached"
                                defaultValue={teamData?.reached === true ? "true" : teamData?.reached === false ? "false" : ""}
                                // defaultValue="true"
                            >
                                <option value="null" selected >
                                Auswahl                                </option>
                                <option value="true">Ja</option>
                                <option value="false">Nein</option>
                            </select>
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["reached"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Termin am
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="date"
                                className={`form-control form-control-lg form-control-solid `}
                                id="appointmentDate"
                                name="appointmentDate"
                                value={teamData?.appointmentDate}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["appointmentDate"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Termin Uhrzeit
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="time"
                                className={`form-control form-control-lg form-control-solid `}
                                id="appointmentTime"
                                name="appointmentTime"
                                value={teamData?.appointmentTime}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["appointmentTime"]}
                        </span>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Termin macht
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="text"
                                className={`form-control form-control-lg form-control-solid `}
                                id="makeAppointment"
                                name="makeAppointment"
                                value={teamData?.makeAppointment}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["makeAppointment"]}
                        </span>
                    </div>
                </div>
            
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                        Wissenswertes
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="text"
                                className={`form-control form-control-lg form-control-solid `}
                                id="usefulInformation"
                                name="usefulInformation"
                                value={teamData?.usefulInformation}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                        <span
                            style={{
                                color: "red",
                                top: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {errors["usefulInformation"]}
                        </span>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                    nicht geeignet
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="checkbox"
                                className={`form-control form-control-lg form-control-solid `}
                                id="nichtGeeignet"
                                name="nichtGeeignet"
                                value={teamData?.nichtGeeignet}
                                checked= {teamData?.nichtGeeignet}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                       
                    </div>
                </div>
                    <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">

                    Starterseminar
                    </label>
                    <div className="col-lg-9 col-xl-6">
                        <div>
                            <input
                                type="checkbox"
                                className={`form-control form-control-lg form-control-solid `}
                                id="starterSeminar"
                                name="starterSeminar"
                                value={teamData?.starterSeminar}
                                checked= {teamData?.starterSeminar}
                                onChange={(e) => { onhandleChange(e) }}
                            />
                        </div>
                       
                    </div>
                </div>


                <div className="d-flex justify-content-center">
                    {loader ? <>
                        <div className="text-center">

                            <button className="btn btncolor" type="button"  style={{backgroundColor: "#303E90",color:"white"}}>
                                Speichern
                                <span className="mx-3 spinner spinner-white" role="status"></span>
                            </button>
                        </div></> :
                        <button className="btn btncolor center" onClick={(e) => {addTeam(e)}}  style={{backgroundColor: "#303E90",color:"white"}}>Speichern</button>
                    }</div>

            </div>

        </>
    );
}
