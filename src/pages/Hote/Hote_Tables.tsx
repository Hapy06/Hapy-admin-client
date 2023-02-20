import React, {useEffect, useState} from 'react';
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import {useNavigate} from "react-router";
import Hote_Top, {screenWidth} from "./Hote_Top";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import IconArrowRight from "../../globals/icons-components/IconArrowRight";
import HapyHoteTableItem from "../../components/HapyHoteTableItem";
import HoteModalDetailReservation from "./HoteModalDetailReservation";
import HoteModalOpenTable from "./HoteModalOpenTable";
import HoteModalAddReservation from "./HoteModalAddReservation";
import PullToRefresh from "react-simple-pull-to-refresh";
import axios from "axios";
import {
    API_REQUEST_BOOKING,
    API_REQUEST_ZONE_BY_INSTITUTION_ID,
    BASE_URL,
    getAdminProcessValues,
    reloadToken
} from "../../globals/GlobalVariables";
import Booking, {Order, Table} from "../../globals/models/models";
import {TeamMember, Zone} from "../../globals/models/Inscription.models";
import addNotification from "react-push-notification";
import HapyTableItemServeur from "../../components/HapyTableItemServeur";
import HoteModalCloseTable from "./HoteModalCloseTable";
import {Simulate} from "react-dom/test-utils";
import loadedData = Simulate.loadedData;

type PropsType = {
}

