import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconClock from "../../globals/icons-components/IconClock";
import IconPhoneCall from "../../globals/icons-components/IconPhoneCall";
import IconPeople from "../../globals/icons-components/IconPeople";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
}

function HoteModalDetailReservation(props:PropsType) {
    const [tipsValidated, setTipsValidated] = useState(false);

    return (
        <>
            <div className="hapy-modal" style={props.containerStyle}>
                <button className="back-btn-modal" style={{float: "left", marginTop: -5}}
                        onClick={props.handleCloseModal}>
                    <IconArrowLeft width={24} height={24} styleIcon={{marginLeft: 5}}/>
                </button>
                <br/><br/><br/>
                <p className="text-black"><span className="text-green">Lisa</span> Chirac</p>
                <h1 className="text-black f-32 fw-6">Detail d'une réservation</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                <span><IconClock/> 21 : 30</span> <br/><br/>
                <div className="row f-20">
                    <span className="col-6">Lefranc</span>
                    <span className="col-6 text-end">Table <strong>74</strong></span>
                </div>
                <br/>
                <span><IconPhoneCall/> 07 60 42 39 63</span> <br/>
                <br/>
                <span><IconPeople/> 3 p.</span> <br/>
                <br/> <br/><br/> <br/>
                <HapyButtonWithIcon text="Ils sont arrivés" handleClick={props.handleCloseModal}
                                    iconComponent={<IconVerify/>}/>
            </div>
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </>
    )
}
export default HoteModalDetailReservation
