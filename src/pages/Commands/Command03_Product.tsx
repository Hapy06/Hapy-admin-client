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
import {getAdminProcessValues, IMG_PATH, setProcessStored, updateTable} from "../../globals/GlobalVariables";
import {CommandProcessModel, SimpleCommand} from "../../globals/models/models";
import {Cooking, ProductIngredient, Variant} from "../../globals/models/Inscription.models";
import {homeProcessContext} from "../HomeContainer";

function Command03_Product(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [productVariantChoosed, setProductVariantChoosed] = useState<Variant>(commandProcess.productChoosed.variants[0]);
    const [cookingSelected, setCookingSelected] = useState(commandProcess.productChoosed.variants[0]?.cooking || null);
    const [listIngredient, setListIngredient] = useState<ProductIngredient[]>(commandProcess.productChoosed.variants[0]?.productIngredients?.filter(elt => elt.isIngredientModifiable));
    const [isPregnant, setIsPregnant] = useState<boolean>(false);
    // const [takeLater, setTakeLater] = useState<boolean>(false);
    const [optionListVariants, setOptionListVariants] = useState([]);
    const [optionListCuissons, setOptionListCuissons] = useState([]);
    const [optionListIngredient, setOptionListIngredient] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        if ( !commandProcess.allCommands || commandProcess.allCommands.length == 0) {
            commandProcess.allCommands = [] ;
        }
        let arr = [] ;
        commandProcess.variants?.forEach(variant => {
            arr.push({text:variant.name, value: variant}) ;
        }) ;
        setOptionListVariants([...arr]) ;
        arr = [] ;
        commandProcess.institution?.cookings?.forEach(cooking => {
            arr.push({text:cooking.name, value: cooking}) ;
        }) ;
        setOptionListCuissons([...arr]) ;
    }, []);

    const handleChangeVariant = (variant:Variant) => {
        setProductVariantChoosed(variant) ;
    } ;

    const handleChangeCooking = (cooking:Cooking) => {
        setCookingSelected(cooking) ;
    } ;

    const handleChangelistIngredient = (productIngredients:ProductIngredient[]) => {
        setListIngredient(productIngredients) ;
    } ;

    const handleValidateCommand = (takeLater: boolean) => {
        let newSimpleCommand: SimpleCommand = new SimpleCommand() ;
        newSimpleCommand.productVariant = productVariantChoosed ;
        newSimpleCommand.product = commandProcess.productChoosed ;
        newSimpleCommand.price = productVariantChoosed.sellingPrice ;
        newSimpleCommand.isPregnant = isPregnant ;
        newSimpleCommand.isValidated = !takeLater ;
        newSimpleCommand.status = takeLater ? "takeLater" : "choosed" ;
        newSimpleCommand.ingredientsModifiablesStates = [] ;
        commandProcess.productChoosed.variants[0]?.productIngredients?.filter(elt => elt.isIngredientModifiable).forEach((ingredient:ProductIngredient) => {
            listIngredient.includes(ingredient) ?
                newSimpleCommand.ingredientsModifiablesStates.push('avec ' + ingredient.ingredient.entitled) :
                newSimpleCommand.ingredientsModifiablesStates.push('sans ' + ingredient.ingredient.entitled)
        }) ;
        let temp = commandProcess ;
        temp.productVariantChoosed = null ;
        temp.categoryOfProductChoosed = null ;
        temp.allCommands.push(newSimpleCommand) ;
        setCommandProcess(temp) ;
        setProcessStored('commandProcess', temp) ;
        updateTable(temp) ;
        navigate('/command') ;
    } ;

    const divideNumber = (value:number) => { return value.toLocaleString()} ;
    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                           title={commandProcess?.productVariantChoosed?.name}
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/command/sub-category')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <img src={ IMG_PATH + ( commandProcess?.productVariantChoosed?.picture || 'burger.jpg') } alt="product" /*le / indique le folder du index.html dans dist */
                     className="product-image" style={{width:screenWidth, marginTop:-20, marginLeft:-24}}/>
                 <br/> <br/>
                 <div>
                     <span className="f-20"> {divideNumber(productVariantChoosed.sellingPrice)} € </span>
                     {productVariantChoosed.crossedOutPrice && (
                        <span className="old-price fw-5 f-16 -mt-2">{divideNumber(productVariantChoosed.crossedOutPrice)} €</span>
                     )}
                 </div>
                <br/>
                <HapySelect defaultOption={{text:'Recette', value:productVariantChoosed}} selectValue={productVariantChoosed} setSelectValue={(value)=>handleChangeVariant(value)} optionList={optionListVariants} />
                <br/>
                <HapySelect defaultOption={{text:'Cuisson', value:cookingSelected}} selectValue={cookingSelected} setSelectValue={(value)=>handleChangeCooking(value)} optionList={optionListCuissons} />
                <br/> <br/>
                <div>
                    <span><IconAlarm width={24} height={24} stroke={'#323232'}/></span>
                    <span className="f-20" style={{marginLeft:20}}>Une information ?</span>
                    <br/> <br/>
                    <p>{productVariantChoosed.description}</p>
                </div>
                <div>
                    <span><IconInfoCircle width={24} height={24} stroke={'#323232'}/></span>
                    <span className="f-20" style={{marginLeft:20}}>Allergènes</span>
                    <br/> <br/>
                    <p className="fw-5">
                        {productVariantChoosed.allergene}
                    </p>
                </div>
                <br/>
                <HapyMultiSelect selectValues={listIngredient} setSelectValues={(value) => handleChangelistIngredient(value)}
                                 labelText={'Modifier les Ingredients'} labelTextEdited={'Ingredients Modifiés'}
                                 optionList={optionListIngredient} />
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
                            backgroundColor:isPregnant ? '#536DFE' : ''}} type="checkbox"
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
                <HapyButtonWithIcon btnClass={"text-blue"} text="Commander" handleClick={()=>handleValidateCommand(false)} iconComponent={ <IconChecked width={32} height={32} stroke={'#323232'} /> } />
                <br/>
                <HapyButtonWithIcon text="Pour plus tard" handleClick={()=>handleValidateCommand(true)} iconComponent={ <IconTimer opacity={1}/> } />
                <br/>
            </div>
        </>
    )
}
export default Command03_Product
