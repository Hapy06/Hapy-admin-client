import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconClock from "../../globals/icons-components/IconClock";
import IconPhoneCall from "../../globals/icons-components/IconPhoneCall";
import IconPeople from "../../globals/icons-components/IconPeople";
import Booking, {Table} from "../../globals/models/models";
import {
    API_REQUEST_BOOKING,
    getAdminProcessValues, MSG_ERROR_DELETE,
    MSG_SAVING,
    putRequest, setAdminProcessValues,
    setProcessStored
} from "../../globals/GlobalVariables";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
    bookingDetail: Booking ;
}

function HoteModalDetailReservation(props:PropsType) {
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');

    const validateBooking = () => {
        showErrorFunction(MSG_SAVING, "text-success") ;
        putRequest(API_REQUEST_BOOKING, props.bookingDetail.id, {...props.bookingDetail, status:'Effectuée'},
            (response)=> {
                props.handleCloseModal() ;
            },
            (error)=>{
                showErrorFunction(MSG_ERROR_DELETE) ;
            }) ;
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
                <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black"><span className="text-green">{getAdminProcessValues("userLogged").firstName}</span> {getAdminProcessValues("userLogged").lastName}</p>
                <h1 className="text-black f-32 fw-6">Detail d'une réservation</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                <span> {props.bookingDetail?.dateOfreservationToShow || 'Date Inconnue'}</span> <br/><br/>
                <span><IconClock/> {props.bookingDetail?.timeOfreservation || '14:55'}</span> <br/><br/>
                <div className="row f-20">
                    <span className="col-6">{props.bookingDetail?.clientName || 'Nom du Client'}</span>
                    <span className="col-6 text-end">Table <strong>{props.bookingDetail?.tableNumber || props.bookingDetail?.table.tableNumber || 20}</strong></span>
                </div>
                <br/>
                <span><IconPhoneCall/> {props.bookingDetail?.phoneNumber}</span> <br/>
                <br/>
                <span><IconPeople/> {props.bookingDetail?.numberOfPeople} p.</span>
                <br/><br/><br/><br/><br/><br/>
                {showError && (<div className={"text-center mb-3 " + errorMessageColor}>{errorMessage}</div>)}
                <div className="horizontal-center mt-4">
                    <HapyButtonWithIcon text="Il sont arrivés" handleClick={validateBooking}
                                        btnWidth={350}
                                        iconComponent={<IconVerify/>}/>
                </div>
            </div>
        </div>
    )
}
export default HoteModalDetailReservation
