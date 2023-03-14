import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconCloseSquare from "../../globals/icons-components/IconCloseSquare";
import IconClock from "../../globals/icons-components/IconClock";
import IconPeople from "../../globals/icons-components/IconPeople";
import IconPhoneCall from "../../globals/icons-components/IconPhoneCall";
import {HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {
    API_REQUEST_BOOKING, getAdminProcessValues,
    MSG_ERROR_DELETE,
    MSG_ERROR_UPDATE, MSG_SAVING,
    putRequest,
    setProcessStored
} from "../../globals/GlobalVariables";

function ReservationDetail(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const navigate = useNavigate();

    const cancelBooking = () => {
        showErrorFunction(MSG_SAVING, "text-success") ;
        homeProcess.bookingDetail.status = 'Annulée' ;
        putRequest(API_REQUEST_BOOKING, homeProcess.bookingDetail.id, homeProcess.bookingDetail,
            (response)=> {
                setProcessStored('homeProcess', homeProcess) ;
                navigate('/home') ;
            },
            (error)=>{
                showErrorFunction(MSG_ERROR_UPDATE) ;
                homeProcess.bookingDetail.status = 'En cours' ;
            }) ;
    } ;

    const validateBooking = () => {
        showErrorFunction(MSG_SAVING, "text-success") ;
        let booking = {...homeProcess.bookingDetail} ;
        booking.status = 'Effectuée' ;
        booking.timeOfArrival = new Date().getHours() + ':' + new Date().getMinutes() ;
        putRequest(API_REQUEST_BOOKING, homeProcess.bookingDetail.id, booking,
            (response)=> {
                homeProcess.bookingDetail = response.data.data.booking ;
                setProcessStored('homeProcess', homeProcess) ;
                navigate('/reservation/validated') ;
            },
            (error)=>{
                showErrorFunction(MSG_ERROR_UPDATE) ;
            }) ;
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
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues('userLogged').firstName}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues('userLogged').lastName}
                           title={homeProcess.bookingDetail.dateOfreservationToShow || "20 Aout. 2023"}
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/reservation/list')}
                           showRightSideBtn={true}
                           rightSideBtnIconComponent={<IconCloseSquare stroke={'white'}/>}
                           hapyLogoBtnColor={"#FF6063"}
                           rightSideBtnHandleClick={cancelBooking}

            />
            <div className="happy-div-bottom">
                <br/>
                <span><IconClock/> {homeProcess.bookingDetail?.timeOfreservation || '14:55'}</span> <br/><br/>
                <div className="row f-20">
                    <span className="col-6">{homeProcess.bookingDetail?.clientName || 'Nom du Client'}</span>
                    <span className="col-6 text-end">Table <strong>{homeProcess.bookingDetail?.tableNumber || homeProcess.bookingDetail?.table.tableNumber || 20}</strong></span>
                </div>
                <br/>
                <span><IconPhoneCall/> {homeProcess.bookingDetail?.phoneNumber}</span> <br/>
                <br/>
                <span><IconPeople/> {homeProcess.bookingDetail?.numberOfPeople} p.</span>
                <br/>
                <div className="text-center inner-button-container-validate-btn mb-4" style={{position:"fixed"}}>
                {showError && (<div className={"mb-3 " + errorMessageColor}>{errorMessage}</div>)}
                    <div className="horizontal-center">
                        <HapyButtonWithIcon text="Il sont arrivés" handleClick={validateBooking}
                                                                           btnWidth={350}
                                                                           iconComponent={<IconVerify/>}/>
                    </div>
            </div>
            </div>
        </>
    )
}
export default ReservationDetail
