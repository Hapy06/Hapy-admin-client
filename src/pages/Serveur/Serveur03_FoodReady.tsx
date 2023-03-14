import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconOrder from "../../globals/icons-components/IconOrder";
import HapyMobileTop from "../../components/HapyMobileTop";
import {Coupon, Order, ServeurProcessModel, SimpleCommand} from "../../globals/models/models";
import {serveurProcessContext} from "./ServeurContainer";
import {API_REQUEST_NOTIFICATION, getAdminProcessValues, putRequest} from "../../globals/GlobalVariables";
import {format} from "date-fns";
import addNotification from "react-push-notification";

function Serveur03_FoodReady(props) {
    const {serveurProcess, setServeurProcess} = useContext<{serveurProcess:ServeurProcessModel, setServeurProcess: any}>(serveurProcessContext) ;
    const [coupons, setCoupons] = useState<Coupon[]>([]) ;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Check if JSON.parse(serveurProcess.notifDetail.content) is a array of coupons
        let temp = JSON.parse(serveurProcess.notifDetail.content) ;
        if (temp.length > 0) {
            setCoupons(temp) ;
        } else {
            let temp = [] ;
            temp.push( JSON.parse(serveurProcess?.notifDetail?.content) ) ;
            temp.shift() ;
            setCoupons(temp) ;
        }
        console.log(temp)
    }, []);

    const handleValidateNotif = () => {
        let temp = {...serveurProcess} ;
        temp.notifDetail.isDone = true ;
        temp.notifDetail.doneTime = new Date() + '' ;
        putRequest(API_REQUEST_NOTIFICATION + '/update', temp.notifDetail.id, temp.notifDetail,
            ()=> {
                addNotification({
                    title: 'Envoyé avec succèss',
                    subtitle: getAdminProcessValues("userLogged")?.fullName || "serveur Hâpy",
                    message: 'Demande Validée',
                    theme: 'light',
                    native: true // when using native, your OS will handle theming.
                });
                navigate('/home') ;
            },
            ()=> {
                addNotification({
                    title: 'Erreur lors de la Validation',
                    subtitle: '',
                    message: 'Veuillez Ressayez....',
                    theme: 'red',
                    native: true // when using native, your OS will handle theming.
                });
            })
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Servir la table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <br/>
                <h1 className="f-32 fw-6">Table {serveurProcess.notifDetail?.tableNumber}</h1>
                <p className="f-20">{serveurProcess.notifDetail?.tableZoneName}</p>
                <div className="text-center">
                    { serveurProcess.notifDetail?.askTime && (
                    <div className="text-center">{serveurProcess.notifDetail?.askTime}</div>
                )}</div>
                <br/>
                {coupons && coupons.length > 0 ? (
                    coupons?.map( (coupon:Coupon, index:number) => (
                        <div key={coupon.id || index} className="row fw-6 command-box">
                            <span className="col-2">{index + 1}</span>
                            <span className="col-10" style={{marginTop:-24}}>
                            {coupon.isPregnant && (<span className="text-red-orange" style={{fontSize:12, paddingTop:-50}}>Enceinte</span>)}
                                <br/>
                            <span>{coupon.product.name} - {coupon.productVariant.name}</span>
                            <br/>
                            <div style={{fontSize:12}}>
                                {coupon.ingredientsModifiablesStates.map(ingredient => (
                                    <span>{ingredient} <br/></span>
                                ))}
                            </div>
                        </span>
                        </div>
                    ))
                    ) : (
                    <div className="row fw-6" style={{marginLeft:20}}>

                    </div>
                )}
                <br/>
                <div className="horizontal-center inner-button-container-validate-btn mt-4" style={{position:"fixed"}}>
                        <HapyButtonWithIcon text="La commande est servie" handleClick={handleValidateNotif}
                                            btnWidth={350}
                                            iconComponent={<IconOrder/>}/>
                </div>
            </div>
        </>
    )
}
export default Serveur03_FoodReady
