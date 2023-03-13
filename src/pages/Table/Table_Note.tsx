import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconPayCard from "../../globals/icons-components/IconPayCard";
import IconPayMoney from "../../globals/icons-components/IconPayMoney";
import IconPayTicket from "../../globals/icons-components/IconPayTicket";
import IconPayVacance from "../../globals/icons-components/IconPayVacance";
import HapyButtonOnlyIcon2 from "../../components/HapyButtonOnlyIcon2";
import IconSeparation from "../../globals/icons-components/IconSeparation";
import IconReduction from "../../globals/icons-components/IconReduction";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyInput from "../../components/HapyInput";
import IconAdd from "../../globals/icons-components/IconAdd";
import {
    CommandProcessModel,
    HomeProcessModel,
    Order,
    SimpleCommand,
    Table,
    TicketPayed
} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {
    API_REQUEST_TABLE, API_REQUEST_TICKET_PAYED,
    getAdminProcessValues,
    postRequest,
    putRequest,
    setProcessStored
} from "../../globals/GlobalVariables";
import {ICONS} from "../../globals/Icons-svg";
import HapyButtonOnlyIcon3 from "../../components/HapyButtonOnlyIcon3";

function Table_Note(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [applyReduction, setApplyReduction] = useState(false);
    const [divideNote, setDivideNote] = useState(false);
    const navigate = useNavigate();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const [reducType, setReducType] = useState<'montant' | 'pourcent'>('montant');
    const [reducValue, setReducValue] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<'carteBleu' | 'money' | 'ticket' | 'other'>('carteBleu');
    const [listReglement, setListReglement] = useState<{number:number, value: number, paymentMethod: 'carteBleu' | 'money' | 'ticket' | 'other'}[]>([]);
    const [reglement, setReglement] = useState<{number:number, value: string, paymentMethod: 'carteBleu' | 'money' | 'ticket' | 'other'}>(null);
    const [updateReglement, setUpdateReglement] = useState<{update: boolean, indexOnListReglement: number}>({update: false, indexOnListReglement: null});
    const [moneyLeft, setMoneyLeft] = useState<number>(commandProcess?.totalPrice || 0);
    const [showValidateBtn, setShowValidateBtn] = useState<boolean>(false);

    useEffect(()=> {

    }, []) ;

    const addReduc = () => {
        setApplyReduction(true) ;
    } ;

    const handleValidateReduc = () => {
        if ((reducType == "pourcent" && parseFloat(reducValue) >= 100) || (parseFloat(reducValue) > commandProcess.totalPrice)) {
            showErrorFunction('Veuillez revoir la valeur de la reduction') ;
        } else {
            setApplyReduction(false) ;
            if (reducType == "montant") {
                setMoneyLeft(commandProcess?.totalPrice - parseFloat(reducValue)) ;
            } else {
                let valueToReduce = (commandProcess?.totalPrice*parseFloat(reducValue)) / 100 ;
                setMoneyLeft(commandProcess.totalPrice - valueToReduce) ;
            }
        }
    } ;

    const addReglement = () => {
        if (moneyLeft > 0) {
            setReglement({number:listReglement.length + 1, value:'', paymentMethod:"carteBleu"}) ;
            setDivideNote(true) ;
        }
    } ;

    const editReglement = (reglement:any, index:number) => {
        setReglement(reglement) ;
        setPaymentMethod(reglement.paymentMethod) ;
        setUpdateReglement({update:true, indexOnListReglement:index})
    } ;

    const handleValidateSeparation = () => {
        let temp = [...listReglement] ;
        if (updateReglement.update) {
            temp[updateReglement.indexOnListReglement] = {...reglement, value:parseFloat(reglement.value) || 0, paymentMethod:paymentMethod}
            setReglement({number:reglement.number + 1, value:'', paymentMethod:"carteBleu"}) ;
        } else if (moneyLeft > 0) {
            temp.push({...reglement, value:parseFloat(reglement.value) || 0, paymentMethod:paymentMethod}) ;
            setReglement({number:reglement.number + 1, value:'', paymentMethod:"carteBleu"}) ;
        }
        setListReglement(temp) ;
        setUpdateReglement({update:false, indexOnListReglement:null}) ;
        setMoneyLeft(getMoneyLeft(temp)) ;

        // setDivideNote(false) ;
    } ;

    const  getMoneyLeft = (listReglement) => {
        let moneyLeft = commandProcess?.totalPrice ;
        if (reducValue != '') {
            let value ;
            if (typeof reducValue == "string") value = parseFloat(reducValue) ;
            else value = reducValue ;
            if (reducType == "montant") {
                moneyLeft = commandProcess?.totalPrice - value ;
            } else {
                let valueToReduce = (commandProcess?.totalPrice*value) / 100 ;
                moneyLeft = commandProcess.totalPrice - valueToReduce ;
            }
        }
        if (listReglement && listReglement.length > 0) {
            listReglement?.forEach((reglement) => {
                if (typeof reglement.value == "string") reglement.value = parseFloat(reglement.value) ;
                moneyLeft -= reglement.value ;
            }) ;
        }
        if (moneyLeft <= 0) {
            moneyLeft = 0 ;
            setShowValidateBtn(true) ;
        }
        return moneyLeft ;
    }

    const showErrorFunction = (errorMessage: string, color: 'text-success' | 'text-danger' = "text-danger", timeout: number = 10000) => {
        setErrorMessageColor(color);
        setErrorMessage(errorMessage);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, timeout);
    };

    const handleNoReduction = () =>{
        setMoneyLeft(commandProcess.totalPrice) ;
        setReducValue('') ;
        setApplyReduction(false) ;
    } ;

    const handleValidateTable = () => {
        if (commandProcess?.allCommands && commandProcess?.allCommands?.length > 0) {
            showErrorFunction("Validation de la table...", "text-success", 10000);
            createTicketPayed();
        } else {
            showErrorFunction("Aucune commande en cours, veuillez ajouter des produits !", "text-danger", 5000);
        }
        /*putRequest(API_REQUEST_TABLE + '/update', homeProcess.tableDetail.id, {status: 'payed'},
            ()=> {navigate('/table-close')},
            ()=>{showErrorFunction("Echec de la Fermeture, Veuillez ressayer !")}) ;*/
    } ;

    const createTicketPayed = () => {
        let ticketPayed: TicketPayed = new TicketPayed() ;
        ticketPayed.tableId = commandProcess.table.id ;
        ticketPayed.totalPayed = commandProcess.totalPrice ;
        ticketPayed.orderId = '' ;
        ticketPayed.teamMemberId = getAdminProcessValues("userLogged").id ;
        ticketPayed.day = '' ;
        ticketPayed.dayNumber = new Date().getDay() ;
        ticketPayed.time = new Date().getHours() + ':' + new Date().getMinutes() ;
        ticketPayed.morningOrEvening = ticketPayed.time <= '12:00' ? 'morning' : 'evening' ;
        ticketPayed.tableOpenTime = commandProcess.openingTime ;
        ticketPayed.tableCloseTime = ticketPayed.time ;
        ticketPayed.totalTips = commandProcess?.tips || 0 ;
        ticketPayed.tableZoneName = commandProcess.table.zoneName ;
        ticketPayed.numberOfPerson = commandProcess.numberOfPerson ;
        ticketPayed.reductionType = reducValue == '' ? "none" : reducType ;
        ticketPayed.reductionValue = reducValue == '' ? 0 : parseFloat(reducValue) ;
        ticketPayed.isMultipleReglements = listReglement.length > 1 ;
        ticketPayed.uniqueReglement = reglement ;
        ticketPayed.listReglement = listReglement ;
        ticketPayed.institutionId = getAdminProcessValues("userLogged").institution.id ;
        ticketPayed.sendNoteEmail = commandProcess?.sendNoteEmail ;
        ticketPayed.sendNoteWithDetail = commandProcess?.sendNoteWithDetail ;
        ticketPayed.allCommands = commandProcess?.allCommands || [] ;
        ticketPayed?.allCommands?.forEach((command) => {
            // check if the command.product and variant is not stringified and stringify it
            if (typeof command.product != 'string') {
                command.product = JSON.stringify(command.product) ;
            }
            if (typeof command.productVariant != 'string') {
                command.productVariant = JSON.stringify(command.productVariant) ;
            }
        }) ;
        // exportData(ticketPayed) ;
        saveTicketPayedToDB(ticketPayed) ;
    } ;

    const saveTicketPayedToDB = (ticketPayed: TicketPayed) => {
        // navigate('/table-close') ;
        postRequest(API_REQUEST_TICKET_PAYED, ticketPayed,
            (res) => {navigate('/table-close')},
            (err) => {showErrorFunction("Echec de la Fermeture, Veuillez ressayer !")})
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
                           subtitleStart={getAdminProcessValues("userLogged").firstName}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged").lastName}
                           title="Régler la table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/table-opened')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom pb-4">
                <div className="row f-32 fw-5">
                    <span className="col">Table {homeProcess?.tableDetail?.tableNumber}</span>
                    <div className="col text-end">
                        <span className="text-red-orange">{commandProcess?.totalPrice}</span> €
                    </div>
                </div>
                <div className="row">
                    <span className="col-9 f-20 fw-4">{homeProcess?.tableDetail?.zoneName || 'Zone Inconnue'}</span>
                    <div className="col-3 text-end">
                        {commandProcess.tips && (<>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.16691 1.63338C7.62691 1.24005 8.38025 1.24005 8.84691 1.63338L9.90025 2.54005C10.1002 2.71338 10.4736 2.85338 10.7402 2.85338H11.8736C12.5802 2.85338 13.1602 3.43338 13.1602 4.14005V5.27338C13.1602 5.53338 13.3002 5.91338 13.4736 6.11338L14.3802 7.16671C14.7736 7.62671 14.7736 8.38005 14.3802 8.84671L13.4736 9.90005C13.3002 10.1 13.1602 10.4734 13.1602 10.74V11.8734C13.1602 12.58 12.5802 13.16 11.8736 13.16H10.7402C10.4802 13.16 10.1002 13.3 9.90025 13.4734L8.84691 14.38C8.38691 14.7734 7.63358 14.7734 7.16691 14.38L6.11358 13.4734C5.91358 13.3 5.54025 13.16 5.27358 13.16H4.12025C3.41358 13.16 2.83358 12.58 2.83358 11.8734V10.7334C2.83358 10.4734 2.69358 10.1 2.52691 9.90005L1.62691 8.84005C1.24025 8.38005 1.24025 7.63338 1.62691 7.17338L2.52691 6.11338C2.69358 5.91338 2.83358 5.54005 2.83358 5.28005V4.13338C2.83358 3.42671 3.41358 2.84671 4.12025 2.84671H5.27358C5.53358 2.84671 5.91358 2.70671 6.11358 2.53338L7.16691 1.63338Z" fill="#FF6063"/>
                                <path d="M5.58691 8.00005L7.19358 9.61339L10.4136 6.38672" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-red-orange ml-1">{commandProcess.tips}</span> €</>)}
                    </div>
                </div>
                <br/>
                <div className="ticket-container">
                    <div className="text-center">
                        <span>{commandProcess?.table?.institution?.name}</span> <br/>
                        <span>{commandProcess?.table?.institution?.postalAddress}</span> <br/>
                        <span>{commandProcess?.table?.institution?.city}</span>
                        <br/><br/>
                        <span>Table {commandProcess?.table?.tableNumber}</span> <br/>
                        <span className="fw-3">Ouverte à {commandProcess?.openingTime}</span>
                    </div>
                    <br/>
                    <div>
                        {commandProcess?.allCommands?.filter(command => command.status == "sendToCDR").map((command:SimpleCommand, index:number) => (
                            <div className="row">
                                <span className="col" style={{fontSize:14}}>{command.productVariant.name}</span>
                                <span className="col text-end">{command.price} €</span>
                            </div>
                        ))}
                        {commandProcess?.tips && (
                            <div className="row mt-1 fw-3">
                                <span className="col">Tips</span>
                                <span className="col text-end">{commandProcess.tips} €</span>
                            </div>
                        )}
                    </div>
                    <br/>
                    <hr style={{borderWidth:2}}/>
                    <div className="row">
                        <span className="col">Total</span>
                        <span className="col text-end">{moneyLeft} €</span>
                    </div>
                    {(reducValue && reducValue != '') && (
                        <div className="row mt-1 fw-3">
                            <span className="col">Réduction</span>
                            {reducType == "montant" ? (
                                <span className="col text-end">-{reducValue} €</span> ) : (
                                <span className="col text-end">{reducValue} %</span>
                            )}

                        </div>
                    )}
                    <hr style={{borderWidth:2}}/>
                </div>
                <div className="mt-4 mb-4">
                    { applyReduction ? (
                        <div>
                            <span onClick={()=>handleNoReduction()} className="mt-2 mb-2"><IconArrowLeft/> Pas de Reduction</span>
                            <br/>
                            <span className="fw-5 mt-2">Appliquer une réduction</span>
                            <div className="row mt-3">
                                <div className="col-6"> <HapyButtonOnlyIcon2 handleClick={()=>setReducType('montant')} iconComponent={ICONS.reducMontant} isChecked={reducType == "montant"} fillColor={"#FF6063"}/> </div>
                                <div className="col-6"> <HapyButtonOnlyIcon2 handleClick={()=>setReducType('pourcent')} iconComponent={ICONS.reducPourcent} isChecked={reducType == "pourcent"} fillColor={"#FF6063"}/></div>
                            </div>
                            <div className="mt-2 row pl-1 pr-1">
                                <HapyInput inputName={'reduction'} label={''} inputType={'number'} placeholder={'% / €'} inputValue={reducValue}
                                          inputWidth={272} handleChange={(e)=>setReducValue(e.target.value)}/>
                                <HapyButtonOnlyIcon2 marginLeft={12} btnWidth={64} fillColor={'#FF6063'} handleClick={handleValidateReduc} iconComponent={<IconVerify/>} isChecked={false}/>
                            </div>
                            <br/>
                        </div>
                    ) : (
                        <HapyButtonWithIcon text={reducValue ? "Modifier la réduction" : "Appliquer une réduction"} handleClick={addReduc} iconComponent={<IconReduction/>} />
                    )}
                </div>
                { divideNote ? (
                    <>
                        <span className="fw-5">{reglement.number}e Réglement</span>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('carteBleu')} iconComponent={<IconPayCard/>} isChecked={paymentMethod == "carteBleu"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod("money")} iconComponent={<IconPayMoney/>} isChecked={paymentMethod == "money"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('ticket')} iconComponent={<IconPayTicket/>} isChecked={paymentMethod == "ticket"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('other')} iconComponent={<IconAdd/>} isChecked={paymentMethod == "other"}/></div>
                        </div>
                        <br/>
                        <HapyInput inputName={'value'} label={''} inputType={'number'} placeholder={'Montant'} inputValue={reglement.value} handleChange={(e)=>setReglement({...reglement, value:e.target.value})}/>
                        <br/><br/>
                        <HapyButtonWithIcon text={updateReglement.update ? 'Modifier la séparation' : 'Ajouter une séparation'} handleClick={handleValidateSeparation} iconComponent={<IconAdd/>}/>
                        <br/> <br/>
                        <div>
                            <span className="text-red-orange">{moneyLeft} €</span>
                            <span> restant</span>
                        </div>
                        <br/>
                        {listReglement?.map((item, index) => (
                            <div key={index} onClick={()=>editReglement(item, index)}>
                                <span>{item.number} st </span>
                                <span>
                                    {item.paymentMethod == "carteBleu" && (<IconPayCard stroke={'#FF6063'} styleIcon={{width:32}}/>)}
                                    {item.paymentMethod == "money" && (<IconPayMoney stroke={'#FF6063'} styleIcon={{width:32}}/>)}
                                    {item.paymentMethod == "ticket" && (<IconPayTicket stroke={'#FF6063'} styleIcon={{width:32}}/>)}
                                    {item.paymentMethod == "other" && (<IconAdd stroke={'#FF6063'} styleIcon={{width:32}}/>)}
                                </span>
                                <span> {item.value} €</span>
                            </div>
                        ))}
                        <br/>
                        {showError && (<div className={"mt-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                        <br/>
                        <div style={{opacity:showValidateBtn ? 1 : 0.32}}>
                            <HapyButtonWithIcon text="Marquer comme payée" handleClick={showValidateBtn ? handleValidateTable : null} iconComponent={<IconVerify/>}/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mt-2 mb-4">
                            <HapyButtonWithIcon text="Séparer la note" handleClick={addReglement} iconComponent={<IconSeparation/>} />
                        </div>
                        <span className="fw-5">Moyen de paiement</span>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('carteBleu')} iconComponent={<IconPayCard/>} isChecked={paymentMethod == "carteBleu"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod("money")} iconComponent={<IconPayMoney/>} isChecked={paymentMethod == "money"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('ticket')} iconComponent={<IconPayTicket/>} isChecked={paymentMethod == "ticket"}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon3 fillColor={'#FF6063'} handleClick={()=>setPaymentMethod('other')} iconComponent={<IconAdd/>} isChecked={paymentMethod == "other"}/></div>
                        </div>
                        {showError && (<div className={"mt-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                        <br/>
                        <HapyButtonWithIcon text="Marquer comme payée" handleClick={handleValidateTable} iconComponent={<IconVerify/>} />
                        <br/>
                    </>
                )}
            </div>
        </>
    )
}
export default Table_Note
