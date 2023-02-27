import React, {useState} from 'react';
import {ICONS} from "../globals/Icons-svg";
import IconArrowLeft from "../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../globals/icons-components/IconHapyLogo";
import {getAdminProcessValues, removeAdminProcessValues} from "../globals/GlobalVariables";
import IconSomeoneDelete from "../globals/icons-components/IconSomeoneDelete";
import HapyButtonWithIcon_Little from "./HapyButtonWithIcon_Little";
import HapyButtonOnlyIcon from "./HapyButtonOnlyIcon";

type PropsType = {
    welcomeWord1? : string ;
    showWelcome2AndMenu: boolean ;
    welcomeWord2_start? : string ;
    welcomeWord2_end? : string ;
    showBtnBack: boolean ;
    handleClickBtnBack?: any ;
    subtitleStart: string ;
    subtitleStartClassName: string ;
    subtitleEnd: any ;
    title: string ;
    showRightSideBtn: boolean ;
    rightSideBtnIconComponent?: any ;
    rightSideBtnHandleClick?: any ;
    hapyLogoBtnColor: '#536DFE' | '#FF6063' ;
    showLanguagueChoiced? : boolean ;
    titleEnding? : string ;
    hideHapyLogo?: boolean ;
}

export const screenWidth: number = window.screen.width ;
export const screenHeight: number = window.screen.height ;
export const screenWidthPourcent: any = (pourcent: number) => {return (pourcent*screenWidth)/100 } ;
export const screenHeightPourcent: any = (pourcent: number) => {return (pourcent*screenHeight)/100 } ;

function HapyMobileTop(props:PropsType) {

    const [showLanguagueMenu, setShowLanguagueMenu] = useState<boolean>(false);
    const [languageSelected, setLanguageSelected] = useState<string>('FR');
    const listLanguage: string[] = ['EN', 'FR', 'CN', 'P', 'ES'] ;

    const handleLogout = () => {
        localStorage.removeItem('isLoggedin') ;
        removeAdminProcessValues("authToken") ;
        removeAdminProcessValues("userLogged") ;
        setTimeout(()=>{
            location.reload() ;
        }, 500) ;
    } ;

    return (
        <div className="happy-div-top">
            <div className="text-center welcome-word">{props.welcomeWord1 || 'Welcome to Hâpy'}
            </div>
                {!props.hideHapyLogo && (
                    <div>
                        <div className="float-start text-red-orange f-12 mt-3">
                            {getAdminProcessValues("userLogged").position}
                        </div>
                        <div className="float-end">
                            <IconSomeoneDelete handleClick={handleLogout} width={32} height={32}
                                               styleIcon={{width: 24, marginTop: 10}} stroke={'white'}/>
                        </div>
                    </div>
                )}
            <div className="welcome-word2">
                { props.showWelcome2AndMenu && (
                    <>
                        <span className="text-white fw-5 f-12">
                        <span className="text-blue">{props.welcomeWord2_start || 'Hâpy Hour'}</span>
                            {props.welcomeWord2_end || ' - Sélection de l’établissement à -20%'}
                        </span>
                        <div className="float-end" style={{marginTop:-8}}>
                            <span className="mr-1" onClick={()=>setShowLanguagueMenu(!showLanguagueMenu)}>{ICONS.menu32White}</span>
                            {showLanguagueMenu && (
                                <div className="language-menu text-white f-12 fw-3 pt-1 pb-1">
                                    {listLanguage.map((lang, index) => (
                                        <div key={index} className="mt-1">
                                            <span className="float-start" style={{marginLeft:4}}>
                                                {lang == languageSelected && (
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.66699 8L6.8866 10L11.3337 6" stroke="#536DFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </span>
                                            <span className="float-start" style={{marginLeft: lang == languageSelected ? 4 : 24}}
                                                  onClick={()=> setLanguageSelected(lang)}>{lang}</span>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {props.showLanguagueChoiced && (
                                <div className="language-choiced">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.43359 1.3335V14.6668" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.43359 2.6665H10.9003C12.7003 2.6665 13.1003 3.6665 11.8336 4.93317L11.0336 5.73317C10.5003 6.2665 10.5003 7.13317 11.0336 7.59984L11.8336 8.39984C13.1003 9.6665 12.6336 10.6665 10.9003 10.6665H3.43359" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-white f-12" style={{marginLeft:4}}>{languageSelected}</span>
                                </div>
                            )}
                        </div>
                    </>
                ) }
                <div>
                    { props.showBtnBack && (
                        <button className="back-btn horizontal-center vertical-center" style={{float: "left"}}
                                onClick={props.handleClickBtnBack}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.0004 26.5599L11.3071 17.8666C10.2804 16.8399 10.2804 15.1599 11.3071 14.1333L20.0004 5.43994" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    ) }
                    <div className="text-center icon-happy" style={props.showBtnBack ? {marginRight:50, paddingTop:7} : {paddingTop:7}}>
                        <IconHapyLogo stroke={'#424242'} hapyLogoBtnColor={props.hapyLogoBtnColor}/>
                    </div>
                </div>
            </div>
            { props.showRightSideBtn ? (
                <div style={{height:90}}>
                    <div className="float-start">
                        <p className="text-white f-20"><span className={props.subtitleStartClassName}>{getAdminProcessValues("userLogged")?.firstName || props.subtitleStart}</span> {getAdminProcessValues("userLogged")?.lastName || props.subtitleEnd}</p>
                        <h1 className="text-white f-32 fw-6">{props.title}</h1>
                    </div>
                    <div className="float-end mt-3">
                        <button className="close-btn"
                                onClick={props.rightSideBtnHandleClick}>
                            {props.rightSideBtnIconComponent}
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{height:90}}>
                    <p className="text-white f-20"><span className={props.subtitleStartClassName}>{getAdminProcessValues("userLogged")?.firstName || props.subtitleStart}</span> {getAdminProcessValues("userLogged")?.lastName || props.subtitleEnd}</p>
                    <h1 className="text-white f-32 fw-6 -mt-1">{props.title}{props.titleEnding && (<span className="text-red-orange">{props.titleEnding}</span>)}</h1>
                </div>
            )}
        </div>
    )

    {/*<div className="happy-div-top">
                <div className="text-center welcome-word mb-3">Welcome to Hâpy</div>
                <div className="text-center welcome-word2">
                    <span className="text-white">
                        <span className="text-blue float-start" style={{marginRight:-40}}>Hâpy Hour</span>- Sélection de l’établissement à -20%
                    </span>
                    <span className="float-end" style={{marginTop:-5, marginRight:20}}>{ICONS.menu32White}</span>
                    <div>
                        <button className="back-btn" style={{float: "left", marginTop:-5}}
                                onClick={() => {navigate('/')}}>
                            <IconArrowLeft width={24} height={24} stroke={'white'} styleIcon={{marginLeft:5}} />
                        </button>
                        <div className="mt-5 mb-5" style={{marginRight:50}}>{ICONS.hapyLogo32Gray}</div>
                    </div>
                </div>
                <p className="text-white">Vous êtes à la table 27</p>
                <h1 className="text-white">Bienvenue cher Hâpy.</h1>
            </div>*/}
}
export default HapyMobileTop
