import UserItem from "./UserItem";

function UserList({ contacts, toggleFavorite, favoriteContacts, showImage }) {
  return (
    <section className="lilacmode">
      <ul className="list__contacts">
        {contacts.map((eachContactObj) => (
          <li
            key={eachContactObj.id}
            className="card"
            onClick={() => toggleFavorite(eachContactObj.id)}
            style={{ cursor: "pointer" }}
          >
            <UserItem
              contact={eachContactObj}
              isFavorite={favoriteContacts.some(
                (fav) => fav.id === eachContactObj.id
              )}
              showImage={showImage}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UserList;
