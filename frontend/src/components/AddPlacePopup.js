import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
    const [placeName, setPlaceName] = useState("");
    const [placeLink, setPlaceLink] = useState("");

    useEffect(()=>{
        setPlaceName("");
        setPlaceLink("");
    }, [props.isOpen])

    function handlePlaceNameChange(evt){
        setPlaceName(evt.target.value);
    }

    function handlePlaceLinkChange(evt){
        setPlaceLink(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();

        props.onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    return(
        <PopupWithForm name = "add-card" 
            isOpen = {props.isOpen} 
            title = "Новое место" 
            buttonText = "Создать"
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input type="text" name="name" value={placeName} onChange={handlePlaceNameChange} autoComplete="off" placeholder="Название" className="popup__input" id="placeNameInput" minLength="2" maxLength="30" required />
            <span className="placeNameInput-error popup__input-error"> </span>
            <input type="url" name="link" value={placeLink} onChange={handlePlaceLinkChange} autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="placeLinkInput" required />
            <span className="placeLinkInput-error popup__input-error"> </span>  
        </PopupWithForm>
    );
}

export default AddPlacePopup;