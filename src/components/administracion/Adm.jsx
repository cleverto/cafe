import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "../global/Modal_lg";
import AdmRegistrar from "./AdmRegistrar";
import Dashboard from "../dashboard/Dashboard";
// import '../../App.css';
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Adm = () => {
  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [show, setShow] = useState(false);
  const [modulo, setModulo] = useState("");
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    get_lista();
    // eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    get_columns_proceso();
    // eslint-disable-next-line
  }, []);

  const abrir_form = (e, id) => {
    console.log(id);
    setIdmodulo(id);
    setShow(!show);
  };

  const get_lista = async () => {
    const partes = path.split("/");
    const cad = partes[partes.length - 1];
    setModulo(cad);

    let _datos = JSON.stringify({ modulo: cad, campo: cad });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setRowdata(res.data.items);
  };

  const inserta = (obj) => {
    setRowdata((prevData) => [obj, ...prevData]);
    setShow(!show);
  };
  const modifica = (obj) => {
    setRowdata((prevData) =>
      prevData.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
    );
    setShow(!show);
  };

  const eliminar = async (e, id) => {
    const partes = path.split("/");
    const cad = partes[partes.length - 1]; //no uso modulo porque se pierde ese valor aqui, llega vacio

    let _datos = JSON.stringify({
      modulo: cad,
      campo: `id_${cad}`,
      id: id,
    });

    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(window.globales.url + "/administracion/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "true") {
              setRowdata((prevData) => prevData.filter((row) => row.id !== id));
            }
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      }
    });
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas",
    rangeSeparatorText: "de",
  };
  const get_columns_proceso = () => {
    setColumns([
      {
        id: 1,
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        width: "5rem",
      },
      {
        id: 2,
        name: "Descripción",
        selector: (row) => row.descripcion,
        sortable: true,
        reorder: true,
      },
      {
        id: 3,
        name: "Opciones ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <>
            <Dropdown className="hide-split-after ">
              <Dropdown.Toggle
                className="rounded-circle"
                size="sm"
                variant="outline-secondary"
              >
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => abrir_form(e, row.id)}>
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(e, row.id)}>
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ),
      },
    ]);
  };
  const componente = (
    <>
      <div className="d-flex justify-content-between">
        <div className="pt-4">
          {modulo === "cargo" && (
            <div className="">
              <h4>Cargo</h4>
            </div>
          )}
          {modulo === "carrera" && (
            <div className="">
              <h4>Carrera profesional</h4>
            </div>
          )}
          {modulo === "dedicacion" && (
            <div className="">
              <h4>Dedicación</h4>
            </div>
          )}
          {modulo === "departamento_academico" && (
            <div className="">
              <h4>Departamento académico</h4>
            </div>
          )}
          {modulo === "estado_civil" && (
            <div className="">
              <h4>Estado civil</h4>
            </div>
          )}
          {modulo === "grado" && (
            <div className="">
              <h4>Grado Académico</h4>
            </div>
          )}
          {modulo === "institucion" && (
            <div className="">
              <h4>Instituciones superiores</h4>
            </div>
          )}
          {modulo === "pension" && (
            <div className="">
              <h4>Sistema de pensión</h4>
            </div>
          )}
          {modulo === "regimen" && (
            <div className="">
              <h4>Régimen laboral</h4>
            </div>
          )}
          {modulo === "requisito" && (
            <div className="">
              <h4>Requisitos para adjuntar documentos</h4>
            </div>
          )}
          {modulo === "tipo_contrato" && (
            <div className="">
              <h4>Tipo de contrato</h4>
            </div>
          )}
          {modulo === "tipo_remuneracion" && (
            <div className="">
              <h4>Tipo de remuneración</h4>
            </div>
          )}
          {modulo === "tipo_resolucion" && (
            <div className="">
              <h4>Tipo de resolución</h4>
            </div>
          )}
          {modulo === "tipo_trabajador" && (
            <div className="">
              <h4>Tipo de trabajador</h4>
            </div>
          )}
          {modulo === "tipo_via" && (
            <div className="">
              <h4>Tipo de vía</h4>
            </div>
          )}
        </div>
        <div className="pt-4">
          <Button onClick={abrir_form} className="mb-3 " variant="primary">
            <i className="bi bi-file-earmark-plus-fill me-2"></i>
            Nuevo
          </Button>
        </div>
      </div>
      <Card>
        <DataTable
          columns={columns}
          data={rowdata}
          fixedHeader
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={<span>No hay información por mostrar</span>}
        />
      </Card>
      <Modal
        comp={
          <AdmRegistrar
            handleClose={handleClose}
            inserta={inserta}
            modifica={modifica}
            rowdata={rowdata}
            idmodulo={idmodulo}
            modulo={modulo}
          />
        }
        title="Registrar"
        show={show}
        handleClose={handleClose}
      />
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Adm;
