import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import HapyInput from "../../components/HapyInput";
import Booking, {HomeProcessModel, Table} from "../../globals/models/models";
import {
    API_REQUEST_BOOKING,
    getAdminProcessValues,
    monthListFR,
    postRequest,
    setProcessStored
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import {homeProcessContext} from "../HomeContainer";

function ReservationNew(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [newBooking, setNewBooking] = useState<Booking>(new Booking());
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const [listTables, setListTables] = useState<Table[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let arr = [] ;
        getAdminProcessValues("userLogged").institution.zones.forEach(zone => {
            arr = arr.concat(zone.tableIds) ;
        }) ;
        // console.log(arr) ;
        setListTables(arr)
    }, []) ;

    const handleForm = (e) => {
        const { name, value } = e.target;
        setNewBooking({...newBooking, [name]: value}) ;
        /*if (name == 'phoneNumber') {
            setNewBooking({...newBooking, phoneNumber: {phone: value, isoCode:'33', countryCode:'FR', value: '+33'+value}}) ;
        } else {
            setNewBooking({...newBooking, [name]: value}) ;
        }*/
    } ;

    const handleSubmitBooking = () => {
        newBooking.tableNumber = parseInt(newBooking.tableNumber) ;
        if (!newBooking.clientName || newBooking.clientName == '') {
            showErrorFunction("Veuillez saisir le nom de la réservation !") ;
        } else if (!newBooking.phoneNumber || newBooking.phoneNumber == '') {
            showErrorFunction("Veuillez saisir le numero de telephone !") ;
        } else if (!newBooking.numberOfPeople || newBooking.numberOfPeople == 0) {
            showErrorFunction("Veuillez saisir le nombre de personne !") ;
        } else if (!newBooking.tableNumber || newBooking.tableNumber == 0 || (!listTables.some(elt => elt.tableNumber == newBooking.tableNumber) )) {
            showErrorFunction("Veuillez saisir un numéro de table valide !") ;
        } else if (!newBooking.dateOfreservation || newBooking.dateOfreservation == '' || !newBooking.dateOfreservation.includes('/')) {
            showErrorFunction("Veuillez saisir une date valide (JJ/mm/AAAA) !") ;
        } else {
            newBooking.phoneNumber.includes('+33') ? null : newBooking.phoneNumber = '+33' + newBooking.phoneNumber ;
            newBooking.tableId = listTables.find(elt => elt.tableNumber == newBooking.tableNumber ).id ;
            saveAndContinue() ;
        }
    } ;

    const saveAndContinue = () => {
        newBooking.timeOfreservation = new Date().getHours() + ':' + new Date().getMinutes() ;
        let arr = newBooking.dateOfreservation.split('/') ;
        newBooking.dateOfreservationToShow = arr[0] + ' ' + monthListFR[parseInt(arr[1])-1] + ' ' + arr[2] ;
        newBooking.status = "En cours" ;
        console.log(newBooking) ;
        postRequest(API_REQUEST_BOOKING, newBooking,
            (response)=>{
                homeProcess.bookingDetail = response.data.data.booking ;
                setProcessStored("homeProcess", homeProcess) ;
                navigate('/reservation/detail') ;
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
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart="Hugo"
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd="LEVOIR"
                           title="Nouvelle réservation"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
            <br/> <HapyInput inputName='clientName' label='Nom de la réservation' inputType={"text"}
                             inputValue={newBooking.clientName} handleChange={handleForm}/>
            <br/> <br/> <HapyInput inputName='phoneNumber' label='Numéro de téléphone' inputType={"text"}
                             inputValue={newBooking.phoneNumber} handleChange={handleForm}/>
            <br/> <br/> <HapyInput inputName='numberOfPeople' label='Nombre de personne' inputType={"text"}
                             inputValue={newBooking.numberOfPeople} handleChange={handleForm}/>
            <br/> <br/> <HapyInput inputName='tableNumber' label='Numéro de table' inputType={"text"}
                             inputValue={newBooking.tableNumber} handleChange={handleForm}/>
            <br/> <br/> <HapyInput inputName='dateOfreservation' label='Date de la réservation' inputType={"text"}
                             inputValue={newBooking.dateOfreservation} handleChange={handleForm}/>
            <br/><br/><br/>
            {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
            <HapyButtonWithIcon text="Réserver la table" handleClick={handleSubmitBooking}
                                    btnWidth={350}
                                    iconComponent={<IconReservationAdd/>}/>
            </div>
        </>
    )
}
export default ReservationNew
