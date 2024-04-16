import { useState } from "react";
import MiApi from "./componentes/MiApi";
import "./componentes/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [pesos, setPesos] = useState("");
  const [monedaSelected, setMonedaSelected] = useState("");
  const [valorFinal, setValorFinal] = useState("");
  const [datos, setDatos] = useState([]);
  const [buscarXfecha, setbuscarXfecha] = useState("");

  // Controlador de eventos para el cambio en el input de pesos
  const handlePesosChange = (e) => {
    setPesos(e.target.value);
    // Si el valor de pesos es vacío, restablecer monedaSelected
    if (e.target.value === "") {
      setValorFinal("");
      setMonedaSelected("");
      setbuscarXfecha("");
    }
  };
  const handleFechaChange = (e) => {
    setbuscarXfecha(e.target.value);
  };

  const filteredDatos = datos.filter(({ fecha }) =>
    fecha.includes(buscarXfecha)
  );

  const sortedDatos = filteredDatos.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha);
  });

  return (
    <>
      <header className="encabezado">
        <img
          className="logo_bcentral"
          src="src\assets\imgs\logo_banco.png"
          alt="logo banco"
          srcset=""
        />
      </header>
      <div className="titulo">
        <h1>
          <span>Co</span>nve<span>rsor</span>
        </h1>
        <h1>
          <span>de</span>
        </h1>
        <h1>
          <span>Mo</span>ned<span>as</span>
        </h1>
        <hr className="text-info" />
      </div>
      <div className="container">
        <main>
          <div className="cuadros_numeros">
            <div className="cuadro_input">
              <h4>Monto a Convertir</h4>
              <input
                placeholder="Ingrese monto en Pesos Chilenos (CLP)"
                className="form-control"
                value={pesos}
                onChange={handlePesosChange}
              />
            </div>
            <div className="cuadro_conversion">
              <h4>Convertir a:</h4>
              <select
                className="form-select"
                value={monedaSelected}
                onChange={(e) => setMonedaSelected(e.target.value)}
                disabled={!pesos}
              >
                <option defaultValue={"selected"}>Seleccione moneda</option>
                <option value="dolar">Dolar</option>
                <option value="euro">Euro</option>
                <option value="uf">UF</option>
              </select>
              {valorFinal && (
                <h4 className="valor_convertido">{`El monto equivale a ${valorFinal} ${monedaSelected}`}</h4>
              )}
            </div>
          </div>

          <div className="cuadro_fecha">
            <h4>Busqueda por Fecha</h4>
            <input
              type="text"
              placeholder="Ingrese fecha (d/m)"
              className="form-control"
              value={buscarXfecha}
              onChange={handleFechaChange}
            />
          </div>
        </main>
        {pesos !== "" && monedaSelected !== "" && (
          <>
            <MiApi
              pesos={pesos}
              monedaSelected={monedaSelected}
              setValorFinal={setValorFinal}
              setDatos={setDatos}
            />
            <div className="titulo_tabla">
              <h4>{`Valor de ${monedaSelected} de los últimos 30 días`}</h4>
            </div>
            <div className="tabla_final">
              <table className="table table-striped table-hover shadow-lg">
                <thead>
                  <tr>
                    <td>Fecha</td>
                    <td>Valor CLP</td>
                  </tr>
                </thead>
                <tbody>
                  {sortedDatos.map(({ fecha, valor }) => (
                    <tr key={fecha}>
                      <td>{fecha}</td>
                      <td>{valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <div className="pie_pagina">
        <footer>
          <p>Todos los Derechos Reservados, Banco Central de Chile 2024.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
