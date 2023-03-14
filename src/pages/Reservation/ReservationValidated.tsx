import React, {useContext} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconClock from "../../globals/icons-components/IconClock";
import IconPeople from "../../globals/icons-components/IconPeople";
import IconPhoneCall from "../../globals/icons-components/IconPhoneCall";
import {HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

function ReservationValidated(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const navigate = useNavigate();

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                       subtitleStart={getAdminProcessValues('userLogged').firstName}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues('userLogged').lastName}
                           title="C’est noté"
                           showBtnBack={false}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
             <div className="text-center mt-3 mb-5">
                 <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M42.667 10.6667V26.6667" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M85.333 10.6667V26.6667" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M18.667 48.48H109.334" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M117.334 101.333C117.334 105.333 116.214 109.12 114.24 112.32C110.56 118.507 103.787 122.667 96.0003 122.667C90.6137 122.667 85.707 120.693 81.9737 117.333C80.3203 115.947 78.8803 114.24 77.7603 112.32C75.787 109.12 74.667 105.333 74.667 101.333C74.667 89.5467 84.2137 80 96.0003 80C102.4 80 108.107 82.8266 112 87.2533C115.307 91.0399 117.334 95.9467 117.334 101.333Z" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M87.6807 101.333L92.9607 106.613L104.321 96.1066" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M112 45.3334V87.2533C108.107 82.8266 102.4 80 96 80C84.2133 80 74.6667 89.5467 74.6667 101.333C74.6667 105.333 75.7867 109.12 77.76 112.32C78.88 114.24 80.32 115.947 81.9733 117.333H42.6667C24 117.333 16 106.667 16 90.6667V45.3334C16 29.3334 24 18.6667 42.6667 18.6667H85.3333C104 18.6667 112 29.3334 112 45.3334Z" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M63.9762 73.0668H64.0241" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M44.236 73.0668H44.2839" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M44.236 89.0668H44.2839" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
             </div>
            <div className="row">
                <span className="col-6">{homeProcess.bookingDetail.dateOfreservationToShow || "20 Aout. 2023"}</span>
                <span className="col-6 text-end"><IconClock/> {homeProcess.bookingDetail?.timeOfreservation || '14:55'}</span>
            </div>
            <br/>
            <div className="row f-20">
                <span className="col-6">{homeProcess.bookingDetail?.clientName || 'Nom du Client'}</span>
                <span className="col-6 text-end">Table <strong>{homeProcess.bookingDetail?.tableNumber || homeProcess.bookingDetail?.table.tableNumber || 20}</strong></span>
            </div>
            <br/>
            <div className="row">
                <span className="col-6"><IconPhoneCall/> {homeProcess.bookingDetail?.phoneNumber}</span>
                <span className="col-6 text-end"><IconPeople/> {homeProcess.bookingDetail?.numberOfPeople} p.</span>
            </div>
            <div className="horizontal-center inner-button-container-validate-btn mt-5" >
                <HapyButtonWithIcon text="Retour à la gestion" handleClick={()=>{navigate('/')}}
                                    btnWidth={350}
                                    iconComponent={<IconArrowLeft/>}/>
            </div>
            </div>
        </>
    )
}
export default ReservationValidated
