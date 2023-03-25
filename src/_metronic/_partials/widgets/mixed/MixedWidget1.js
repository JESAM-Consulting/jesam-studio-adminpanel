import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../../../utils/user.util";
// import { ApiGet } from "../../../../helpers/API/ApiData";
// import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Logo from "../../../layout/components/Logos/logoT.png";

// import Inventory from "../../../components/Inventory/Inventory";
// import MarketPlace from "../../../components/MarketPlace/MarketPlace";
// import Order from "../../../components/Order/Order";

export function MixedWidget1({ className }) {
  let userInfo = getUserInfo();

  // const [selectedTable, setSelectedTable] = useState("Users");
  // const [countData, setCountData] = useState({});
  const [
    countDataAll,
    // , setCountDataAll
  ] = useState("");

  console.log("countDataAll", countDataAll);

  useEffect(() => {
    document.title = "FE-FINANCE | Admin";
  }, []);

  // useEffect(() => {
  //   getcount();
  // }, []);

  // const getcount = async () => {
  //   // if (userInfo?.admin?.role === "superadmin") {
  //   await ApiGet(`user/count`)
  //     .then((res) => {
  //       console.log("getcountAdmin", res);
  //       setCountData(res?.data?.payload);
  //       // setMonthData(res?.data?.payload?.countProperty);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // }
  // };

  return (
    <div>
      {/* Header */}
      <div>
        <div className="honda-logo-center-alignment-page">
          <img alt="" src={Logo}   style={{width:"15%"}}/>
          {/* Stat */}
          <div></div>
          {userInfo?.role === "admin" && (
            <>
              <div className="card-spacer">
                <div className="row m-5"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
