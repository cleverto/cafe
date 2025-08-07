import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";

import Dashboard from "../dashboard/Dashboard.jsx";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


const Cargo = () => {

  const [dni, setDNI] = useState("");

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    get_columns();
    get_lista();
    // eslint-disable-next-line
  }, []);

  const get_lista = async () => {
    const res = await Axios.post(window.globales.url + "/rotacion/lista");

    var data = res.data.items.map(function (el, i) {
      return Object.assign({ nro: i + 1 }, el);
    });
    setRowdata(data);
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
        Axios.post(window.globales.url + "/rotacion/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_rotacion !== id)
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
  const get_columns = () => {
    setColumns([
      {
        id: 1,
        name: "Código",
        selector: (row) => row.id_rotacion,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        id: 2,
        name: "trabajador",
        selector: (row) => row.trabajador,
        sortable: true,
      },
      {
        id: 3,
        name: "dependencia",
        selector: (row) => row.dependencia,
        sortable: true,
        width: "16rem",
        wrap: true,
      },
      {
        id: 4,
        name: "inicio",
        selector: (row) => row.inicio,
        sortable: true,
        width: "7rem",
      },
      {
        id: 5,
        name: "fin",
        selector: (row) => row.fin,
        sortable: true,
        width: "7rem",
      },
      {
        id: 6,
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
                  as={Link}
                  to={`../rotacion/editar?id=${row.id_rotacion}`}
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(row.id_rotacion)}>
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ),
      },
    ]);
  };

  const filteredData = rowdata.filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(dni.toLowerCase());
  });

  const componente = (
    <>
      <div className="d-flex justify-content-between">
        <div className="">
          <h2>Rotación</h2>
          <p>Rotación tempral de personal</p>
        </div>
        <div className="pt-4">
          <Link to="/rotacion/nuevo">
            <Button className="mb-3 " variant="primary">
              <i className="bi bi-file-earmark-plus-fill me-2"></i>
              Nuevo
            </Button>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-2">
        <Form.Group as={Col} md="12">
          <Form.Control
            value={dni}
            onChange={(e) => setDNI(e.target.value)}
            name="dni"
            type="text"
            placeholder="Buscar"
            autoComplete="off"
          />
        </Form.Group>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
        />
      </Card>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Cargo;
