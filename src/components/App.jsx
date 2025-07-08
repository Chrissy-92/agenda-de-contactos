import { useState, useEffect } from "react";
import "../styles/App.scss";
import data from "../data/contacts.json";
import UserList from "./contacts/UserList";
import InputSearch from "./InputSearch";

function App() {
  // VARIABLES DE ESTADO

  const [contacts] = useState(data);
  const [filterName, setFilterName] = useState("");
  // La variable inicializa el estado leyendo desde localStorage si existe.
  const [favoriteContacts, setFavoriteContacts] = useState(() => {
    try {
      const stored = localStorage.getItem("favoriteContacts");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error leyendo favoritos:", err);
      return [];
    }
  });

  // USE-EFFECTS
  useEffect(() => {
    localStorage.setItem("favoriteContacts", JSON.stringify(favoriteContacts));
  }, [favoriteContacts]);

  // EVENTOS

  // Evento para controlar el input de búsqueda.
  const handleInputFilterName = (ev) => {
    setFilterName(ev.target.value);
  };

  // Filtramos lo que introduzca el usuario en el input y guardamos el valor en la variable filteredContact, selecciona y muestra coincidencias tanto para el nombre como para el apellido.
  const filteredContacts = contacts.filter(
    (eachContact) =>
      eachContact.name
        .toLocaleLowerCase()
        .includes(filterName.toLocaleLowerCase()) ||
      eachContact.lastname
        .toLocaleLowerCase()
        .includes(filterName.toLocaleLowerCase())
  );

  // Función que previene la recarga de la página desde el input
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  // Función para añadir o eliminar contactos favoritos.
  const toggleFavorite = (clickedId) => {
    // Verifica si ya es favorito
    const isFavorite = favoriteContacts.some(
      (eachContact) => eachContact.id === clickedId
    );

    if (isFavorite) {
      // Si ya es favorito, lo eliminamos
      const updatedFavorites = favoriteContacts.filter(
        (eachContact) => eachContact.id !== clickedId
      );
      setFavoriteContacts(updatedFavorites);
    } else {
      // Si no es favorito, lo buscamos y lo añadimos
      const contactToAdd = contacts.find(
        (eachContact) => eachContact.id === clickedId
      );
      if (contactToAdd) {
        setFavoriteContacts([...favoriteContacts, contactToAdd]);
      }
    }
  };

  return (
    <div className="page-lilacmode">
      <header className="header">
        <h1 className="header__title"> Mi agenda de contactos </h1>
      </header>
      <main>
        <InputSearch
          handleSubmit={handleSubmit}
          handleInputFilterName={handleInputFilterName}
          filterName={filterName}
        />
        <section className="container__lists">
          <h2 className="header__subtitle01">
            Usuarios favoritos: {favoriteContacts.length}
          </h2>
          <UserList
            className="allUsers"
            contacts={filteredContacts}
            favoriteContacts={favoriteContacts}
            toggleFavorite={toggleFavorite}
            showImage={false}
          />
          <h2 className="header__subtitle02">Favoritos ⭐</h2>
          <UserList
            className="userFavorites"
            contacts={favoriteContacts}
            favoriteContacts={favoriteContacts}
            toggleFavorite={toggleFavorite}
            showImage={true}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
