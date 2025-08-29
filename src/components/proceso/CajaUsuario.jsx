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
        omit: true,
      },
      {
        id: 1,
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        omit: true,
        center: true,
      },
      {
        id: 2,
        name: "Nro",
        selector: (row) => row.nro_comprobante,
        sortable: true,
        width: "6rem",
      },
      {
        id: 3,
        name: "Referencia",
        selector: (row) => row.referencia,
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 4,
        name: "Quien",
        selector: (row) => row.proveedor,
        sortable: true,
      },
      {
        id: 5,
        name: "Monto",
        selector: (row) => row.monto,
        cell: (row) =>
          Number(row.total).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 6,
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
                variant="outline-secondary"
              >
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
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
                <Dropdown.Item
                  onClick={(e) => {
                    setIdCredito(row.id_credito);
                    setShowPagar(!showPagar);
                  }}
                >
                  <i class="bi bi-cash me-2"></i> Pagar
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
          />
        </Card>
      </Container>
    </>
  );

  return <>{componente}</>;
};

export default CajaUsuario;
