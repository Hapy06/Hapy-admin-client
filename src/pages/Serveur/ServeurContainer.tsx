import React, {createContext, useEffect, useState} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Serveur01_Home from "./Serveur01_Home";
import Serveur04_ListTables from "./Serveur04_ListTables";
import Serveur02_Notifications from "./Serveur02_Notifications";
import Serveur03_FoodReady from "./Serveur03_FoodReady";
import ReservationNew from "../Reservation/ReservationNew";
import ReservationList from "../Reservation/ReservationList";
import ReservationDetail from "../Reservation/ReservationDetail";
import ReservationValidated from "../Reservation/ReservationValidated";
import Perte from "../Pertes/Perte";
import Table_Home from "../Table/Table_Home";
import Table_TableOpened from "../Table/Table_TableOpened";
import Table_Note from "../Table/Table_Note";
import Table_TableClosed from "../Table/Table_TableClosed";
import {NotificationHapy, PayloadType, ServeurProcessModel, Table} from "../../globals/models/models";
import addNotification from "react-push-notification";
import io from 'socket.io-client';
import {
  BASE_URL_SOCKET,
  getAdminProcessValues,
  getProcessStored,
  setAdminProcessValues,
  setProcessStored
} from "../../globals/GlobalVariables";
import Command01_Category from "../Commands/Command01_Category";
import Command02_SubCategory from "../Commands/Command02_SubCategory";
import Command03_Product from "../Commands/Command03_Product";
import Command04_ValidationProgress from "../Commands/Command04_ValidationProgress";
import Command05_Validated from "../Commands/Command05_Validated";

export const serveurProcessContext = createContext(null) ;
function ServeurContainer() {
  const [serveurProcess, setServeurProcess] = useState<ServeurProcessModel>(new ServeurProcessModel());
  const socket = io(BASE_URL_SOCKET);
  const allContextValues = {
    serveurProcess, setServeurProcess
  } ;
  let payloadForSocket:PayloadType = {
    source: "serveur", institutionID: getAdminProcessValues("userLogged").institutionId || 'instituionId' ,
    idTeamMemberOrTable: getAdminProcessValues("userLogged").id || 'serveurId'
  } ;

   useEffect(() => {
     window.scrollTo(0, 0);
     if (!serveurProcess.notifDetail && getProcessStored("serveurProcess")) {
       setServeurProcess(getProcessStored("serveurProcess")) ;
     }
     if (!serveurProcess.listNotificationDemands) {
       serveurProcess.listNotificationDemands = [] ;
     }
     if (!serveurProcess.listNotificationFoodReady) {
       serveurProcess.listNotificationFoodReady = [] ;
     }
     /*********** SOCKET SERVEUR ***************/
     socket.on('connect', () => {
       console.log('connected CDR OPEN TABLE socket !') ;
       socket.emit("source", payloadForSocket);
       setAdminProcessValues("payloadBase", payloadForSocket) ;
     });

     socket.on('NEW_NOTIFICATION', (payload:PayloadType) => {
       console.log('NEW_NOTIFICATION => ') ;
       console.log(payload) ;
       addNewNotif(payload.dataToSend) ;
     });

     socket.on('disconnect', () => {
       console.log('disconnect socket !') ;
     });

    }, []);

  const addNewNotif = (notification: NotificationHapy) => {
    let temp = serveurProcess ;
    notification.nature == "foodReady" ? temp.listNotificationFoodReady.push(notification) : temp.listNotificationDemands.push(notification) ;
    setProcessStored("serveurProcess", temp) ;
    setServeurProcess({...temp}) ;
    addNotification({
      title: 'Nouvelle Demande',
      subtitle: 'Table ' + notification.tableNumber,
      message: notification.content,
      theme: 'light',
      native: true // when using native, your OS will handle theming.
    });
    // socketOpenTable.emit("cdr confirm table openning", newNotif.tableId);
  } ;


  const router = createBrowserRouter([
    {path: "/", element: <Serveur01_Home/>},
    {path: "/home", element: <Serveur01_Home/>},
    {path: "/notifications", element: <Serveur02_Notifications/>},
    {path: "/food-ready", element: <Serveur03_FoodReady/>},
    {path: "/list-tables", element: <Serveur04_ListTables/>},
    {path: "/table", element: <Table_Home/>},
    {path: "/table-opened", element: <Table_TableOpened/>},
    {path: "/table-note", element: <Table_Note/>},
    {path: "/table-close", element: <Table_TableClosed/>},
    {path: "/reservation/new", element: <ReservationNew/>},
    {path: "/reservation/list", element: <ReservationList/>},
    {path: "/reservation/detail", element: <ReservationDetail/>},
    {path: "/reservation/validated", element: <ReservationValidated/>},
    {path: "/lose", element: <Perte/>},
    /****************************************/
    {path: "/command", element: <Command01_Category/>},
    {path: "/command/sub-category", element: <Command02_SubCategory/>},
    {path: "/command/product", element: <Command03_Product/>},
    {path: "/command/validationProgress", element: <Command04_ValidationProgress/>},
    {path: "/command/validated", element: <Command05_Validated/>},
    /****************************************/
    {path: "/*", element: <Serveur01_Home/>}
  ]);

  return (
      <serveurProcessContext.Provider value={allContextValues}>
        <RouterProvider router={router} />
      </serveurProcessContext.Provider>
  )
}

export default ServeurContainer
