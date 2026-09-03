import { useEffect, useState } from "react";
import LinksTable from "./LinksTable.jsx";

function Links() {
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchMyUrls = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/urls/myUrls",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(response);
          setError("Something went wrong.");
          return;
        }

        if (!data.data) {
          setMessage(data.message);
          return;
        }

        setUrls(data.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
        setError("Something went wrong.");
      }
    };

    fetchMyUrls();
  }, []);

  const handleDelete = async (id) => {
    try {

      setDeletingId(id);

      const response = await fetch(
        `http://localhost:3000/api/urls/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete URL.");
        return;
      }

      setUrls((currentUrls) =>
        currentUrls.filter((url) => url._id !== id)
      );
    } catch (error) {
      console.error("Error deleting URL:", error);
      setError("Something went wrong.");
    }
  };

  return (
    <div>
      <h1>My Links</h1>

      {error && <p>{error}</p>}

      {message && <p>{message}</p>}

      <LinksTable urls={urls} onDelete={handleDelete} deletingId={deletingId}/>
    </div>
  );
}

export default Links;