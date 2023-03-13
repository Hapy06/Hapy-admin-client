import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconAlarm from "../../globals/icons-components/IconAlarm";
import IconInfoCircle from "../../globals/icons-components/IconInfoCircle";
import IconTimer from "../../globals/icons-components/IconTimer";
import IconDoubleHeart from "../../globals/icons-components/IconDoubleHeart";
import IconChecked from "../../globals/icons-components/IconChecked";
import HapyMobileTop, {screenWidth} from "../../components/HapyMobileTop";
import HapySelect from "../../components/HapySelect";
import HapyMultiSelect from "../../components/HapyMultiSelect";
import {
    getAdminProcessValues,
    IMG_PATH,
    IMG_PATH_ONLINE,
    setProcessStored
} from "../../globals/GlobalVariables";
import {CommandProcessModel, SimpleCommand} from "../../globals/models/models";
import {Cooking, ProductIngredient, Variant} from "../../globals/models/Inscription.models";
import {homeProcessContext} from "../HomeContainer";

function Command03_Product(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [productVariantChoosed, setProductVariantChoosed] = useState<Variant>(commandProcess.productChoosed.variants[0]);
    const [cookingSelected, setCookingSelected] = useState(commandProcess.productChoosed.variants[0]?.cooking || null);
    const [listIngredient, setListIngredient] = useState<ProductIngredient[]>(productVariantChoosed?.productIngredients.filter(elt => elt.isIngredientModifiable) || []);
    const [isPregnant, setIsPregnant] = useState<boolean>(false);
    const [optionListVariants, setOptionListVariants] = useState([]);
    const [optionListCuissons, setOptionListCuissons] = useState([]);
    const [optionListIngredient, setOptionListIngredient] = useState([]);
    let timeNow = new Date().getHours() + ":" + new Date().getMinutes() ;
    if (timeNow.length == 4) timeNow = "0" + timeNow ;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        if ( !commandProcess.allCommands || commandProcess.allCommands.length == 0) {
            commandProcess.allCommands = [] ;
        }
        let arr = [] ;
        commandProcess.productChoosed.variants?.forEach(variant => {
            arr.push({text:variant.name, value: variant}) ;
        }) ;
        setOptionListVariants([...arr]) ;
        arr = [] ;
        commandProcess.productChoosed.variants[0]?.productIngredients?.filter(elt => elt.isIngredientModifiable).forEach((ingredient:ProductIngredient) => {
            arr.push({text:ingredient?.ingredient?.entitled, value: ingredient}) ;
        }) ;
        setOptionListIngredient([...arr]) ;
    }, []);

    const handleChangeVariant = (variant:Variant) => {
        console.log("variant choosed: ", variant)
        setProductVariantChoosed(variant) ;
        let arr = [] ;
        variant.productIngredients?.filter(elt => elt.isIngredientModifiable).forEach((ingredient:ProductIngredient) => {
            arr.push({text:ingredient?.ingredient?.entitled, value: ingredient}) ;
        }) ;
        setOptionListIngredient([...arr]) ;
        console.log(variant?.productIngredients?.filter(elt => elt.isIngredientModifiable)) ;
        if (variant.cooking) {
            setOptionListCuissons([{text: productVariantChoosed.cooking.name, value: productVariantChoosed.cooking}]);
        }
    } ;

    const handleChangeCooking = (cooking:Cooking) => {
        setCookingSelected(cooking) ;
    } ;

    const handleChangelistIngredient = (productIngredients:ProductIngredient[]) => {
        console.log("ingredient choosed: ", productIngredients) ;
        setListIngredient(productIngredients) ;
    } ;

    const handleValidateCommand = (takeLater: boolean) => {
        let newSimpleCommand: SimpleCommand = new SimpleCommand() ;
        newSimpleCommand.productVariant = productVariantChoosed ;
        newSimpleCommand.product = commandProcess.productChoosed ;
        newSimpleCommand.price = calculateNewPriceIfProductIsHapyHour(productVariantChoosed.sellingPrice) ;
        newSimpleCommand.isPregnant = isPregnant ;
        newSimpleCommand.isValidated = !takeLater ;
        newSimpleCommand.status = takeLater ? "takeLater" : "choosed" ;
        newSimpleCommand.ingredientsModifiablesStates = [] ;
        productVariantChoosed?.productIngredients?.filter(elt => elt.isIngredientModifiable).forEach((ingredient:ProductIngredient) => {
            if (!listIngredient.includes(ingredient)) {
                newSimpleCommand.ingredientsModifiablesStates.push('sans ' + ingredient.ingredient?.entitled)
            }
        }) ;
        let temp = {...commandProcess} ;
        temp.productVariantChoosed = null ;
        temp.categoryOfProductChoosed = null ;
        temp.allCommands.push(newSimpleCommand) ;
        setCommandProcess(temp) ;
        setProcessStored('commandProcess', temp) ;
        navigate('/command') ;
    } ;

    const divideNumber = (value:number) => { return value.toLocaleString()} ;

    const calculateNewPriceIfProductIsHapyHour = (price:number) => {
        let newPrice = price ;
        // Check if product is hapy hour and its happy hour time in commandProcess.institution
        const hapyHourStartTime = commandProcess?.institution?.hapyHourStartTime ;
        const hapyHourEndTime = commandProcess?.institution?.hapyHourEndTime ;
        if (commandProcess?.productChoosed?.hapyHour && timeNow >= hapyHourStartTime && timeNow <= hapyHourEndTime) {
            newPrice = price - (price * (commandProcess?.institution?.hapyHourReducePourcent || 0) / 100) ;
        }
        return newPrice ;
    }

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                           title={<span>{commandProcess.categoryOfProductChoosed?.name} <br/> {productVariantChoosed?.name}</span>}
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/command/sub-category')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <img src={ (productVariantChoosed?.picture && productVariantChoosed?.picture?.length > 0) ?
                    IMG_PATH_ONLINE + productVariantChoosed?.picture : IMG_PATH + 'bg-gray.png' } alt="product" /*le / indique le folder du index.html dans dist */
                     className="product-image" style={{width:screenWidth, marginTop:-24, marginLeft:-24}}/>
                <br/> <br/>
                {(commandProcess.productChoosed.hapyHour
                    && timeNow >= commandProcess?.institution?.hapyHourStartTime
                    && timeNow <= commandProcess?.institution?.hapyHourEndTime ) ? (
                    <div>
                        <span className="f-20"> {divideNumber( calculateNewPriceIfProductIsHapyHour(productVariantChoosed?.sellingPrice) || 0)} € </span>
                        <span className="old-price fw-5 f-16">{divideNumber(productVariantChoosed.sellingPrice)} €</span>
                        <span> (Hapy-Hour : {commandProcess.institution.hapyHourReducePourcent})</span>
                    </div>
                ) : (
                    <div>
                        <span className="f-20"> {divideNumber(productVariantChoosed?.sellingPrice || 0)} € </span>
                        { productVariantChoosed?.crossedOutPrice !== 0 && (
                            <span className="old-price fw-5 f-16">{divideNumber(productVariantChoosed?.crossedOutPrice)} €</span>
                        )}
                    </div>
                )}
                <br/>
                <HapySelect defaultBtnText={"Une autre recette ?"} selectValue={productVariantChoosed} setSelectValue={(value)=>handleChangeVariant(value)} optionList={optionListVariants} />
                {productVariantChoosed.cooking && (
                    <>
                        <br/>
                        <HapySelect defaultBtnText={"Cuisson"} selectValue={cookingSelected} setSelectValue={(value)=>handleChangeCooking(value)} optionList={optionListCuissons} />
                    </>
                )}
                <br/> <br/>
                {productVariantChoosed.description && productVariantChoosed.description.length > 0 && productVariantChoosed?.description != 'undefined'  && (
                    <div className="mb-3">
                        {/*<span><IconAlarm width={24} height={24} stroke={'#323232'}/></span>*/}
                        <span className="f-20">La recette du chef</span>
                        <div style={{marginTop:24}}>{productVariantChoosed.description}</div>
                    </div>
                )}
                {productVariantChoosed.allergene && productVariantChoosed.allergene.length > 0 && productVariantChoosed?.allergene != 'undefined'  && (
                    <div style={{marginTop:32}}>
                        <span><IconInfoCircle width={24} height={24} stroke={'#323232'}/></span>
                        <span className="f-20 fw-5 f-16 fw-4" style={{marginLeft:8}}>Les allergènes</span>
                        <div className="fw-4 f-16" style={{marginTop:24}}>
                            {productVariantChoosed.allergene}
                        </div>
                    </div>
                )}
                <br/>
                {productVariantChoosed?.productIngredients?.filter(elt => elt.isIngredientModifiable).length > 0 && (
                    <>
                        <HapyMultiSelect selectValues={listIngredient} setSelectValues={(value) => handleChangelistIngredient(value)}
                                         labelText={'Modifier les Ingredients'} labelTextEdited={'Ingredients Modifiés'}
                                         optionList={optionListIngredient} />
                    </>
                )}
                <br/>
                {/*<div style={{marginLeft:32}}>
                    <div className="form-check">
                        <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15,
                            backgroundColor:isPregnant ? '#536DFE' : ''}} type="checkbox"
                               checked={takeLater} onChange={()=>{setTakeLater(!takeLater)}}/>
                        <label className={takeLater ? "form-check-label" : "form-check-label text-disabled"}>
                            <div>
                                <span> <IconTimer width={24} height={24} opacity={takeLater ? 1 : 0.32} /> </span>
                                <span>Prendre plus tard</span>
                            </div>
                        </label>
                    </div>
                </div>*/}
                <br/>
                <div style={{marginLeft:32}}>
                    <div className="form-check">
                        <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15,
                            backgroundColor:isPregnant ? '#FF6063' : ''}} type="checkbox"
                               checked={isPregnant} onChange={()=>{setIsPregnant(!isPregnant)}}/>
                        <label className={isPregnant ? "form-check-label" : "form-check-label text-disabled"}>
                            <div>
                                <span> <IconDoubleHeart width={24} height={24} opacity={isPregnant ? 1 : 0.32} /> </span>
                                <span>Je suis enceinte</span>
                            </div>
                        </label>
                    </div>
                </div>
                <br/> <br/>
                <HapyButtonWithIcon text="Pour plus tard" handleClick={()=>handleValidateCommand(true)} iconComponent={ <IconTimer styleIcon={{width:32}} opacity={1}/> } />
                <br/>
                <HapyButtonWithIcon textColor={"#FF6063"} text="Commander" handleClick={()=>handleValidateCommand(false)} iconComponent={ <IconChecked width={32} height={32} stroke={'#FF6063'} /> } />
                <br/>
            </div>
        </>
    )
}
export default Command03_Product
