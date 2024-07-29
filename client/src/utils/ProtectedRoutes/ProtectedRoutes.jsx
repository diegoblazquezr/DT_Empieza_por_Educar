import React from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ component, logged }) => {

    return (
        logged ? component : <div><span>Por favor inicia sesión</span></div>
    )

};

export default ProtectedRoutes;
