import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconCloseSquare from "../../globals/icons-components/IconCloseSquare";
import IconChecked from "../../globals/icons-components/IconChecked";
import HapyMobileTop from "../../components/HapyMobileTop";
import {CDRProcessModel, Coupon, Order, SimpleCommand} from "../../globals/models/models";
import {cdrProcessContext} from "./ChefDeRangContainer";
import {
    API_REQUEST_NOTIFICATION, API_REQUEST_ORDER,
    deleteRequest,
    getAdminProcessValues,
    postRequest,
    setProcessStored
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import {format} from "date-fns";

function ChefDeRang02_TableListCommand(props) {
    const {cdrProcess, setCDRProcess} = useContext<{cdrProcess:CDRProcessModel, setCDRProcess: any}>(cdrProcessContext) ;
    const [listCommand, setListCommand] = useState<SimpleCommand[]>(JSON?.parse(cdrProcess?.notifDetail?.content) || []);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(cdrProcess.notifDetail) ;
        window.scrollTo(0, 0);
    }, []);

    const handleValidateCommand = () => {
        let temp = {...cdrProcess} ;
        let order: Order = new Order() ;
        order.tableNumberOfPerson = 1 ;
        order.notificationID = temp.notifDetail.id ;
        order.institutionId = temp.notifDetail.institutionID ;
        order.tableId = temp.notifDetail.tableID ;
        order.tableNumber = temp.notifDetail.tableNumber ;
        order.tableZoneName = temp.notifDetail.tableZoneName ;
        order.isFoodReady = false ;
        // order.createdAt = new Date() ;
        // order.startTime = new Date().getHours() + ':' + new Date().getMinutes() ;
        order.status = "waiting" ;
        order.isPregnant = false ;
        order.totalCost = 0 ;
        // order.savingDate = new Date().toLocaleDateString("en-CA") ;
        order.coupons = [] ;
        listCommand.forEach((command:SimpleCommand) => {
            let coupon:Coupon = new Coupon() ;
            coupon.insitutionID = temp.notifDetail.institutionID ;
            coupon.tableID = temp.notifDetail.tableID ;
            coupon.tableNumber = temp.notifDetail.tableNumber ;
            coupon.tableZoneName = temp.notifDetail.tableZoneName ;
            coupon.productId = command?.product.id ;
            coupon.productVariantId = command?.productVariant.id ;
            coupon.cookingStation = command?.product.cookingStation ;
            coupon.isPregnant = command?.isPregnant ;
            coupon.price = command?.price ;
            coupon.ingredientsModifiablesStates = command?.ingredientsModifiablesStates ;
            order.totalCost += coupon.price ;
            order.coupons.push(coupon) ;
        }) ;
        console.log("New Order => ") ;
        console.log(order) ;
        postRequest(API_REQUEST_ORDER + '/create', order,
            ()=> {
                // temp.listNotifs =
                // temp.listNotifs.filter(elt => elt.id != cdrProcess.notifDetail.id) ;
                temp.validationMessage = "La commande est envoyée en préparation !" ;
                setProcessStored("cdrProcess", temp) ;
                setCDRProcess(temp) ;
                addNotification({
                    title: 'Envoyé avec succès',
                    subtitle: getAdminProcessValues("userLogged")?.fullName || "chef de rang Hâpy",
                    message: 'Commande Validée',
                    theme: 'light',
                    native: true // when using native, your OS will handle theming.
                });
                navigate('/command-validated') ;
            },
            ()=> {
                addNotification({
                    title: 'Erreur lors de la Validation',
                    subtitle: '',
                    message: 'Veuillez Ressayez....',
                    theme: 'red',
                    native: true // when using native, your OS will handle theming.
                });
            },

            ) ;
        // navigate('/command-validated') ;
    } ;

    const handleDeleteNotif = () => {
        deleteRequest(API_REQUEST_NOTIFICATION + '/delete', cdrProcess.notifDetail.id,
            (response)=>{
                cdrProcess.validationMessage = "La Commande est supprimée !" ;
                // cdrProcess.listNotifs = cdrProcess.listNotifs.filter(elt => elt.id != cdrProcess.notifDetail.id) ;
                setProcessStored("cdrProcess", cdrProcess) ;
                navigate('/command-canceled') ;
            },
            (error)=>{
                addNotification({
                    title: 'Erreur lors de la suppression',
                    subtitle: "Commande de la Table " + cdrProcess.notifDetail.tableNumber,
                    message: 'Veuillez Ressayez...',
                    native: true // when using native, your OS will handle theming.
                });
            }) ;
    } ;

    const exportData = (data) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    };

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "chef de rang"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Commande"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={true}
                           hapyLogoBtnColor={"#FF6063"}
                           rightSideBtnIconComponent={<IconCloseSquare stroke={'white'} />}
                           rightSideBtnHandleClick={handleDeleteNotif}

            />
            <div className="happy-div-bottom">
                <br/>
                <h1 className="f-32 fw-6">Table {cdrProcess.notifDetail.tableNumber}</h1>
                <p className="f-20">{cdrProcess.notifDetail.tableZoneName}</p>
                {/*<div className="text-center">{format(new Date(cdrProcess.notifDetail.askTime), 'HH : mm') }</div>*/}
                <br/>
                {listCommand?.map((command:SimpleCommand, index:number) => (
                    <div key={command?.id || index} className="row fw-6 command-box">
                        <span className="col-2">{index + 1}</span>
                        <span className="col-10" style={{marginTop:-24}}>
                            {command?.isPregnant && (<span className="text-red-orange" style={{fontSize:12, paddingTop:-50}}>Enceinte</span>)}
                            <br/>
                            <span>{command?.product.name} - {command?.productVariant.name}</span>
                            <br/>
                            <div style={{fontSize:12}}>
                                {command?.ingredientsModifiablesStates.map(ingredient => (
                                    <span>{ingredient} <br/></span>
                                ))}
                            </div>
                        </span>
                    </div>
                ))}
                <br/>
                {/*<div className="row fw-6" style={{marginLeft:20}}>
                    <span className="col-2">1</span>
                    <span className="col-10">
                        <span>Bière blonde - 50 cl</span>
                    </span>
                </div>*/}
                <div className="horizontal-center inner-button-container-validate-btn">
                    <div className="validated-btn-container">
                        <HapyButtonWithIcon text="Valider la Commande" handleClick={handleValidateCommand}
                                            btnWidth={350}
                                            iconComponent={<IconChecked width={32} height={32}/>}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChefDeRang02_TableListCommand
