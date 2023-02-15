import React, {useContext, useEffect} from 'react';
import {ICONS} from "../../globals/Icons-svg";
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconCloseSquare from "../../globals/icons-components/IconCloseSquare";
import HapyMobileTop from "../../components/HapyMobileTop";
import {CDRProcessModel} from "../../globals/models/models";
import {cdrProcessContext} from "./ChefDeRangContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

function ChefDeRang02_CommandValidated(props) {
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
                        <path d="M89.707 10.6666H38.2937C26.9337 10.6666 17.707 19.9466 17.707 31.2533V106.4C17.707 116 24.587 120.053 33.0137 115.413L59.0404 100.96C61.8137 99.4133 66.2937 99.4133 69.0137 100.96L95.0404 115.413C103.467 120.107 110.347 116.053 110.347 106.4V31.2533C110.294 19.9466 101.067 10.6666 89.707 10.6666Z" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M51.1465 58.6667L59.1465 66.6667L80.4798 45.3334" stroke="#FF6063" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <br/>
                    <br/>
                    {cdrProcess.validationMessage || "Validée avec Succèss"}
                </div>
                <div className="horizontal-center inner-button-container-validate-btn">
                    <HapyButtonWithIcon text="Retour à votre gestion" handleClick={()=>{navigate('/')}}
                                        btnWidth={350}
                                        iconComponent={<IconArrowLeft width={32} height={32}/>}/>
                </div>
            </div>
        </>
    )
}
export default ChefDeRang02_CommandValidated
