import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "../global/Modal_lg";

import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import UsuarioRegistrar from "./UsuarioRegistrar";

const Usuario = () => {
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

  const abrir_form = (e, id) => {
    setIdmodulo(id);
    setShow(!show);
  };

  const get_lista = async () => {
    const res = await Axios.post(window.globales.url + "/usuario/lista");

    setRowdata(res.data.items);
  };

  const eliminar = async (e, id) => {
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
        Axios.post(window.globales.url + "/usuario/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_usuario !== id)
              );
            }
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
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
        name: "Código",
        selector: (row) => row.id_usuario,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        id: 2,
        name: "Nombre",
        selector: (row) => row.usuario,
        sortable: true,
      },
      {
        id: 3,
        name: "email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        id: 4,
        name: "Perfil",
        selector: (row) => row.perfil,
        sortable: true,
        width: "15rem",
      },
      {
        id: 5,
        name: "Activo",
        button: true,
        sortable: true,
        grow: 0,
        cell: (row) => (
          <>
            {parseInt(row.activo) === 1 ? (
              <Badge bg="primary">Activo</Badge>
            ) : (
              <Badge bg="danger">Inactivo</Badge>
            )}
          </>
        ),
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
                <Dropdown.Item onClick={(e) => abrir_form(e, row.id_usuario)}>
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(e, row.id_usuario)}>
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
        <div className="">
          <h2>Usuario</h2>
          <p>Registre los usuarios con acceso al sistema</p>
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
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={<span>No hay información por mostrar</span>}
        />
      </Card>
      <Modal
        comp={
          <UsuarioRegistrar
            handleClose={handleClose}
            rowdata={rowdata}
            idmodulo={idmodulo}
          />
        }
        title="Registrar usuario"
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

export default Usuario;
