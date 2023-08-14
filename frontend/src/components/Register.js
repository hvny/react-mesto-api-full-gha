import { Link } from "react-router-dom";
import { useState } from "react";

function Register(props){
    const [formValue, setFormValue] = useState({
        email:"",
        password:""
    });

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt){
        evt.preventDefault();
        props.registration(formValue.password, formValue.email);
    }

    return(
        <div className="auth">
            <h2 className = "auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input name="email" value={formValue.email} className="auth__input" type="email" placeholder="Email" autoComplete="off" required onChange={handleChange}></input>
                <input name="password" value={formValue.password} className="auth__input" type="password" placeholder="Пароль" autoComplete="off" required onChange={handleChange}></input>
                <button className = "button auth__button auth__button_type_submit">Зарегистрироваться</button>
                <Link to="/sign-in" className = "button auth__button auth__button_type_link">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
}

export default Register;