import React from 'react' ;
import {ICONS} from "./Icons-svg";
import HapyButtonWithoutIcon from "../components/HapyButtonWithoutIcon";

type PropsType = {
    errorTitle?: string ;
    errorMessage?: string ;
    showBtn?: boolean ;
    btnText?: string ;
    handleBtnClick?: any ;
}

function ErrorPage(props:PropsType) {

    return (
        <div className="center-force" style={{marginTop: 250, backgroundColor:"white"}}>
            <div className="logo text-center mb-3">
                {ICONS.hapyLogo}
            </div>
            <div className="fw-6 f-32 text-center -mt-2">{props.errorTitle || "Erreur lors du Chargement"}</div>
            <div className="fw-4 f-20 mt-5 text-center">{props.errorMessage || "Veuillez Ressayez..."}</div>
            {props.showBtn && (
                <div className="horizontal-center mt-5">
                    <HapyButtonWithoutIcon btnWith={366} text={props.btnText} handleClick={props.handleBtnClick}/>
                </div>
            )}
        </div>
    )
}
export default ErrorPage
