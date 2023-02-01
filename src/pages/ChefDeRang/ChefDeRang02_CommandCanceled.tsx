import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import HapyMobileTop from "../../components/HapyMobileTop";
import {CDRProcessModel} from "../../globals/models/models";
import {cdrProcessContext} from "./ChefDeRangContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

function ChefDeRang02_CommandCanceled(props) {
    const {cdrProcess, setCDRProcess} = useContext<{cdrProcess:CDRProcessModel, setCDRProcess:any}>(cdrProcessContext) ;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "chef de rang"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="C'est Parfait !"
                           showBtnBack={false}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <div className="text-center f-20" style={{paddingTop:100, paddingBottom:100}}>
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48.9062 79.0933L79.0929 48.9066" stroke="#FF6063" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M79.0929 79.0933L48.9062 48.9066" stroke="#FF6063" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M48.0003 117.333H80.0003C106.667 117.333 117.334 106.667 117.334 80V48C117.334 21.3333 106.667 10.6666 80.0003 10.6666H48.0003C21.3337 10.6666 10.667 21.3333 10.667 48V80C10.667 106.667 21.3337 117.333 48.0003 117.333Z" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <br/>
                    <br/>
                    {cdrProcess.validationMessage}
                </div>
                <div className="text-center inner-button-container-validate-btn mt-4">
                        <HapyButtonWithIcon text="Retour à votre gestion" handleClick={()=>{navigate('/')}}
                                            btnWidth={350}
                                            iconComponent={<IconArrowLeft width={32} height={32}/>}/>
                </div>
            </div>
        </>
    )
}
export default ChefDeRang02_CommandCanceled
