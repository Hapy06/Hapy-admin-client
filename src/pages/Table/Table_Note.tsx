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
import {CommandProcessModel, HomeProcessModel, SimpleCommand} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {API_REQUEST_TABLE, putRequest, setProcessStored} from "../../globals/GlobalVariables";

function Table_Note(props) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [applyReduction, setApplyReduction] = useState(false);
    const [divideNote, setDivideNote] = useState(false);
    const navigate = useNavigate();
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');

    useEffect(()=> {
        let temp = commandProcess ;
        temp.totalPrice = 0 ;
        temp.allCommands?.forEach(command => {
            if (command.status == "sendToCDR") {
                temp.totalPrice += command.price ;
            }
        }) ;
        temp.totalPrice += temp.tips || 0 ;
        setCommandProcess(temp) ;
        console.log(temp) ;
        setProcessStored('commandProcess', temp) ;
    }, []) ;

    const handleCloseTable = () => {
        showErrorFunction("Fermeture de la table...", "text-success", 10000) ;
        putRequest(API_REQUEST_TABLE + '/update', homeProcess.tableDetail.id, {status: 'close'},
            ()=> {navigate('/table-close')},
            ()=>{showErrorFunction("Echec de la Fermeture, Veuillez ressayer !")}) ;
    } ;

    const showErrorFunction = (errorMessage: string, color: 'text-success' | 'text-danger' = "text-danger", timeout: number = 2000) => {
        setErrorMessageColor(color);
        setErrorMessage(errorMessage);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, timeout);
    };


    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart="Quentin"
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd="LELOUCHE"
                           title="Régler la table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/table-opened')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom pb-4">
                <div className="row f-32 fw-5">
                    <span className="col">Table {homeProcess.tableDetail.tableNumber}</span>
                    <div className="col text-end">
                        <span className="text-red-orange">{commandProcess.totalPrice}</span> €
                    </div>
                </div>
                <div className="row">
                    <span className="col-9 f-20 fw-4">{homeProcess.tableDetail?.zoneName || 'Zone Inconnue'}</span>
                    <div className="col-3 text-end">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.16691 1.63338C7.62691 1.24005 8.38025 1.24005 8.84691 1.63338L9.90025 2.54005C10.1002 2.71338 10.4736 2.85338 10.7402 2.85338H11.8736C12.5802 2.85338 13.1602 3.43338 13.1602 4.14005V5.27338C13.1602 5.53338 13.3002 5.91338 13.4736 6.11338L14.3802 7.16671C14.7736 7.62671 14.7736 8.38005 14.3802 8.84671L13.4736 9.90005C13.3002 10.1 13.1602 10.4734 13.1602 10.74V11.8734C13.1602 12.58 12.5802 13.16 11.8736 13.16H10.7402C10.4802 13.16 10.1002 13.3 9.90025 13.4734L8.84691 14.38C8.38691 14.7734 7.63358 14.7734 7.16691 14.38L6.11358 13.4734C5.91358 13.3 5.54025 13.16 5.27358 13.16H4.12025C3.41358 13.16 2.83358 12.58 2.83358 11.8734V10.7334C2.83358 10.4734 2.69358 10.1 2.52691 9.90005L1.62691 8.84005C1.24025 8.38005 1.24025 7.63338 1.62691 7.17338L2.52691 6.11338C2.69358 5.91338 2.83358 5.54005 2.83358 5.28005V4.13338C2.83358 3.42671 3.41358 2.84671 4.12025 2.84671H5.27358C5.53358 2.84671 5.91358 2.70671 6.11358 2.53338L7.16691 1.63338Z" fill="#FF6063"/>
                            <path d="M5.58691 8.00005L7.19358 9.61339L10.4136 6.38672" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-red-orange ml-1">1</span> €
                    </div>
                </div>
                <br/>
                <div className="ticket-container">
                    <div className="text-center">
                        <span>{commandProcess.table.institution.name}</span> <br/>
                        <span>{commandProcess.table.institution.postalAddress}</span> <br/>
                        <span>{commandProcess.table.institution.city}</span>
                        <br/><br/>
                        <span>Table {commandProcess.table.tableNumber}</span> <br/>
                        <span className="fw-3">Ouverte à {commandProcess.openingTime}</span>
                    </div>
                    <br/>
                    <div>
                        {commandProcess?.allCommands?.filter(command => command.status == "sendToCDR").map((command:SimpleCommand, index:number) => (
                            <div className="row">
                                <span className="col">{command.productVariant.name}</span>
                                <span className="col text-end">{command.price} €</span>
                            </div>
                        ))}
                        {commandProcess.tips && (
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
                        <span className="col text-end">{commandProcess?.totalPrice} €</span>
                    </div>
                    {commandProcess.reduction && (
                        <div className="row mt-1 fw-3">
                            <span className="col">Réduction</span>
                            <span className="col text-end">-{commandProcess?.reduction} €</span>
                        </div>
                    )}
                    <hr style={{borderWidth:2}}/>
                </div>
                <div className="mt-2 mb-2">
                    { applyReduction ? (
                        <div>
                            <span onClick={()=>setApplyReduction(false)} className="mt-2 mb-2"><IconArrowLeft/> Pas de Reduction</span>
                            <br/>
                            <span className="fw-5 mt-2">Appliquer une réduction</span>
                            <div className="row mt-3">
                                <div className="col-6"> <HapyButtonOnlyIcon2 handleClick={null} iconComponent={<IconVerify/>} isChecked={true} fillColor={"#FF6063"}/> </div>
                                <div className="col-6"> <HapyButtonOnlyIcon2 handleClick={null} iconComponent={<IconVerify/>} isChecked={false} fillColor={"#FF6063"}/></div>
                            </div>
                            <div className="mt-2"><HapyInput inputName={'reduction'} label={''} inputType={'number'} placeholder={'% / €'} inputValue={null}
                                          handleChange={null}/>
                            </div>
                            <br/>
                        </div>
                    ) : (
                        <HapyButtonWithIcon text="Appliquer une réduction" handleClick={()=>{setApplyReduction(true)}} iconComponent={<IconReduction/>} />
                    )}
                </div>
                { divideNote ? (
                    <>
                        <span className="fw-5">2e Réglement</span>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayCard/>} isChecked={true}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayMoney/>} isChecked={false}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayTicket/>} isChecked={false}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayVacance/>} isChecked={false}/></div>
                        </div>
                        <br/>
                        <HapyInput inputName={'value'} label={''} inputType={'number'} placeholder={'Montant'} inputValue={null} handleChange={null}/>
                        <br/>
                        <HapyButtonWithIcon text='Ajouter une séparation' handleClick={null} iconComponent={<IconAdd/>}/>
                        <br/> <br/>
                        <div>
                            <span className="text-red-orange">24 €</span>
                            <span> restant</span>
                        </div>
                        <br/>
                        <div>
                            <span>1 st </span>
                            <span><IconPayVacance width={32} height={32} stroke={'#FF6063'} styleIcon={{width:32}}/></span>
                            <span> restant</span>
                        </div>
                        <br/> <br/>
                        <div style={{opacity:0.32}}>
                            <HapyButtonWithIcon text="Marquer comme payée" handleClick={null} iconComponent={<IconVerify/>}/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mt-2 mb-2">
                            <HapyButtonWithIcon text="Séparer la note" handleClick={()=>{setDivideNote(true)}} iconComponent={<IconSeparation/>} />
                        </div>
                        <span className="fw-5">Moyen de paiement</span>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayCard/>} isChecked={true}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayMoney/>} isChecked={false}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayTicket/>} isChecked={false}/></div>
                            <div className="col-3"><HapyButtonOnlyIcon2 fillColor={'#FF6063'} handleClick={null} iconComponent={<IconPayVacance/>} isChecked={false}/></div>
                        </div>
                        {showError && (<div className={"mt-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                        <br/>
                        <HapyButtonWithIcon text="Marquer comme payée" handleClick={handleCloseTable} iconComponent={<IconVerify/>} />
                        <br/> <br/>
                    </>
                )}
            </div>
        </>
    )
}
export default Table_Note
