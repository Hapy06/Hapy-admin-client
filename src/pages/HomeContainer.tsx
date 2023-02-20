import React, {createContext, useEffect, useState} from 'react';
import ChefDeRangContainer, {cdrProcessContext} from "./ChefDeRang/ChefDeRangContainer";
import ServeurContainer from "./Serveur/ServeurContainer";
import Login from "./Login";
import {BASE_URL, getAdminProcessValues, getProcessStored, setAdminProcessValues} from "../globals/GlobalVariables";
import axios from "axios";
import HoteContainer from "./Hote/HoteContainer";
import PreparationContainer from "./Preparation/PreparationContainer";
import LoginTablet from "./LoginTablet";
import ErrorPage from "../globals/ErrorPage";
import {CDRProcessModel, CommandProcessModel, HomeProcessModel} from "../globals/models/models";

type PropsType = {
  isMobile: boolean ;
}
export const homeProcessContext = createContext(null) ;

function HomeContainer(props: PropsType) {
  const [isAuth, setIsAuth] = useState<{value:boolean, user:'CDR' | 'Serveur' | 'none' | 'Hote' | string}>(
      getAdminProcessValues("isLoggedin") == 'true' ? {value:true, user:getAdminProcessValues("userRole")} : {value:false, user:'none'});
  const [homeProcess, setHomeProcess] = useState<HomeProcessModel>(new HomeProcessModel());
  const [commandProcess, setCommandProcess] = useState<CommandProcessModel>(new CommandProcessModel());
  const allContextValues = {
    homeProcess, setHomeProcess,
    commandProcess, setCommandProcess
  } ;

  useEffect(() => {
    if (!homeProcess.tableDetail && getProcessStored("homeProcess")) {
      setHomeProcess(getProcessStored("homeProcess")) ;
    }
    if (!commandProcess.institution && getProcessStored("commandProcess")) {
      setCommandProcess(getProcessStored("commandProcess")) ;
    }
  }, []) ;

  const handlePageToShow = () => {
    if (isAuth.value) {
      if (isAuth.user == 'CDR') {
        return props.isMobile ? <ChefDeRangContainer/> : <ErrorPage errorTitle={"Vous êtes au mauvais endroit"} showBtn={true} btnText={"Aller à la page de connexion"}
                                                                    handleBtnClick={redirectLogin}
                                                                    errorMessage={"Utilisez votre smartphone pour acceder à cette page !"}/>
      } else if (isAuth.user == "Serveur") {
        return props.isMobile ? <ServeurContainer/> : <ErrorPage errorTitle={"Vous êtes au mauvais endroit"} showBtn={true} btnText={"Aller à la page de connexion"}
                                                                 handleBtnClick={redirectLogin}
                                                                 errorMessage={"Utilisez votre smartphone pour acceder à cette page !"}/>
      } else if (isAuth.user == "Accueil" || isAuth.user == "Administrateur") {
        return !props.isMobile ? <HoteContainer/> : <ErrorPage errorTitle={"Vous êtes au mauvais endroit"} showBtn={true} btnText={"Aller à la page de connexion"}
                                                               handleBtnClick={redirectLogin}
                                                                 errorMessage={"Utilisez votre Tablette or PC pour acceder à cette page !"}/>
      } else {
        return !props.isMobile ? <PreparationContainer/> : <ErrorPage errorTitle={"Vous êtes au mauvais endroit"} showBtn={true} btnText={"Aller à la page de connexion"}
                                                                      handleBtnClick={redirectLogin}
                                                                      errorMessage={"Utilisez votre Tablette or PC pour acceder à cette page !"}/>
      }
    } else {
      return props.isMobile ? <Login handleAfterLogged={handleAfterLogged}/> : <LoginTablet handleAfterLogged={handleAfterLogged}/>
    }
  } ;

  const redirectLogin = () => {
    localStorage.removeItem('isLoggedin') ;
    setIsAuth( {value:false, user:'none'}) ;
    location.reload() ;
  } ;

  const handleAfterLogged = (userRole:'CDR' | 'Serveur' | 'Hote' | string) => {
    setAdminProcessValues('isLoggedin', 'true') ;
    setAdminProcessValues("userRole", userRole) ;
    setIsAuth({value:true, user:userRole}) ;
    handlePageToShow() ;
  } ;

  return (
      <homeProcessContext.Provider value={allContextValues}>
        {handlePageToShow()}
      </homeProcessContext.Provider>
      )
}

export default HomeContainer

