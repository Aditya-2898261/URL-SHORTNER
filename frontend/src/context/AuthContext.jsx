import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const refreshUser = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/auth/me",{
                credentials: "include",
            });
            if(!response.ok){
                setUser(null);
                return;
            }
            const data = await response.json();
            setUser(data.user);
        }catch{
            setUser(null);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await refreshUser();
            setAuthLoading(false);
        };
        initializeAuth();
    }, []);

    return(
        <AuthContext.Provider value={{user, setUser, authLoading, refreshUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;