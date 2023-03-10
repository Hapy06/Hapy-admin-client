import {
    CategoryOfProduct,
    CategoryOnMenu, CookingStation,
    Institution,
    PhoneNumber,
    Product, TeamMember,
    Variant, Zone
} from "./Inscription.models" ;

export class IconType {
    width?:number ;
    height?:number ;
    stroke?:string = '#323232';
    fill?:string ;
    handleClick?: any ;
    styleIcon?:any ;
    classIcon?:string ;
    opacity?: number ;
    hapyLogoBtnColor?: '#536DFE' | '#FF6063' ;
}

export const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0.5px solid #C8C8C8',
        borderRadius: 20,
        width: 366,
        height: 588,
        padding:30
    },
};

export class AdminProcessModel {
    userLogged: TeamMember ;
    authToken: string ;
    listBooking: Booking[] ;
    bookingDetail: Booking ;
    payloadBase: PayloadType ;
}

export class HomeProcessModel {
    userLogged: TeamMember ;
    authToken: string ;
    listBooking: Booking[] ;
    bookingDetail: Booking ;
    payloadBase: PayloadType ;
    tableDetail: Table ;
}

export class ServeurProcessModel {
    listNotificationDemands: NotificationHapy[] ;
    listNotificationFoodReady: NotificationHapy[] ;
    notifDetail: NotificationHapy ;
    validationMessage: string ;
}

export class CDRProcessModel {
    listNotifs: NotificationHapy[] ;
    notifDetail: NotificationHapy ;
    validationMessage: string ;
}

export class PreparationProcessModel {
    listAllOrders: Order[] ;
    listWaitingOrders: Order[] ;
    listPausedOrders: Order[] ;
    orderDetail: Order ;
    orderCooking: Order ;
    ticketQuantity: number ;
    listFinishedOrders: Order[] ;
    orderWaintingMilliseconde: any ; //orderWaintingMilliseconde[orderId] = millisecondePast
    orderCookingMilliseconde: {orderId:string, millisecondePast:number} ;
    orderPausedMilliseconde: {orderId:string, millisecondePast:number}[] ;
}

export class Demand {
    title: string ;
    time: string ;
    done: boolean ;
}

export class SimpleCommand {
    id?: string ;
    product: any ;
    productVariant: any ;
    isPregnant: boolean;
    isValidated: boolean;
    status: 'choosed' | 'takeLater' | 'sendToCDR' | 'sendToCuisine' | 'foodReady' ;
    price: number ;
    ingredientsModifiablesStates: string[] ;
}

export class CommandProcessModelToShare {
    accessMethod: 'itself' | 'service' ;
    numberOfPerson: number ;
    tips: number ;
    totalPrice: number ;
    reduction: any[] ;
    openingTime: string ;
    sendNoteEmail: string ;
    sendNoteWithDetail: boolean ;
    allCommands: SimpleCommand[] ;
}

export class CommandProcessModel {
    institution: Institution ;
    accessMethod: 'itself' | 'service' ;
    numberOfPerson: number ;
    table: Table;
    tableFromDB?: Table;
    isOnline: boolean ;
    categoryOfProductChoosed: CategoryOfProduct ;
    productVariantChoosed: Variant ;
    productChoosed: Product ;
    allCommands: SimpleCommand[] ;
    newDemand: Demand ;
    listDemandsRunning: Demand[] ;
    listDemandsDone: Demand[] ;
    tips: number ;
    authToken: string ;
    totalPrice: number ;
    reduction: any[] ;
    openingTime: string ;
    sendNoteEmail: string ;
    sendNoteWithDetail: boolean ;
    categoriesOnMenu: any[] ;
    productCategories: any[] ;
    products: any[] ;
    variants: any[] ;
}

export class Order {
    id?: string;
    institutionId: string ;
    tableId: string;
    tableNumber: number;
    tableZoneName: string;
    isFoodReady: boolean;
    totalCost: number;
    coupons: Coupon[];
    couponsReadyIds?: string[];
    notificationID: string ; // To change notification attribut isDone directement in Backend, avoiding send 2 requests
    /****************** TO ADD *******************/
    tableNumberOfPerson: number ;
    status?: 'waiting' | 'cooking' | 'pause' | 'finished' ;
    startTime?: string ;
    endTime?: string ;
    createdAt?: Date ;
    finishedAt?: Date ;
    millisecondePastSinceStart?: number ;
    isPregnant?: boolean ;
    // custom attributes
    pendingDuration?: number;
    pendingDurationText?: string;
    cookingDuration?: number;
    cookingDurationText?: string;
    savingDate: string ;
}

