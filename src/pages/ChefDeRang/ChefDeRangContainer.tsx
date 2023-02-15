import React, {createContext, useEffect, useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ChefDeRang01_Home from "./ChefDeRang01_Home";
import ChefDeRang02_OpenTable from "./ChefDeRang02_OpenTable";
import ChefDeRang02_TableListCommand from "./ChefDeRang02_TableListCommand";
import ChefDeRang02_CommandValidated from "./ChefDeRang02_CommandValidated";
import ChefDeRang02_CommandCanceled from "./ChefDeRang02_CommandCanceled";
import ChefDeRang03_ListTables from "./ChefDeRang03_ListTables";
import Table_Home from "../Table/Table_Home";
import Table_Note from "../Table/Table_Note";
import Table_TableClosed from "../Table/Table_TableClosed";
import ReservationNew from "../Reservation/ReservationNew";
import ReservationList from "../Reservation/ReservationList";
import ReservationDetail from "../Reservation/ReservationDetail";
import ReservationValidated from "../Reservation/ReservationValidated";
import Perte from "../Pertes/Perte";
import io from "socket.io-client";
import {
    BASE_URL_SOCKET,
    getAdminProcessValues,
    getProcessStored, setAdminProcessValues,
    setProcessStored
} from "../../globals/GlobalVariables";
import {CDRProcessModel, NotificationHapy, PayloadType, Table} from "../../globals/models/models";
import addNotification from "react-push-notification";
import Table_TableOpened from "../Table/Table_TableOpened";
import Command01_Category from "../Commands/Command01_Category";
import Command02_SubCategory from "../Commands/Command02_SubCategory";
import Command03_Product from "../Commands/Command03_Product";
import Command04_ValidationProgress from "../Commands/Command04_ValidationProgress";
import Command05_Validated from "../Commands/Command05_Validated";

export const cdrProcessContext = createContext(null) ;

function ChefDeRangContainer() {
  const socketOpenTable = io(BASE_URL_SOCKET);
  const [cdrProcess, setCDRProcess] = useState<CDRProcessModel>(new CDRProcessModel());
  let payloadForSocket:PayloadType = {
      source: "cdr", institutionID: getAdminProcessValues("userLogged").institutionId || 'instituionId' ,
      idTeamMemberOrTable: getAdminProcessValues("userLogged").id || 'cdrId' ,
  } ;

    const allContextValues = {
    cdrProcess, setCDRProcess
  } ;

   useEffect(() => {
       if (!cdrProcess.notifDetail && getProcessStored("cdrProcess")) {
           setCDRProcess(getProcessStored("cdrProcess")) ;
       }
       if (!cdrProcess.listNotifs) {
           cdrProcess.listNotifs = [] ;
       }
       window.scrollTo(0, 0);

       /************************ SOCKET FOR OPEN TABLE DEMANDS ****************************/
        socketOpenTable.on('connect', () => {
           console.log('connected CDR OPEN TABLE socket !') ;
           socketOpenTable.emit("source", payloadForSocket);
            setAdminProcessValues("payloadBase", payloadForSocket) ;
         });

         socketOpenTable.on('OPEN_TABLE_DEMAND', (payload:PayloadType) => {
             console.log('OPEN_TABLE_DEMAND => ') ;
             console.log(payload) ;
             addNewOpenTableDemand(payload.dataToSend) ;
         });

         socketOpenTable.on('NEW_NOTIFICATION', (payload:PayloadType) => {
             console.log('NEW_COMMAND => ') ;
             console.log(payload) ;
             addNewCommand(payload.dataToSend) ;
         });

         socketOpenTable.on('disconnect', () => {
           console.log('disconnect socket !') ;
         });

    }, []);

    const addNewOpenTableDemand = (payload: {table: Table, numberOfPerson: number}) => {
        let newNotif:NotificationHapy = new NotificationHapy() ;
        newNotif.tableNumber = payload.table.tableNumber ;
        newNotif.tableZoneName = payload.table.zoneName ;
        newNotif.tableID = payload.table.id ;
        newNotif.nature = "openTable" ;
        newNotif.content = payload ;
        let temp = cdrProcess ;
        temp.listNotifs.push(newNotif) ;
        setProcessStored("cdrProcess", temp) ;
        setCDRProcess({...temp}) ;
        addNotification({
            title: "Nouvelle Demande d'Ouverture de Table",
            subtitle: 'Table ' + newNotif.tableNumber + ' - ' + (newNotif.tableZoneName || 'Terrasse Gauche'),
            message: 'Veuillez Confirmez !',
            theme: 'light',
            backgroundTop: '#536DFE',
            duration: 5000,
            native: true, // when using native, your OS will handle theming.
        });
        // socketOpenTable.emit("cdr confirm table openning", newNotif.tableId);
    } ;

    const addNewCommand = (notification: NotificationHapy) => {
        let temp = cdrProcess ;
        temp.listNotifs.push( notification) ;
        setProcessStored("cdrProcess", temp) ;
        setCDRProcess({...temp}) ;
        addNotification({
            title: "Nouvelle Commande à valider",
            subtitle: 'Table ' +  notification.tableNumber + ' - ' + ( notification.tableZoneName || 'Terrasse Gauche'),
            message: 'Veuillez Confirmez !',
            theme: 'light',
            backgroundTop: '#536DFE',
            duration: 5000,
            native: true, // when using native, your OS will handle theming.
        });
        // socketOpenTable.emit("cdr confirm table openning", newNotif.tableId);
    } ;

    /*const handleNotifClicked = (notif: NotificationHapy) => {
        cdrProcess.notifDetail = notif ;
        setCDRProcessStored(cdrProcess) ;
        if (notif.nature == "openTable") {
            navigate('/open-table') ;
        } else if (notif.nature == "commandToValidate") {
            navigate('/table-list-commands') ;
        }
    } ;*/

  const router = createBrowserRouter([
    {path: "/", element: <ChefDeRang01_Home/>},
    {path: "/home", element: <ChefDeRang01_Home/>},
    {path: "/open-table", element: <ChefDeRang02_OpenTable/>},
    {path: "/table-list-commands", element: <ChefDeRang02_TableListCommand/>},
    {path: "/command-validated", element: <ChefDeRang02_CommandValidated/>},
    {path: "/command-canceled", element: <ChefDeRang02_CommandCanceled/>},
    {path: "/list-tables", element: <ChefDeRang03_ListTables/>},
      {path: "/table", element: <Table_Home/>},
      {path: "/table-opened", element: <Table_TableOpened/>},
      {path: "/table-note", element: <Table_Note/>},
      {path: "/table-close", element: <Table_TableClosed/>},
      /****************************************/
      {path: "/command", element: <Command01_Category/>},
      {path: "/command/sub-category", element: <Command02_SubCategory/>},
      {path: "/command/product", element: <Command03_Product/>},
      {path: "/command/validationProgress", element: <Command04_ValidationProgress/>},
      {path: "/command/validated", element: <Command05_Validated/>},
      /****************************************/
    {path: "/reservation/new", element: <ReservationNew/>},
    {path: "/reservation/list", element: <ReservationList/>},
    {path: "/reservation/detail", element: <ReservationDetail/>},
    {path: "/reservation/validated", element: <ReservationValidated/>},
    {path: "/lose", element: <Perte/>},
    {path: "/*", element: <ChefDeRang01_Home/> }
  ]);

  return (
      <cdrProcessContext.Provider value={allContextValues}>
        <RouterProvider router={router} />
      </cdrProcessContext.Provider>
  )
}

export default ChefDeRangContainer
