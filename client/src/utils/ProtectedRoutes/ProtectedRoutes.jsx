import React from "react";
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ component, logged }) => {
    const navigate = useNavigate();

    return (
        logged ? component : navigate()
    )

};

export default ProtectedRoutes;
