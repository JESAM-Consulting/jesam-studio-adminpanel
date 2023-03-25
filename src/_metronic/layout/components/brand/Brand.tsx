import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import objectPath from "object-path";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import Logo from "../../../layout/components/Logos/forword-logo.png";

export function Brand() {
    const uiService = useHtmlClassService();

    const layoutProps = useMemo(() => {
        return {
            brandClasses: uiService.getClasses("brand", true),
            asideSelfMinimizeToggle: objectPath.get(
                uiService.config,
                "aside.self.minimize.toggle"
            ),
            headerLogo: uiService.getLogo(),
            headerStickyLogo: uiService.getStickyLogo(),
        };
    }, [uiService]);

    return (
        <>
            {/* begin::Brand */}
            <div
                className={`brand flex-column-auto ${layoutProps.brandClasses}`}
                id="kt_brand"
                style={{ margin: "10px 0 0 0" }}
            >
                {/* begin::Logo */}

                <Link to="/dashboard" className="brand-logo">
                    <img alt="logo" src={Logo}  style={{justifyContent: "center" , maxWidth:"175px"}} />
                </Link>

                {/* <Link to="/dashboard" className="brand-logo" style={{ height: "auto", width: "fit-content", display: "flex", justifyContent: "center" }}>
                    <img alt="logo" src={Logo} style={{ height: "100%", width: "80%" }} />
                </Link> */}

                {/* <Link to="/dashboard" className="brand-logo">
                    <img alt="logo" src="" width="70%" />
                    <img alt="logo" src="public\media\logos\mini-logo1.png" width="70%" />
                </Link> */}
                {/* <logoImg /> */}
                {/* end::Logo */}

                {layoutProps.asideSelfMinimizeToggle && (
                    <>
                        {/* begin::Toggle */}
                        <button
                            className="brand-toggle btn btn-sm px-0"
                            id="kt_aside_toggle"
                        >
                            <span className="svg-icon svg-icon-xl"  >
                                <SVG
                                    src={toAbsoluteUrl(
                                        "/media/svg/icons/Navigation/Angle-double-left.svg"
                                    )}
                                />
                            </span>
                        </button>
                        {/* end::Toolbar */}
                    </>
                )}
            </div>
            {/* end::Brand */}
        </>
    );
}
