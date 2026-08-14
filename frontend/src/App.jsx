import { useState } from "react";


function App() {

  const[originalUrl,setOriginalUrl] = useState("");
  const[shortCode,setShortCode] = useState(""); 
  const [error,setError] = useState("");

  const handleOnChange = (e) => {
    setOriginalUrl(e.target.value);
  }

  const handleOnSubmit = async() => {
    setError("");
    setShortCode("");

    const response = await fetch("http://localhost:3000/api/urls",{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
             originalUrl
          })
    });
    const data = await response.json();
    if(!response.ok){
      setError(data.message);
      return;
    }
    setShortCode(data.shortCode);
  }

  return (
 <div className="container">
  <h1>URL Shortener</h1>

  <input
    className="url-input"
    type="text"
    placeholder="Paste your long URL"
    value={originalUrl}
    onChange={handleOnChange}
  />

  <button className="shorten-btn" onClick={handleOnSubmit}>
    Shorten URL
  </button>

  {error && <p>{error}</p>}

  {shortCode && (
    <a
      className="short-url"
      href={`http://localhost:3000/${shortCode}`}
    >
      http://localhost:3000/{shortCode}
    </a>
  )}
 </div>
  );
}

export default App
