import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup(props){
    const inputRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
          avatar: inputRef.current.value
        });
    } 

    return(
        <PopupWithForm 
            name = "edit-avatar" 
            isOpen = {props.isOpen} 
            title = "Обновить автар" 
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input ref = {inputRef} type="url" name="avatar" autoComplete="off" placeholder="Ссылка на картинку" className="popup__input" id="avatarInput" required />
            <span className="avatarInput-error popup__input-error"> </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;