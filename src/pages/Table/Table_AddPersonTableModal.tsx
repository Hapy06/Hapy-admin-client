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

function Table_AddPersonTableModal(props:PropsType) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [numberOfPerson, setNumberOfPerson] = useState<number>(homeProcess.tableDetail.numberOfPerson || 0);
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const navigate = useNavigate();

    const handleChangeNumberOfPerson = () => {
       showErrorFunction("Validation en cours...", "text-success", 10000) ;
       putRequest(API_REQUEST_TABLE + '/update', homeProcess.tableDetail.id, {numberOfPerson: numberOfPerson},
           ()=> {
               homeProcess.tableDetail.numberOfPerson = numberOfPerson ;
               props.handleCloseModal},
           ()=>{showErrorFunction("Echec de l'ouverture, Veuillez ressayer !")}) ;
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
                <>
                    <button className="back-btn-modal" style={{float: "left", marginTop:-5}}
                            onClick={props.handleCloseModal}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft:5}} />
                    </button>
                    <br/><br/><br/>
                    <p className="text-black"><span className="text-red-orange">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}</p>
                    <h1 className="text-black f-32 fw-6">Ajouter des couverts</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width:22}}/>
                    </div>
                    <span>Combien de Couvert ?</span>
                    <br/>
                    <div>
                        <div className="text-center f-32 mt-4">
                            <span onClick={()=>setNumberOfPerson(numberOfPerson+1)}>+</span>
                            <span className="text-red-orange ml-4 mr-4 fw-6">{numberOfPerson}</span>
                            <span onClick={()=>{numberOfPerson > 1 ? setNumberOfPerson(numberOfPerson-1) : null}}>-</span>
                        </div>
                    </div>
                    <br/><br/><br/><br/>
                    {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                    <HapyButtonWithIcon text="Valider les Couverts" handleClick={handleChangeNumberOfPerson}
                                        iconComponent={<IconKey/>}/>
                </>
    )
}
export default Table_AddPersonTableModal
