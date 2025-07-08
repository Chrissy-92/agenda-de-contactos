function InputSearch({ handleSubmit, handleInputFilterName, filterName }) {
  return (
    <form onSubmit={handleSubmit} className="filter">
      <input
        onInput={handleInputFilterName}
        value={filterName}
        className="filter__input"
        type="text"
        name="filter__input"
        id="filter__input"
        placeholder="Buscar contacto"
      />
    </form>
  );
}

export default InputSearch;
