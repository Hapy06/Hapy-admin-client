import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyMobileTop from "../../components/HapyMobileTop";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconLose from "../../globals/icons-components/IconLose";
import HapySearch from "../../components/HapySearch";
import IconChecked from "../../globals/icons-components/IconChecked";
import {customStyles} from "../../globals/models/models";
import Modal from 'react-modal';
import PerteModal from "./PerteModal";
import {Product, TeamMember, Variant} from "../../globals/models/Inscription.models";
import axios from "axios";
import {API_REQUEST_PRODUCT, BASE_URL, getAdminProcessValues} from "../../globals/GlobalVariables";
import PullToRefresh from "react-simple-pull-to-refresh";

function Perte(props) {
    const [loadMessage, setLoadMessage] = useState<string>("(Pas de produits trouvé)");
    const [listProducts, setListProducts] = useState<Product[]>([]);
    const [listProductsInitial, setListProductsInitial] = useState<Product[]>([]);
    const [listVariantChoosed, setListVariantChoosed] = useState<Variant[]>([]);
    const [listVariantSelectedWithQty, setListVariantSelectedWithQty] = useState({});
    const [totalQty, setTotalQty] = useState<number>(0);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>("");
    const [modalState, setModalState] = useState<{
        blur: string,
        modalToOpen: any
    }>({blur: '', modalToOpen: null});

    const handleSearch = (value) => {
        let arr:Product[] = [] ;
        listProductsInitial.forEach(product => {
            if (product.name.toLowerCase().includes(value.toLowerCase())) {
                arr.push(product) ;
            }
        }) ;
        setListProducts([...arr]) ;
        setSearchValue(value) ;
    }


    const handleOpenModal = (modalToOpen) => {
        let arr:Variant[] = [] ;
        listProducts.forEach(product => {
            product.variants.forEach(variant => {
                if (listVariantSelectedWithQty[variant.id] && listVariantSelectedWithQty[variant.id] > 0) {
                    arr.push(variant) ;
                }
            })
        }) ;
        if (arr.length > 0) {
            // setListVariantChoosed(arr) ;
            if (modalToOpen == "PerteModal") {
                setModalState({blur :'blur-bg', modalToOpen:
                        <PerteModal listVariantChoosed={arr} listVariantSelectedWithQty={listVariantSelectedWithQty}
                                    totalQty={totalQty} handleCloseModal={handleCloseModal}/>
                }) ;
            } else {
                setModalState({blur: 'blur-bg', modalToOpen: modalToOpen});
            }
        }
    } ;

    const handleCloseModal = () => {
        setModalState({blur :'', modalToOpen:null}) ;
    } ;

    useEffect(()=>{
        window.scrollTo(0, 0);
        handleLoadData() ;
    }, []) ;

    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_PRODUCT + '/byInstitutionId/' + getAdminProcessValues("userLogged").institution.id + '?page=0 &size=1000',
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            console.log(response)
            if (response.data.data.items.length > 0) {
                let arr = response.data.data.items.sort((a,b) => a.name.localeCompare(b.name)) ;
                setListProducts([...arr]) ;
                setListProductsInitial([...arr]) ;
            } else {
                setLoadMessage("(Pas de produits trouvé)") ;
            }
            // console.log(zoneToShow) ;
            return true ;
        }) .catch(error => {
                console.error(error);
                setLoadMessage('(Erreur de Chargement, Veuillez ressayez...)');
                throw error; });
    } ;

    const handleSelectedVariant = (variantId:string) => {
        // console.log(variantId) ;
        let temp = {...listVariantSelectedWithQty} ;
        temp[variantId] = 0 ;
        console.log(temp) ;
        setListVariantSelectedWithQty({...temp}) ;
    } ;

    const handleUnselectedVariant = (variantId:string) => {
        // console.log(variantId) ;
        let temp = {...listVariantSelectedWithQty} ;
        temp[variantId] = null ;
        console.log(temp) ;
        setListVariantSelectedWithQty({...temp}) ;
    } ;

    const handleQtyChange = (variantId: string, increaseOrDescrease: 'increase' | 'decrease') => {
        let temp = {...listVariantSelectedWithQty} ;
        if (increaseOrDescrease == "increase") {
            temp[variantId] += 1 ;
            setTotalQty(totalQty + 1) ;
        } else {
            if (temp[variantId] > 0) {
                temp[variantId] -= 1 ;
                setTotalQty(totalQty - 1) ;
            }
        }
        setListVariantSelectedWithQty({...temp}) ;
    } ;

    return (
        <>
            <div className={modalState.blur}>
                <HapyMobileTop showWelcome2AndMenu={false}
                              subtitleStart={getAdminProcessValues("userLogged").firstName}
                              subtitleStartClassName="text-red-orange"
                              subtitleEnd={getAdminProcessValues("userLogged").lastName}
                              title="Noter une perte"
                              showBtnBack={true}
                              handleClickBtnBack={() => navigate('/home')}
                              showRightSideBtn={false}
                              hapyLogoBtnColor={"#FF6063"}

            />
                <div className="happy-div-bottom">
                    <HapySearch inputValue={searchValue} handleChange={(e) => handleSearch(e.target.value)}
                                placeholder="Rechercher un produit"/>
                    <br/><br/>
                    <PullToRefresh onRefresh={handleLoadData}>
                        <>

                            {listProducts.length > 0 ? (
                                listProducts.map((product: Product, index) => (
                                    <div key={product.id}>
                                        <span className="f-20">{product.name}</span>
                                        <br/><br/>
                                        {product.variants.map((variant: Variant, index: number) => (
                                            listVariantSelectedWithQty[variant.id] != null ? (
                                                <div key={variant.id} className="row mb-3 fw-5">
                                                    <span className="col-2"
                                                          onClick={() => handleUnselectedVariant(variant.id)}><IconChecked
                                                        fill={'#FF6063'} stroke={'white'}/></span>
                                                    <span className="col-6 mt-1">{variant.name}</span>
                                                    <span className="col-4 mt-1">
                                                        <span style={{cursor: "pointer"}}
                                                              onClick={() => handleQtyChange(variant.id, "increase")}>+</span>
                                                        <span
                                                            className="text-red-orange ml-2 mr-2 fw-6">{listVariantSelectedWithQty[variant.id]}</span>
                                                        <span style={{cursor: "pointer"}}
                                                              onClick={() => handleQtyChange(variant.id, "decrease")}>-</span>
                                            </span>
                                                </div>
                                            ) : (
                                                <div key={variant.id} className="row mb-3 fw-5">
                                            <span className="col-2" onClick={() => handleSelectedVariant(variant.id)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.25" y="0.25" width="23.5" height="23.5" rx="11.75"
                                                      fill="white" stroke="#C8C8C8" strokeWidth="0.5"/>
                                                </svg>
                                            </span>
                                                    <span className="col-6 mt-1">{variant.name}</span>
                                                </div>
                                            )
                                        ))}

                                    </div>
                                ))
                            ) : (
                                <div className="text-center">{loadMessage} <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                </div>
                            )}
                        </>
                    </PullToRefresh>
                    <br/><br/><br/>
                    <div className="horizontal-center inner-button-container-validate-btn mt-4" style={{position:"fixed"}}>
                        <HapyButtonWithIcon text="Noter comme perte" handleClick={() => {
                            handleOpenModal( "PerteModal")
                        }}
                                            btnWidth={350} numberAtEnd={totalQty + ''} numberAtEndColor={"#FF6063"}
                                            iconComponent={<IconLose/>}/>
                    </div>
                </div>
            </div>
            {/*<div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <PerteModal listVariantChoosed={listVariantChoosed} listVariantSelectedWithQty={listVariantSelectedWithQty}
                                totalQty={totalQty} handleCloseModal={closeModal}/>
                </Modal>
            </div>*/}
            {modalState.modalToOpen && (modalState.modalToOpen)}
        </>
    )
}
export default Perte
