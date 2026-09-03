import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        setError("");
        setIsSubmitting(true);

        try{
            const response = await fetch("http://localhost:3000/api/auth/register",{
               method:"POST",
               headers:{
                "Content-Type":"application/json",
               },
               body: JSON.stringify({
                name,
                email,
                password,
               }),
             }
            );

            const data = await response.json();
            if(!response.ok){
                setError(data.message);
                return;
            }
            navigate("/login");
        }catch{
            setError("Something went wrong");
        }finally{
            setIsSubmitting(false);
        }
    };

    return(
        <main>
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>
               <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

                {error && <p>{error}</p>}
            </form>
        </main>
    );
}

export default Register;