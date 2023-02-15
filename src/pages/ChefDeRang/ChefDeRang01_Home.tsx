import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconOrder from "../../globals/icons-components/IconOrder";
import IconKey from "../../globals/icons-components/IconKey";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconSomeoneTable from "../../globals/icons-components/IconSomeoneTable";
import IconReservationSearch from "../../globals/icons-components/IconReservationSearch";
import IconLose from "../../globals/icons-components/IconLose";
import HapyMobileTop from "../../components/HapyMobileTop";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import {cdrProcessContext} from "./ChefDeRangContainer";
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {CDRProcessModel, NotificationHapy, OpenTableDemand} from "../../globals/models/models";
import {
    API_REQUEST_NOTIFICATION,
    BASE_URL,
    getAdminProcessValues, removeAdminProcessValues,
    setProcessStored
} from "../../globals/GlobalVariables";
import axios from "axios";
import PullToRefresh from "react-simple-pull-to-refresh";
import {Simulate} from "react-dom/test-utils";
import loadedData = Simulate.loadedData;

function ChefDeRang01_Home(props) {
    const {cdrProcess, setCDRProcess} = useContext<{cdrProcess:CDRProcessModel, setCDRProcess: any}>(cdrProcessContext) ;
    const [listNotifs, setListNotifs] = useState<NotificationHapy[]>([]);
    const [loadMessageNotif, setLoadMessageNotif] = useState<string>("(Pas de demandes de validation en cours)");
    const navigate = useNavigate();

    useEffect(() => {
        handleLoadData() ;
    }, []) ;

    useEffect(() => {
        setListNotifs(cdrProcess.listNotifs) ;
    }, [cdrProcess.listNotifs]) ;

    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_NOTIFICATION + '/intitution-id?intitutionID=' + getAdminProcessValues("userLogged").institutionId,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken").authToken}`} }).then((response) => {
            console.log(response) ;
            let arr = response.data.data.items.filter((elt:NotificationHapy) =>
                (elt.nature == "commandToValidate" || elt.nature == "openTable") && !elt.isDone).reverse()
            setListNotifs(arr) ;
            if (response.data.data.items.length == 0) {
                setLoadMessageNotif("(Pas de demandes de validation en cours)") ;
            }
            cdrProcess.listNotifs = arr ;
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
        let temp = cdrProcess ;
        temp.notifDetail = notif ;
        setProcessStored("cdrProcess", temp) ;
        setCDRProcess(temp) ;
        setTimeout(()=>{
            if (notif.nature == "openTable") {
                navigate('/open-table') ;
            } else if (notif.nature == "commandToValidate") {
                navigate('/table-list-commands') ;
            }
        }, 500) ;
    } ;
    return (
        <>
            {/*<div className="happy-div-top" style={{width:screenWidth, height:screenHeightPourcent(37)}}>
                <div className="text-center welcome-word mb-3">Welcome to Hâpy</div>
                <div className="text-center welcome-word2">
                   <div style={{marginTop:-20}}>
                        <button className="back-btn" style={{float: "left", marginTop:-5}}
                                onClick={() => {navigate('/')}}>
                            <IconArrowLeft width={24} height={24} stoke={'white'} styleIcon={{marginLeft:5}} />
                        </button>
                        <div className="mt-5 mb-5" style={{overflow:"visible"}}>
                            <svg width="414" height="8" viewBox="0 0 414 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft:-60, marginBottom:-50}}>
                                <path d="M0 4C0 1.79086 1.79086 0 4 0H171C173.209 0 175 1.79086 175 4C175 6.20914 173.209 8 171 8H4C1.79086 8 0 6.20914 0 4Z" fill="url(#paint0_radial_1242_23095)"/>
                                <defs>
                                    <radialGradient id="paint0_radial_1242_23095" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(1.10703) scale(414.077 21428.5)">
                                        <stop stopColor="#F50057"/>
                                        <stop offset="0.5" stopColor="#FF6063"/>
                                        <stop offset="1" stopColor="#F50057"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                            {ICONS.hapyLogo32GrayOrange}
                            <svg width="414" height="8" viewBox="0 0 414 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:-50}}>
                                <path d="M239 4C239 1.79086 240.791 0 243 0H410C412.209 0 414 1.79086 414 4C414 6.20914 412.209 8 410 8H243C240.791 8 239 6.20914 239 4Z" fill="url(#paint1_radial_1242_23095)"/>
                                <defs>
                                    <radialGradient id="paint1_radial_1242_23095" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(1.10703) scale(414.077 21428.5)">
                                        <stop stopColor="#F50057"/>
                                        <stop offset="0.5" stopColor="#FF6063"/>
                                        <stop offset="1" stopColor="#F50057"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
                <p className="text-white"><span className="text-red-orange"></span> </p>
                <h1 className="text-white">Gérer votre service</h1>
            </div>*/}
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
                {listNotifs?.length > 0 ? (
                    <ScrollMenu scrollContainerClassName="scroll-and-hidden pl-2" itemClassName="service-item" >
                        {listNotifs?.map((elt:NotificationHapy, index:number) => (
                            <div key={index} onClick={()=>handleNotifClicked(elt)}>
                                <div>{elt.nature == "openTable" ? (<IconKey/>) : (<IconOrder/>)}</div>
                                <div className="mt-3 text-center">
                                    <span style={{fontSize: 12}}>Table </span>
                                    <span className="text-red-orange">{elt.tableNumber}</span>
                                </div>
                            </div>
                        ))}
                    </ScrollMenu>
                ) : (
                    <div className="text-center">{loadMessageNotif}</div>
                )}
                {/*<div className="row service-list">
                    <div className="col-3 service-item text-center" onClick={()=>navigate('/table-list-commands')}>
                        <div> <IconOrder /> </div>
                        <div className="mt-3">
                            <span style={{fontSize:12}}>Table </span>
                            <span className="text-red-orange">728</span>
                        </div>
                    </div>
                    <div className="col-3 service-item text-center" onClick={()=>navigate('/open-table')}>
                        <div> <IconKey width={32} height={32} /> </div>
                        <div className="mt-3">
                            <span style={{fontSize:12}}>Table </span>
                            <span className="text-blue">728 </span>
                        </div>
                    </div>
                    <div className="col-3 service-item text-center">
                        <div> <IconOrder width={32} height={32} /> </div>
                        <div className="mt-3">
                            <span style={{fontSize:12}}>Table </span>
                            <span className="text-red-orange">728</span>
                        </div>
                    </div>
                    <div className="col-3 service-item text-center">
                        <div> <IconKey width={32} height={32} /> </div>
                        <div className="mt-3">
                            <span style={{fontSize:12}}>Table </span>
                            <span className="text-blue">728</span>
                        </div>
                    </div>
                </div>*/}
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
export default ChefDeRang01_Home