function Hote_Tables(props:PropsType) {
    const [listToShow, setListToShow] = useState<'Tables' | 'Reservations'>('Tables');


    const [blurBG, setBlurBG] = useState<string>('');
    const [isModalOpened, setIsModalOpened] = useState<{state:boolean,modalToOpen:any}>({state:false,modalToOpen:null});
    const [listZones, setListZones] = useState([]) ;
    const [zoneToShow, setZoneToShow] = useState(null);
    const [zoneToShowIndex, setZoneToShowIndex] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [listAllTables, setListAllTables] = useState<Table[]>([]);
    const [listBooking, setListBooking] = useState<Booking[]>([]);

    useEffect(()=>{
        handleLoadData() ;
    }, []) ;

    const handleLoadData = () => {
        setIsLoading(true) ;
        return axios.get(BASE_URL + API_REQUEST_ZONE_BY_INSTITUTION_ID + '/' + getAdminProcessValues("userLogged").institution.id,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response) ;
            if (response.data.data.items.length > 0) {
                handleLoadBookings() ;
                let arr = response.data.data.items.sort((a,b) => a.tableNumStart < b.tableNumStart ? -1 : 1 ) ;
                arr.forEach((zone, index) => {
                    zone.tableIds = zone.tableIds.sort((a,b) => a.tableNumber < b.tableNumber ? -1 : 1 ) ;
                }) ;
                let alltables: Table[] = [] ;
                arr.forEach((zone, index) => {
                    alltables = alltables.concat(zone.tableIds) ;
                }) ;
                setListAllTables(alltables) ;
                setListZones(arr) ;
                setZoneToShow(arr[0]) ;
            } else {
                setError("Pas de données sur les zones") ;
            }
            // console.log(zoneToShow) ;
            return true ;
        })
            .catch(error => {
                console.log(error);
                if (error.response.status == 401) {
                    reloadToken() ;
                } else {
                    setError("Erreur de chargement, Veuillez Réssayer !");
                }
                throw error; })
            .finally(() => {setIsLoading(false) ;});

    }

    const handleLoadBookings = () => {
        return axios.get(BASE_URL + API_REQUEST_BOOKING + '/byInstitutionId/' + getAdminProcessValues("userLogged").institution.id,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response) ;
            if (response.data.data.items.length > 0) {
                setListBooking(response.data.data.items) ;
            }
            return true ;
        }) .catch(error => {
            console.error(error);
            throw error; });
    } ;

    const handleOpenModal = (modalToOpen) => {
        setBlurBG('blur-bg') ;
        setIsModalOpened({state:true,modalToOpen:modalToOpen}) ;
    } ;

    const handleCloseModal = () => {
        setBlurBG('') ;
        setIsModalOpened({state:false,modalToOpen:null}) ;
        handleLoadData() ;
    } ;

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
        if (tableChoosed.status == "close" || tableChoosed.status == "closed") {
            // homeProcess.tableDetail = tableChoosed ;
            navigate('/table') ;
        } else if (tableChoosed.status == "opened" || tableChoosed.status == "opened-and-served") {
            // homeProcess.tableDetail = tableChoosed ;
            navigate('/table-opened') ;
        }
    } ;

    const checkedIfReserved = (table:Table) => {
        return listBooking.some((booking:Booking) => {
            return booking.tableNumber == table.tableNumber ;
        })
    } ;

    return (
        <>
            <Hote_Top classAdditional={blurBG} handleSwitchListToShow={(value)=>setListToShow(value)} numberOfCloseTable={listAllTables?.filter(table => table.status == "close").length}
                      showLeftBtn={listToShow == 'Reservations'} leftBtnComponent={<HapyButtonWithIcon text='Ajouter une réservation'
                                                                                   handleClick={()=>handleOpenModal(<HoteModalAddReservation listAllTables={listAllTables} containerStyle={{marginTop:150}} handleCloseModal={handleCloseModal}/>)}
                                                                                   btnWidth={350} iconComponent={<IconReservationAdd stroke='white'/>} btnClass='hapy-btn-with-icon-black' />}/>
            {/*<div className={"border-green-container preparation-container-wrapper " + blurBG} style={{width:(screenWidth+8), marginLeft:-4}}></div>*/}
            <div className="preparation-bottom-container-without-border border-green-top">
                <div className={"preparation-container-wrapper mt-3 " + blurBG}>
                    <PullToRefresh onRefresh={handleLoadData}>
                        <>
                    <div className="text-center mb-5 mt-4">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.3421 31.1019L22.9006 31.6172C22.5166 31.6997 22.125 31.742 21.7322 31.7435C21.2567 31.7469 20.784 31.67 20.334 31.5162C19.9366 31.379 19.5648 31.1767 19.2338 30.9175C18.6475 30.4479 18.1866 29.8404 17.8924 29.1492C17.7265 28.772 17.6077 28.3757 17.5388 27.9694C17.4896 27.7499 17.4575 27.527 17.4428 27.3025C17.4238 27.0499 17.415 26.7834 17.415 26.4904C17.415 25.4963 17.5085 24.2648 17.5994 23.0737C17.6904 21.8826 17.7813 20.7319 17.7813 19.9299C17.7813 19.849 17.7813 19.772 17.7813 19.6987C17.1662 21.15 16.5561 22.7302 15.8715 24.2547C15.0543 26.0735 14.1348 27.8103 12.9513 29.1492C12.1631 30.0396 11.2524 30.7545 10.1725 31.1701L10.1055 31.1966C9.49563 31.4263 8.85215 31.5544 8.20078 31.5755C8.029 31.5831 7.86227 31.5869 7.69555 31.5869C6.07501 31.5869 4.73866 31.2421 3.66377 30.6143C2.61654 29.992 1.76831 29.0842 1.21844 27.9972C0.833334 27.246 0.54799 26.4477 0.369641 25.6226C0.112327 24.4215 -0.0113651 23.1956 0.000819706 21.9672C0.000819706 19.0028 0.586892 15.7781 1.34601 12.9071C2.10512 10.0361 3.03854 7.52763 3.74587 5.99677C3.91208 5.63099 4.09759 5.2743 4.30163 4.9282C4.37685 4.80295 4.46129 4.68347 4.55425 4.57075H4.56056C4.89064 4.16322 5.28329 3.81065 5.72387 3.52618C6.20397 3.21416 6.71126 2.94614 7.23957 2.72538C8.3711 2.26719 9.54168 1.91208 10.7371 1.66438C12.1695 1.35149 13.6203 1.12959 15.0808 1H15.1276C15.2031 0.999892 15.2785 1.00794 15.3524 1.024C15.475 1.0477 15.5915 1.09627 15.6947 1.16673C15.7831 1.22866 15.8583 1.30768 15.9157 1.39914C16.0037 1.54524 16.0476 1.71369 16.042 1.88416C16.0399 2.03745 16.0143 2.18951 15.9662 2.33508L15.9473 2.3995L15.9056 2.45381C13.6144 5.43217 11.577 8.95745 10.0045 12.4865C8.44456 15.9891 7.34441 19.4954 6.89854 22.4649C6.93448 22.6259 6.98305 22.7839 7.04379 22.9373C7.12376 23.1539 7.24373 23.3536 7.39746 23.5259C7.48593 23.6218 7.5965 23.6947 7.71954 23.7381C7.79321 23.7628 7.87046 23.7752 7.94816 23.7747C8.11715 23.7695 8.28338 23.7304 8.43698 23.6598C8.68118 23.5482 8.91069 23.4069 9.12031 23.2392L9.12915 23.2316C9.43861 22.9449 9.82511 22.4409 10.2533 21.8119C10.6815 21.1829 11.1703 20.4099 11.697 19.5901C12.7504 17.9481 13.9769 16.0977 15.3802 14.6123C16.3161 13.6233 17.3342 12.7934 18.452 12.3122C19.0858 12.0327 19.7702 11.8866 20.4628 11.8828C20.7107 11.8826 20.9583 11.9024 21.203 11.9421C21.7378 12.0118 22.2487 12.206 22.6947 12.5092C23.0948 12.7938 23.4181 13.1731 23.6357 13.6132C24.0071 14.3445 24.1409 15.2299 24.1409 16.205C24.1409 17.6879 23.8239 19.3956 23.4286 21.1311C23.0332 22.8666 22.5659 24.5856 22.2362 26.1177L22.2286 26.1569C21.9848 27.2937 21.8232 28.3117 21.8244 29.1049C21.8191 29.3909 21.8466 29.6766 21.9065 29.9563C21.9468 30.1554 22.0276 30.3442 22.144 30.5108C22.2072 30.5969 22.2865 30.6698 22.3777 30.7255C22.5238 30.8107 22.6876 30.8608 22.8564 30.872L25.3421 31.1019Z"
                                fill="#323232"/>
                            <path
                                d="M32.0003 29.0204C31.9966 29.5074 31.8693 29.9855 31.6302 30.4098C31.397 30.833 31.0613 31.1909 30.6538 31.4506C30.2739 31.6939 29.8331 31.8253 29.3819 31.8295C29.0115 31.8313 28.6479 31.7308 28.3311 31.5388C28.0144 31.3469 27.7569 31.0711 27.587 30.742C27.406 30.3906 27.3128 30.0005 27.3155 29.6052C27.3213 29.1196 27.4473 28.6431 27.6823 28.2181C27.9172 27.7932 28.2538 27.4331 28.6619 27.17C29.0419 26.9266 29.4827 26.7953 29.9339 26.791C30.3042 26.7892 30.6679 26.8898 30.9846 27.0817C31.3014 27.2736 31.5589 27.5494 31.7287 27.8786C31.9112 28.2313 32.0044 28.6233 32.0003 29.0204Z"
                                fill="#4ECDC4"/>
                        </svg>
                    </div>
                    {isLoading ? (
                        <div className="text-center mt-3">Chargement des zones...</div>
                    ) : (
                        error ? (
                            <div className="text-center mt-3">{error}</div>
                        ) : (
                            <>
                                {listToShow == 'Tables' ? (
                                    <>
                                        <div className="row">
                                            {/*{listTables.map((item, index) => (
                                                <HapyHoteTableItem marginLeft={49} marginBottom={49} state={item.state}
                                                                   handleClick={() => handleOpenModal(<HoteModalOpenTable
                                                                       containerStyle={{marginTop: 50}}
                                                                       handleCloseModal={handleCloseModal}/>)} number={item.number}
                                                                   btnWidth={64}/>
                                            ))}*/}
                                            <div className="row table-item-container mt-3 scroll-and-hidden" style={{height:250}}>
                                                { zoneToShow?.tableIds?.map((table, index) => (
                                                    <HapyHoteTableItem marginLeft={49} marginBottom={49} status={table.status}
                                                    handleClick={() => handleOpenModal(
                                                        table.status == 'close' ? <HoteModalOpenTable tableDetail={table}
                                                                                                      containerStyle={{marginTop: 50}}
                                                                                                      handleCloseModal={handleCloseModal}/> :
                                                            <HoteModalCloseTable tableDetail={table}
                                                                                containerStyle={{marginTop: 50}}
                                                                                handleCloseModal={handleCloseModal}/>
                                                    )} number={table.tableNumber}
                                                    btnWidth={64}/>
                                                ))
                                                }
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            {zoneToShowIndex != 0 && (
                                                <span onClick={previousZone} className="float-start" style={{cursor:"pointer"}}><IconArrowLeft/></span>
                                            )}
                                            <span className="float-none">{zoneToShow?.name}</span>
                                            {zoneToShowIndex != (listZones.length - 1) && (
                                                <span onClick={nextZone} className="float-end" style={{cursor:"pointer"}}><IconArrowRight/></span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="row">
                                        {listAllTables.map((table, index) => (
                                            <HapyHoteTableItem marginLeft={49} marginBottom={49} isChecked={checkedIfReserved(table)} status={table.status}
                                                               handleClick={checkedIfReserved(table) ? () => handleOpenModal(<HoteModalDetailReservation
                                                                   containerStyle={{marginTop: 100}} bookingDetail={
                                                                   listBooking.find((booking:Booking) => {
                                                                       return booking.tableNumber == table.tableNumber ;
                                                                   })
                                                               }
                                                                   handleCloseModal={handleCloseModal}/>) : null} number={table.tableNumber}
                                                               btnWidth={64}/>
                                        ))}
                                    </div>
                                )}
                            </>
                        )
                    )}
                            </>
                    </PullToRefresh>
                </div>
            </div>
            { isModalOpened.state && (
                isModalOpened.modalToOpen
            ) }
        </>
    )
}
export default Hote_Tables
