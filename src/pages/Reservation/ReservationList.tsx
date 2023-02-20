import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import {API_REQUEST_BOOKING, BASE_URL, getAdminProcessValues, setProcessStored} from "../../globals/GlobalVariables";
import Booking, {HomeProcessModel} from "../../globals/models/models";
import axios from "axios";
import {homeProcessContext} from "../HomeContainer";
import PullToRefresh from "react-simple-pull-to-refresh";
import {TeamMember} from "../../globals/models/Inscription.models";

function ReservationList(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [listBooking, setListBooking] = useState<Booking[]>([]);
    const [loadMessage, setLoadMessage] = useState<string>("(Pas de reservations en cours)");
    const navigate = useNavigate();

    useEffect(()=>{
        handleLoadData() ;
    }, []) ;

    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_BOOKING + '/byInstitutionId/' + getAdminProcessValues("userLogged").institution.id,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response) ;
            if (response.data.data.items.length > 0) {
                let arr = response.data.data.items ;
                setListBooking(arr) ;
            } else {
                setLoadMessage("(Pas de réservations en cours)") ;
            }
            // console.log(zoneToShow) ;
            return true ;
        }) .catch(error => {
                console.error(error);
                setLoadMessage('(Erreur de Chargement, Veuillez ressayez...)');
                throw error; });
    } ;

    const handleShowBooking = (booking:Booking) => {
        homeProcess.bookingDetail = booking ;
        setProcessStored("homeProcess", homeProcess) ;
        navigate('/reservation/detail') ;
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart="Hugo"
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd="LEVOIR"
                           title="Liste des réservations"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <PullToRefresh onRefresh={handleLoadData}>
                    <>
                        {listBooking?.length > 0 ? (
                                listBooking?.map((booking:Booking, index:number) => (
                                    <div key={index}>
                                        <div className="reservation-item text-center fw-5"
                                             onClick={() => handleShowBooking(booking)}>
                                            <span className="float-start">{booking?.tableNumber || 20}</span>
                                            <span className="float-none">{booking?.clientName || 'Nom du Client'}</span>
                                            <span className="float-end f-12 text-end"
                                                  style={{marginTop: -7}}>{booking?.dateOfreservation}
                                                <br/>{booking?.timeOfreservation || '14:55'}</span>
                                        </div>
                                        <br/>
                                    </div>
                                ))
                        ) : (
                            <div> <br/>
                                <div className="text-center mb-5">{loadMessage}</div>
                                <br/> <br/> <br/> <br/> <br/> <br/>
                            </div>
                        )}
            <div className="horizontal-center inner-button-container-validate-btn mt-4">
            <HapyButtonWithIcon text="Réserver la table" handleClick={()=>{navigate('/reservation/new')}}
                                    btnWidth={350}
                                    iconComponent={<IconReservationAdd/>}/>
            </div>
            </>
            </PullToRefresh>
            </div>
        </>
    )
}
export default ReservationList
