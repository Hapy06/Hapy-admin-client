import React, {useContext, useState} from 'react';
import HapyButtonWithIcon from "../components/HapyButtonWithIcon";
import IconChecked from "../globals/icons-components/IconChecked";
import HapyInput from "../components/HapyInput";
import axios from "axios";
import {BASE_URL, getRequest, setAdminProcessValues} from "../globals/GlobalVariables";
import {Institution, TeamMember} from "../globals/models/Inscription.models";
import IconHapyLogo from "../globals/icons-components/IconHapyLogo";
import {HomeProcessModel} from "../globals/models/models";
import {homeProcessContext} from "./HomeContainer";

type PropType = {
    handleAfterLogged: any ;
}

type AuthBody = {
    email: string ;
    password: string ;
}

function LoginTablet(props:PropType) {
    const {homeProcess, setHomeProcess} = useContext<{homeProcess:HomeProcessModel, setHomeProcess: any}>(homeProcessContext) ;
    const [authBody, setAuthBody] = useState<AuthBody>({email:'', password:''});
    const [showError, setShowError] = useState<boolean>(false) ;
    const [errorMessage, setErrorMessage] = useState<string>('') ;
    const [errorMessageColor, setErrorMessageColor] = useState<'text-success' | 'text-danger'>('text-success');

    /*useEffect(() => {
        if (!location.pathname.includes('login')) {
            location.pathname = 'login' ;
        }
    }, []) ;*/

    const handleloginForm = (e) => {
        const { name, value } = e.target;
        setAuthBody({...authBody, [name]: value}) ;
    } ;

    const handleLogin = () => {
        showErrorFunction("Connexion en cours...", 'text-success') ;
        axios.post(BASE_URL + 'api/v1/auth/login',authBody).then((response:any) => {
            console.log(response) ;
            if (response.status == 200 || response.status == 201 || response.status == 202) {
                // console.log(institutionId) ;
                homeProcess.authToken = response.data.data.token ;
                setAdminProcessValues("authToken", response.data.data.token) ;
                getRequest('api/v1/team-members/current',
                    (res)=> {
                        let user:TeamMember = res.data.data.teamMembers ;
                        user.institution.institutionCategory = null ;
                        user.institution.teamMembers = null ;
                        user.institution.productCategories = null ;
                        user.institution.roomStations = null ;
                        user.institution.barStations = null ;
                        user.institution.cuisineStations = null ;
                        user.institution.ingredientCategories = null ;
                        user.institution.ingredients = null ;
                        user.institution.categoryOnMenus = null ;
                        user.institution.objectifs = null ;
                        // console.log(user) ;
                        if (user.position == "Chef de Rang") {
                            showErrorFunction('Veuillez vous connecter sur votre smartphone !') ;
                        } else if (user.position == "Serveur") {
                            showErrorFunction('Veuillez vous connecter sur votre smartphone !') ;
                        } else {
                            showErrorFunction("Connexion Reussie, Redirection...", "text-success", 10000) ;
                            localStorage.setItem('isLoggedin', 'true') ;
                            setAdminProcessValues("userLogged", user) ;
                            setTimeout(()=>{
                                props.handleAfterLogged(user.position);
                            }, 1000) ;
                        }
                    },
                    (err)=>{
                        setErrorMessageColor("text-danger") ;
                        showErrorFunction("Erreur de Chargement, Veuillez Ressayer... !") ;
                    }) ;
            } else { showErrorFunction("Erreur de Chargement, Veuillez Ressayer... !") ; }
        }).catch(()=> {showErrorFunction('Vos identifiants sont incorrects !') ;})
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
        <>
            <div className="horizontal-center text-center">
                <div className="happy-div-top pt-5 pb-4">
                    <h1 className="text-white f-32 fw-6">Bienvenue !</h1>
                    <p className="text-white f-20">Votre interface est prête</p>
                </div>
            </div>
            <div className="happy-div-bottom horizontal-center">
            <div style={{maxWidth:366}}>
                <div className="text-center icon-happy" style={{marginTop:30, marginBottom:50}}>
                    <IconHapyLogo width={48} height={48} styleIcon={{width:32}}/>
                </div>
                <HapyInput label="Votre identifiant Hâpy"
                            inputName='email'
                            inputType='email'
                            placeholder='Email'
                            inputValue={authBody.email}
                            handleChange={handleloginForm}/>
            <br/><br/>
            <HapyInput label="Votre mot de passe"
                       inputName='password'
                       inputType='password'
                       placeholder='Mot de passe'
                       inputValue={authBody.password}
                       inputWidth={366}
                       handleChange={handleloginForm}/>
            <div className="f-12 fw-3 mt-3" >
                Celui ci vous a été envoyé par mail ce matin à 5:00 ainsi qu'à votre manager
            </div>
            </div>
                <div className="text-center inner-button-container-validate-btn mt-2">
                    {showError && (<div className={"mb-3 -mt-4 " + errorMessageColor}>{errorMessage}</div>)}
                    <div className="horizontal-center">
                        <HapyButtonWithIcon text="Vous connecter" handleClick={handleLogin}
                                            btnWidth={350}
                                            iconComponent={<IconChecked/>}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginTablet
