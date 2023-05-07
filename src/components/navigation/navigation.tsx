import React, {FC} from "react";
import { Link } from "react-router-dom";
import './navigation.scss'

const Navigation: FC = () => {
    return(
        <nav>
            <ul>
                <Link to="/profile">
                    <li>
                        Профиль
                    </li>
                </Link>
                <Link to="/friends">
                    <li>
                        Друзья
                    </li>
                </Link>
                <Link to="/">
                    <li>
                        Новости
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navigation;