import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import HapyMobileTop from "../../components/HapyMobileTop";
import {CommandProcessModel, Coupon, Order, SimpleCommand} from "../../globals/models/models";
import {getAdminProcessValues, handleSendNotification, setProcessStored} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import {CookingStation} from "../../globals/models/Inscription.models";
import {homeProcessContext} from "../HomeContainer";

function Command04_ValidationProgress(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [commandList, setCommandList] = useState<SimpleCommand[]>(commandProcess.allCommands.filter(elt => elt.status == "choosed"));
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectCommand = (indexOnListCommand: number) => {
        let arr:SimpleCommand[] = [...commandList] ;
        arr[indexOnListCommand].isValidated = !arr[indexOnListCommand].isValidated ;
        setCommandList(arr) ;
    } ;

    const handleValidateAll = (e) => { // Send to socket and DB here
        e.preventDefault() ;
        let temp = commandProcess ;
        let allCommands:SimpleCommand[] = [...temp.allCommands] ;
        temp.allCommands = [] ;
        temp.allCommands = commandList.concat(allCommands.filter(elt => elt.status != "choosed")) ;
        // console.log(temp.allCommands) ;
        // Send to socket and DB here, and after success =>
        handleSendNotification('commandToValidate',
                temp.institution?.id || '63c8822d7d3a52696de7ac30',
                temp.table.id,
                temp.table.tableNumber,
                temp.table?.zone?.name || 'Zone Non Mise dans le type de la BD',
                JSON.stringify(temp.allCommands.filter(command => command.isValidated && command.status == "choosed")),
                getAdminProcessValues("authToken"),
                (response)=>{
                    temp.totalPrice = 0 ;
                    temp.allCommands.forEach(command => {
                        if (command.isValidated) {
                            // command.status = "sendToCDR" ;
                            temp.totalPrice += command.price ;
                        }
                    }) ;
                    temp.totalPrice += temp.tips ;
                    setCommandProcess(temp) ;
                    setProcessStored('commandProcess', temp) ;
                    navigate('/command/validated') ;
                },
            (error)=>{
                addNotification({
                    title: 'Erreur lors de la validation de la Commande',
                    subtitle: 'Table ' + temp.table.tableNumber,
                    message: "Veuillez Ressayer...",
                    theme: 'red',
                    native: true // when using native, your OS will handle theming.
                });
            },

            ) ;
        // createOrder() ;
    } ;

    const createOrder = () => {
        let temp = {...commandProcess} ;
        let order: Order = new Order() ;
        order.notificationID = "OIJF654654644JLFL" ;
        order.insitutionID = temp.institution.id;
        order.tableID = temp.table.id ;
        order.tableNumber = temp.table.tableNumber ;
        order.tableZoneName = temp.table.zone.name || 'zone name' ;
        order.isFoodReady = false ;
        order.createdAt = new Date() ;
        order.startTime = new Date().getHours() + ':' + new Date().getMinutes() ;
        order.status = "waiting" ;
        order.totalCost = 0 ;
        order.coupons = [] ;
        temp.allCommands.filter(command => command.isValidated && command.status == "choosed")
            .forEach((command:SimpleCommand) => {
                let coupon:Coupon = new Coupon() ;
                coupon.insitutionID = temp.institution.id ;
                coupon.tableID = temp.table.id ;
                coupon.tableNumber = temp.table.tableNumber ;
                coupon.tableZoneName = temp.table.zone.name || 'zone name' ;
                coupon.product = command.product ;
                coupon.productVariant = command.productVariant ;
                coupon.cookingStation = new CookingStation() ;
                coupon.cookingStation.name = command.product.cookingStation ;
                coupon.isPregnant = command.isPregnant ;
                coupon.price = command.price ;
                coupon.ingredientsModifiablesStates = command.ingredientsModifiablesStates ;
                order.totalCost += coupon.price ;
                order.coupons.push(coupon) ;
            }) ;
        console.log("New Order => ") ;
        console.log(order) ;
        exportData(order) ;
    } ;

    const exportData = (data) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download =  "order.json";

        link.click();
    };

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                           title="Votre commande"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <br/>
                {commandList?.filter(command => command.isValidated).map((command:SimpleCommand, index) => (
                    <>
                        {/*<p className="f-20">{command.productVariant}</p>*/}
                        <div className="row pl-1" key={index}>
                            <div className="form-check">
                                <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15, marginTop:command.isPregnant ? 25 : 3}} type="checkbox"
                                       checked={command.isValidated} onChange={()=>handleSelectCommand(commandList.findIndex((elt)=>elt == command))}/>
                                <label className="form-check-label col ml-2" style={{width:290}}>
                                    {command.isPregnant && (<> <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/> </>)}
                                {/*<span className="row">
                                    <span className="col-1">2 x </span>
                                    <span className="col-10"> Salade de fruits - Fruits rouges des bois</span>
                                    <br/>
                                </span>*/}
                                    {command?.product?.name || "Product 1"} - {command?.productVariant?.name} <br/>
                                    <span style={{fontSize:12}}>
                                        {command.ingredientsModifiablesStates.map(ingredient => (
                                            <>{ingredient} <br/></>
                                        ))}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <br/>
                    </>
                    )
                )}

                {/*<div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label col ml-2" style={{width:310}}>
                            <h6>1 x Bière blonde - 50 cl
                            </h6>
                        </label>
                    </div>
                </div>*/}
                <hr className="mt-4 mb-4"/>
                {commandList?.filter(command => !command.isValidated).map((command:SimpleCommand, index) => (
                        <>
                            {/*<p className="f-20">{command.productVariant}</p>*/}
                            <div className="row pl-1" key={index}  style={{opacity:0.32}}>
                                <div className="form-check">
                                    <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15, marginTop:command.isPregnant ? 25 : 3}} type="checkbox"
                                           checked={command.isValidated} onChange={()=>{handleSelectCommand(commandList.findIndex((elt)=>elt == command))}}/>
                                    <label className="form-check-label col ml-2" style={{width:290}}>
                                        {command.isPregnant && (<> <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/> </>)}
                                        {/*<span className="row">
                                    <span className="col-1">2 x </span>
                                    <span className="col-10"> Salade de fruits - Fruits rouges des bois</span>
                                    <br/>
                                </span>*/}
                                        {command?.product?.name || "Product 1"} - {command?.productVariant?.name} <br/>
                                        <span style={{fontSize:12}}>
                                            {command.ingredientsModifiablesStates.map(ingredient => (
                                                <>{ingredient} <br/></>
                                            ))}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <br/>
                        </>
                    )
                )}
                {/*<div className="row pl-1 row">
                    <div className="form-check" style={{opacity:0.32}}>
                        <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={false} onChange={()=>{}}/>
                        <label className="form-check-label col ml-2">
                            <span style={{fontSize:12}} className="text-blue">Enceinte</span>
                            <h6>2 x Burger Chèvre bacon <br/>
                                <span style={{fontSize:12}}>Saignant</span>
                            </h6>
                        </label>
                    </div>
                </div>*/}
                {commandList.some(elt => elt.isValidated) && (
                    <div className="text-center inner-button-container-validate-btn">
                        <IconArrowDown width={32} height={32} stroke={'black'} styleIcon={{marginTop:-30}} />
                        <div className="horizontal-center">
                            <HapyButtonWithIcon text="Valider votre commande" handleClick={handleValidateAll}
                                                btnWidth={350}
                                                iconComponent={<IconVerify width={32} height={32} stroke={'#323232'}/>}/>
                        </div>
                    </div>
                ) }
            </div>
        </>
    )
}
export default Command04_ValidationProgress
