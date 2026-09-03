import LinkRow from "./LinkRow.jsx";

function LinksTable({ urls, onDelete, deletingId}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
        </tr>
      </thead>

      <tbody>
        {urls.map((url) => (
          <LinkRow key={url._id} url={url} onDelete={onDelete} deletingId={deletingId}/>
        ))}
      </tbody>
    </table>
  );
}

export default LinksTable;