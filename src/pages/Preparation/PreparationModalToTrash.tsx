import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconLose from "../../globals/icons-components/IconLose";
import {useNavigate} from "react-router";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapySearch from "../../components/HapySearch";
import IconOrder from "../../globals/icons-components/IconOrder";
import IconVerify from "../../globals/icons-components/IconVerify";

type PropsType = {
    handleCloseModal: any ;
}


function PreparationModalToTrash(props:PropsType) {

    const [commandValidated, setCommandValidated] = useState(false);
    const navigate = useNavigate();

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
                    <HapySearch inputValue={null} handleChange={null}/>
                </div>
                <br/>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col -mb-4" style={{borderRadius:50, width:20, height:20,
                            marginRight:15, backgroundColor:'#F7B927', borderColor:'#F7B927'}}
                               type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label ml-2 col" style={{width:310}}>
                            <h6>Vodka - Eristof
                            </h6>
                        </label>
                    </div>
                </div>
                <br/>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col -mb-4" style={{borderRadius:50, width:20, height:20,
                            marginRight:15}}
                               type="checkbox"
                               checked={false} onChange={()=>{}}/>
                        <label className="form-check-label ml-2 col" style={{width:310}}>
                            <h6>Vin rouge - St Emilion
                            </h6>
                        </label>
                    </div>
                </div>
                <br/>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col -mb-4" style={{borderRadius:50, width:20, height:20,
                            marginRight:15}}
                               type="checkbox"
                               checked={false} onChange={()=>{}}/>
                        <label className="form-check-label ml-2 col" style={{width:310}}>
                            <h6>Jus - Ananas
                            </h6>
                        </label>
                    </div>
                </div>
                <br/>
                <div className="row pl-1">
                    <div className="form-check">
                        <input className="form-check-input col -mb-4" style={{borderRadius:50, width:20, height:20,
                            marginRight:15, backgroundColor:'#F7B927', borderColor:'#F7B927'}}
                               type="checkbox"
                               checked={true} onChange={()=>{}}/>
                        <label className="form-check-label ml-2 col" style={{width:310}}>
                            <h6>Lait - Semi Ecrémé
                            </h6>
                        </label>
                    </div>
                </div>
                <br/>
                <HapyButtonWithIcon text="Valider" handleClick={props.handleCloseModal}
                                    numberAtEnd={2} numberAtEndColor={"#FF6063"} iconComponent={<IconVerify/>}/>
            </div>
        </>
    )
}
export default PreparationModalToTrash
