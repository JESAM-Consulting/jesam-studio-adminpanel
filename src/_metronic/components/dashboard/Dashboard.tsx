import React, { useEffect, useState } from "react";
import { ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import CountUp from 'react-countup';
import { getUserInfo } from "../../../utils/user.util";
import Card from 'react-bootstrap/Card';
import { useHistory } from "react-router-dom";
import axios from "axios";

export function Dashboard() {

  const [contact1, setContact1] = useState<any>();
  const [interview4, setInterview4] = useState<any>();
  const [onForm1, setOnForm] = useState<any>();
  const [ads4, setAds4] = useState<any>();
  const history = useHistory<any>();
const BaseApi_URL = "https://fe-lead-commen-api.rejoicehub.com/FE_API/lead_api/v1/"
console.log("ads4ads4",ads4);

  useEffect(() => {

    getAllInterviewFour();
    GetOnForm();
    getQualifiziert();
  }, [])
  const getAllInterviewFour = async () => {
     axios.get(`${BaseApi_URL}/get-energy-form`)
      .then((res: any) => {
        console.log("****",res)
        setInterview4(res?.data?.count);
      })
  }

  
  const GetOnForm = async () => {
    await ApiPost(`find`)
      .then((res: any) => {
        console.log("panotiiiii",res);
        
        setOnForm(res?.data?.total);
      })

  }

  const getQualifiziert = async () => {
    await ApiPost(`qualify/find`)
      .then((res: any) => {
        setAds4(res?.data?.total);
      })

  }

  const jumpOnContact1 = (e: any) => {
    history.push("/contact")
  }
  const jumpOnForm = (e: any) => {
    history.push("/onform")
  }
  const jumpOnQualifiziert = (e: any) => {
    history.push("/Qualifiziert")
  }
  return (
    <>

        <>

          <div
            className={`card card-custom`}
            style={{ backgroundColor: "white" }}
          >
            <div className="card-header border-0  py-1 px-1 m-5">
              <div className="card-body p-0 position-relative overflow-hidden">
                <div
                  className="card-rounded-bottom"
                  style={{ height: "25px" }}
                >
                  <h4 className="font-weight-bolder text-white pt-2 pl-6">
                    Dashboard
                  </h4>
                </div>
             

                  <>
                    <div className="card-spacer">
                      <div
                        className="carder-box carder-box-new-grid"
                      >
                        <>
                          <div className="p-6 rounded" style={{ backgroundColor: "#303E90",color:"white" }}>
                            <div className="row">
                              <div className="col-12">

                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h1 className="font-weight-bold" style={{ fontSize: "40px" }}>
                                      {ads4 && (
                                        <CountUp end={ads4} start={0} delay={1} />
                                      )
                                      }
                                    </h1>
                                  </div>
                                  <div style={{ display: "flex", marginTop: "6px" }}>
                                    <i className="fa-solid fa-user" style={{ fontSize: "25px", color: "white" }}></i>
                                  </div>
                                </div>

                              </div>

                              <span className="font-weight-bold font-size-h3 d-block my-2 ml-3" style={{ cursor: "pointer" }} >
                              Envoltec
                              </span>
                            </div>
                            <div className="showMore" onClick={(e) => jumpOnQualifiziert(e)}>
                              <span>  mehr anzeigen <span className="fa-solid fa-arrow-right-long ml-2"></span>
                              </span>
                            </div>
                          </div>
                        </>

                      </div>
                    </div>
                  </>
                  
                  <>
                    <div className="card-spacer">
                      <div
                        className="carder-box"
                        style={{
                          display: "grid",
                          gap: "12px",
                          gridTemplateColumns: "repeat(5,2fr)",
                          padding: "20px",

                        }}
                      >


                      </div>
                    </div>

                  </>
                
              </div>
            </div>
          </div>
        </>
 
    </>
  );
}