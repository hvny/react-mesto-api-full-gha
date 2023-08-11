import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../images/logo.svg';
import burgerButton from "../images/burger.svg";
import closeButton from "../images/popup-close-button.svg";

function Header(props){
    const locate = useLocation();
    const linkName = locate.pathname === "/sign-up" ? "Войти" : "Регистрация";
    const location = locate.pathname === "/sign-up" ? "/sign-in" : "/sign-up";
    const [isButtonOnClick, setIsButtonOnClick] = useState(false);
    const [headerButton, setHeaderButton] = useState(burgerButton);
    function handleButtonClick(){
        if(isButtonOnClick === false){
            setHeaderButton(closeButton);
        }
        else{
            setHeaderButton(burgerButton);
        }
        setIsButtonOnClick(!isButtonOnClick);
        
    }

    return(
        <>{props.loggedIn && isButtonOnClick ?
            (
                <div className="header__container header__container_visible">
                    <p className = "header__email">{props.email}</p>
                    <Link to="/sign-up" className="header__link" onClick={props.signout}>Выйти</Link>
                </div>
            ) :
            (
                <></>
            )}
        <header className="header">
            <img src={logo} alt="Логотип проекта" className="header__logo" />
            {props.loggedIn && <img src={headerButton} className="header__button button" onClick={handleButtonClick} />}
            {props.loggedIn ? 
            (
                <div className="header__container">
                    <p className = "header__email">{props.email}</p>
                    <Link to="/sign-up" className="header__link" onClick={props.signout}>Выйти</Link>
                </div>
            ) : 
            (
                <Link to={location} className="header__link">{linkName}</Link>
            )}
            
        </header>
        </>
    )
}

export default Header;