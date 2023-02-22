import React, {useContext, useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import PreparationCommandBox from "./PreparationCommandBox";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import {screenHeight} from "./Preparation_Top";
import {Order, PreparationProcessModel} from "../../globals/models/models";
import {preparationContext} from "./PreparationContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

type PropsType = {
    handleCloseModal: any ;
}

function PreparationAllOrdersModal(props:PropsType) {
    const {preparationProcess, setPreparationProcess} = useContext<{preparationProcess:PreparationProcessModel, setPreparationProcess: any}>(preparationContext) ;


    return (
        <>
            <div className="hapy-modal">
                <button className="back-btn-modal text-center" style={{ marginTop: -5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={32} height={32} styleIcon={{marginLeft: 9,marginTop: 9}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black mb-0"><span className="text-orange">{getAdminProcessValues("userLogged")?.firstName || "hâpy"}</span> {getAdminProcessValues("userLogged")?.lastName || "hâpy"}</p>
                <h1 className="text-black f-32 fw-6 mt-0">{getAdminProcessValues("userLogged")?.position}</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                {preparationProcess?.listAllOrders?.map((order:Order, index:number) => (
                    <PreparationCommandBox order={order} handleClick={null}/>
                ) )}
                {/*<div style={{marginBottom:(screenHeight-650)/2}}
                    className="text-center fixed-bottom">
                    <IconArrowDown/>
                </div>*/}
            </div>
        </>
    )
}
export default PreparationAllOrdersModal
