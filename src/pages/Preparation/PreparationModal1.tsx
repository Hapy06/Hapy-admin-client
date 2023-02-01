import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import PreparationCommandBox from "./PreparationCommandBox";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import {screenHeight} from "./Preparation_Top";

type PropsType = {
    handleCloseModal: any ;
}

function PreparationModal1(props:PropsType) {

    const [tipsValidated, setTipsValidated] = useState(false);

    return (
        <>
            <div className="hapy-modal">
                <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black"><span className="text-orange">Axel</span> BONSIGNOR</p>
                <h1 className="text-black f-32 fw-6">Poste Entrée</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                {/*<PreparationCommandBox/>
                <PreparationCommandBox/>*/}
            </div>
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </>
    )
}
export default PreparationModal1
