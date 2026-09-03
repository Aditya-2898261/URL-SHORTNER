import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Login() {
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try{
             console.log("Login request started");

            const response = await fetch("http://localhost:3000/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials:"include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            console.log("Login response:", response.status);
            const data = await response.json();
            if(!response.ok){
                setError(data.message);
                return;
            }
            setUser(data.user);
            navigate("/home");
       } catch (error) {
  console.error("LOGIN ERROR:", error);
  setError("Something went wrong");

        }finally{
            setIsSubmitting(false);
        }
    }

  return (
   <main>
    <h1>Login Form</h1>

    <form onSubmit={handleSubmit}>  
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="sumbit">
            {isSubmitting ? "Logging in..." : "Login"}
        </button>
        {error && <p>{error}</p>}
    </form>
   </main>
  );
}

export default Login;