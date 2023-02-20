import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconSomeoneTable from "../../globals/icons-components/IconSomeoneTable";
import IconReservationSearch from "../../globals/icons-components/IconReservationSearch";
import IconLose from "../../globals/icons-components/IconLose";
import HapyMobileTop from "../../components/HapyMobileTop";
import IconCall from "../../globals/icons-components/IconCall";
import HapyButtonIconNumber from "../../components/HapyButtonIconNumber";
import IconPlat from "../../globals/icons-components/IconPlat";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {serveurProcessContext} from "./ServeurContainer";
import {
    API_REQUEST_NOTIFICATION,
    BASE_URL, deleteRequest,
    getAdminProcessValues, removeAdminProcessValues,
    setProcessStored
} from "../../globals/GlobalVariables";
import {NotificationHapy, ServeurProcessModel} from "../../globals/models/models";
import IconCalculator from "../../globals/icons-components/IconCalculator";
import {ICONS} from "../../globals/Icons-svg";
import PullToRefresh from 'react-simple-pull-to-refresh';
import axios from "axios";


function Serveur01_Home(props) {
    const {serveurProcess, setServeurProcess} = useContext<{serveurProcess:ServeurProcessModel, setServeurProcess: any}>(serveurProcessContext) ;
    const [listNotifsDemands, setListNotifsDemands] = useState<NotificationHapy[]>([]);
    const [listNotifsFoodReady, setListNotifsFoodReady] = useState<NotificationHapy[]>([]);
    const navigate = useNavigate();
    const [loadMessageNotif, setLoadMessageNotif] = useState<string>("(Pas de demandes en cours)");
    const [loadMessageFoodReady, setLoadMessageFoodReady] = useState<string>("(Pas de plats prêts pour l'instant)");

    useEffect(() => {
        handleLoadData() ;
    }, []) ;

    useEffect(() => {
        /*let temp: any = {} ;
        serveurProcess.listNotificationDemands?.forEach(notif => {
            if (!temp[notif.source]) {
                temp[notif.source] = notif ;
            } else {
                temp[notif.source].content = temp[notif.source].content + '-' + notif.content ;
                serveurProcess.listNotificationDemands = serveurProcess.listNotificationDemands.filter(item => item.id != notif.id) ;
                deleteRequest(API_REQUEST_NOTIFICATION + '/delete', notif.id, ()=>{}, ()=>{})
            }
        }) ;*/
        setListNotifsDemands(serveurProcess.listNotificationDemands) ;
    }, [serveurProcess.listNotificationDemands]) ;

    /*useEffect(() => {
        setListNotifsFoodReady(serveurProcess.listNotificationFoodReady)
    }, [serveurProcess.listNotificationFoodReady]) ;*/

    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_NOTIFICATION + '/intitution-id?intitutionID=' + getAdminProcessValues("userLogged").institutionId,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response) ;
            let arrNotifdemands: NotificationHapy[] = response.data.data.items.filter((elt:NotificationHapy) => elt.nature != "foodReady"
                && elt.nature != "commandToValidate" && elt.nature != "openTable" && !elt.isDone) ;
            if (arrNotifdemands.length == 0) {
                setLoadMessageNotif("(Pas de demandes en cours)") ;
            } else {
                let temp: any = {} ;
                arrNotifdemands.filter(elt => elt.nature == "demand").forEach(notif => {
                    if (!temp[notif.source]) {
                        temp[notif.source] = notif ;
                    } else {
                        temp[notif.source].content = temp[notif.source].content + '-' + notif.content ;
                        arrNotifdemands = arrNotifdemands.filter(item => item.id != notif.id) ;
                        deleteRequest(API_REQUEST_NOTIFICATION + '/delete', notif.id, ()=>{}, ()=>{}) ;
                    }
                }) ;
                setListNotifsDemands(arrNotifdemands.reverse()) ;
            }
            serveurProcess.listNotificationDemands = arrNotifdemands.reverse() ;
            if (response.data.data.items.filter((elt:NotificationHapy) => elt.nature == "foodReady")?.length == 0) {
                setLoadMessageFoodReady("(Pas de plats prêts pour l'instant)") ;
            } else {
                setListNotifsFoodReady(response.data.data.items.filter((elt:NotificationHapy) => elt.nature == "foodReady").reverse()) ;
                serveurProcess.listNotificationFoodReady = response.data.data.items.filter((elt:NotificationHapy) => elt.nature == "foodReady").reverse() ;
            }
            setProcessStored("serveurProcess", serveurProcess) ;
            return true ;
            })
            .catch(error => {
                console.error(error);
                setLoadMessageNotif('(Erreur de Chargement, Veuillez ressayez...)');
                setLoadMessageFoodReady('(Erreur de Chargement, Veuillez ressayez...)');
                throw error; });
    } ;

    const handleLogout = () => {
        localStorage.removeItem('isLoggedin') ;
        removeAdminProcessValues("authToken") ;
        removeAdminProcessValues("userLogged") ;
        setTimeout(()=>{
            location.reload() ;
        }, 500) ;
    } ;

    const handleNotifClicked = (notif: NotificationHapy) => {
        serveurProcess.notifDetail = notif ;
        setServeurProcess(serveurProcess) ;
        setProcessStored("serveurProcess", serveurProcess) ;
        navigate('/notifications') ;
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                           title="Gerer votre service"
                           showBtnBack={false}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />

            <div className="happy-div-bottom border-red-orange">
                <PullToRefresh onRefresh={handleLoadData}>
                <>
                <div>
                    <span className="f-20">Vos demandes ({listNotifsDemands?.length})</span> <br/><br/>
                    {listNotifsDemands?.length > 0 ? (
                        <ScrollMenu scrollContainerClassName="scroll-and-hidden pl-2" itemClassName="mr-4" >
                            {listNotifsDemands?.map((elt:NotificationHapy, index:number) => (
                                <HapyButtonIconNumber key={elt.id} btnWidth={110} text={(elt.tableNumber || index) + ''}
                                                      handleClick={()=>{handleNotifClicked(elt)}}
                                                      iconComponent={elt.nature == "demand" ? (ICONS.demande) : (
                                                          elt.nature == "payment" ? (<IconCalculator/>) :(<IconCall/>)
                                                      )}/>
                            ))}
                        </ScrollMenu>
                    ) : (
                        <div className="text-center">{loadMessageNotif}</div>
                    )}
                </div>
                <br/>
                <div>
                    <span className="f-20">Les plats prèts ({listNotifsFoodReady?.length})</span> <br/><br/>
                    {listNotifsFoodReady?.length > 0 ? (
                        <ScrollMenu scrollContainerClassName="scroll-and-hidden pl-2" itemClassName="mr-4" >
                            {listNotifsFoodReady?.map((elt:NotificationHapy, index:number) => (
                                <HapyButtonIconNumber key={elt.id || index} btnWidth={110} text={(elt.tableNumber || index) + ''}
                                                      handleClick={()=>{handleNotifClicked(elt)}}
                                                      iconComponent={<IconPlat/>}/>
                            ))}
                        </ScrollMenu>
                    ) : (
                        <div className="text-center">{loadMessageFoodReady}</div>
                    )}
                    {/*<div className="row pl-1">
                        <div className="col-4"><HapyButtonIconNumber text='14' handleClick={()=>navigate('/food-ready')} iconComponent={<IconPlat/>}/></div>
                        <div className="col-4"><HapyButtonIconNumber text='245' handleClick={()=>navigate('/food-ready')} iconComponent={<IconBoisson/>}/></div>
                        <div className="col-4"><HapyButtonIconNumber text='14' handleClick={()=>navigate('/food-ready')} iconComponent={<IconBoisson/>}/></div>
                    </div>*/}
                </div>
                <br/>
                <HapyButtonWithIcon text="Accéder à la table" handleClick={()=>{navigate('/list-tables')}} iconComponent={<IconSomeoneTable width={32} height={32}/>} />
                <br/> <HapyButtonWithIcon text="Voir les réservations" handleClick={()=>{navigate('/reservation/list')}} iconComponent={<IconReservationSearch width={32} height={32}/>} />
                <br/> <HapyButtonWithIcon text="Noter une perte" handleClick={()=>{navigate('/lose')}} iconComponent={<IconLose width={32} height={32}/>} />
                <br/> <HapyButtonWithoutIcon text="Se Deconnecter" handleClick={handleLogout} />
                </>
                </PullToRefresh>
            </div>
        </>
    )
}
export default Serveur01_Home
