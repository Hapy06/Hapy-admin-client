import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconArrowRight from "../../globals/icons-components/IconArrowRight";
import {ICONS} from "../../globals/Icons-svg";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyTableItemServeur from "../../components/HapyTableItemServeur";
import {serveurProcessContext} from "./ServeurContainer";
import {
    API_REQUEST_ZONE_BY_INSTITUTION_ID,
    BASE_URL,
    getAdminProcessValues,
    reloadToken
} from "../../globals/GlobalVariables";
import PullToRefresh from "react-simple-pull-to-refresh";
import axios from "axios";
import {HomeProcessModel, ServeurProcessModel, Table} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {TeamMember} from "../../globals/models/Inscription.models";

function Serveur04_ListTables(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [listZones, setListZones] = useState(/*getAdminProcessValues("userLogged").institution.zones || */[]) ;
    const [zoneToShow, setZoneToShow] = useState(null);
    const [zoneToShowIndex, setZoneToShowIndex] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        window.scrollTo(0, 0);
        handleLoadData() ;
    }, []) ;

    const handleLoadData = () => {
        setIsLoading(true) ;
        return axios.get(BASE_URL + API_REQUEST_ZONE_BY_INSTITUTION_ID + '/' + getAdminProcessValues("userLogged").institution.id,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response) ;
            if (response.data.data.items.length > 0) {
                let arr = response.data.data.items.sort((a,b) => a.tableNumStart < b.tableNumStart ? -1 : 1 ) ;
                arr.forEach((zone, index) => {
                    zone.tableIds = zone.tableIds.sort((a,b) => a.tableNumber < b.tableNumber ? -1 : 1 ) ;
                }) ;
                setListZones(arr) ;
                let userLogged: TeamMember = getAdminProcessValues("userLogged") ;
                if (userLogged.zoneAffectedName) {
                    // let zone = arr.find((zone) => zone.name == userLogged.zoneAffectedName) ;
                    let index = arr.findIndex((zone) => zone.name == userLogged.zoneAffectedName) ;
                    if (index != -1) {
                        setZoneToShow(arr[index]) ;
                        setZoneToShowIndex(index) ;
                    } else {
                        setZoneToShow(arr[0]) ;
                    }
                } else {
                    setZoneToShow(arr[0]) ;
                }
            } else {
                setError("Pas de donn??es sur les zones") ;
            }
            // console.log(zoneToShow) ;
            return true ;
        })
            .catch(error => {
                console.log(error);
                if (error.response.status == 401) {
                    reloadToken() ;
                } else {
                    setError("Erreur de chargement, Veuillez R??ssayer !");
                }
                throw error; })
            .finally(() => {setIsLoading(false) ;});

    }

    const nextZone = () => {
        // console.log(zoneToShow) ;
        if (zoneToShowIndex == (listZones.length - 1 )) {
            // setZoneToShow(listZones[0]) ; // Do Nothing if last element
        } else {
            setZoneToShow(listZones[zoneToShowIndex + 1]) ;
            setZoneToShowIndex(zoneToShowIndex + 1) ;
        }
    } ;

    const previousZone = () => {
        if (zoneToShowIndex == 0) {
            // setZoneToShow(listZones[listZones.length-1]) ; // Do Nothing if first element
        } else {
            setZoneToShow(listZones[zoneToShowIndex - 1]) ;
            setZoneToShowIndex(zoneToShowIndex - 1) ;
        }
    } ;

    const handleClickTable = (tableChoosed: Table) => {
        console.log(tableChoosed) ;
        homeProcess.tableDetail = tableChoosed ;
        if (tableChoosed.status == "close" || tableChoosed.status == "closed") {
            navigate('/table') ;
        } else if (tableChoosed.status != "unavailable") {
            navigate('/table-opened') ;
        }/*
        if (tableChoosed.statusForNewClient == "close" || tableChoosed.statusForNewClient == "closed") {
            homeProcess.tableDetail = tableChoosed ;
            navigate('/table') ;
        } else if (tableChoosed.statusForNewClient == "opened" || tableChoosed.statusForNewClient == "opened-and-served") {
            homeProcess.tableDetail = tableChoosed ;
            navigate('/table-opened') ;
        } else if (tableChoosed.statusForNewClient == "unavailable" || tableChoosed.statusForNewClient == "waiting-to-join") {
            homeProcess.tableDetail = tableChoosed ;
            navigate('/table-unavailable') ;
        }*/
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "H??py"}
                           title="Liste des tables"
                           showBtnBack={true}
                           handleClickBtnBack={()=>{navigate('/home')}}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <PullToRefresh onRefresh={handleLoadData}>
                    <>
                {isLoading ? (
                    <div className="text-center mt-3">Chargement des zones...</div>
                ) : (
                    error ? (
                        <div className="text-center mt-3">{error}</div>
                    ) : (
                        <>
                            <div className="row table-item-container mt-3 scroll-and-hidden" style={{height:400}}>
                                { zoneToShow?.tableIds?.map((table, index) => (
                                    <div key={index} onClick={()=>handleClickTable(table)} className="col-3 mb-4">
                                        <HapyTableItemServeur tableNumber={table?.tableNumber || index} tableState={table?.status}/>
                                    </div>))
                                }
                            </div>
                            <br/>
                            <div className="text-center">
                                {zoneToShowIndex != 0 && (
                                    <span onClick={previousZone} className="float-start" style={{cursor:"pointer"}}><IconArrowLeft/></span>
                                )}
                                <span className="float-none fw-6">{zoneToShow?.name}</span>
                                {zoneToShowIndex != (listZones.length - 1) && (
                                    <span onClick={nextZone} className="float-end" style={{cursor:"pointer"}}><IconArrowRight/></span>
                                )}
                            </div>
                        </>
                    )
                )}
                <br/>
                <br/>
                <h6>L??gende</h6>
                <ul style={{listStyle:"none", marginLeft:-30}}>
                    <li>
                        <span>{ICONS.tableFreeIcon}</span>
                        <span style={{marginLeft:10}}>Table ferm??e</span>
                    </li>
                    <li>
                        <span>{ICONS.tableWaitingIcon}</span>
                        <span style={{marginLeft:10}}>Commande en attente de validation</span>
                    </li>
                    <li>
                        <span>{ICONS.tableCommandPreparationIcon}</span>
                        <span style={{marginLeft:10}}>Commande en pr??paration</span>
                    </li>
                    <li>
                        <span>{ICONS.tableAskToOpenIcon}</span>
                        <span style={{marginLeft:10}}>Commande pr??te</span>
                    </li>
                    <li>
                        <span>{ICONS.tableTakenIcon}</span>
                        <span style={{marginLeft:10}}>Table ouverte - servie</span>
                    </li>
                    <li>
                        <span>{ICONS.tableUnavailableIcon}</span>
                        <span style={{marginLeft:10}}>Table indisponible</span>
                    </li>
                </ul>
                    </>
                </PullToRefresh>
            </div>
        </>
    )
}
export default Serveur04_ListTables
