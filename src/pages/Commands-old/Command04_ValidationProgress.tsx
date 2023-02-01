import React, {useEffect, useState} from 'react' ;
import {ICONS} from "../../globals/Icons-svg";
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import HapyMobileTop from "../../components/HapyMobileTop";

function Command04_ValidationProgress(props) {
    const [searchKey, setSearchKey] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="Votre commande"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/product')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <br/>
                <p className="f-20">Menu Binouz</p>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label col" style={{width:310}}>
                            <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/>
                            <span className="row">
                                <span className="col-2">2 x </span>
                                <span className="col-10 -ml-3">Salade de fruits - Fruits rouges des bois</span>
                                <br/>
                            </span>
                            <span style={{fontSize:12}}>sans orange <br/> sans fraise</span>
                        </label>
                    </div>
                </div>
                <br/>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label col" style={{width:310}}>
                            <h6>2 x Bière blonde - 50 cl
                            </h6>
                        </label>
                    </div>
                </div>
                <hr className="mt-4 mb-4"/>
                <div>
                    <div className="form-check" style={{opacity:0.32}}>
                        <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={false} onChange={()=>{}}/>
                        <label className="form-check-label">
                            <span style={{fontSize:12}} className="text-blue">Enceinte</span>
                            <h6>2 x Burger Chèvre bacon <br/>
                                <span style={{fontSize:12}}>Saignant</span>
                            </h6>
                        </label>
                    </div>
                </div>
                <div className="text-center inner-button-container-validate-btn">
                    <IconArrowDown width={32} height={32} stroke={'black'} styleIcon={{marginTop:-30}} />
                        <div className="validated-btn-container">
                            <HapyButtonWithIcon text="Valider votre commande" handleClick={()=>{navigate('/command/validated')}}
                                                btnWidth={350}
                                                iconComponent={<IconVerify width={32} height={32} stroke={'#323232'}/>}/>
                        </div>
                </div>
            </div>
        </>
    )
}
export default Command04_ValidationProgress