export class Coupon {
    /*couponNumber: string;
    table: Table;
    product: Product;
    order: Order;
    iscouponReady: boolean;
    isCouponValidate: boolean;
    isCouponAffected: boolean;*/
    /************* REAL ATTRIBUTS ************/
    couponNumber: string;
    id?: string;
    insitutionID: string ;
    tableID: string;
    tableNumber: number;
    tableZoneName: string;
    tableNumberOfPerson?: number;
    product: Product ;
    productId?: string ;
    productVariant: Variant ;
    productVariantId?: string ;
    isPregnant: boolean;
    price: number ;
    ingredientsModifiablesStates: string[] ;
    cookingStation: string ;
    isCouponCooked?: boolean;
}
export class Table {
    id: string ;
    tableNumber: number;
    quantity: number;
    codeQrUrl: string;
    status: 'close' | 'closed'  | 'unavailable' | 'command-waiting-validation' | 'ask-to-open'
        | 'command-preparation' | 'command-ready' | 'opened-and-served' | 'opened' | "waiting-to-join" ;
    statusForNewClient: 'close' | 'closed'  | 'unavailable' | 'waiting-to-join' | 'opened' | 'opened-and-served' ;
    institution: Institution;
    bookings: Booking;
    orders: Order;
    /**************************/
    zoneName: string ;
    zone: Zone ;
    commandProcessToShare?: CommandProcessModelToShare ;
    numberOfPerson?: number ;
    serverName?: string ;
}

export default class Booking {
    id: string;
    bookingId: string;
    institutionId: string;
    phoneNumber: string;
    numberOfPeople: number;
    tableId: string;
    table?: Table ;
    dateOfreservation: string;
    clientName: string ;
    timeOfreservation: string ;
    dateOfreservationToShow: string ;
    status: 'En cours' | 'Annul??e' | 'Effectu??e' ;
    tableNumber: any ;
    createdAt?: string ;
    updatedAt?: string ;
    /***********TO ADD*************/
    timeOfArrival: string ;
}

export class NotificationHapy {
    id: string;
    tableID: string;
    tableNumber: number ;
    tableZoneName: string;
    tableNumberOfPerson?: number;
    isDone: boolean;
    askTime: string;
    doneTime: string;
    nature : string | 'openTable' | 'commandToValidate' | 'callServer' | 'payment' | 'demand' | 'foodReady' ;
    content: any ;
    source: 'client' | 'cuisine' | string ; // ADD TO DB IF NOT
    institutionID: string ; // ADD TO DB IF NOT
}

export class ProductLoss {
    id: string;
    name: string;
    quantity: number;
}

export type PayloadType = {
    source:"client" | "cdr" | "serveur" | "cuisine",
    institutionID: string,
    idTeamMemberOrTable: string, // "client => tableId | cdr => idTeamMember",
    idTableToReturnResponse?: string ;
    dataToSend?: any
}

export class OpenTableDemand {
    institutionID: string ;
    tableID: string ;
    tableNumber: number ;
    numberOfPerson: number ;
    done: boolean ;
    date: string ;
}

export class TicketPayed {
    id?: string ;
    tableId: string ;
    table?: Table ;
    totalPayed: number ;
    orderId: string ;
    order?: Order ;
    teamMemberId: string ;
    teamMember?: TeamMember ;
    institutionId: string ;
    institution?: Institution ;
    day: string ;
    dayNumber: number ;
    morningOrEvening: 'morning' | 'evening' ;
    time: string ;
    createdAt?: string ;
    updatedAt?: string ;
    tableOpenTime: string ;
    tableCloseTime: string ;
    totalTips?: number ;
    tableZoneName?: string ;
    numberOfPerson: number ;
    reductionType?: 'none' | 'montant' | 'pourcent' ;
    reductionValue?: number ;
    isMultipleReglements: boolean ;
    uniqueReglement?: {number:number, value: string, paymentMethod: 'carteBleu' | 'money' | 'ticket' | 'other'} ;
    listReglement?: {number:number, value: number, paymentMethod: 'carteBleu' | 'money' | 'ticket' | 'other'}[] ;
    allCommands?: SimpleCommand[] ;
    sendNoteEmail?: string ;
    sendNoteWithDetail?: boolean ;
}
