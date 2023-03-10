import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyInput from "../../components/HapyInput";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import {
    API_REQUEST_BOOKING,
    getAdminProcessValues,
    monthListFR, MSG_SAVING,
    postRequest,
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import Booking, {Table} from "../../globals/models/models";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Input, TextField} from "@mui/material";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
    listAllTables: Table[] ;
}

function HoteModalAddReservation(props:PropsType) {

    const [newBooking, setNewBooking] = useState<Booking>(new Booking());
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const handleForm = (e) => {
        const { name, value } = e.target;
        setNewBooking({...newBooking, [name]: value}) ;
    } ;

    const handleSubmitBooking = () => {
        if (!newBooking.dateOfreservation || newBooking.dateOfreservation == '' || !newBooking.dateOfreservation.includes('/')) {
            // If dateOfreservation is not set, we set it to today
            let today = new Date() ;
            newBooking.dateOfreservation = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() ;
            newBooking.timeOfreservation = today.getHours() + ":" + today.getMinutes() ;
            // showErrorFunction("Veuillez saisir une date valide (JJ/mm/AAAA) !") ;
        } else {
            let date: any = newBooking.dateOfreservation;
            newBooking.timeOfreservation = date.$H + ":" + date.$m;
            newBooking.dateOfreservation = date.$D + "/" + date.$M + "/" + date.$y;
            newBooking.tableNumber = parseInt(newBooking.tableNumber);
        }
        if (!newBooking.clientName || newBooking.clientName == '') {
            showErrorFunction("Veuillez saisir le nom de la r??servation !") ;
        } else if (!newBooking.phoneNumber || newBooking.phoneNumber == '') {
            showErrorFunction("Veuillez saisir le numero de telephone !") ;
        } else if (!newBooking.numberOfPeople || newBooking.numberOfPeople == 0) {
            showErrorFunction("Veuillez saisir le nombre de personne !") ;
        } else if (!newBooking.tableNumber || newBooking.tableNumber == 0 || (!props.listAllTables.some(elt => elt.tableNumber == newBooking.tableNumber) )) {
            showErrorFunction("Veuillez saisir un num??ro de table valide !") ;
        } else {
            newBooking.tableId = props.listAllTables.find(elt => elt.tableNumber == newBooking.tableNumber ).id ;
            saveAndContinue() ;
        }
    } ;

    const saveAndContinue = () => {
        showErrorFunction(MSG_SAVING, "text-success") ;
        let arr = newBooking.dateOfreservation.split('/') ;
        newBooking.dateOfreservationToShow = arr[0] + ' ' + monthListFR[parseInt(arr[1])-1] + ' ' + arr[2],
        newBooking.status = "En cours" ;
        newBooking.institutionId = getAdminProcessValues("userLogged").institution.id ;
        console.log(newBooking) ;
        postRequest(API_REQUEST_BOOKING, newBooking,
            (response)=>{
                props.handleCloseModal() ;
            },
            (error)=>{
                addNotification({
                    title: 'Erreur',
                    subtitle: 'Nouvelle Reservsation',
                    message: "Erreur lors de la sauvegarde, Veuillez Ressayez...",
                    theme: 'red',
                    native: true // when using native, your OS will handle theming.
                });
            })
    } ;

    const showErrorFunction = (errorMessage: string, color:'text-success' | 'text-danger' = "text-danger" , timeout: number = 5000) => {
        setErrorMessageColor(color) ;
        setErrorMessage(errorMessage) ;
        setShowError(true) ;
        setTimeout(()=>{
            setShowError(false) ;
        }, timeout) ;
    } ;

    return (
        <div className="container_popup">
            <div className="popup" style={props.containerStyle}>
                <button className="back-btn-modal" style={{float: "left", marginTop: -5, padding:0}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 10}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black"><span className="text-green">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}</p>
                <h1 className="text-black f-32 fw-6">Nouvelle r??servation</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                <br/> <HapyInput inputName='clientName' label='Nom de la r??servation' inputType={"text"}
                                 inputValue={newBooking.clientName} handleChange={handleForm}/>
                <br/> <br/> <HapyInput inputName='phoneNumber' label='Num??ro de t??l??phone' inputType={"text"}
                                       inputValue={newBooking.phoneNumber} handleChange={handleForm}/>
                <br/> <br/> <HapyInput inputName='numberOfPeople' label='Nombre de personne' inputType={"text"}
                                       inputValue={newBooking.numberOfPeople} handleChange={handleForm}/>
                <br/> <br/> <HapyInput inputName='tableNumber' label='Num??ro de table' inputType={"text"}
                                       inputValue={newBooking.tableNumber} handleChange={handleForm}/>
                <br/> <br/> {/*<HapyInput inputName='dateOfreservation' label='Date de la r??servation' inputType={"text"}
                                       inputValue={newBooking.dateOfreservation} handleChange={handleForm}/>*/}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} style={{width:366, borderRadius:20, border: '1px solid gray'}} />}
                        label=""
                        value={newBooking.dateOfreservation}
                        onChange={(newValue) => {
                            setNewBooking({...newBooking, dateOfreservation: newValue}) ;
                        }}
                    />
                </LocalizationProvider>
                <br/><br/><br/>
                {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                <HapyButtonWithIcon text="R??server la table" handleClick={handleSubmitBooking}
                                    btnWidth={350}
                                    iconComponent={<IconReservationAdd/>}/>
            </div>
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </div>
    )
}
export default HoteModalAddReservation
