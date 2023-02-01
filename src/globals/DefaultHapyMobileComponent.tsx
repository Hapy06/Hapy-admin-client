import React from 'react' ;
import {ICONS} from "../globals/Icons-svg";
import {useNavigate} from "react-router";
import IconArrowLeft from "./icons-components/IconArrowLeft";

function DefaultHapyMobileComponent(props) {
    const navigate = useNavigate();

    return (
        <>
            <div className="happy-div-top">
                <div className="text-center welcome-word mb-3">Welcome to Hâpy</div>
                <div className="text-center welcome-word2">
                    <span className="text-white"><span className="text-blue float-start" style={{marginRight:-40}}>Hâpy Hour</span>- Sélection de l’établissement à -20%</span>
                    <span className="float-end" style={{marginTop:-5, marginRight:20}}>{ICONS.menu32White}</span>
                    <div>
                        <button className="back-btn" style={{float: "left", marginTop:-5}}
                                onClick={() => {navigate('/')}}>
                            <IconArrowLeft width={24} height={24} stroke={'white'} styleIcon={{marginLeft:5}} />
                        </button>
                        <div className="mt-5 mb-5" style={{marginRight:50}}>{ICONS.hapyLogo32Gray}</div>
                    </div>
                </div>
                <p className="text-white"><span className="text-blue">#</span> 27</p>
                <h1 className="text-white">Bonjour !</h1>
            </div>
            <div className="happy-div-bottom">

            </div>
        </>
    )
}
export default DefaultHapyMobileComponent
