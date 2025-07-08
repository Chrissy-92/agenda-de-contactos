function UserItem({ contact, isFavorite, showImage }) {
  return (
    <>
      {showImage && contact.image && (
        <figure>
          <img
            className="photo__image"
            src={`/images/${contact.image}`}
            alt={`${contact.name} ${contact.lastname}`}
          />
        </figure>
      )}
      <h3>
        Name: {contact.name} {contact.lastname} {isFavorite ? "⭐" : ""}
      </h3>
      <p>Phone: {contact.phone} </p>
      <p>Email: {contact.email} </p>
      <p>City: {contact.city} </p>
    </>
  );
}

export default UserItem;
