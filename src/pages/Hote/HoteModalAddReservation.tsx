import React, {useState} from 'react';
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import IconHapyLogo from "../../globals/icons-components/IconHapyLogo";
import HapyInput from "../../components/HapyInput";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconReservationAdd from "../../globals/icons-components/IconReservationAdd";

type PropsType = {
    handleCloseModal: any ;
    containerStyle?: any ;
}

function HoteModalAddReservation(props:PropsType) {

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
                <h1 className="text-black f-32 fw-6">Nouvelle réservation</h1>
                <div className="text-center mt-4 mb-4">
                    <IconHapyLogo width={48} height={48} styleIcon={{width: 22}}/>
                </div>

                <br/> <HapyInput inputName='name' label='Nom de la réservation' inputType={"text"} placeholder={null} inputValue={null} handleChange={null}/>
                <br/> <HapyInput inputName='tel' label='Numéro de téléphone' inputType={"text"} placeholder={null} inputValue={null} handleChange={null}/>
                <br/> <HapyInput inputName='nbrOFPrs' label='Nombre de personne' inputType={"text"} placeholder={null} inputValue={null} handleChange={null}/>
                <br/> <HapyInput inputName='num' label='Numéro de table' inputType={"text"} placeholder={null} inputValue={null} handleChange={null}/>
                <br/> <HapyInput inputName='date' label='Date de la réservation' inputType={"text"} placeholder={null} inputValue={null} handleChange={null}/>
                <br/><br/>
                <HapyButtonWithIcon text="Réserver une table" handleClick={props.handleCloseModal}
                                    iconComponent={<IconReservationAdd/>}/>
            </div>
            {/*<div style={{marginBottom:(screenHeight-650)/2}}
                className="text-center fixed-bottom">
                <IconArrowDown/>
            </div>*/}
        </>
    )
}
export default HoteModalAddReservation
