import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapySearch from "../../components/HapySearch";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import HapyMobileTop from "../../components/HapyMobileTop";
import {getAdminProcessValues, setProcessStored} from "../../globals/GlobalVariables";
import {CategoryOfProduct} from "../../globals/models/Inscription.models";
import {CommandProcessModel} from "../../globals/models/models";
import {homeProcessContext} from "../HomeContainer";

function Command01_Category(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [listCategoryProductsSearched, setListCategoryProductsSearched] = useState<CategoryOfProduct[]>([]);
    const [searchKey, setSearchKey] = useState<string>('');
    const [showValidateBtn, setShowValidateBtn] = useState<boolean>((commandProcess.allCommands && commandProcess.allCommands.length > 0 ));
    const navigate = useNavigate();

    const handleSearchForm = (e) => {
        const { name, value } = e.target;
        if (value) {
            setListCategoryProductsSearched(commandProcess.productCategories.filter((category:CategoryOfProduct) => {
                return category.name.toLowerCase().includes(searchKey.toLowerCase())
            }) ) ;
        }
        setSearchKey(value) ; /*.toLowerCase().includes(searchKey.toLowerCase()) || */
    } ;

    const handleCategoryOfProductChoosed = (categoryOfProductChoosed: CategoryOfProduct) => {
        console.log("categoryOfProductChoosed => ") ;
        console.log(categoryOfProductChoosed) ;
        let temp = commandProcess ;
        temp.categoryOfProductChoosed = categoryOfProductChoosed ;
        setCommandProcess(temp) ;
        setProcessStored('commandProcess', temp) ;
        navigate('/command/sub-category') ;
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                subtitleStartClassName="text-red-orange"
                subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                title="Servez-vous"
                showBtnBack={true}
                handleClickBtnBack={()=>navigate('/table-opened')}
                showRightSideBtn={false}
                hapyLogoBtnColor={"#FF6063"}
            />
            <div className="happy-div-bottom">
                <HapySearch inputValue={searchKey} handleChange={handleSearchForm} placeholder={"Rechercher une Categorie"}/>
                { ( searchKey && searchKey != '') ? (
                    listCategoryProductsSearched.map( (category:CategoryOfProduct, index:number) => (
                        <div key={index}>
                            <br/>
                            <HapyButtonWithoutIcon text={category.name} handleClick={()=>handleCategoryOfProductChoosed(category)}/>
                        </div>
                    ) )
                ) : (
                    commandProcess.categoriesOnMenu?.map((categoryOnMenu, indexOnMenu) => (
                        <div key={categoryOnMenu.id}>
                            <br/>
                            <h5>{categoryOnMenu.name}</h5>
                            {categoryOnMenu.productCategories?.map( (categoryOfProduct, index) => (
                                <div key={categoryOfProduct.id}>
                                    <br/>
                                    <HapyButtonWithoutIcon text={categoryOfProduct.name} handleClick={()=>handleCategoryOfProductChoosed(categoryOfProduct)}/>
                                </div>
                            ) ) }
                        </div>

                    ))
                )}
                <br/> <br/> <br/>
                <div className={showValidateBtn ? "text-center inner-button-container-validate-btn" : "text-center inner-button-container"}>
                    <IconArrowDown width={32} height={32} stroke={'black'} styleIcon={showValidateBtn ? {marginTop:-30} : {marginTop:30}} />
                    {showValidateBtn && (
                        <div className="horizontal-center">
                            <HapyButtonWithIcon text="Valider votre commande" handleClick={()=>{navigate('/command/validationProgress')}}
                                                btnWidth={350}
                                                iconComponent={<IconVerify width={32} height={32} stroke={'black'}/>}/>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}
export default Command01_Category
