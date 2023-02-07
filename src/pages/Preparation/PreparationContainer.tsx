import React, {createContext, useEffect, useState} from 'react';
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import Preparation_Home from "./Preparation_Home";
import Preparation_Attente from "./Preparation_Attente";
import Preparation_Poste from "./Preparation_Poste";
import io from "socket.io-client";
import {
  BASE_URL_SOCKET,
  getProcessStored,
  setAdminProcessValues,
  setProcessStored
} from "../../globals/GlobalVariables";
import {Order, PayloadType, PreparationProcessModel, Table} from "../../globals/models/models";
import addNotification from "react-push-notification";

export const preparationContext = createContext(null) ;

function PreparationContainer() {
  const socket = /*io(BASE_URL_SOCKET);*/ null ;
  const [preparationProcess, setPreparationProcess] = useState<PreparationProcessModel>(new PreparationProcessModel());
  let payloadForSocket:PayloadType = {
    source: "cuisine", institutionID: /*adminProcess.userLogged?.institution?.id ||*/ '63c55a736bc6def4ca70ba89',
    idTeamMemberOrTable:/*adminProcess.userLogged?.id ||*/ 'idTM_cuisine'
  } ;

  const allContextValues = {
    preparationProcess, setPreparationProcess
  } ;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!preparationProcess.orderDetail) {
      setPreparationProcess(getProcessStored("preparationProcess")) ;
    }
    if (!preparationProcess.listAllOrders) {
      let temp = {...preparationProcess} ;
      temp.orderWaintingMilliseconde = {} ;
      let arr: Order[] = [] ;
      temp.ticketQuantity = 0 ;
      arr.forEach(order => {
        if (!order.createdAt) {
          order.createdAt = new Date() ;
          order.startTime = new Date().getHours() + ':' + new Date().getMinutes() ;
        }
        if (!order.status) {
          order.status = "waiting" ;
        }
        temp.ticketQuantity += order.coupons.length ;
        temp.orderWaintingMilliseconde[order.id] = 0 ;
      }) ;
      temp.listAllOrders = arr ;
      temp.listWaitingOrders = arr.filter(order => order.status == "waiting") ;
      temp.listPausedOrders = arr.filter(order => order.status == "pause") ;
      temp.orderCooking = arr.find(elt => elt.status == "cooking") ;
      setPreparationProcess({...temp}) ;
    }
    console.log(preparationProcess) ;

    /************************ SOCKET FOR OPEN TABLE DEMANDS ****************************/
    /*socket.on('connect', () => {
      console.log('connected Preparation socket !') ;
      socket.emit("source", payloadForSocket);
      setAdminProcessValues("payloadBase", payloadForSocket) ;
    });

    socket.on('NEW_ORDER', (payload:PayloadType) => {
      console.log('NEW_ORDER => ') ;
      console.log(payload) ;
      addNewCommand(payload.dataToSend) ;
    });

    socket.on('disconnect', () => {
      console.log('disconnect socket !') ;
    });*/

  }, []);

  const addNewCommand = (order: Order) => {
    let temp = {...preparationProcess} ;
    temp.listAllOrders.push( order) ;
    setProcessStored("preparationProcess", temp) ;
    setPreparationProcess({...temp}) ;
    addNotification({
      title: "Nouvelle Commande à traiter !",
      subtitle: 'Table ' +  order.tableNumber + ' - ' + ( order.tableZoneName || 'Terrasse Gauche'),
      message: 'Ajout dans la liste des commandes.',
      theme: 'light',
      backgroundTop: '#536DFE',
      duration: 5000,
      native: true, // when using native, your OS will handle theming.
    });
    // socketOpenTable.emit("cdr confirm table openning", newNotif.tableId);
  } ;

  // const [count, setCount] = useState(0) ;
  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
  };

  const PageLayout = ({ children }) => children;

  const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <PageLayout>
          <motion.div
              key={pathname}
              initial="initial"
              animate="in"
              variants={pageVariants}
              transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </PageLayout>
    );
  };

  /*const router = createBrowserRouter([
    {
      path: "/",
      element: <AnimationLayout />,
      children: [
        {path: "/", element: <Preparation_Home/>},
        {path: "/home", element: <Preparation_Home/>},
        {path: "/preparation", element: <Preparation_Home/>},
        {path: "/preparation/order", element: <Preparation_Attente/>},
        {path: "/preparation/poste", element: <Preparation_Poste/>},
        {path: "/!*", element: <Preparation_Home/> }
      ]
    }
  ]);*/

  const router = createBrowserRouter([
    {path: "/", element: <Preparation_Home/>},
    {path: "/home", element: <Preparation_Home/>},
    {path: "/preparation", element: <Preparation_Home/>},
    {path: "/preparation/order", element: <Preparation_Attente/>},
    {path: "/preparation/poste", element: <Preparation_Poste/>},
    {path: "/*", element: <Preparation_Home/> }
  ]);

  return (
      <div className="preparation-container">
      <preparationContext.Provider value={allContextValues}>
        <RouterProvider router={router} />
      </preparationContext.Provider>
      </div>
  )
}

export default PreparationContainer
