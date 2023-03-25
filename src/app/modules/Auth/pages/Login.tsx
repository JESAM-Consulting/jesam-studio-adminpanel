import React, { useState } from "react"; 
import { useHistory } from "react-router-dom";
import { ApiPost } from "../../../../helpers/API/ApiData";
import * as authUtil from "../../../../utils/auth.util";
import * as userUtil from "../../../../utils/user.util";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../_metronic/_assets/sass/layout/_basic.scss";

export default function Login() {
  // const [loading, setLoading] = useState(false);
  const history = useHistory<any>();
  const [loginData, setLoginData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [showPassword, setShowPasssword] = useState<any>(false)
  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;
  const handleChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleForgotPass = (e: any) => {
    console.log("forgot");
    history.push("/auth/forgot-password");
  }

  console.log("logindata",loginData);
  
  const handleSubmit = async (e: any) => {
    setLoading(true)
    // setLoader(true);
    e.preventDefault();
    if (!loginData.email && !loginData.password) {
      setLoading(false)
      setErrors({
        email: "E-Mail ist erforderlich*",
        password: "Passwort wird benötigt*",
      });
    } else if (loginData.email === "" && loginData.password === "") {
      setErrors({ ...errors, email: "E-Mail ist erforderlich*" });
      setLoading(false)
    } else if (!loginData.email || loginData.email === "") {
      setErrors({ ...errors, email: "E-Mail ist erforderlich*" });
      setLoading(false)
    } else if (!loginData.email || regexEmail.test(loginData.email) === false) {
      setErrors({ ...errors, email: "E-Mail ist ungültig*" });
      setLoading(false)
    } else if (!loginData.password || loginData.password === "") {
      setErrors({ ...errors, password: "Passwort wird benötigt*" });
      setLoading(false)
    } else {
      loginData.email = loginData.email.toLowerCase();
      await ApiPost("user/signin", loginData)
        .then((res: any) => {
          console.log("testlogin", res)
          setLoading(false)
          if (res.data.error === "E-Mail existiert nicht") {
            setErrors({ user: "Benutzer:in existiert nicht !!" });
          } else if (res.data.error === "Falsches Passwort") {
            setErrors({
              user: "Login -Anmeldeinformationen sind falsch !!",
            });
          } else {

            console.log("res?.data",res);
            authUtil.setToken(res?.data?.payload?.token);            
            userUtil.setUserInfo(res?.data?.payload);
            toast.success("Vielen Dank, Ihre Daten wurden erfolgreich eingereicht.", {
              autoClose: 5000
            })
            window.location.reload();
          }
        })
        .catch((err) => { 
          console.log("err--------->", err.response);
          toast.error("Benutzer:in existiert nicht");
          setLoading(false)
        });
    }
    // setLoader(false);
  };
  const handleKeyPress = (e: any) => {
    if (e?.key === 'Enter') {
      history.push("/dashboard")
    }
  }
  const showHidePassword = (e: any) => {
    setShowPasssword(!showPassword)
  }
  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1" style={{color:"#303E90"}}>Anmelden</h3>
        <p className="text-muted font-weight-bold">
          Geben Sie Ihre Anmeldeinformationen ein.
        </p>
        <span className="text-danger h6">{errors.user}</span>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <form onSubmit={(e) => handleKeyPress(e)}>
        <div className="form-group fv-plugins-icon-container" >
          <input
            placeholder="E-Mail"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6  `}
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <span className="text-danger">{errors.email}</span>
        </div>
        <div className="form-group fv-plugins-icon-container" style={{ position: "relative" }}>
          <input
            placeholder="Passwort"
            type={showPassword ? "text" : "password"}
            className={`form-control form-control-solid h-auto py-5 px-6 `}
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div style={{ position: "absolute", top: "20px", right: "10px" }}>
            {
              showPassword ?
                <i className="fa-solid fa-eye" onClick={(e) => showHidePassword(e)} ></i>
                :
                <i className="fa-solid fa-eye-slash" onClick={(e) => showHidePassword(e)}></i>
            }
          </div>
          <span className="text-danger">{errors.password}</span>
        </div>



            {/* Forget Password */}
        {/* <div onClick={(e) => handleForgotPass(e)} style={{ textAlign: "right" }}>Passwort vergessen?</div> */}




        <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            className={`align-items-center d-flex btn  font-weight-bold px-9 py-4 my-3`}
            style={{backgroundColor: "#303E90",color:"white"}}
            onClick={(e) => {
              handleSubmit(e);
            }}
          // style={{background:"#1BC5BD"}}
          >
            <span className="pr-2">Einloggen</span>
            {loading && (
              <span className="mx-3 spinner spinner-white"></span>
            )}
            {/* {loader && (
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )} */}
          </button>
        </div>
      </form>
    </div>
  );
}