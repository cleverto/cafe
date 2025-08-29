import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";

import { useFormik } from "formik";
import Axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";
import DataTable from "react-data-table-component";
import Dashboard from "../dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import ModalOc from "../global/ModalOc";
import CreditoPagarRegistrar from "./CreditoPagarRegistrar";

const CajaUsuario = (props) => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState([]);
  const [rowdata, setRowData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [idCredito, setIdCredito] = useState(false);
  const [showPagar, setShowPagar] = useState(false);

  useEffect(() => {
    get_columns();
    if (props.id_usuario) {
      buscar(props.id_usuario);
    }

    // eslint-disable-next-line
  }, []);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id_compra,
        sortable: true,
        reorder: true,
        width: "6rem",
        omit: true,
      },
            {
        id: 2,
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        width: "8rem",
        center: true,
      },
      {
        id: 3,
        name: "Concepto",
        selector: (row) => row.concepto,
        sortable: true,
        reorder: true,
        width: "10rem",
        center: true,
      },

      {
        id: 4,
        name: "Referencia",
        selector: (row) => row.referencia,
        sortable: true,
        width: "8rem",
      },

      {
        id: 5,
        name: "Quien",
        selector: (row) => row.proveedor,
        sortable: true,
        wrap: true,
      },
      {
        id: 6,
        name: "Observaciones",
        selector: (row) => row.observaciones,
        sortable: true,
        width: "10rem",
      },
      {
        id: 7,
        name: "",
        selector: (row) => row.simbolo,
        sortable: true,
        width: "4rem",
        right: true,
      },
      {
        id: 8,
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
        id: 7,
        name: " ",
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
                variant="outline-light"
              >
                <span>
                  <i className="bi bi-three-dots-vertical text-secondary"></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) =>
                    navigate("/proceso/compra?id=" + row.id_compra)
                  }
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item
                // onClick={(e) => eliminar(e, row.id)}
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
    </>
  );

  return <>{componente}</>;
};

export default CajaUsuario;
