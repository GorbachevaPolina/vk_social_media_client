import React, {FC, useState} from 'react';
import "./auth.scss"
import { useDispatch, useSelector } from '../services/types/store';
import { register } from '../services/actions/user';
import { Link } from 'react-router-dom';

const Register: FC = () => {
    const dispatch = useDispatch();
    const { isRegisterFailed } = useSelector((store) => store.user)
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
        age: "",
        university: "",
    })
    const [file, setFile] = useState<File | "">("")

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("username", inputs.username);
        fd.append("email", inputs.email);
        fd.append("password", inputs.password);
        fd.append("city", inputs.city);
        fd.append("age", inputs.age);
        fd.append("university", inputs.university);
        fd.append("image", file);
        dispatch(register(fd))
    }

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setFile(e.target.files[0])
        }
    }

    return (
        <form className='auth-form' onSubmit={handleRegister}>
            <h1>Регистрация</h1>
            <input 
                type="text"
                placeholder="Введите имя (должно быть уникальным)"
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
            <div className="pfp-upload">
                <p>Выберите аватарку: </p>
                    <input 
                        id="file-input" 
                        type="file" 
                        onChange={(e) => uploadImage(e)} 
                        onClick={(e)=> e.currentTarget.value = ""}
                    />
            </div>
            <button type="submit">Зарегистрироваться</button>
            <p>
                Уже есть аккаунт?
                <Link to="/login">Войти</Link>
            </p>
            {
                isRegisterFailed && <p className='error'>Пожалуйста, проверьте, что все поля заполнены правильно.</p>
            }
        </form>
    )
}

export default Register;