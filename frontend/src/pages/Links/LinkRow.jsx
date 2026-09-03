function LinkRow({url,onDelete,deletingId}){
    const isDeleting = deletingId === url._id;
    return(
        <tr>
            <td>{url.originalUrl}</td>
            <td>
                <a href={`http://localhost:3000/${url.shortCode}`}  target="_blank"  rel="noopener noreferrer">{url.shortCode}</a>
            </td>
            <td>
                <button onClick={() => onDelete(url._id)}  disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </td>
        </tr>
    );
}

export default LinkRow;