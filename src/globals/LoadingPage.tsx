import React from 'react' ;
import {ICONS} from "./Icons-svg";

type PropsType = {
}

function LoadingPage(props:PropsType) {
    return (
        <div className="center-force" style={{marginTop: 250, backgroundColor:"white"}}>
            <div className="logo text-center mb-3">
                {ICONS.hapyLogo}
            </div>
            <div className="fw-6 f-32 text-center -mt-2">Bienvenue au Service Hâpy</div>
            <div className="fw-4 f-20 mt-5 text-center">Chargement en Cours...</div>
        </div>
    )
}
export default LoadingPage
