import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { Dashboard } from "../_metronic/components/dashboard/Dashboard";
import Onform from "../_metronic/components/Onform/Onform";
import Qualifiziert from "../_metronic/components/Qualifiziert/Qualifiziert";

export default function BasePage() {

  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={Dashboard} children={undefined} render={undefined} />
            <ContentRoute exact path="/onform" component={Onform} children={undefined} render={undefined} />
            <ContentRoute exact path="/Qualifiziert" component={Qualifiziert} children={undefined} render={undefined} />
          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense> 
    </>
  );
}
