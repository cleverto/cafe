import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModalD from "../global/ModalD.jsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import ProveedorRegistrar from "../administracion/ProveedorRegistrar.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CajaBuscar from "./CajaUsuario.jsx";
import CajaUsuario from "./CajaUsuario.jsx";

const Caja = () => {
  const [datos, setDatos] = useState([]);
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [show, setShow] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  useEffect(() => {
    get_lista();
    // eslint-disable-next-line
  }, []);

  const get_lista = async () => {
    const res = await Axios.post(window.globales.url + "/caja/resumen");

    setDatos(res.data);
    setDatosUsuarios(res.data.saldo_usuarios);
  };

  const eliminar = async (id) => {
    let _datos = JSON.stringify({ id: id });
    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(window.globales.url + "/proveedor/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
            }
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  const componente = (
    <>
      <div className="d-flex justify-content-between mt-4 ">
        <div className="">
          <h3 className="fw-bold mb-1">Movimientos de Caja</h3>
          <small className="text-secondary">
            Registrar movimientos de caja y resumen de movimientos
          </small>
        </div>
        <div className="mt-2">
          <Button
            className="  mx-1"
            variant="outline-primary"
            title="Buscar"
            onClick={() => navigate("/proceso/caka/buscar")}
          >
            <i className="bi bi-search"></i>
          </Button>
          <Button
            onClick={() => {
              setIdmodulo("");
              setShow(!show);
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

      <Container>
        <div className="d-flex flex-wrap gap-3 p-4">
          <div
            className="flex-fill bg-light rounded p-4 shadow-md"
            style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
          >
            <p className="text-dark mb-1 fw-medium">Apertura de caja</p>
            <p className="text-dark fw-bold fs-4 mb-0">S/ {datos.apertura}</p>
            <p className="text-dark fs-4 mb-0 text-muted">$ {datos.apertura_dolares}</p>
          </div>

          <div
            className="flex-fill bg-light rounded p-4 shadow-sm"
            style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
          >
            <p className="text-dark mb-1 fw-medium">Ingresos</p>
            <p className="text-dark fw-bold fs-4 mb-0">{datos.ingresos}</p>
            <p className="text-dark fs-4 mb-0 text-muted">$ {datos.ingresos_dolares}</p>
          </div>

          <div
            className="flex-fill bg-light rounded p-4 shadow-sm"
            style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
          >
            <p className="text-dark mb-1 fw-medium">Salidas</p>
            <p className="text-dark fw-bold fs-4 mb-0">{datos.egresos}</p>
            <p className="text-dark  fs-4 mb-0 text-muted">{datos.egresos_dolares}</p>
          </div>

          <div
            className="flex-fill bg-light rounded p-4 shadow-sm"
            style={{ minWidth: "158px", backgroundColor: "#e7edf4" }}
          >
            <p className="text-dark mb-1 fw-medium">Saldo</p>
            <p className="text-dark fs-4 mb-0">{datos.saldo}</p>
            <p className="text-dark fw-bold fs-4 mb-0 text-muted">{datos.saldo_dolares}</p>
          </div>
        </div>
      </Container>

      <hr
        className="m"
        style={{
          border: 0,
          borderTop: "1px solid #6cabd4ff",
          borderBottom: "1px solid #fff",
        }}
      />
      <Container>
        <div className="d-flex flex-wrap gap-3 p-4">
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
                setShow(!show);
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
               {item.simbolo} {item.saldo_apertura ?? 0}
              </p>
 
            </div>
          ))}
        </div>
      </Container>

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
