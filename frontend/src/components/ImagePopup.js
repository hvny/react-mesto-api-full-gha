function ImagePopup(props){
    return(
        <div className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__button_type_close popup__button" onClick={props.onClose}></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <p className="popup__image-title">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;