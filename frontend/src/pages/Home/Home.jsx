import { useState } from "react";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setShortUrl("");
    

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setIsSubmitting(true);

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
         if (response.status === 429) {
            const retryAfter = data.retryAfter;
            setError(
              `Too many requests. Please try again in ${retryAfter} seconds.`
            );
          } else {
             setError(data.message || "Something went wrong.");
          }
          return;
      }

      setShortUrl(
        `http://localhost:3000/${data.shortCode}`
      );
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError("Something went wrong. Please try again.");
    } finally{
      setIsSubmitting(false);
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Shortening..." : "Shorten"}
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