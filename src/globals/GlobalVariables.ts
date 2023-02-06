import {CommandProcessModel, CommandProcessModelToShare, NotificationHapy, Table} from "./models/models";
import axios from "axios";

const imagePathModeDev = '/src/assets/' ;
const imagePathModeProd = '/' ;             /*le / indique le folder du index.html dans dist */
export const IMG_PATH = imagePathModeDev ;
export const BASE_URL = 'http://localhost:4000/';
export const BASE_URL_SOCKET = 'http://localhost:3000/';
// export const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2E0MDAzYzNhZjgzOGZjMzJhNGVmY2QiLCJ1c2VyVHlwZSI6IlJFU1RBVVJBTlQiLCJpYXQiOjE2NzMyNjgxMzksImV4cCI6MTY3MzM1NDUzOX0.C3QjV1TNtSbQ1_QrdZ1eK1lY9oZaBtgCUuUssn9cBmrAhqrmiLYUvBMaRbSJAw1SkGNE99RaJHjwnPVBaKTuP7QAMbn_7p2h9CuiF141XIwHeLnv_67e_WjtvqtZw2ckuiTW3f6rmPUJSsMpL4XQ75_WU8--luVCzk7YKm2T1wMzjOxj1nR7FO0GM6WG4SE8qB3eO6lMIyQDvQxegtjmACltIRvxMsWBYYBUvinw93pKDxlH4kIIUoeO7bRbt1tkYsjuOJ0x0MpCdGGVaxwynsxSIHpiTpDlWCT6RcPIMsjn5jd6n_ov-47qWZ-MQJDJV92tz1rN_KBI3Uimy28R_RLr0Vry65SUOkaM1fvaXKSy2M0MwMjq5RMmY6WcTjOgOIDwdYzRkoJ0KcBnZFvOha3phuBdQr513qLZE9xth2MJfbobtzB6V2sbzBHixLpH9WNKuXI6mmANVg0HPL6RKvEUV3QoUs9sk6IK_85ZSZV25pagTRRtFe6RUYCzB6XfoRJqRo9rTUIoEZi2rlI4-Qe8_N08YBON5IVHqyXebNShtSAFze_f6WvhMkwl7stgS_PUr8EN0b_uV5Y1i5bFIysJCUfB1u5E1BNy8Y5WKv448rSEMKMXDSo0eRIFdSY7KZ5Oh5Qwl_ErOLFvfiHc_jrtAWAwuJ3VAooiqlUgM9k"
export const dayListFR = [null,'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] ;
export const monthListFR = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'] ;

export const MSG_SAVING = "Sauvegarde en cours..." ;
export const MSG_ERROR = "Erreur lors de la sauvegarde, Veuillez ressayer !" ;
export const MSG_ERROR_LOADING = "Erreur lors du chargement, Veuillez ressayer !" ;
export const MSG_ERROR_UPDATE = "Erreur lors de la mise a jour, Veuillez ressayer !" ;
export const MSG_ERROR_DELETE = "Erreur lors de la suppression, Veuillez ressayer !" ;

/**************** API RERQUEST ************************/
const API_REQUEST_BASE = 'api/v1/managements/' ;
export const API_REQUEST_TABLE = API_REQUEST_BASE + 'table' ;
export const API_REQUEST_INSTITUTION = API_REQUEST_BASE + 'institution' ;
export const API_REQUEST_ZONE = API_REQUEST_BASE + 'zone' ;
export const API_REQUEST_BAR_STATION = API_REQUEST_BASE + 'bar-station' ;
export const API_REQUEST_CUISINE_STATION = API_REQUEST_BASE + 'cuisine-station' ;
export const API_REQUEST_ROOM_STATION = API_REQUEST_BASE + 'room-station' ;
export const API_REQUEST_TEAM_MEMBER = API_REQUEST_BASE + 'team-member' ;
export const API_REQUEST_INGREDIENT_CATEGORY = API_REQUEST_BASE + 'ingredient-category' ;
export const API_REQUEST_INGREDIENT = API_REQUEST_BASE + 'ingredient' ;
export const API_REQUEST_COOKING = API_REQUEST_BASE + 'cooking' ;
export const API_REQUEST_CATEGORY_ON_MENU = API_REQUEST_BASE + 'category-on-menu' ;
export const API_REQUEST_PRODUCT_CATEGORY = API_REQUEST_BASE + 'product-category' ;
export const API_REQUEST_PRODUCT_INGREDIENT = API_REQUEST_BASE + 'product-ingredient' ;
export const API_REQUEST_PRODUCT = API_REQUEST_BASE + 'product' ;
export const API_REQUEST_VARIANT = API_REQUEST_BASE + 'variant' ;
export const API_REQUEST_NOTIFICATION = API_REQUEST_BASE + 'notification' ;
export const API_REQUEST_BOOKING = API_REQUEST_BASE + 'booking' ;
export const API_REQUEST_PRODUCT_LOST = API_REQUEST_BASE + 'product-lost' ;

/************* FUNCTIONS ***********************/
/*************************************/
/*************************************/
export const setProcessStored = (process: 'adminProcess' | 'commandProcess' | 'cdrProcess'
    | 'serveurProcess' | 'preparationProcess' | 'homeProcess', value:any) => {
    /*console.log("------ SAVE " + process + " IN LOCAL => ------") ;
    console.log(value) ;*/
    localStorage.setItem(process, JSON.stringify(value)) ;
} ;

export const getProcessStored = (process: 'adminProcess' | 'commandProcess' | 'cdrProcess'
    | 'serveurProcess' | 'preparationProcess' | 'homeProcess') => {
    return JSON.parse(localStorage.getItem(process)) ;
} ;

export const setAdminProcessValues = (attribute: 'authToken' | 'userLogged' | 'isLoggedin' | 'payloadBase' | 'userRole', value: any) => {
    localStorage.setItem(attribute, JSON.stringify(value)) ;
} ;

export const getAdminProcessValues = (attribute: 'authToken' | 'userLogged' | 'isLoggedin' | 'payloadBase' | 'userRole' | string) => {
    return JSON.parse(localStorage.getItem(attribute)) ;
} ;


export const removeAdminProcessValues = (attribute: 'authToken' | 'userLogged' | 'isLoggedin' | 'payloadBase' | 'userRole') => {
    localStorage.removeItem(attribute) ;
} ;
/*************************************/

export const handleSendNotification = (nature: 'openTable' | 'commandToValidate' | 'callServer' | 'payment' | 'demand',
                                       institutionID: string,
                                       tableID: string,
                                       tableNumber: number,
                                       tableZoneName: string,
                                       content:string,
                                       authToken,
                                       callBackSuccess:any,
                                       callBackError:any,
) => {
    let newNotif: NotificationHapy = new NotificationHapy() ;
    newNotif.institutionID = institutionID /*"63c55a736bc6def4ca70ba89"*/ ;
    newNotif.tableID = tableID ;
    newNotif.tableNumber = tableNumber ;
    newNotif.tableZoneName = tableZoneName ;
    newNotif.source = nature == "demand" ? 'client-' + getAdminProcessValues("clientDemandId") : 'client' ;
    newNotif.nature = nature ;
    newNotif.askTime = '' + new Date() ;
    newNotif.doneTime = '' + new Date() ;
    newNotif.isDone = false ;
    newNotif.content = content ;
    console.log("New Notif : ") ;
    console.log(newNotif) ;
    axios.post(BASE_URL + API_REQUEST_NOTIFICATION + '/create', newNotif,
        { headers: { Authorization: `Bearer ${authToken}`} }).then((response) => {
        console.log(response) ;
        if (response.status == 200 || response.status == 201 || response.status == 202) {
            callBackSuccess(response) ;
        }
    }).catch((err)=> {
        console.log(err) ;
        callBackError(err) ;
    }) ;
} ;

export const getRequest = (request,
                           callBackSuccess:any,
                           callBackError:any,
                           callBackFinally?:any,
    ) => {
    axios.get(BASE_URL + request,
        { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
        console.log(response) ;
        if (response.status == 200 || response.status == 201 || response.status == 202) {
            callBackSuccess(response) ;
        }
    }).catch((err)=> {
        console.log(err) ;
        callBackError(err) ;
    }).finally(() => {
        callBackFinally ? callBackFinally() : null ;
    }) ;
} ;

export const postRequest = (request, requestBody,
                           callBackSuccess:any,
                           callBackError:any,
                           callBackFinally?:any,
    ) => {
    axios.post(BASE_URL + request, requestBody,
        { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
        console.log(response) ;
        if (response.status == 200 || response.status == 201 || response.status == 202) {
            callBackSuccess(response) ;
        }
    }).catch((err)=> {
        console.log(err) ;
        callBackError(err) ;
    }).finally(() => {
        callBackFinally() ;
    }) ;
} ;

export const putRequest = (request, entityId, requestBody,
                           callBackSuccess:any,
                           callBackError:any,
                           callBackFinally?:any,
    ) => {
    console.log('update of ' + typeof requestBody) ;
    console.log(requestBody) ;
    axios.put(BASE_URL + request + '/' + entityId, requestBody,
        { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
        console.log(response) ;
        if (response.status == 200 || response.status == 201 || response.status == 202) {
            callBackSuccess(response) ;
        }
    }).catch((err)=> {
        console.log(err) ;
        callBackError(err) ;
    }).finally(() => {
        callBackFinally() ;
    }) ;
} ;

export const deleteRequest = (request, entityId,
                              callBackSuccess:any,
                              callBackError:any,
                              callBackFinally?:any,
) => {
    axios.delete(BASE_URL + request + '/' + entityId,
        { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
        console.log(response) ;
        if (response.status == 200 || response.status == 201 || response.status == 202) {
            callBackSuccess(response) ;
        }
    }).catch((err)=> {
        console.log(err) ;
        callBackError(err) ;
    }).finally(() => {
        callBackFinally() ;
    }) ;
} ;

export const updateTable = (commandProcess: CommandProcessModel, callBackSuccess?:any,
                            callBackError?:any) => {
    let commandProcessModelToShare: CommandProcessModelToShare = new CommandProcessModelToShare() ;
    for (let key in commandProcessModelToShare) {
        if (commandProcess[key]) commandProcessModelToShare[key] = commandProcess[key] ;
    }
    let table = commandProcess.table ;
    table.commandProcessToShare = JSON.stringify(commandProcessModelToShare) ;
    console.log(table) ;
    putRequest(API_REQUEST_TABLE + '/update-table', table.id, table, getAdminProcessValues("authToken"),
        (response)=>{if (callBackSuccess) callBackSuccess(response);},
        (error)=>{if (callBackError) callBackError(error)})
} ;