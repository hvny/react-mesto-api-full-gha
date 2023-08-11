function PopupWithForm(props){

    return(
        <div className={`popup  ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <form name={`${props.name}_form`} className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
                    <button type="button" className="popup__button_type_close button" onClick = {props.onClose}></button>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__button_type_save button">{props.buttonText || "Сохранить"}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;