import React, {useContext, useState} from 'react';
import HapyButtonOnlyIcon2 from "../../components/HapyButtonOnlyIcon2";
import IconOrderAdd from "../../globals/icons-components/IconOrderAdd";
import IconArchive from "../../globals/icons-components/IconArchive";
import IconTrash from "../../globals/icons-components/IconTrash";
import IconLose from "../../globals/icons-components/IconLose";
import {useNavigate} from "react-router";
import HapyButtonWithIcon_Little from "../../components/HapyButtonWithIcon_Little";
import HapyButtonOnlyIcon from "../../components/HapyButtonOnlyIcon";
import IconSomeoneDelete from "../../globals/icons-components/IconSomeoneDelete";
import {PreparationProcessModel} from "../../globals/models/models";
import {preparationContext} from "./PreparationContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";
import PreparationAllOrdersModal from "./PreparationAllOrdersModal";
import PreparationModalPerte from "./PreparationModalPerte";

type PropsType = {
    classAdditional?: string ;
    handleOpenModal:any ;
    handleCloseModal:any ;

}
export const screenWidth: number = window.screen.width ;
export const screenHeight: number = window.screen.height ;
export const screenWidthPourcent: any = (pourcent: number) => {return (pourcent*screenWidth)/100 } ;
export const screenHeightPourcent: any = (pourcent: number) => {return (pourcent*screenHeight)/100 } ;

