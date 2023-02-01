import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconAlarm from "../../globals/icons-components/IconAlarm";
import IconInfoCircle from "../../globals/icons-components/IconInfoCircle";
import IconTimer from "../../globals/icons-components/IconTimer";
import IconDoubleHeart from "../../globals/icons-components/IconDoubleHeart";
import IconChecked from "../../globals/icons-components/IconChecked";
import HapyMobileTop, {screenWidth} from "../../components/HapyMobileTop";
import HapySelect from "../../components/HapySelect";
import HapyMultiSelect from "../../components/HapyMultiSelect";

function Command03_Product(props) {
    const [searchKey, setSearchKey] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const divideNumber = (value:number) => { return value.toLocaleString()} ;
    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="Fish & Chips"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/commnd/sub-category')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <img src="../../src/assets/1.png" alt="product"
                     className="product-image" style={{width:screenWidth, marginTop:-20, marginLeft:-24}}/>
                 <br/> <br/>
                 <div>
                     <span className="f-20"> {divideNumber(20)} € </span>
                     <span className="old-price fw-5 f-16 -mt-2">24,90 €</span>
                 </div>
                <br/>
                <HapySelect defaultOption={{text:'Variant', value:null}} optionList={[{text:'Variant 1', value: 'V1'}, {text:'Variant 2', value:'V2'}]} />
                <br/>
                <HapySelect defaultOption={{text:'Cuisson', value:null}} optionList={[{text:'Saignant 1', value: 'V1'}, {text:'Saignant 2', value:'V2'}]} />
                <br/> <br/>
                <div>
                    <span><IconAlarm width={24} height={24} stroke={'#323232'}/></span>
                    <span className="f-20" style={{marginLeft:20}}>Une information ?</span>
                    <br/> <br/>
                    <p>Cabillaud pané ici-même à la Panko, sauce tartare maison, frites et salade</p>
                </div>
                <div>
                    <span><IconInfoCircle width={24} height={24} stroke={'#323232'}/></span>
                    <span className="f-20" style={{marginLeft:20}}>Allergènes</span>
                    <br/> <br/>
                    <p className="fw-5">
                        La morue sait se faire gonflante mais également parfois urticante :
                        il convient dans tous les cas de savoir éviter son contact qui, en ces jours d’avril,
                        peut se faire dans votre dos à votre insu.
                    </p>
                </div>
                <br/>
                <HapyMultiSelect labelText={'Modifier les Ingredients'} labelTextEdited={'Ingredients Modifiés'} optionList={[{text:'Ingredient 1', value: 'I1'}, {text:'Ingredient 2', value:'I2'}]} />
                <br/>
                <div style={{marginLeft:32}}>
                    <div className="form-check">
                        <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={false} onChange={()=>{}}/>
                        <label className="form-check-label text-disabled">
                            <div>
                                <span> <IconTimer width={24} height={24} opacity={0.32} /> </span>
                                <span>Prendre plus tard</span>
                            </div>
                        </label>
                    </div>
                </div>
                <br/>
                <div style={{marginLeft:32}}>
                    <div className="form-check">
                        <input className="form-check-input" style={{borderRadius:50, width:20, height:20, marginRight:15}} type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label">
                            <div>
                                <span> <IconDoubleHeart width={24} height={24} stroke={'#323232'} /> </span>
                                <span>Je suis enceinte</span>
                            </div>
                        </label>
                    </div>
                </div>
                <br/> <br/>
                <HapyButtonWithIcon text="Commander" handleClick={()=>{navigate('/command')}} iconComponent={ <IconChecked width={32} height={32} stroke={'#323232'} /> } />
                <br/>
            </div>
        </>
    )
}
export default Command03_Product
