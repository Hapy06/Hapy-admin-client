import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconOrder from "../../globals/icons-components/IconOrder";
import HapyMobileTop from "../../components/HapyMobileTop";
import {ServeurProcessModel} from "../../globals/models/models";
import {serveurProcessContext} from "./ServeurContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";

function Serveur03_FoodReady(props) {
    const {serveurProcess, setServeurProcess} = useContext<{serveurProcess:ServeurProcessModel, setServeurProcess: any}>(serveurProcessContext) ;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={false}
                           subtitleStart={getAdminProcessValues("userLogged")?.firstName || "serveur"}
                           subtitleStartClassName="text-red-orange"
                           subtitleEnd={getAdminProcessValues("userLogged")?.firstName || "Hâpy"}
                           title="Servir la table"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#FF6063"}

            />
            <div className="happy-div-bottom">
                <br/>
                <h1 className="fw-6">Table {serveurProcess.notifDetail.tableNumber}</h1>
                <h5>{serveurProcess.notifDetail.tableZoneName || "Nom de la Zone"}</h5>
                <br/>
                <br/>
                <div className="row fw-6" style={{marginLeft:20}}>
                    <span className="col-2">2</span>
                    <span className="col-10" style={{marginTop:-24}}>
                        <span className="text-red-orange" style={{fontSize:12, paddingTop:-50}}>Enceinte</span>
                        <br/>
                        <span>Salade de fruits - Fruits rouges des bois</span>
                        <br/>
                        <div style={{fontSize:12}}>
                            <span>Sans Orange</span>
                            <br/>
                            <span>Sans Orange</span>
                        </div>
                    </span>
                </div>
                <br/>
                {/*<div className="row" style={{marginLeft:20}}>
                    <span className="col-2">1</span>
                    <span className="col-10">
                        <span>Bière blonde - 50 cl</span>
                    </span>
                </div>*/}
                <div className="text-center inner-button-container-validate-btn mt-4">
                        <HapyButtonWithIcon text="La commande est servie" handleClick={()=>{navigate('/home')}}
                                            btnWidth={350}
                                            iconComponent={<IconOrder/>}/>
                </div>
            </div>
        </>
    )
}
export default Serveur03_FoodReady