function Preparation_Top(props:PropsType) {
    const {preparationProcess, setPreparationProcess} = useContext<{preparationProcess:PreparationProcessModel, setPreparationProcess: any}>(preparationContext) ;
    const navigate = useNavigate() ;
    const [ orderNumber, setOrderNumber ] = useState(0)
    const [ couponNumber, setCouponNumber ] = useState(0)
    const handleLogout = () => {
        localStorage.removeItem('isLoggedin') ;
        setTimeout(()=>{
            location.reload() ;
        }, 500)
    } ;

    /*useEffect(() => {
        /!*if (!location.pathname.includes('home')) {
            location.pathname = 'home' ;
        }*!/
        getOrders()
         .then((response:any) => {
            let preparationProcess = getProcessStored('preparationProcess');
            preparationProcess = { ...preparationProcess, orders: response?.items }
            setProcessStored('preparationProcess', preparationProcess);
          })
         .catch(error => console.log(error))
         getCoupons()
         .then((response: any) => {
            setOrderNumber(response.ticketNumber);
            setCouponNumber(response.coupons.length);
            //update orders in localstorage
          })
         .catch(error => console.log(error))

    }, []) ;*/


    return (
        <div className={"preparation-top-container text-white " + props.classAdditional}
             /*style={{width:screenWidth+5}}*/>
            <div className="preparation-container-wrapper">
                <div className="text-center welcome-word">Welcome to Hâpy</div>
                <div className="row">
                    <div className="col-6 row" style={{cursor:"pointer"}} onClick={()=>navigate('/preparation')}>
                    <div className="col-6">
                        <h1>{getAdminProcessValues("userLogged")?.position || "Poste en Cuisine"}</h1>
                        <span className="text-orange">{getAdminProcessValues("userLogged")?.firstName || "hâpy"}</span> <span>{getAdminProcessValues("userLogged")?.lastName || "HAPY"}</span>
                    </div>
                    <div className="col-5 mt-3">
                        {screenWidth > 1100 ? (
                            <HapyButtonWithIcon_Little text='Se deconnecter' handleClick={handleLogout}
                                                       iconComponent={<IconSomeoneDelete stroke='white'/>} btnClass='hapy-btn-with-icon-black max-width-248' />
                        ) : (
                            <HapyButtonOnlyIcon handleClick={handleLogout} iconComponent={<IconSomeoneDelete stroke={'white'}/>} isChecked={false} btnClass='hapy-btn-with-icon-black' btnWidth={66} />
                        )}
                    </div>
                    </div>
                    <div className="col-3" style={{marginLeft:0}}>
                        <div className="f-12">Ticket</div>
                        <div style={{marginTop:-10}}>
                            <span className="f-48 fw-6">{/* preparationProcess.ticketQuantity */ orderNumber }</span>
                            <svg className="-mt-2 ml-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#FF6063"/>
                            </svg>
                            <span className="fw-6 f-32 ml-1">{couponNumber}</span>
                        </div>
                    </div>
                    <div className="col text-end float-end row mt-3">
                        {/*<HapyButtonOnlyIcon2 classAddtionnal='mb-2 btn-border-orange bg-black-btn' handleClick={()=>props.handleOpenModal(<PreparationAllOrdersModal handleCloseModal={props.handleCloseModal}/>)}
                                             btnWidth={80} marginRight={12} iconComponent={<IconOrderAdd stroke={'white'}/>}
                                             isChecked={false}/>*/}
                        <HapyButtonOnlyIcon2 classAddtionnal="mb-2 bg-black-btn" handleClick={()=>props.handleOpenModal(<PreparationAllOrdersModal handleCloseModal={props.handleCloseModal}/>)}
                                             btnWidth={80} marginRight={12} iconComponent={<IconArchive stroke={'white'}/>}
                                             isChecked={false}/>
                        <HapyButtonOnlyIcon2 classAddtionnal='mb-2 btn-border-red bg-black-btn' handleClick={null}
                                             btnWidth={80} marginRight={12} iconComponent={<IconTrash stroke={'white'}/>}
                                             isChecked={false}/>
                        <HapyButtonOnlyIcon2 classAddtionnal='mb-2 btn-border-red bg-black-btn' handleClick={()=>navigate('/preparation/poste')}
                                             btnWidth={80} iconComponent={<IconLose stroke={'white'}/>}
                                             isChecked={false}/>

                    </div>
                    {/*<div className="col-md-4 col-lg-3 float-end row mt-3">
                        <div className="col-4">
                            <div className="fw-3 mb-1" style={{fontSize:8, marginLeft:15}}>Ticket</div>
                            <span className="fw-8">8</span>
                            <span style={{marginLeft:4}}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12.0701 8.95005C12.0301 8.95005 11.97 8.95005 11.92 8.95005C10.87 8.91005 10.04 8.06005 10.04 7.00005C10.04 5.92005 10.9101 5.05005 11.9901 5.05005C13.0701 5.05005 13.9401 5.93005 13.9401 7.00005C13.9501 8.06005 13.1201 8.92005 12.0701 8.95005Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9.25043 11.96C7.92043 12.85 7.92043 14.3 9.25043 15.19C10.7604 16.2 13.2404 16.2 14.7504 15.19C16.0804 14.3 16.0804 12.85 14.7504 11.96C13.2404 10.96 10.7704 10.96 9.25043 11.96Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div className="col-4">
                            <div className="fw-3 mb-1" style={{fontSize:8, marginLeft:15}}>Envoyé</div>
                            <span className="fw-8">14</span>
                            <span style={{marginLeft:4}}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4404 19.05L15.9604 20.57L19.0004 17.53" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44961 10.79 7.55961 8.84 7.55961 6.44C7.54961 3.99 9.53961 2 11.9896 2C14.4396 2 16.4296 3.99 16.4296 6.44C16.4296 8.84 14.5296 10.79 12.1596 10.87Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M11.99 21.8099C10.17 21.8099 8.36004 21.3499 6.98004 20.4299C4.56004 18.8099 4.56004 16.1699 6.98004 14.5599C9.73004 12.7199 14.24 12.7199 16.99 14.5599" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div className="col-4">
                            <div className="fw-3 mb-1" style={{fontSize:8, marginLeft:15}}>Couverts</div>
                            <span className="fw-7">24</span>
                            <span style={{marginLeft:4}}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.15957 10.87C9.05957 10.86 8.93957 10.86 8.82957 10.87C6.44957 10.79 4.55957 8.84 4.55957 6.44C4.55957 3.99 6.53957 2 8.99957 2C11.4496 2 13.4396 3.99 13.4396 6.44C13.4296 8.84 11.5396 10.79 9.15957 10.87Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.4103 4C18.3503 4 19.9103 5.57 19.9103 7.5C19.9103 9.39 18.4103 10.93 16.5403 11C16.4603 10.99 16.3703 10.99 16.2803 11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.15973 14.56C1.73973 16.18 1.73973 18.82 4.15973 20.43C6.90973 22.27 11.4197 22.27 14.1697 20.43C16.5897 18.81 16.5897 16.17 14.1697 14.56C11.4297 12.73 6.91973 12.73 4.15973 14.56Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </div>*/}
                    {/*<div className="text-center" style={{marginTop:-70}}>
                        <div className="f-12">Tickets</div>
                        <div className="f-48 fw-6 -mt-1">5</div>
                    </div>
                    <div className="text-center ml-3" style={{marginTop:-50}}>
                        <span className="ml-3 mr-1">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#FF6063"/>
                                </svg>
                            </span>
                        <span className="fw-5" style={{color:'#FF6063'}}>2</span>
                    </div>*/}
                </div>
            </div>
        </div>
    )
}
export default Preparation_Top
