import React, {FC} from "react";
import { Link } from "react-router-dom";
import './navigation.scss'

const Navigation: FC = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/profile">
                        Профиль
                    </Link>
                </li>
                <li>
                    <Link to="/friends">
                        Друзья
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Новости
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;