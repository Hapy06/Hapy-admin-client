import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import IconCloseSquare from "../../globals/icons-components/IconCloseSquare";
import IconChecked from "../../globals/icons-components/IconChecked";
import IconProfile2Users from "../../globals/icons-components/IconProfile2Users";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import HapyMobileTop from "../../components/HapyMobileTop";
import {cdrProcessContext} from "./ChefDeRangContainer";
import io from "socket.io-client";
import {
    API_REQUEST_NOTIFICATION,
    BASE_URL_SOCKET, deleteRequest,
    getAdminProcessValues,
    putRequest,
    setProcessStored
} from "../../globals/GlobalVariables";
import addNotification from "react-push-notification";
import {CDRProcessModel, PayloadType} from "../../globals/models/models";
import {format} from "date-fns";

function ChefDeRang02_OpenTable(props) {
    const socketOpenTable = io(BASE_URL_SOCKET);
    const {cdrProcess, setCDRProcess} = useContext<{cdrProcess:CDRProcessModel, setCDRProcess:any}>(cdrProcessContext) ;
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(socketOpenTable.connected);
    const navigate = useNavigate();
    let payloadBase:PayloadType = getAdminProcessValues("payloadBase") ;

    useEffect(()=> {
        // console.log(cdrProcess) ;
        /************************ SOCKET FOR OPEN TABLE DEMANDS ****************************/
        socketOpenTable.on('connect', () => {
            console.log('connected CDR OPEN TABLE socket !') ;
            socketOpenTable.emit("source", payloadBase);
            setIsSocketConnected(true) ;
        });
        
        socketOpenTable.on('disconnect', () => {
            console.log('disconnect socket !') ;
            setIsSocketConnected(false) ;
        });
    }, []) ;
    /*const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        navigate('/table-opened') ;
    }*/

    const handleValidateOpenTable = () => {
        if (isSocketConnected) {
            socketOpenTable.emit("CDR-OPEN_TABLE_CONFIRM", {...payloadBase, idTableToReturnResponse:cdrProcess.notifDetail.tableID});
            putRequest(API_REQUEST_NOTIFICATION + '/update', cdrProcess.notifDetail.id, {...cdrProcess.notifDetail, isDone:true},
                ()=> {
                cdrProcess.validationMessage = "Demande d'ouverture validée avec Succèss !" ;
                navigate('/command-validated') ;},
                ()=>{
                    addNotification({
                        title: 'Erreur lors de la sauvegarde',
                        subtitle: 'Ouverture de la Table ' + cdrProcess.notifDetail.tableNumber,
                        message: 'Veuillez Ressayez...',
                        native: true // when using native, your OS will handle theming.
                    });
                })
        } else {
            addNotification({
                title: 'Erreur lors de la validation',
                subtitle: 'Ouverture de la Table ' + cdrProcess.notifDetail.tableNumber,
                message: 'Veuillez Ressayez...',
                native: true // when using native, your OS will handle theming.
            });
        }
    } ;

    const handleDeleteNotif = () => {
        deleteRequest(API_REQUEST_NOTIFICATION, cdrProcess.notifDetail.id,
            ()=>{
                cdrProcess.validationMessage = "Demande d'ouverture supprimée avec Succèss !" ;
                navigate('/command-canceled') ;
            },
            ()=>{
                addNotification({
                    title: 'Erreur lors de la suppression',
                    subtitle: "Demande d'Ouverture de la Table " + cdrProcess.notifDetail.tableNumber,
                    message: 'Veuillez Ressayez...',
                    native: true // when using native, your OS will handle theming.
                });
            }) ;
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "chef de rang"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Ouvrir la Table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={true}
                           hapyLogoBtnColor={"#FF6063"}
                           rightSideBtnIconComponent={<IconCloseSquare stroke={'white'} />}
                           rightSideBtnHandleClick={handleDeleteNotif}

            />
            <div className="happy-div-bottom">
                <br/>
                <h1 className="fw-6">Table {cdrProcess.notifDetail.tableNumber}</h1>
                <h5>{cdrProcess.notifDetail.tableZoneName}</h5>
                <div className="text-center">{format(new Date(cdrProcess.notifDetail.askTime), 'HH : mm') }</div>
                <br/>
                <div className="text-center" style={{paddingTop:50, paddingBottom:50}}>
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M105.547 79.6267C94.5605 90.56 78.8271 93.92 65.0138 89.6L39.8938 114.667C38.0805 116.533 34.5071 117.653 31.9471 117.28L20.3205 115.68C16.4805 115.147 12.9071 111.52 12.3205 107.68L10.7205 96.0533C10.3471 93.4933 11.5738 89.92 13.3338 88.1067L38.4005 63.04C34.1338 49.1733 37.4405 33.44 48.4271 22.5067C64.1605 6.77333 89.7071 6.77333 105.494 22.5067C121.28 38.24 121.28 63.8933 105.547 79.6267Z" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M36.7471 93.28L49.0137 105.547" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M77.333 58.6666C81.7513 58.6666 85.333 55.0849 85.333 50.6666C85.333 46.2483 81.7513 42.6666 77.333 42.6666C72.9147 42.6666 69.333 46.2483 69.333 50.6666C69.333 55.0849 72.9147 58.6666 77.333 58.6666Z" stroke="#00B0FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <br/>
                    <br/>
                    <IconProfile2Users width={32} height={32} stroke={'#00B0FF'}/> <span className="fw-6 ml-1">{cdrProcess.notifDetail.content} courverts</span>
                </div>
                <div className="horizontal-center inner-button-container-validate-btn">
                    <div className="validated-btn-container mt-4">
                        <HapyButtonWithIcon text="Ouvrir la table" handleClick={handleValidateOpenTable}
                                            btnWidth={350}
                                            iconComponent={<IconChecked width={32} height={32}/>}/>
                    </div>
                </div>
            </div>
            {/*<div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <Table_OpenTableModal handleCloseModal={closeModal}/>
                </Modal>
            </div>*/}
        </>
    )
}
export default ChefDeRang02_OpenTable
