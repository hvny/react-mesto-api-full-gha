import { useState } from "react";

function Login(props){
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
        props.authorization(formValue.password, formValue.email);
    }
    return(
        <div className="auth">
            <h2 className = "auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input name="email" value={formValue.email} className = "auth__input" placeholder="Email" autoComplete="on" required onChange={handleChange}></input>
                <input name="password" value={formValue.password} className = "auth__input" placeholder="Пароль" autoComplete="on" required onChange={handleChange}></input>
                <button className = "button auth__button auth__button_type_submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;