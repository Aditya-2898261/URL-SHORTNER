import {useContext} from "react";
import { Navigate,Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function ProtectedRoute(){
    const {user, authLoading} = useContext(AuthContext);

    if(authLoading){
        return <p>Checking Authentication...</p>;
    }
    if(!user){
        return <Navigate to="/login" replace/>
    }
    return <Outlet/>;
}

export default ProtectedRoute;