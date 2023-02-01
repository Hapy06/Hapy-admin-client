import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyInput from "../../components/HapyInput";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";
import IconKey from "../../globals/icons-components/IconKey";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
}

function HoteModalOpenTable(props:PropsType) {
    const [numberOfPerson, setNumberOfPerson] = useState<number>(1);
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
                <h1 className="text-black f-32 fw-6">Ouvrir la table</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>
                <p>Combien de couverts </p>
                <div className="text-center f-32 mt-3">
                    <span onClick={()=>setNumberOfPerson(numberOfPerson+1)}>+</span>
                    <span className="text-green ml-4 mr-4 fw-6">{numberOfPerson}</span>
                    <span onClick={()=>{numberOfPerson > 1 ? setNumberOfPerson(numberOfPerson-1) : null}}>-</span>
                </div>
                <br/> <br/><br/> <br/>
                <HapyButtonWithIcon text="Ouvrir la table" handleClick={props.handleCloseModal}
                                    iconComponent={<IconKey/>}/>
            </div>
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </>
    )
}
export default HoteModalOpenTable
