import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapyMobileTop from "../../components/HapyMobileTop";
import {getAdminProcessValues, setProcessStored} from "../../globals/GlobalVariables";
import {Product} from "../../globals/models/Inscription.models";
import {CommandProcessModel} from "../../globals/models/models";
import HapySearch from "../../components/HapySearch";
import {homeProcessContext} from "../HomeContainer";

function Command02_SubCategory(props) {
    const {commandProcess, setCommandProcess} = useContext<{commandProcess:CommandProcessModel,setCommandProcess:any}>(homeProcessContext) ;
    const [listProductsSearched, setListProductsSearched] = useState<Product[]>([]);
    const [searchKey, setSearchKey] = useState<string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSearchForm = (e) => {
        const { name, value } = e.target;
        if (value) {
            let array = [] ;
            commandProcess.categoryOfProductChoosed?.products?.filter(elt => elt.variants?.length > 0).forEach((product:Product) => {
                if (product.name.toLowerCase().includes(value.toLowerCase())) {
                    array.push(product) ;
                }
            } ) ;
            setListProductsSearched(array) ;
            setSearchKey(value) ;
        }
    } ;

    const handleProductChoosed = (productChoosed: Product) => {
        console.log("productChoosed => ") ;
        console.log(productChoosed) ;
        let temp = commandProcess ;
        temp.productChoosed = productChoosed ;
        setCommandProcess(temp) ;
        setProcessStored('commandProcess', temp) ;
        navigate('/command/product') ;
    } ;

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.lastName || "Hâpy"}
                           title={commandProcess?.categoryOfProductChoosed?.name}
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/command')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <HapySearch inputValue={searchKey} handleChange={handleSearchForm} placeholder={"Rechercher un produit"}/>
                {(searchKey && searchKey != '') ? (
                    listProductsSearched.map((product: Product, index: number) => (
                        <div key={index}>
                            <br/>
                            <HapyButtonWithoutIcon text={product.name} handleClick={() => handleProductChoosed(product)}/>
                        </div>
                    ))
                ) : (
                    commandProcess.categoryOfProductChoosed?.products?.filter(elt => elt.variants?.length > 0).map((product, indexProduct) => (
                        <div key={indexProduct}>
                            <br/>
                            <HapyButtonWithoutIcon text={product.name}
                                                   handleClick={() => handleProductChoosed(product)}/>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
export default Command02_SubCategory
