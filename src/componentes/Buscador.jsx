
const Buscador = () => {
    return (
      <>
        <div className="busca">
            <h4>Busqueda por Fecha</h4>
            <input
              type="text"
              placeholder="Ingrese fecha (d/m)"
              className="form-control"
              value={buscarXfecha}
              onChange={handleFechaChange}
            />
          </div>
      </>
    );
  };

export default Buscador;