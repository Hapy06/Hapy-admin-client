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
    // const [listProducts, setListProducts] = useState<any[]>([]);
    const [listProductsSearched, setListProductsSearched] = useState<Product[]>([]);
    const [searchKey, setSearchKey] = useState<string>(null);
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        /*getRequest('listCategoryOnMenu', (res) => {

        }) ;*/
        /*setListProducts([
            {name:'Product 1', cookingStation:null, productCategory: null, variants:[
                    {name:'Classique', price:50.45, cookingMethod: 'Saignant', description: 'desc', allergens: 'allergens',
                    image:'1.png', listIngredientForCooking: []
                    }
                ]}
        ])*/
    }, []);

    const handleSearchForm = (e) => {
        const { name, value } = e.target;
        if (value) {
            setListProductsSearched(commandProcess.products.filter((product:Product) => {
                return product.name.toLowerCase().includes(searchKey.toLowerCase())
            }) ) ;
        }
        setSearchKey(value) ; /*.toLowerCase().includes(searchKey.toLowerCase()) || */
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
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <div className="pt-4">
                    <HapySearch inputValue={searchKey} handleChange={handleSearchForm} placeholder={"Rechercher un produit"}/>
                </div>
                {(searchKey && searchKey != '') ? (
                    listProductsSearched.map((product: Product, index: number) => (
                        <div key={index}>
                            <br/>
                            <HapyButtonWithoutIcon text={product.name} handleClick={() => null}/>
                        </div>
                    ))
                ) : (
                    commandProcess.categoryOfProductChoosed.products.map((product, indexProduct) => (
                        <div key={indexProduct}>
                            <br/>
                            <HapyButtonWithoutIcon text={product.name}
                                                   handleClick={() => handleProductChoosed(product)}/>
                        </div>
                    ))
                )}
                {/*<HapyButtonWithoutIcon text="Fish and chips" handleClick={()=>{navigate('/command/product')}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Truite" handleClick={()=>{}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Carpe" handleClick={()=>{}}/>
                <br/> <br/>
                <HapyButtonWithoutIcon text="Poisson rouge" handleClick={()=>{}}/>*/}
            </div>
        </>
    )
}
export default Command02_SubCategory
