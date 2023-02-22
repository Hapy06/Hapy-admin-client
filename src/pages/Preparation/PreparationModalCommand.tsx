import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapySearch from "../../components/HapySearch";
import IconOrder from "../../globals/icons-components/IconOrder";

type PropsType = {
    handleCloseModal: any ;
}


function PreparationModalCommand(props:PropsType) {

    const [commandValidated, setCommandValidated] = useState(false);
    // const navigate = useNavigate();

    return (
        <>
        {commandValidated ? (
                <div className="hapy-modal">
                    <br/><br/>
                    <h1 className="text-black f-32 fw-6">Servez-vous</h1>
                    <div className="row pl-1 mt-5">
                        <div className="form-check">
                            <input className="form-check-input col" style={{borderRadius:50, width:20, height:20,
                                marginRight:15, backgroundColor:'#F7B927', borderColor:'#F7B927'}} type="checkbox"
                                   checked={true} onChange={()=>{}}/>
                            <label className="form-check-label ml-2 col" style={{width:310, marginTop:-45}}>
                                <span style={{fontSize:12}} className="text-blue">Enceinte</span> <br/>
                                <span className="row">
                                <span className="col-2 fw-5">2 x </span>
                                <span className="col-10 -ml-3 fw-5">Salade de fruits - Fruits rouges des bois</span>
                                <br/>
                            </span>
                                <span className="fw-5" style={{fontSize:12}}>sans orange <br/> sans fraise</span>
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
                                <h6>2 x Bière blonde - 50 cl
                                </h6>
                            </label>
                        </div>
                    </div>
                    <hr className="mt-4 mb-4"/>
                    <div>
                        <div className="form-check" style={{opacity:0.32}}>
                            <input className="form-check-input" style={{borderRadius:50, width:20, height:20,
                                marginRight:15}} type="checkbox"
                                   checked={false} onChange={()=>{}}/>
                            <label className="form-check-label ml-2">
                                <span style={{fontSize:12}} className="text-blue">Enceinte</span>
                                <h6>2 x Burger Chèvre bacon <br/>
                                    <span style={{fontSize:12}}>Saignant</span>
                                </h6>
                            </label>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <HapyButtonWithIcon text="Commander" handleClick={props.handleCloseModal}
                                        iconComponent={<IconOrder/>}/>
                </div>
            ) : (
                <div className="hapy-modal">
                    <button className="back-btn-modal" style={{float: "left", marginTop:-5}}
                            onClick={props.handleCloseModal}>
                        <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 9, marginRigth:9 }} />
                    </button>
                    <br/><br/><br/>
                    <span className="text-black"><span className="text-red-orange">Axel</span> BONSIGNOR</span>
                    <h1 className="text-black f-32 fw-6">Servez-vous</h1>
                    <div className="text-center mt-4 mb-4">
                        <IconHapyLogo width={48} height={48} styleIcon={{width:22}}/>
                    </div>
                    <div className="pt-4">
                        <HapySearch inputValue={null} handleChange={null}/>
                    </div>
                    <br/>
                    <h5>Entrée</h5>
                    <br/>
                    <HapyButtonWithoutIcon text="Salade" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Chips" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Poisson" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Frites" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Option 5" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Option 6" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <HapyButtonWithoutIcon text="Option 7" handleClick={()=>{setCommandValidated(true)}}/>
                    <br/> <br/> <br/>
                </div>
            )}
        </>
    )
}
export default PreparationModalCommand
