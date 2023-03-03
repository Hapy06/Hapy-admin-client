import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconChecked from "../../globals/icons-components/IconChecked";
import {serveurProcessContext} from "./ServeurContainer";
import {
    API_REQUEST_NOTIFICATION,
    deleteRequest,
    getAdminProcessValues,
    putRequest,
    setProcessStored
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import IconDemande from "../../globals/icons-components/IconDemande";
import {ICONS} from "../../globals/Icons-svg";
import {ServeurProcessModel} from "../../globals/models/models";
import {format} from 'date-fns'

function Serveur02_Notifications(props) {
    const {serveurProcess, setServeurProcess} = useContext<{serveurProcess:ServeurProcessModel, setServeurProcess: any}>(serveurProcessContext) ;
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(JSON.parse(serveurProcess.notifDetail.content))
    }, []) ;
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

    /*const handleDeleteNotif = () => {
        deleteRequest(API_REQUEST_NOTIFICATION, serveurProcess.notifDetail.id,
            ()=>{
                serveurProcess.validationMessage = "Demande d'ouverture supprimée avec Succèss !" ;
                navigate('/command-canceled') ;
            },
            ()=>{
                addNotification({
                    title: 'Erreur lors de la suppression',
                    subtitle: serveurProcess.notifDetail.content,
                    message: 'Veuillez Ressayez...',
                    native: true // when using native, your OS will handle theming.
                });
            }) ;
    } ;*/

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="La demande"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <br/>
                <h1 className="fw-6">Table {serveurProcess.notifDetail.tableNumber}</h1>
                <h5>{serveurProcess.notifDetail.tableZoneName || "Nom de la Zone"}</h5>
                <div className="text-center">{format(new Date(serveurProcess.notifDetail.askTime), 'HH : mm') }</div>
                <br/>
                {serveurProcess.notifDetail.nature != "demand" && (
                    <div className="text-center mt-5">
                        {
                            serveurProcess.notifDetail.nature == "payment" ? (ICONS.payment128) :(ICONS.callServer128)
                        }
                        <br/><br/>
                        {serveurProcess.notifDetail.nature == "payment" ? (
                            ( JSON.parse(serveurProcess?.notifDetail?.content)).map((elt:string, index:number) => (
                                <span key={index}>{index != 0 && (" - ")} {elt}</span>
                            ))
                        ) : (
                            <span>{serveurProcess.notifDetail.content}</span>
                        )}
                    </div>
                )}

                {serveurProcess.notifDetail.nature == "demand" && (
                    <div className="row">
                        <div className="col-3 text-center"><IconDemande stroke={'#FF6063'}/></div>
                        <div className="col-9 row">
                            {serveurProcess.notifDetail.content.split('-').map((demand:string, index:number) => (
                                <div key={index} className="col-6 mb-3">{demand}</div>
                            ))}
                        </div>
                    </div>
                )}
            <div className="horizontal-center inner-button-container-validate-btn mt-4">
                <HapyButtonWithIcon text="Valider la demande" handleClick={handleValidateNotif}
                                    btnWidth={350}
                                    iconComponent={<IconChecked/>}/>
            </div>
            </div>
        </>
    )
}
export default Serveur02_Notifications
