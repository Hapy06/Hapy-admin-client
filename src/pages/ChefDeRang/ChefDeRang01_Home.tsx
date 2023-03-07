import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconOrder from "../../globals/icons-components/IconOrder";
import IconKey from "../../globals/icons-components/IconKey";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconSomeoneTable from "../../globals/icons-components/IconSomeoneTable";
import IconReservationSearch from "../../globals/icons-components/IconReservationSearch";
import IconLose from "../../globals/icons-components/IconLose";
import HapyMobileTop from "../../components/HapyMobileTop";
import {cdrProcessContext} from "./ChefDeRangContainer";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {CDRProcessModel, NotificationHapy} from "../../globals/models/models";
import {
    API_REQUEST_NOTIFICATION,
    BASE_URL,
    getAdminProcessValues,
    removeAdminProcessValues,
    setProcessStored
} from "../../globals/GlobalVariables";
import axios from "axios";
import PullToRefresh from "react-simple-pull-to-refresh";
import {Simulate} from "react-dom/test-utils";
import IconVerifyFilled from "../../globals/icons-components/IconVerifyFilled";

function ChefDeRang01_Home(props) {
    const {cdrProcess, setCDRProcess} = useContext<{cdrProcess:CDRProcessModel, setCDRProcess: any}>(cdrProcessContext) ;
    const [listNotifs, setListNotifs] = useState<NotificationHapy[]>([]);
    const [loadMessageNotif, setLoadMessageNotif] = useState<string>("(Pas de demandes de validation en cours)");
    const navigate = useNavigate();

    useEffect(() => {
        handleLoadData() ;
    }, []) ;

    useEffect(() => {
        if (!cdrProcess.listNotifs) {
            cdrProcess.listNotifs = [] ;
        }
        if (!cdrProcess.listNotifs.includes(null)) {
            let arr = cdrProcess.listNotifs || [];
            arr.push(null);
            setListNotifs(arr);
        }
    }, [cdrProcess.listNotifs]) ;

    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_NOTIFICATION + '/intitution-id?institutionID=' + getAdminProcessValues("userLogged").institutionId,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken").authToken}`} }).then((response) => {
            console.log(response) ;
            let arr = response.data.data.items.filter((elt:NotificationHapy) =>
                (elt.nature == "commandToValidate" || elt.nature == "openTable") && !elt.isDone).reverse()
            arr.push(null) ;
            setListNotifs(arr) ;
            if (response.data.data.items.length == 0) {
                setLoadMessageNotif("(Pas de demandes de validation en cours)") ;
            }
            cdrProcess.listNotifs = arr.slice(0, arr.length-1) ;
            setProcessStored("cdrProcess", cdrProcess) ;
            return true ;
        })
            .catch(error => {
                console.error(error);
                setLoadMessageNotif('(Erreur de Chargement, Veuillez ressayez...)');
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
        let temp = {...cdrProcess} ;
        temp.notifDetail = notif ;
        setProcessStored("cdrProcess", temp) ;
        setCDRProcess(temp) ;
        // setTimeout to avoid react error trying to read undefined variable
        setTimeout(()=>{
            if (notif.nature == "openTable") {
                navigate('/open-table') ;
            } else if (notif.nature == "commandToValidate") {
                // check if notif.content is stringified json
                if (typeof notif.content != "string") {
                    // if not, stringify it
                    notif.content = JSON.stringify(notif.content) ;
                }
                navigate('/table-list-commands') ;
            }
        }, 500) ;
    } ;

    const renderNotifMenu = () => {
         return <ScrollMenu scrollContainerClassName="scroll-and-hidden">
                            {listNotifs?.map((elt:NotificationHapy, index:number) => (
                                elt ? <div key={index} onClick={()=>handleNotifClicked(elt)} className="service-item">
                                    <div>{elt.nature == "openTable" ? (<IconKey/>) : (<IconOrder/>)}</div>
                                    <div className="text-center">
                                        <span style={{fontSize: 12}}>Table </span>
                                        <span className="text-red-orange">{elt.tableNumber}</span>
                                    </div>
                                </div>
                                : <div className="vertical-center" style={{borderLeft: '1px solid gray', paddingLeft: 24, height: 155, marginBottom:24}}>
                                   <div className="text-center">
                                       <IconVerifyFilled stroke={"#FF6063"} width={32} height={32}/>
                                   </div>
                                </div>
                            ))}
        </ScrollMenu>
    }
    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "chef de rang"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Gerer votre service"
                           showBtnBack={false}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />

            <div className="happy-div-bottom border-red-orange">
                <PullToRefresh onRefresh={handleLoadData}>
                <>
                {listNotifs?.length > 0 ?
                    renderNotifMenu()
                : (
                    <div className="vertical-center"
                         style={{borderLeft: '1px solid gray', paddingLeft: 24, height: 104, marginBottom:24}}>
                        <div className="text-center">
                            <IconVerifyFilled stroke={"#FF6063"} width={32} height={32}/>
                        </div>
                    </div>
                )}
                <HapyButtonWithIcon text="Accéder à la table" handleClick={()=>{navigate('/list-tables')}} iconComponent={<IconSomeoneTable width={32} height={32}/>} />
                <br/> <HapyButtonWithIcon text="Voir les réservations" handleClick={()=>{navigate('/reservation/list')}} iconComponent={<IconReservationSearch width={32} height={32}/>} />
                <br/> <HapyButtonWithIcon text="Noter une perte" handleClick={()=>{navigate('/lose')}} iconComponent={<IconLose width={32} height={32}/>} />
                {/*<br/> <HapyButtonWithoutIcon text="Se Deconnecter" handleClick={handleLogout} />*/}
                </>
                </PullToRefresh>
            </div>
        </>
    )
}
export default ChefDeRang01_Home
