import React, { useState, useEffect, FC, useCallback } from "react";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "../services/types/store"
import { getUser } from "../services/actions/user";

type TProtectedRouteProps = {
    onlyForAuth: boolean;
    children?: React.ReactNode;
    [name: string]: any;
}

export const ProtectedRoute : FC<TProtectedRouteProps> = ({ onlyForAuth, children, ...rest}) => {
    const dispatch = useDispatch()
    const { user } = useSelector((store) => store.user)
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
    const location = useLocation<{from: {pathname: string}}>()

    const init = useCallback(() => {
        dispatch(getUser());
        setUserLoaded(true);
    }, [dispatch])

    useEffect(() => {
        init()
    }, [init])

    if (!isUserLoaded) {
        return null;
    }

    if(!onlyForAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        )
    }

    if (onlyForAuth && !user) {
        return (
            <Route {...rest}>
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            </Route>
        )
    }

    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}