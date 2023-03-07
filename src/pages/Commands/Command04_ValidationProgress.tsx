import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import HapyMobileTop from "../../components/HapyMobileTop";
import {CommandProcessModel, SimpleCommand} from "../../globals/models/models";
import {
    getAdminProcessValues,
    handleSendNotification,
    setProcessStored,
    updateTable
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
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
        // Send to socket and DB here, and after success =>
        allCommands.forEach( command => {
            // Check if product and productVariant are stringified
            if (typeof command.product == "string") {
                command.product = JSON.parse(command.product) ;
            }
            if (typeof command.productVariant == "string") {
                command.productVariant = JSON.parse(command.productVariant) ;
            }
        })
        handleSendNotification('commandToValidate',
            temp.institution?.id || '63d93d76c39535d0734a01e7',
            temp.table.id,
            temp.table.tableNumber,
            temp.table.zoneName || 'Zone Inconnue',
            JSON.stringify(temp.allCommands.filter(command => command.isValidated && command.status == "choosed")),
            getAdminProcessValues("authToken"),
            (response)=>{
                let temp = {...commandProcess} ;
                temp.totalPrice = 0 ;
                temp.allCommands.forEach(command => {
                    if (command.isValidated) {
                        command.status = "sendToCDR" ;
                        temp.totalPrice += command.price ;
                    }
                }) ;
                temp.totalPrice += temp?.tips || 0 ;
                setCommandProcess(temp) ;
                updateTable(temp) ;
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
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <br/>
                {commandList?.filter(command => command.isValidated).map((command:SimpleCommand, index) => (
                        <>
                            {/*<p className="f-20">{command.productVariant}</p>*/}
                            <div className="row pl-1" key={index}>
                                <div className="form-check col-1">
                                    <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginTop:command.isPregnant ? 25 : 3}} type="checkbox"
                                           checked={command.isValidated} onChange={()=>handleSelectCommand(commandList.findIndex((elt)=>elt == command))}/>
                                </div>
                                <label className="form-check-label col ml-2" style={{width:290}}>
                                    {command.isPregnant && (<> <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/> </>)}
                                    {command?.product?.name || "Product 1"} - {command?.productVariant?.name} <br/>
                                    <span style={{fontSize:12}}>
                                    {command.ingredientsModifiablesStates.map(ingredient => (
                                        <>{ingredient} <br/></>
                                    ))}
                                </span>
                                </label>
                            </div>
                            <br/>
                        </>
                    )
                )}
                <hr className="mt-4 mb-4"/>
                {commandList?.filter(command => !command.isValidated).map((command:SimpleCommand, index) => (
                        <>
                            {/*<p className="f-20">{command.productVariant}</p>*/}
                            <div className="row pl-1" key={index}  style={{opacity:0.32}}>
                                <div className="form-check col-1">
                                    <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15, marginTop:command.isPregnant ? 25 : 3}} type="checkbox"
                                           checked={command.isValidated} onChange={()=>{handleSelectCommand(commandList.findIndex((elt)=>elt == command))}}/>
                                </div>
                                <label className="form-check-label col" style={{width:290, marginLeft:32 }}>
                                    {command.isPregnant && (<> <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/> </>)}
                                    {command?.product?.name || "Product 1"} - {command?.productVariant?.name} <br/>
                                    <span style={{fontSize:12}}>
                                        {command.ingredientsModifiablesStates.map(ingredient => (
                                            <>{ingredient} <br/></>
                                        ))}
                                    </span>
                                </label>
                            </div>
                            <br/>
                        </>
                    )
                )}

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
