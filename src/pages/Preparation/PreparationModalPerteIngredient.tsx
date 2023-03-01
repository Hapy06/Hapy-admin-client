import React, {useContext, useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconLose from "../../globals/icons-components/IconLose";
import {useNavigate} from "react-router";
import {Ingredient, ProductIngredient, Variant} from "../../globals/models/Inscription.models";
import {HomeProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";
import {
    API_REQUEST_INGREDIENT_LOST,
    API_REQUEST_PRODUCT_LOST, getAdminProcessValues,
    MSG_ERROR,
    MSG_SAVING,
    postRequest
} from "../../globals/GlobalVariables";

type PropsType = {
    handleCloseModal: any ;
    listIngredientChoosed: ProductIngredient[] ;
    listIngredientSelectedWithQty: any ;
    totalQty: number ;
    ingredientsVariant?: any;
}


function PreparationModalPerteIngredient(props:PropsType) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [loseValidated, setLoseValidated] = useState(false);
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');
    const navigate = useNavigate();

    const handleValidateLose = () => {
        showErrorFunction(MSG_SAVING, "text-success") ;
        let arr:{ingredientId: string, quantity:number} [] = [] ;
        props.ingredientsVariant.forEach(ingredient => {
            arr.push({ingredientId:ingredient.productIngredientId, quantity:ingredient.qty}) ;
        }) ;
        console.log(arr) ;
        /*postRequest(API_REQUEST_INGREDIENT_LOST, {ingredientLost:arr},
            ()=>{setLoseValidated(true) ;},
            ()=>{showErrorFunction(MSG_ERROR)}) ;*/
    } ;

    const showErrorFunction = (errorMessage: string, color:'text-success' | 'text-danger' = "text-danger" , timeout: number = 5000) => {
        setErrorMessageColor(color) ;
        setErrorMessage(errorMessage) ;
        setShowError(true) ;
        setTimeout(()=>{
            setShowError(false) ;
        }, timeout) ;
    } ;

    return (
        <div className="container_popup">
            {loseValidated ? (
                <div className="popup">
                    <br/><br/><br/>
                    <div className="text-center mb-5">
                        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.9072 39.6799L64.0005 66.9332L110.774 39.8398" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M64 115.253V66.8799" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M115.254 48.9066V79.0935C115.254 79.3602 115.254 79.5732 115.2 79.8399C111.467 76.5866 106.667 74.6667 101.334 74.6667C96.3203 74.6667 91.6803 76.4268 88.0003 79.3601C83.0937 83.2534 80.0003 89.2801 80.0003 96.0001C80.0003 100 81.1202 103.787 83.0936 106.987C83.5736 107.84 84.1603 108.64 84.8003 109.387L75.0404 114.774C68.9604 118.187 59.0403 118.187 52.9603 114.774L24.4803 98.9867C18.027 95.4134 12.7471 86.4535 12.7471 79.0935V48.9066C12.7471 41.5466 18.027 32.5867 24.4803 29.0134L52.9603 13.2266C59.0403 9.81329 68.9604 9.81329 75.0404 13.2266L103.52 29.0134C109.974 32.5867 115.254 41.5466 115.254 48.9066Z" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M122.667 96.0001C122.667 100 121.547 103.787 119.573 106.987C118.453 108.907 117.013 110.613 115.36 112C111.627 115.36 106.72 117.333 101.333 117.333C93.5467 117.333 86.7733 113.173 83.0933 106.987C81.1199 103.787 80 100 80 96.0001C80 89.2801 83.0933 83.2534 88 79.3601C91.68 76.4268 96.32 74.6667 101.333 74.6667C113.12 74.6667 122.667 84.2134 122.667 96.0001Z" stroke="#323232" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M107.04 101.547L95.7334 90.2935" stroke="#FF6063" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M106.934 90.4536L95.627 101.707" stroke="#FF6063" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="text-center">
                        Les pertes sont notées
                    </div>
                    <br/><br/><br/><br/>
                    <HapyButtonWithIcon text="Retour à votre interface" handleClick={()=>navigate(('/home'))}
                                        iconComponent={<IconArrowLeft/>}/>
                </div>
            ) : (
                <div className="popup">
                    <button className="back-btn-modal" style={{float: "left", marginTop:-5}}
                            onClick={props.handleCloseModal}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 9, marginRigth:9 }} />
                    </button>
                    <br/><br/><br/>
                    <p className="text-black">
                        <span className="text-red-orange mr-1">
                            {getAdminProcessValues('userLogged').firstName}
                        </span>
                        {getAdminProcessValues('userLogged').lastName}
                    </p>
                    <h1 className="text-black f-32 fw-6">Noter en perte</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width:22}}/>
                    </div>
                    <br/>
                    {props.ingredientsVariant.map(productIngredient => (
                        <div className="row">
                            <span className="text-red-orange col-6 fw-6">
                                {productIngredient.productIngredientId ? productIngredient.productIngredientEntitled : productIngredient.variantName}
                            </span>
                            <span className="fw-6 col-6">
                                {productIngredient.qty}
                            </span>
                            <br/><br/>
                        </div>
                    ))}
                    {/* {props.listIngredientChoosed.map(productIngredient => (
                        <div>
                            <span className="text-red-orange ml-4 mr-4 fw-6">{props.listIngredientSelectedWithQty[productIngredient.id]}</span> {productIngredient.ingredientEntitled} <br/><br/>
                        </div>
                    ))} */}
                    <br/><br/><br/><br/>
                    {showError && (<div className={"mb-3 text-center " + errorMessageColor}>{errorMessage}</div>)}
                    <HapyButtonWithIcon text="Valider la perte" handleClick={handleValidateLose}
                                        numberAtEnd={props.totalQty + ''} numberAtEndColor={"#FF6063"} iconComponent={<IconLose/>}/>
                </div>
            )}
        </div>
    )
}
export default PreparationModalPerteIngredient
