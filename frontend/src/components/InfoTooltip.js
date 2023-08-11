function InfoTooltip(props){
    return(
        <div className={`popup ${props.isOpen ? "popup_opened" : " "}`}>
            <div className="tooltip">
                <button className="popup__button_type_close button" onClick={props.onClose} />
                <img className="tooltip__status" src={props.image} alt="статус" />
                <h2 className="tooltip__title">{props.header}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;