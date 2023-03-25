const handleStatusColor = (teamData) => {

  console.log("****",!teamData?.reached || teamData?.reached === false);
  
  
          let color = "red";
          console.log("colorcolor",color);
          
          if (teamData.pv === true) {
            return (color = "pink");
          } else {
            if (
              (teamData?.nichtGeeignet === false || teamData?.nichtGeeignet === null) &&
              teamData?.emailFailed === null
            ) {
              if (
                (!teamData.pv || teamData?.pv === false) &&
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

let data ={
  "_id": "640ef21f9665d79590bdb934",
  "id": "l:147839887885951",
  "createdTime": "2023-03-12T17:55:41+01:00",
  "adId": "ag:23852775172040772",
  "adName": "Recruiting_EG_20230204_CAR1",
  "adsetId": "as:23852775172060772",
  "adsetName": "DE_FS&Insurance_LF_2023-02-21_optimized",
  "campaignId": "c:23852597687310772",
  "campaignName": "0_Cold_Leads_ABO_LF_EnergyGuide_2023-02-04",
  "formId": "f:1221083538536618",
  "formName": "LF_Energy_Guide_2023-02-21",
  "isOrganic": "FALSE",
  "isEmployed": "ja,_bin_ich.",
  "salesExperience": "über_5_jahre",
  "answer": "über_37",
  "fname": "Uwe",
  "lname": "Roth",
  "email": "Info@1a-roth.de",
  "phone": "p:+491747888990",
  "state": "Hessen",
  "sms": true,
  "contactedBy": "Chahed",
  "contactedOn": "2023-03-13T00:00:00.000Z",
  "contactedAgain": "2023-03-14T00:00:00.000Z",
  "lastContact": null,
  "emailFailed": null,
  "reached": true,
  "appointmentDate": null,
  "appointmentTime": null,
  "makeAppointment": null,
  "usefulInformation": null,
  "nichtGeeignet": null,
  "pv": null,
  "color": "green",
  "starterSeminar": false,
  "createdAt": "2023-03-13T09:51:28.029Z",
  "updatedAt": "2023-03-15T08:33:49.330Z"
}
let color = handleStatusColor(data);
