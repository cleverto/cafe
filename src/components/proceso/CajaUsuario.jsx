import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown } from "react-bootstrap";

import Axios from "axios";
import Swal from "sweetalert2";

import DataTable from "react-data-table-component";

import { useNavigate } from "react-router-dom";
import CajaRegistrar from "./CajaRegistrar";
import ModalD from "../global/ModalD";

const CajaUsuario = (props) => {
  // const navigate = useNavigate();

  const [idModulo, setIdModulo] = useState("");
  const [columns, setColumns] = useState([]);
  const [rowdata, setRowData] = useState([]);

  const [showRegistrar, setShowRegistrar] = useState(false);
  const handleCloseRegistrar = () => setShowRegistrar(false);

  useEffect(() => {
    get_columns();
    if (props.id_usuario) {
      buscar(props.id_usuario);
    }

    // eslint-disable-next-line
  }, [props.id_usuario]);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id_caja,
        sortable: true,
        reorder: true,
        width: "6rem",
        omit: true,
      },
      {
        id: 1,
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        width: "8rem",
        center: true,
      },
      {
        id: 2,
        name: "Concepto",
        selector: (row) => row.concepto,
        sortable: true,
        reorder: true,
        width: "8rem",
      },
      {
        id: 3,
        name: "Referencia",
        selector: (row) => row.referencia,
        sortable: true,
        width: "8rem",
      },
      {
        id: 4,
        name: "Quien",
        selector: (row) => row.proveedor,
        sortable: true,
        wrap: true,
      },
      {
        id: 5,
        name: "Observaciones",
        selector: (row) => row.observaciones,
        sortable: true,
        width: "10rem",
      },
      {
        id: 6,
        name: "",
        selector: (row) => row.simbolo,
        sortable: true,
        width: "4rem",
        right: true,
      },
      {
        id: 7,
        name: "Monto",
        selector: (row) => row.monto,
        cell: (row) => (
          <span style={{ color: row.movimiento === "S" ? "red" : "inherit" }}>
            {Number(row.monto).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ),
        sortable: true,
        width: "6rem",
        right: true,
      },

      {
        id: 8,
        name: " ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) =>
          row.es_caja === "1" ? (
            <>
              <Dropdown className="hide-split-after ">
                <Dropdown.Toggle
                  className="rounded-circle"
                  size="sm"
                  variant="outline-light"
                >
                  <span>
                    <i className="bi bi-three-dots-vertical text-secondary"></i>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setIdModulo(row.id_caja);
                      setShowRegistrar(!showRegistrar);
                    }}
                  >
                    <i className="bi bi-pencil-fill me-2"></i>Modificar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => eliminar(e, row.id_caja)}>
                    <i className="bi bi-trash-fill me-2"></i>Eliminar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : null, // 👈 si no es 1, no muestra nada
      },
    ]);
  };
  const modifica = (obj) => {
    setRowData((prevData) =>
      prevData.map((item) =>
        String(item.id_caja) === String(obj.id_caja)
          ? { ...item, ...obj }
          : item
      )
    );
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
        Axios.post(window.globales.url + "/caja/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowData((prevData) =>
                prevData.filter((row) => row.id_caja !== id)
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
  const buscar = async (id) => {
    let _datos = JSON.stringify({ id_usuario: id });

    await Axios.post(window.globales.url + "/caja/lista_by_usuario", _datos)
      .then((res) => {
        setRowData(res.data.items);
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "32px", // altura mínima de la fila
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // padding izquierda del header
        paddingRight: "8px", // padding derecha del header
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // padding izquierda de cada celda
        paddingRight: "8px", // padding derecha de cada celda
        paddingTop: "4px",
        paddingBottom: "4px",
      },
    },
  };

  const componente = (
    <>
      <Container className="mb-4 mt-3 " style={{ paddingBottom: "0px" }}>
        <Card>
          <DataTable
            columns={columns}
            data={rowdata}
            noDataComponent={<span>No hay información por mostrar</span>}
            persistTableHead
            responsive
            customStyles={customStyles}
          />
        </Card>
      </Container>
      <ModalD
        operacion="1"
        show={showRegistrar}
        onClose={() => setShowRegistrar(false)}
        size="lg"
        title="Registrar movimiento"
        formId="formId"
        aceptarTexto={"Modificar"}
        cancelarTexto="Cancelar"
      >
        <CajaRegistrar
          formId="formId"
          handleClose={handleCloseRegistrar}
          idmodulo={idModulo}
          modifica={modifica}
        />
      </ModalD>
    </>
  );

  return <>{componente}</>;
};

export default CajaUsuario;
