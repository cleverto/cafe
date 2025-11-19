import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
} from "react-bootstrap";
import ModalD from "../global/ModalD.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import CajaRegistrar from "../proceso/CajaRegistrar.jsx";
import { useNavigate } from "react-router-dom";
import CajaUsuario from "./CajaUsuario.jsx";

const Caja = () => {
  const [datos, setDatos] = useState([]);
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [show, setShow] = useState(false);
  //const handleClose = () => setShow(false);

  const [showRegistrar, setShowRegistrar] = useState(false);
  const handleCloseRegistrar = () => setShowRegistrar(false);
  //const [idmodulo, setIdmodulo] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idMoneda, setIdMoneda] = useState("");

  useEffect(() => {
    get_usuarios();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
      if (!idUsuario) return;
           
    get_lista(idUsuario, idMoneda);

    // eslint-disable-next-line
  }, [idUsuario, idMoneda]);

  const get_usuarios = async ($) => {

    const res = await Axios.post(window.globales.url + "/caja/lista_usuarios");
    setDatosUsuarios(res.data.items);
    // if (res.data.items.length > 0) {

    //   setIdUsuario(res.data.items[0].id_usuario);
    //    //get_lista(res.data.items[0].id_usuario, res.data.items[0].id_usuario )

    // } else {
    //   setIdUsuario(null);
    // }
  };
  const get_lista = async (id_usuario, id_moneda) => {
    if (!id_usuario) return;
    let _datos = JSON.stringify({ id_usuario: id_usuario, id_moneda: id_moneda });

    const res = await Axios.post(window.globales.url + "/caja/resumen", _datos);
    setDatos(res.data);
    console.log(res.data);
  };


  const componente = (
    <>
      <Container>
        <div className="d-flex justify-content-between mt-4 ">
          <div className="">
            <h3 className="fw-bold mb-1">Movimientos de Caja</h3>
            <small className="text-secondary">
              Registrar movimientos de caja y resumen de movimientos
            </small>
          </div>
          <div className="mt-2">
            <Button
              onClick={() => {
                setShowRegistrar(!showRegistrar);
              }}
              className=" "
              variant="primary"
            >
              <i className="bi bi-file-earmark-plus-fill me-2"></i>
              Nuevo
            </Button>
          </div>
        </div>
        <hr
          className="m"
          style={{
            border: 0,
            borderTop: "1px solid #6cabd4ff",
            borderBottom: "1px solid #fff",
          }}
        />

        <div>
          <div className="d-flex flex-wrap gap-3 ">
            {datosUsuarios.map((item) => (
              <div
                key={item.id_usuario}
                className="flex-fill rounded p-4 shadow "
                style={{
                  minWidth: "158px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor: "white",
                }}
                onClick={() => {
                  setIdUsuario(item.id_usuario);
                  setIdMoneda(item.id_moneda);
                  get_lista(item.id_usuario, item.id_moneda )

                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f1f3f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
              >
                <p className="text-dark mb-1">{item.usuario}</p>
                <p className="text-dark fw-bold fs-4 mb-0">
                  <p className="text-dark fw-bold fs-4 mb-0">
                    {item.simbolo} {Number(item.saldo_apertura).toLocaleString("es-PE") ?? 0}
                  </p>
                </p >
              </div >
            ))}
          </div >
        </div >
        <div className="p-0 mt-4">
          <div className="d-flex flex-wrap gap-3">
            <div
              className="flex-fill bg-light rounded p-4 shadow-md"
              style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
            >
              <p className="text-dark mb-1 fw-medium">Apertura de caja</p>
              <p className="text-dark fw-bold fs-4 mb-0">{datos?.apertura?.simbolo}  {Number(datos?.apertura?.saldo ?? 0).toLocaleString("es-PE")}</p>
              {/* <p className="text-dark fs-4 mb-0 text-muted">$ {Number(datos.apertura_dolares ?? 0).toLocaleString("es-PE")}</p> */}
            </div>

            <div
              className="flex-fill bg-light rounded p-4 shadow-sm"
              style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
            >
              <p className="text-dark mb-1 fw-medium">Ingresos</p>
              <p className="text-dark fw-bold fs-4 mb-0">{datos?.ingresos?.simbolo}  {Number(datos?.ingresos?.saldo ?? 0).toLocaleString("es-PE")} </p>
              {/* <p className="text-dark fs-4 mb-0 text-muted">$ {Number(datos.ingresos_dolares ?? 0).toLocaleString("es-PE")}</p> */}
            </div>

            <div
              className="flex-fill bg-light rounded p-4 shadow-sm"
              style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
            >
              <p className="text-dark mb-1 fw-medium">Salidas</p>
              <p className="text-dark fw-bold fs-4 mb-0">{datos?.egresos?.simbolo} {Number(datos?.egresos?.saldo ?? 0).toLocaleString("es-PE")}</p>
              {/* <p className="text-dark  fs-4 mb-0 text-muted">$ {Number(datos.egresos_dolares ?? 0).toLocaleString("es-PE")}</p> */}
            </div>

            <div
              className="flex-fill bg-light rounded p-4 shadow-sm"
              style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
            >
              <p className="text-dark mb-1 fw-medium">Saldo</p>
              <p className="text-dark fs-4 mb-0">{datos?.saldo?.simbolo}  {Number(datos?.saldo?.saldo ?? 0).toLocaleString("es-PE")}</p>
              {/* <p className="text-dark fw-bold fs-4 mb-0 text-muted">$ {Number(datos.saldo_dolares ?? 0).toLocaleString("es-PE")}</p> */}
            </div>
          </div>
        </div>

        <hr
          className="m"
          style={{
            border: 0,
            borderTop: "1px solid #6cabd4ff",
            borderBottom: "1px solid #fff",
          }}
        />

      </Container>
      <CajaUsuario
        formId="formId"
        id_usuario={idUsuario}
        id_moneda={idMoneda}
      />
      {/* 
      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="xl"
        title="Resumen de caja por usuario"
        formId="formId"
        aceptarTexto=""
        cancelarTexto="Cancelar"
      >
        <CajaUsuario
          formId="formId"
          handleClose={handleClose}
          id_usuario={idUsuario}
        />
      </ModalD> */}
      <ModalD
        operacion="0"
        show={showRegistrar}
        onClose={() => setShowRegistrar(false)}
        size="lg"
        title="Registrar movimiento"
        formId="formId"
        aceptarTexto="Guardar"
        cancelarTexto="Cancelar"
      >
        <CajaRegistrar
          formId="formId"
          handleClose={handleCloseRegistrar}
          get_lista={get_lista}
          id_usuario={idUsuario}
        />
      </ModalD>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Caja;
