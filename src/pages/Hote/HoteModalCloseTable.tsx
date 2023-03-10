import React, {useEffect, useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyInput from "../../components/HapyInput";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import IconKey from "../../globals/icons-components/IconKey";
import {Table} from "../../globals/models/models";
import {useNavigate} from "react-router";
import {API_REQUEST_TABLE, getAdminProcessValues, putRequest} from "../../globals/GlobalVariables";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
    tableDetail:Table;
}

function HoteModalCloseTable(props:PropsType) {
    const [numberOfPerson, setNumberOfPerson] = useState<number>(1);
    const [tipsValidated, setTipsValidated] = useState(false);

    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const [showCloseTableValidated, setShowCloseTableValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.tableDetail)
    }) ;

    const handleCloseTable = () => {
        showErrorFunction("Fermeture de la table...", "text-success", 10000) ;
        putRequest(API_REQUEST_TABLE + '/update', props.tableDetail.id, {status: 'close', statusForNewClient: 'close'},
            ()=> {setShowCloseTableValidated(true)},
            ()=>{showErrorFunction("Echec de la Fermeture, Veuillez ressayer !")}) ;
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
            {showCloseTableValidated ? (
                <div className="popup" style={props.containerStyle}>
                    <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                            onClick={()=>setShowCloseTableValidated(false)}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                    </button>
                    <br/><br/><br/>
                    <p className="text-black"><span className="text-green">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}</p>
                    <h1 className="text-black f-32 fw-6">Ouvrir la table {props.tableDetail?.tableNumber}</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                    </div>
                    <div className="f-16 text-center">La table est ferm??e !</div>
                    <br/> <br/><br/> <br/>
                    <HapyButtonWithIcon text="Retour ?? l'inteface" handleClick={props.handleCloseModal}
                                        iconComponent={<IconArrowLeft/>}/>
                </div>
            ) : (
                <div className="popup" style={props.containerStyle}>
                    <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                            onClick={props.handleCloseModal}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                    </button>
                    <br/><br/><br/>
                    <p className="text-black"><span className="text-green">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}</p>
                    <h1 className="text-black f-32 fw-6">Fermer la table {props.tableDetail?.tableNumber}</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                    </div>
                    {/*<p>Combien de couverts </p>
                    <div className="text-center f-32 mt-3">
                        <span onClick={()=>setNumberOfPerson(numberOfPerson+1)}>+</span>
                        <span className="text-green ml-4 mr-4 fw-6">{numberOfPerson}</span>
                        <span onClick={()=>{numberOfPerson > 1 ? setNumberOfPerson(numberOfPerson-1) : null}}>-</span>
                    </div>*/}
                    <br/> <br/><br/> <br/>
                    {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                    <HapyButtonWithIcon text="Fermer la table" handleClick={handleCloseTable}
                                        iconComponent={<IconKey/>}/>
                </div>
            )}
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </div>
    )
}
export default HoteModalCloseTable
