import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute(){
    const {user, authLoading} = useContext(AuthContext);

    if(authLoading){
        return <p>Checking authentication...</p>;
    }

    if(user){
        return <Navigate to="/home" replace />;
    }

    return <Outlet/>;
}

export default PublicRoute;