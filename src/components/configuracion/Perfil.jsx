import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "../global/Modal_lg";
import Dashboard from "../dashboard/Dashboard";
// import '../../App.css';
import Swal from "sweetalert2";
import PerfilRegistrar from "./PerfilRegistrar";
import PerfilOpcion from "./PerfilOpcion";

const Perfil = () => {
  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [show, setShow] = useState(false);
  const [showc, setShowc] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);
  const handleClosec = () => setShowc(false);

  useEffect(() => {
    get_columns_proceso();
    get_lista();
    // eslint-disable-next-line
  }, []);

  const abrir_form = (e, id) => {
    setIdmodulo(id);
    setShow(!show);
  };

  const abrir_formc = (e, id) => {
    setIdmodulo(id);
    setShowc(!show);
  }; 

  const get_lista = async () => {
    let _datos = JSON.stringify({ modulo: "men_perfil", campo: "perfil" });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista_admi",
      _datos
    );
    setRowdata(res.data.items);
  };

  const eliminar = async (e, id) => {
    let _datos = JSON.stringify({
      modulo: "men_perfil",
      campo: "perfil",
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
      Axios.post(window.globales.url + "/administracion/eliminar_admi", _datos)
        .then((res) => {
          if (res.data.rpta === "true") {
            setRowdata((prevData) =>
              prevData.filter((row) => row.perfil !== id)
            );
          }
        })
        .catch((error) => {
          Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
        });
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
        name: "Nro",
        selector: (row) => row.perfil,
        sortable: true,
        width: "5rem",
      },
      {
        id: 2,
        name: "Descripción",
        selector: (row) => row.nombre,
        sortable: true,
        reorder: true,
      },
      {
        id: 3,
        name: "estado",
        sortable: true,
        reorder: true,
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
        id: 4,
        name: "Opciones ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <>
            <Button variant="warning" size="sm"  onClick={(e) => abrir_formc(e, row.perfil)}>
              <i className="bi bi-check2-square"></i>
            </Button>
            <Dropdown className="hide-split-after mx-2 ">
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
                <Dropdown.Item onClick={(e) => abrir_form(e, row.perfil)}>
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(e, row.perfil)}>
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
          <h2>Perfil</h2>
          <p>Registre los perfiles de usuario</p>
        </div>
        <div className="pt-4">
          <Button onClick={abrir_form} className="mb-3 " variant="primary">
            <i className="bi bi-file-earmark-plus-fill me-2"></i>
            Nuevo registro
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
          <PerfilRegistrar
            handleClose={handleClose}
            rowdata={rowdata}
            idmodulo={idmodulo}
          />
        }
        title="Registrar perfil"
        show={show}
        handleClose={handleClose}
      />
      <Modal
        comp={
          <PerfilOpcion
            handleClose={handleClosec}
            rowdata={rowdata}
            idmodulo={idmodulo}
          />
        }
        title="Opciones de perfil"
        show={showc}
        handleClose={handleClosec}
      />
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Perfil;
