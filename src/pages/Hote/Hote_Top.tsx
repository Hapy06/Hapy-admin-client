import React, {useState} from 'react';
import Hapy2ButtonSwitching from "../../components/Hapy2ButtonSwitching";

type PropsType = {
    classAdditional?: string ;
    showLeftBtn?: boolean ;
    leftBtnComponent?: any ;
    handleSwitchListToShow: any ;
}
export const screenWidth: number = window.screen.width ;
export const screenHeight: number = window.screen.height ;
export const screenWidthPourcent: any = (pourcent: number) => {return (pourcent*screenWidth)/100 } ;
export const screenHeightPourcent: any = (pourcent: number) => {return (pourcent*screenHeight)/100 } ;

function Hote_Top(props:PropsType) {
    const [activeBtn, setActiveBtn] = useState<'btn1'|'btn2'>('btn1');
    const handleSwitchBtnActive = (btnToActive) => {
        console.log('hote top handle = ' + btnToActive) ;
        if (btnToActive == 'btn1') {
            setActiveBtn('btn1') ;
            props.handleSwitchListToShow('Tables') ;
        } else {
            setActiveBtn('btn2') ;
            props.handleSwitchListToShow('Reservations') ;
        }
    }
    return (
        <div className={props.classAdditional ? "preparation-top-container text-white " + props.classAdditional : "preparation-top-container text-white"}
             style={{width:screenWidth+5}}>
            <div className="preparation-container-wrapper">
                <div className="text-center welcome-word">Welcome to Hâpy</div>
                <div className="row">
                    <div className="col-2" style={{maxWidth:305}}>
                        <h1>Accueil</h1>
                        <span className="text-green">Gestion</span>
                    </div>
                    <div className="col-3 mt-3">
                        {props.showLeftBtn && (props.leftBtnComponent)}
                    </div>
                    <div className="col-2" style={{marginLeft:75}}>
                        <div className="f-12">Libres</div>
                        <div style={{marginTop:-10}}>
                            <span className="f-48 fw-6 text-green">2</span>
                            {/*<span className="fw-6 f-32 ml-1 text-white">14</span>*/}
                        </div>
                    </div>
                    <div className="col-4 float-end mt-3">
                        <Hapy2ButtonSwitching activeBtn={activeBtn} textBtn1={"Tables"} textBtn2={"Réservations"}
                          handleClickBtn1={()=>handleSwitchBtnActive('btn1')} handleClickBtn2={()=>handleSwitchBtnActive('btn2')}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hote_Top
