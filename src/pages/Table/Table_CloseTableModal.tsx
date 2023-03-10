import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconKey from "../../globals/icons-components/IconKey";
import {HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {API_REQUEST_TABLE, getAdminProcessValues, putRequest} from "../../globals/GlobalVariables";
import {useNavigate} from "react-router";

type PropsType = {
    handleCloseModal: any ;
}

function Table_CloseTableModal(props:PropsType) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [numberOfPerson, setNumberOfPerson] = useState<number>(1);
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const navigate = useNavigate();

    const handleJustCloseTable = () => {
       showErrorFunction("Fermeture de la table...", "text-success", 10000) ;
       putRequest(API_REQUEST_TABLE + '/update', homeProcess.tableDetail.id, {status: 'close', statusForNewClient: 'close'},
           ()=> {navigate('/list-tables')},
           ()=>{showErrorFunction("Echec de la fermeture, Veuillez ressayer !")}) ;
    } ;
    const handleSetPayedTable = () => {
       showErrorFunction("Fermeture de la table...", "text-success", 10000) ;
       putRequest(API_REQUEST_TABLE + '/update', homeProcess.tableDetail.id, {status: 'close', statusForNewClient: 'close'},
           ()=> {navigate('/table-close')},
           ()=>{showErrorFunction("Echec de la fermeture, Veuillez ressayer !")}) ;
    } ;

    const showErrorFunction = (errorMessage: string, color:'text-success' | 'text-danger' = "text-danger" , timeout: number = 2000) => {
        setErrorMessageColor(color) ;
        setErrorMessage(errorMessage) ;
        setShowError(true) ;
        setTimeout(()=>{
            setShowError(false) ;
        }, timeout) ;
    } ;

    return (
                <div className="container_popup">
                    <div className="popup" style={{width: '90%'}}>
                        <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                                onClick={props.handleCloseModal}>
                            <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                        </button>
                        <br/><br/><br/>
                        <p className="text-black"><span
                            className="text-red-orange">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}
                        </p>
                        <h1 className="text-black f-32 fw-6">Fermer la table</h1>
                        <div className="text-center mt-4 mb-4">
                            <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                        </div>
                        <div className="text-center mt-4 mb-4">
                            La table sera ferm??e mais non pay??e !
                        </div>
                        <br/> <br/>
                        {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                        <HapyButtonWithIcon text="Oui Fermer la table" handleClick={handleJustCloseTable}
                                            iconComponent={<IconKey/>}/>
                        {/*<HapyButtonWithIcon text="Declarer comme pay??e et Fermer la table" handleClick={handleSetPayedTable}
                                        iconComponent={<IconKey/>}/>*/}</div>
                </div>
    )
}
export default Table_CloseTableModal
