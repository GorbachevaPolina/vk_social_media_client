import React, {FC, useState} from "react";
import './auth.scss'
import { useDispatch } from "../services/types/store";
import { login } from "../services/actions/user";
import { Link } from "react-router-dom";

const Login: FC = () => {
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(inputs))
    }

    return (
        <form className='auth-form' onSubmit={handleLogin}>
            <h1>Вход</h1>
            <input
                type="email"
                placeholder="Введите email"
                onChange={(e) => setInputs({...inputs, email: e.target.value})}
                value={inputs.email}
            />
            <input
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                value={inputs.password}
            />
            <button type="submit">Вход</button>
            <p>
                Еще нет аккаунта? 
                <Link to="/register">Зарегистрироваться</Link>
            </p>
        </form>
    )
}

export default Login