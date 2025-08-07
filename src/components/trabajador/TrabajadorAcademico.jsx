import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "../global/Modal_lg";
import Dashboard from "../dashboard/Dashboard";
// import '../../App.css';
import Swal from "sweetalert2";
import TrabajadorAcademicoRegistrar from "./TrabajadorAcademicoRegistrar";
import TrabajadorMain from "./TrabajadorMain";

const TrabajadorAcademico = () => {
  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [show, setShow] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);

  useEffect(() => {
    get_columns_proceso();
    get_lista();
    // eslint-disable-next-line
  }, []);

  const abrir_form = (id) => {
    setIdmodulo(id);
    setShow(!show);
  };

  const get_lista = async () => {
    const res = await Axios.post(
      window.globales.url + "/trabajador/lista_academica"
    );
    setRowdata(res.data.items);
  };

  const inserta = (obj) => {
    setRowdata((prevData) => [obj, ...prevData]);
    setShow(!show);
  };
  const modifica = (obj) => {

    setRowdata((prevData) =>
      prevData.map((item) =>
        String(item.id_trabajador_academica) === String(obj.id_trabajador_academica)
          ? { ...item, ...obj }
          : item
      )
    );
    setShow(!show);
  };

  const eliminar = async (id) => {
    let _datos = JSON.stringify({
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
        Axios.post(
          window.globales.url + "/trabajador/eliminar_academica",
          _datos
        )
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_trabajador_academica !== id)
              );
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
        selector: (row) => row.id_trabajador_academica,
        sortable: true,
        width: "0rem",
      },
      {
        id: 2,
        name: "Grado",
        selector: (row) => row.grado,
        sortable: true,
        reorder: true,
      },
      {
        id: 3,
        name: "institucion",
        selector: (row) => row.institucion,
        sortable: true,
        reorder: true,
        wrap: true,
      },
      {
        id: 4,
        name: "Carrera",
        selector: (row) => row.carrera,
        sortable: true,
        reorder: true,
        wrap: true,
      },
      {
        id: 5,
        name: "Egresado",
        selector: (row) => row.egresado,
        sortable: true,
        reorder: true,
      },
      {
        id: 6,
        name: "Colegiatura",
        selector: (row) => row.colegiatura,
        sortable: true,
        reorder: true,
      },
      {
        id: 7,
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
                <Dropdown.Item
                  onClick={() => abrir_form(row.id_trabajador_academica)}
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => eliminar(row.id_trabajador_academica)}
                >
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
      <Container className="mt-3">
        <TrabajadorMain modulo="/trabajador_academico" />
        <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />
        <div className="d-flex justify-content-between mt-4">
          <div>
            {" "}
            <h5>Formación Académica </h5>
            <p>Consigne aquí la formación académica</p>
          </div>
          <div>
            <Button
              onClick={() => abrir_form("")}
              className="mt-4 mb-4"
              variant="primary"
            >
              <i className="bi bi-file-earmark-plus-fill me-2"></i>
              Añadir
            </Button>
          </div>
        </div>

        <Card>
          <DataTable
            columns={columns}
            data={rowdata}
            fixedHeader
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent={<span>No hay información por mostrar</span>}
          />
        </Card>
        <Modal
          comp={
            <TrabajadorAcademicoRegistrar
              handleClose={handleClose}
              inserta={inserta}
              modifica={modifica}
              rowdata={rowdata}
              idmodulo={idmodulo}
            />
          }
          title="Añadir Formación Académica"
          show={show}
          handleClose={handleClose}
        />
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default TrabajadorAcademico;
