import React, {useEffect, useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconLose from "../../globals/icons-components/IconLose";
import {useNavigate} from "react-router";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapySearch from "../../components/HapySearch";
import IconOrder from "../../globals/icons-components/IconOrder";
import IconVerify from "../../globals/icons-components/IconVerify";
import axios from 'axios'
import {
    API_REQUEST_INGREDIENT, API_REQUEST_INGREDIENT_LOST,
    BASE_URL,
    getAdminProcessValues, MSG_ERROR,
    MSG_SAVING,
    postRequest
} from '../../globals/GlobalVariables';
import { Ingredient } from '../../globals/models/Inscription.models';
import {string} from "prop-types";

type PropsType = {
    handleCloseModal: any ;
}


function PreparationModalToTrash(props:PropsType) {

    const [listIngredients, setListIngredients] = useState<Ingredient[]>([]);
    const [listIngredientsInitial, setListIngredientsInitial] = useState<Ingredient[]>([]);
    const [listIngredientsToTrash, setListIngredientsToTrash] = useState([])
    const [searchKey, setSearchKey] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');

    const handleSearch = (value: string) => {
        //  Search in the list of ingredients inital and set the list of ingredients
        let arr = listIngredientsInitial.filter((item) => {
            return item.entitled.toLowerCase().includes(value.toLowerCase());
        });
        setListIngredients(arr);
        setSearchKey(value);
    }

    const handleValidate = () => {
        showErrorFunction(MSG_SAVING, "text-success");
        let ingredientLost = [] ;
        listIngredientsToTrash.forEach((item) => {
            ingredientLost.push({ ingredientId: item, quantity: 1 }) ;
        }) ;
        console.log(ingredientLost)
        postRequest(API_REQUEST_INGREDIENT_LOST, { ingredientLost: ingredientLost },
            () => {
                props.handleCloseModal() ;
            },
            (err) => {
                showErrorFunction(MSG_ERROR, "text-danger");
            }) ;

    }

    useEffect(() => {
        handleLoadData()
        .then(fullfilled => console.log(listIngredients))
        .catch(err => console.log(err))
    },[])
  
    const handleLoadData = () => {
        return axios.get(BASE_URL + API_REQUEST_INGREDIENT + '/byInstitutionId/' + getAdminProcessValues("userLogged").institution.id,
            { headers: { Authorization: `Bearer ${getAdminProcessValues("authToken")}`} }).then((response) => {
            if (response.data.data.items.length > 0) {
                let arr = response.data.data.items ;
                console.log(arr)
                setListIngredients(arr) ;
                setListIngredientsInitial(arr) ;
            }
            return true ;
        }) .catch(error => {
                console.error(error);
                throw error; });
    } ;

    const showErrorFunction = (errorMessage: string, color: 'text-success' | 'text-danger' = "text-danger", timeout: number = 10000) => {
        setErrorMessageColor(color);
        setErrorMessage(errorMessage);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, timeout);
    };

    return (
        <>
            <div className="hapy-modal">
                <button className="back-btn-modal" style={{float: "left", marginTop:-5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 9, marginRigth:9 }} />
                </button>
                <br/><br/><br/>
                <span className="text-black"><span className="text-red-orange">Axel</span> BONSIGNOR</span>
                <h1 className="text-black f-32 fw-6">Jeter une bouteille</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width:22}}/>
                </div>
                <div className="pt-4">
                    <HapySearch inputValue={searchKey} handleChange={(e) => handleSearch(e.target.value)} placeholder="Rechercher un ingrédient"/>
                </div>
                <br/>
                {listIngredients.length && listIngredients.length > 0 && 
                    listIngredients.map((ingredient, i) => 
                        <>
                            <div className="row pl-1">
                                <div className="form-check">
                                    <input className="form-check-input col -mb-4" 
                                        type="checkbox"
                                        onChange={(e)=>{
                                            if (e.target.checked) {
                                                setListIngredientsToTrash([...listIngredientsToTrash, ingredient.id])
                                            }else{
                                                setListIngredientsToTrash(listIngredientsToTrash.filter(id => id !== ingredient.id))
                                            }
                                        }}
                                        style={{borderRadius:50, width:20, height:20,
                                            marginRight:15, 
                                            backgroundColor: listIngredientsToTrash.includes(ingredient.id) ? '#F7B927' : 'unset', 
                                            borderColor: listIngredientsToTrash.includes(ingredient.id) ? '#F7B927' : 'unset'}}
                                        />
                                    <label className="form-check-label ml-2 col" style={{width:310}}>
                                        <h6>{ingredient.entitled}
                                        </h6>
                                    </label>
                                </div>
                            </div>
                            <br/>
                        </>
                    )
                }
                {showError && (<div className={"mb-2 text-center " + errorMessageColor}>{errorMessage}</div>)}
                <HapyButtonWithIcon text="Valider" handleClick={handleValidate}
                                    numberAtEnd={listIngredientsToTrash.length} numberAtEndColor={"#FF6063"} iconComponent={<IconVerify/>}/>
            </div>
        </>
    )
}
export default PreparationModalToTrash
