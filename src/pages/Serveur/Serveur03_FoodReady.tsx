import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconOrder from "../../globals/icons-components/IconOrder";
import HapyMobileTop from "../../components/HapyMobileTop";
import {Coupon, Order, ServeurProcessModel, SimpleCommand} from "../../globals/models/models";
import {serveurProcessContext} from "./ServeurContainer";
import {getAdminProcessValues} from "../../globals/GlobalVariables";
import {format} from "date-fns";

function Serveur03_FoodReady(props) {
    const {serveurProcess, setServeurProcess} = useContext<{serveurProcess:ServeurProcessModel, setServeurProcess: any}>(serveurProcessContext) ;
    const coupons:Coupon[] = JSON.parse(serveurProcess?.notifDetail?.content) || null ;
    console.clear()
    console.log(coupons) ;
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
                <h1 className="f-32 fw-6">Table {serveurProcess.notifDetail?.tableNumber}</h1>
                <p className="f-20">{serveurProcess.notifDetail?.tableZoneName}</p>
                <div className="text-center">{format(new Date(serveurProcess?.notifDetail?.askTime), 'HH : mm') }</div>
                <br/>
                {coupons ? (
                    coupons?.map( (coupon:Coupon, index:number) => (
                        <div key={coupon.id || index} className="row fw-6 command-box">
                            <span className="col-2">{index + 1}</span>
                            <span className="col-10" style={{marginTop:-24}}>
                            {coupon.isPregnant && (<span className="text-red-orange" style={{fontSize:12, paddingTop:-50}}>Enceinte</span>)}
                                <br/>
                            <span>{coupon.product.name} - {coupon.productVariant.name}</span>
                            <br/>
                            <div style={{fontSize:12}}>
                                {coupon.ingredientsModifiablesStates.map(ingredient => (
                                    <span>{ingredient} <br/></span>
                                ))}
                            </div>
                        </span>
                        </div>
                    ))
                    ) : (
                    <div className="row fw-6" style={{marginLeft:20}}>

                    </div>
                )}
                <br/>
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
