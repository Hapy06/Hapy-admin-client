import React, {useContext} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import {HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";

function Table_TableClosed(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const navigate = useNavigate();

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart="Hugo"
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd="LEVOIR"
                           title="Tout est bon"
                           showBtnBack={false}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <div className="text-center mt-5">
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.6934 63.9999L57.5467 76.9066L83.3067 51.0933" stroke="#FF6063" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M57.3334 13.0668C61.0134 9.92012 67.04 9.92012 70.7734 13.0668L79.2 20.3201C80.8 21.7068 83.7867 22.8268 85.92 22.8268H94.9867C100.64 22.8268 105.28 27.4668 105.28 33.1201V42.1868C105.28 44.2668 106.4 47.3068 107.787 48.9068L115.04 57.3335C118.187 61.0135 118.187 67.0401 115.04 70.7735L107.787 79.2001C106.4 80.8001 105.28 83.7868 105.28 85.9201V94.9868C105.28 100.64 100.64 105.28 94.9867 105.28H85.92C83.84 105.28 80.8 106.4 79.2 107.787L70.7734 115.04C67.0934 118.187 61.0667 118.187 57.3334 115.04L48.9067 107.787C47.3067 106.4 44.32 105.28 42.1867 105.28H32.96C27.3067 105.28 22.6667 100.64 22.6667 94.9868V85.8668C22.6667 83.7868 21.5467 80.8001 20.2134 79.2001L13.0134 70.7201C9.92003 67.0401 9.92003 61.0668 13.0134 57.3868L20.2134 48.9068C21.5467 47.3068 22.6667 44.3201 22.6667 42.2401V33.0668C22.6667 27.4135 27.3067 22.7735 32.96 22.7735H42.1867C44.2667 22.7735 47.3067 21.6535 48.9067 20.2668L57.3334 13.0668Z" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <br/><br/>
                    <span className="f-20">
                        La table a été notée comme <br/> payée et a été fermée.
                    </span>
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
export default Table_TableClosed
