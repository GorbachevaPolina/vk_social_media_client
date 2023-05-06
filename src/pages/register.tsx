import React, {FC, useState} from 'react';
import "./auth.scss"
import { useDispatch } from '../services/types/store';
import { register } from '../services/actions/user';
import { Link } from 'react-router-dom';

const Register: FC = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
        age: "",
        university: ""
    })

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(inputs))
    }

    return (
        <form className='auth-form' onSubmit={handleRegister}>
            <h1>Регистрация</h1>
            <input 
                type="text"
                placeholder="Введите имя"
                onChange={(e) => setInputs({...inputs, username: e.target.value})}
                value={inputs.username}
            />
            <input 
                type="email"
                placeholder='Введите email'
                onChange={(e) => setInputs({...inputs, email: e.target.value})}
                value={inputs.email}
            />
            <input 
                type="password"
                placeholder='Введите пароль'
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                value={inputs.password}
            />
            <input 
                type="text"
                placeholder='Введите город'
                onChange={(e) => setInputs({...inputs, city: e.target.value})}
                value={inputs.city}
            />
            <input 
                type="text"
                placeholder='Введите возраст'
                onChange={(e) => setInputs({...inputs, age: e.target.value})}
                value={inputs.age}
            />
            <input 
                type="text"
                placeholder='Введите университет'
                onChange={(e) => setInputs({...inputs, university: e.target.value})}
                value={inputs.university}
            />
            <button type="submit">Зарегистрироваться</button>
            <p>
                Уже есть аккаунт?
                <Link to="/login">Войти</Link>
            </p>
        </form>
    )
}

export default Register;