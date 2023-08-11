import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(()=>{
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(evt){
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt){
        setDescription(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();

        props.onUpdateUser({name, about: description,});
    }

    return (
        <PopupWithForm 
            name = "edit-profile" 
            isOpen = {props.isOpen} 
            title = "Редактировать профиль" 
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input type="text" name="name" value={name ?? ""} onChange={handleNameChange} autoComplete="off" placeholder="Имя" className="popup__input" id="profileNameInput" minLength="2" maxLength="40" required />
            <span className="profileNameInput-error popup__input-error"> </span>
            <input type="text" name="about" value={description ?? ""} onChange={handleDescriptionChange} autoComplete="off" placeholder="О себе" className="popup__input" id="profileInfoInput" minLength="2" maxLength="200" required />
            <span className="profileInfoInput-error popup__input-error"> </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;