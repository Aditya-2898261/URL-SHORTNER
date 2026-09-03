import { useState } from "react";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/urls/createShortCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            originalUrl: url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError("Please enter a valid URL.");
        console.error(data);
        return;
      }

      setShortUrl(
        `http://localhost:3000/${data.shortCode}`
      );
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Shorten a URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter your long URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <button type="submit">
          Shorten
        </button>
      </form>

      {error && <p>{error}</p>}

      {shortUrl && (
        <p>
          Your short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default Home;