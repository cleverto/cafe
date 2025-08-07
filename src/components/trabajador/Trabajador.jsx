import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";

import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { abrirReporte } from "../global/utils.js";

const Trabajador = () => {
  const navigate = useNavigate();

  const [dni, setDNI] = useState("");

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    get_columns_proceso();
    get_lista();
    // eslint-disable-next-line
  }, []);

  const get_lista = async () => {
    const res = await Axios.post(window.globales.url + "/trabajador/lista");

    var data = res.data.items.map(function (el, i) {
      return Object.assign({ nro: i + 1 }, el);
    });
    setRowdata(data);

    //     try {
    //   const res = await Axios.post(window.globales.url + "/trabajador/lista");

    //   var data = res.data.items.map(function (el, i) {
    //     return Object.assign({ nro: i + 1 }, el);
    //   });
    //   setRowdata(data);
    // } catch (error) {
    //   console.error("Error al cargar datos:", error);
    // }
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
        Axios.post(window.globales.url + "/trabajador/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_trabajador !== id)
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
        selector: (row) => row.id_trabajador,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        id: 2,
        name: "Tipo",
        selector: (row) => row.tipo_trabajador,
        sortable: true,
        width: "6rem",
      },
      {
        id: 3,
        name: "Nombre",
        selector: (row) => row.trabajador,
        sortable: true,
        cell: (row) => (
          <div
            onClick={() => {
              navigate(`../trabajador/modificar?id=${row.id_trabajador}`);
            }}
            style={{
              cursor: "pointer",
              padding: "5px", // Agregar algo de espacio
              borderRadius: "4px", // Bordes redondeados (opcional)
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "blue"; // Cambiar el color del texto a blanco
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "black"; // Restaurar el color del texto
            }}
          >
            {row.trabajador}
          </div>
        ),
      },
      {
        id: 4,
        name: "DNI",
        selector: (row) => row.dni,
        sortable: true,
        width: "7rem",
      },
      {
        id: 5,
        name: "Email",
        selector: (row) => row.correo,
        sortable: true,
        width: "15rem",
        cell: (row) => (
          <div className="d-flex flex-column">
            <div className=""> {row.correo}</div>
            <div> {row.institucional}</div>
          </div>
        ),
      },
      {
        id: 6,
        name: "Telefono",
        selector: (row) => row.telefono,
        sortable: true,
        width: "7rem",
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
                  as={Link}
                  to={`../trabajador/modificar?id=${row.id_trabajador}`}
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => eliminar(row.id_trabajador)}>
                  <i className="bi bi bi-trash-fill me-2"></i>Eliminar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) =>
                    abrirReporte(
                      `#/reporte/trabajador?id=${row.id_trabajador}&opt=${row.id_tipo_trabajador}`
                    )
                  }
                >
                  <i className="bi bi-printer-fill  me-2"></i>Imprimir Ficha
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) =>
                    abrirReporte(
                      `#/reporte/escalafonario10?id=${row.id_trabajador}`
                    )
                  }
                >
                  <i className="bi bi-printer-fill  me-2"></i>Escalafonario 10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) =>
                    abrirReporte(
                      `#/reporte/escalafonario13?id=${row.id_trabajador}`
                    )
                  }
                >
                  <i className="bi bi-printer-fill  me-2"></i>Escalafonario 13
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) =>
                    abrirReporte(
                      `#/reporte/escalafonario14?id=${row.id_trabajador}`
                    )
                  }
                >
                  <i className="bi bi-printer-fill  me-2"></i>Escalafonario 14
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) =>
                    abrirReporte(
                      `#/reporte/escalafonario15?id=${row.id_trabajador}`
                    )
                  }
                >
                  <i className="bi bi-printer-fill  me-2"></i>Escalafonario 15
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
          <h2>Trabajador</h2>
          <p>Registre los datos de los trabajadores de la UNJ</p>
        </div>
        <div className="pt-4">
          <Link to="/trabajador/nuevo">
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

export default Trabajador;
