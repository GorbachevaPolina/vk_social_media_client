import React, {FC} from "react";
import logo from '../../images/logo.svg'
import { deleteCookie, getCookie } from "../../services/utils/cookies";
import { useDispatch } from "../../services/types/store";
import { LOGOUT } from "../../services/actions/user";
import './header.scss'

const Header: FC = () => {
    const dispatch = useDispatch()

    const logout = () => {
        const token = getCookie('token')
        if(token) {
            deleteCookie('token')
        }
        dispatch({
            type: LOGOUT
        })
    }

    return(
        <header>
            <img src={logo} alt="logo"/>
            <button type="button" onClick={logout}>Выйти</button>
        </header>
    )
}

export default Header