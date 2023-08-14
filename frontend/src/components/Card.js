import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props){
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some((card) => card === currentUser._id);
    const cardLikeButtonClassName = (`element__button element__button_type_like ${isLiked && 'element__button_type_like_active'}`);; 

    function handleClick(){
        props.onCardClick(props.card);
    }

    function handleLikeClick(){
        props.onCardLike(props.card);
    }

    function handleCardDelete(){
        props.onCardDelete(props.card);
    }

    return(
        <article className = "element">
            {isOwn && <button className="element__button element__button_type_close" onClick={handleCardDelete}></button>}
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
            <h2 className="element__title">{props.card.name}</h2>
            <div className = "element__likes-container">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>                               
                <p className = "element__likes-counter">{props.card.likes.length}</p>
            </div>
        </article>
    );
}

export default Card;