import {useContext} from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props){ 
    const currentUser = useContext(CurrentUserContext);

    return(
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <div style={{backgroundImage: `url(${currentUser.avatar})`}} className="profile__avatar" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__button_type_edit profile__button" onClick={props.onEditProfile}></button>
                    <h2 className="profile__status">{currentUser.about}</h2>
                </div>
                <button type="button" className="profile__button_type_add profile__button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">  
                {props.cards.map((card)=>(
                    <Card 
                        card = {card}
                        onCardClick = {props.onCardClick}
                        key = {card._id}
                        onCardLike = {props.onCardLike}
                        onCardDelete = {props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;