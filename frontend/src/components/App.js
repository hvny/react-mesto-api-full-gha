import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from "./ImagePopup";
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import * as auth from "../utils/auth.js";
import okImg from "../images/check-mark.svg";
import wrongImg from "../images/cross.svg";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [tooltipText, setTooltipText] = useState("");
    const [tooltipImage, setTooltipImage] = useState("");
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const navigate = useNavigate();

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

    useEffect(()=>{     //получаем карточки и ифну юзера при монтировании
        const jwt = localStorage.getItem("jwt");
        if (jwt){
            Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData])=>{
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch(console.error);
        }
    }, [loggedIn]);

    useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            closeAllPopups();
          }
        }
        if(isOpen) {
          document.addEventListener('keydown', closeByEscape);
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
        }
    }, [isOpen]); 

    useEffect(()=>{         //проверяем наличие токена
        const jwt = localStorage.getItem("jwt");
        if (jwt){
            auth.getContent(jwt)
            .then((res)=>{
                setLoggedIn(true);
                setEmail(res.data.email);
                navigate("/", { replace: true });
            })
            .catch(console.error);
        }
    }, []);

    function handleEditProfileClick(){      //открываем попап изменения профиля
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick(){         //открываем попап добавления карточки
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick(){       //открываем попап изменения аватарки
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card){         //открываем конкретной карточки
        setSelectedCard(card);
        setIsImagePopupOpen(!isImagePopupOpen);
    }
    
    function closeAllPopups(){              //закрываем попапы
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
        setIsTooltipOpen(false);
    }

    function handleCardLike(card) {         //ставим и убираем лайки карточки 
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(console.error);
    } 

    function handleCardDelete(card){        //удаляем карточку
        api.deleteCard(card._id)
        .then(()=>{
            setCards((state)=> state.filter((c)=> c._id !== card._id));
        })
        .catch(console.error);
    }

    function handleUpdateUser(newInfo){        //обновляем инфу юзера
        api.setUserInfo(newInfo)
        .then((userData)=>{
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch(console.error);
    }
    
    function handleUpdateAvatar(newAvatar){     //обновляем аватар
        api.setUserAvatar(newAvatar)
        .then((userData)=>{
            setCurrentUser(userData);
            closeAllPopups();
        })
        .catch(console.error);
    }

    function handleAddPlaceSubmit(placeInfo){
        api.addCard(placeInfo)
        .then((cardData)=>{
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
        .catch(console.error);
    }

    function wrongReg(){            //изменение параметров тултипа
        setIsTooltipOpen(true);
        setTooltipImage(wrongImg);
        setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
    }

    function successReg(){
        setIsTooltipOpen(true);
        setTooltipImage(okImg);
        setTooltipText("Вы успешно зарегистрировались!");
    }

    function registration(password, email){
        auth.register(password, email)
        .then(()=>{
            navigate("/sign-in");
            successReg();
        })
        .catch((err)=>{
            console.log(err);
            wrongReg();
        });
    }

    function authorization(password, email){
        auth.authorize(password, email)
        .then((res)=>{
            if (res.token){
                setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
                setEmail(email);
                navigate("/");
            }
        })
        .catch((err)=>{
            console.log(err);
            wrongReg();
        });
    }

    function signout(){
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate("/sign-in");
    }

    return (
    <CurrentUserContext.Provider value ={currentUser}>
        <div className="page">
            <Header loggedIn={loggedIn} email={email} signout={signout} />
            <Routes>
                <Route path="/" element = {<ProtectedRoute 
                element = {Main} 
                loggedIn = {loggedIn}
                cards = {cards}
                onEditProfile={handleEditProfileClick} 
                onAddPlace = {handleAddPlaceClick} 
                onEditAvatar = {handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                />}
                />

                <Route path="/sign-up" element = {<Register registration={registration} />}/>              

                <Route path="/sign-in" element = {<Login authorization={authorization} />} />
                
                {!loggedIn && <Route path="*" element={<Login authorization={authorization} />} />}
            </Routes>
            
            <Footer />

            <InfoTooltip isOpen={isTooltipOpen} image={tooltipImage} header={tooltipText} onClose={closeAllPopups} />

            <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} />

            <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} />
            
            <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} /> 

            <PopupWithForm 
                name = "delete-card" 
                isOpen = {false}
                title = "Вы уверены?" 
                buttonText = "Да"
                onClose = {closeAllPopups}
            />  

            <ImagePopup 
                card = {selectedCard}
                onClose = {closeAllPopups}
                isOpen = {isImagePopupOpen}
            />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
