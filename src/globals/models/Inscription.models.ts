import Booking, {Table} from "./models";

export class InstitutionForUpdateModel {
    id?: string;
    name: string;
    city: string;
    postalAddress: string;
    phoneNumber: any;
    email: string;
    siretNumber: string;
    dailyTurnover?: number ;
    morningTurnover?: number ;
    eveningTurnover?: number ;
    weeklyTurnover?: number ;
    monthlyTurnover?: number ;
    yearlyTurnover?: number ;
    numberOfHapy?: number ;
    averageTicketPerHapy?: number ;
    averageServiceTime?: number ;
    amountOfHapyTips?: number ;
    tableQuantity: any;
    startTime: string ;
    endTime: string ;
    timeBetweenTwoService: string ;
    numberOfBartender: number = 0 ;
    password?: string;
    isInscriptionFinished: boolean ;
    /**************** DASHBOARD ATTRIBUTS ********************/
    objectifs: number[] ;
    hapyHourReducePourcent: number ;
    hapyHourStartTime: string ;
    hapyHourEndTime: string ;
    tipsPourcentInCommonPot: number ;
    isCommandInterfaceBar: boolean ;
    isCommandInterfaceCuisine: boolean ;
    statsComparaisonDifference: string ;
}

export class Institution {
    id?: string;
    name: string;
    city: string;
    postalAddress: string;
    phoneNumber: any;
    email: string;
    siretNumber: string;
    dailyTurnover?: number ;
    morningTurnover?: number ;
    eveningTurnover?: number ;
    weeklyTurnover?: number ;
    monthlyTurnover?: number ;
    yearlyTurnover?: number ;
    numberOfHapy?: number ;
    averageTicketPerHapy?: number ;
    averageServiceTime?: number ;
    amountOfHapyTips?: number ;
    institutionCategory?: InstitutionCategory ;
    teamMembers: TeamMember[] ;
    bookings:Booking[] ;
    tableQuantity: any;
    startTime: string ;
    endTime: string ;
    timeBetweenTwoService: string ;
    productCategories: CategoryOfProduct[] ;
    zones: Zone[] ;
    roomStations: Room[] ;
    barStations: Bartender[] ;
    numberOfBartender: number = 0 ;
    cuisineStations: CookingStation[] ;
    ingredientCategories: CategoryIngredient[] ;
    ingredients: Ingredient[] ;
    categoryOnMenus: CategoryOnMenu[] ;
    cookings: Cooking[] ;
    products: Product[] ;
    variants: Variant[] ;
    password?: string;
    resetToken?: string;
    resetTokenExpiration?: Date;
    resetPasswordRequestId?: string;
    /**************** DASHBOARD ATTRIBUTS ********************/
    objectifs: number[] ; // Represente la liste des objectifs de la semaine avec objectifs[1] correspond à Lundi et la valeur le chiffre à realisé
    hapyHourReducePourcent: number ;
    hapyHourStartTime: string ;
    hapyHourEndTime: string ;
    tipsPourcentInCommonPot: number ;
    isCommandInterfaceBar: boolean ;
    isCommandInterfaceCuisine: boolean ;
    statsComparaisonDifference: string ;
    /****************** TO ADD *****************************/
    isInscriptionFinished: boolean ;
}

export interface InstitutionCategory {
    id?: string ;
    name: string;
    createdAt: string ;
    updatedAt: string ;
}

export interface PhoneNumber {
    phone: string;
    isoCode: string;
    value: string;
    countryCode?: string;
}

export class Zone {
    id?: string ;
    name: string ;
    tableNumStart: number ;
    tableNumEnd: any ;
    numberOfTable: number ;
    tables: Table[];
    tableIds?: Table[];
}

export class Room {
    id?: string ;
    name: string ;
}

export class Bartender {
    id?: string ;
    name: string ;
}

export class CookingStation {
    id?: string ;
    name: string ;
}

export class TeamMember {
    id?: string ;
    picture?: string ;
    imageFile?: File;
    imageData?: any;
    firstName: string ;
    lastName: string ;
    role?: any ;
    email: string ;
    password?: string ;
    /********** TO ADD *************/
    fullName: string ;
    position: string ;
    monthlyPaid: number ;
    tipsHapy: number ;
    isWorking: boolean ;
    zoneAffectedName?: string ;
    institutionId: string ;
    institution: Institution ;
}

export class CategoryIngredient {
    id?: string ;
    name: string ;
    order?: number ;
    ingredients?: Ingredient[] ;
}

export class Ingredient {
    id?: string ;
    entitled: string ;
    stockQuantity: number ;
    limitBeforeAlert: number ;
    supplierReference: string ;
    measureUnit: string ; // Type to change in DB
    ingredientCategory?: CategoryIngredient ;
    ingredientCategoryId?: string;
}

export class CategoryOnMenu {
    id?: string ;
    name: string ;
    cookingStation: string ;  // Need to Change in DB
    order: number ;
}

export class CategoryOfProduct {
    id?: string ;
    name: string ;
    categoryOnMenu: CategoryOnMenu ;
    categoryOnMenuId?: string ;
    order?: number ;
    products?:Product[] ;
}

export class Cooking {
    id?: string ;
    name: string ;
    order?: number ;
}

export class Product {
    id?: string ;
    name: string ;
    productCategory: CategoryOfProduct;
    productCategoryId?: string ;
    cookingStation: string ;
    variants?: Variant[] = [] ;
    variantsId?: string[] = [] ;
    hapyHour?: boolean = false ;
}

export class Variant {
    id?: string ;
    picture?: any ;
    imageFile?: File;
    imageData?: any;
    name: string ;
    cooking?: Cooking ;
    cookingId?: string;
    sellingPrice: number ;
    crossedOutPrice?: number;
    description: string ;
    allergene: string ;
    productIngredients?: ProductIngredient[] = [] ;
    productIngredientsId?: string[] = [] ;
    createdAt: string ;
    updatedAt: string
}

export class ProductIngredient {
    id?: string ;
    ingredient?: Ingredient ;
    ingredientId?: string;
    ingredientEntitled?: string;
    quantity: number = 0;
    isIngredientModifiable: boolean ;
}


