import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import GetStarted from "./pages/GetStarted/GetStarted.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute.jsx";
import AppLayout from "./layouts/AppLayout/AppLayout.jsx";
import PublicLayout from "./layouts/PublicLayout/PublicLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Links from "./pages/Links/Links.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";

function App(){
    return (
        <Routes>
            <Route element={<PublicRoute/>}>
              <Route element={<PublicLayout/>}>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/get-started" element={<GetStarted/>}/>
              </Route>
            </Route>
            <Route element={<ProtectedRoute/>}>
              <Route element={<AppLayout/>}>
                <Route path="/home" element={<Home/>} />
                <Route path="/links" element={<Links/>} />
                <Route path="/analytics" element={<Analytics/>} />
              </Route>
            </Route>
        </Routes>
    );
}

export default App;