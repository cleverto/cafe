import { useEffect, useState } from "react";
import { Form, Col, Container, Button, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModalD from "../global/ModalD";

import SecadoGuardarRegistrar from "./SecadoGuardarRegistrar";
const Secado = (props) => {
  const [buscar, setBuscar] = useState("");
  const [totalActivos, setTotalActivos] = useState(0.00);
  const [totalQQ, setTotalQQ] = useState(0);
  const [show, setShow] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");

    setIdmodulo(idParam);
  }, []);

  useEffect(() => {
    if (props.rowData) {
      get_columns();
    }
  }, [props.rowData]);



  const handleToggleActivo = (row) => {
    const newData = props.rowData.map((item) =>
      String(item.id_compra) === String(row.id_compra)
        ? { ...item, activo: item.activo === "1" ? "0" : "1" }
        : item
    );

    props.updateRowData(newData);

    setTotalActivos(newData
      .filter((item) => item.activo === "1")
      .reduce((acc, item) => acc + Number(item.total || 0), 0));
    setTotalQQ(newData
      .filter((item) => item.activo === "1")
      .reduce((acc, item) => acc + Number(item.cantidad || 0), 0));

  };
  const customStyles = {
    rows: {
      style: {
        minHeight: '32px',
      }
    },

  };


  const filteredData = props.rowData.filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(buscar.toLowerCase());
  });

  // useEffect(() => {
  //   if (idmodulo) {
  //     console.log(idmodulo);
  //   }
  //   // eslint-disable-next-line
  // }, [idmodulo]);
  // en el componente Secado


  const get_columns = () => {
    setColumns([
      {
        name: "Id",
        selector: (row) => row.id_compra,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        width: "7rem",
      },
      {
        name: "Referencia",
        selector: (row) => row.referencia,
        sortable: true,
        reorder: true,
        width: "7rem",
      },
      {
        name: "Proveedor",
        selector: (row) => row.proveedor,
        sortable: true,
        reorder: true,
      },
      {
        name: "QQ",
        selector: (row) => row.cantidad,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        name: "Precio",
        selector: (row) => row.precio,
        sortable: true,
        width: "6rem",
        omit: true,
        cell: (row) =>
          <div style={{ textAlign: "right", width: "100%" }}>
            {Number(row.total).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
      },
      {
        name: "Total",
        selector: (row) => row.total,
        sortable: true,
        width: "6rem",
        cell: (row) =>
          <div style={{ textAlign: "right", width: "100%" }}>
            {Number(row.total).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
      },
      {
        name: "",
        width: "4rem",
        cell: (row) => (
          <input
            type="checkbox"
            checked={row.activo === "1"}
            onChange={() => handleToggleActivo(row)}
          />
        ),
      },
    ]);
  };



  return (
    <Container className="mb-4 responsive-container" style={{ paddingBottom: "80px" }}>
      <div className="d-flex justify-content-between">
        <div className="pt-4">
          <h5>Secado</h5>
        </div>
        <div className="pt-3 mb-3">
          <Button
            className=""
            variant={idmodulo ? "danger" : "primary"}
            onClick={(e) => setShow(!show)}
          >
            <i className="bi bi-floppy me-2"></i>
            {idmodulo ? "Modificar" : "Guardar"}
          </Button>
        </div>
      </div>
      <hr className="mt-0 mb-4" />


      <div className="d-flex justify-content-end mt-2 mb-2">
        <Form.Group as={Col} md="12">
          <Form.Control
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
            name="buscar"
            type="text"
            placeholder="Buscar"
            autoComplete="off"
          />
        </Form.Group>
      </div>
      <div className="d-flex justify-content-between align-items-center border rounded p-3 shadow-sm bg-white">
        <div>
          <h6 className="text-muted mb-1">Compras</h6>
        </div>
        <div className="text-end">
          <div className="fw-bold text-primary fs-6">
            QQ <span className="ms-1">
              {Number(totalQQ).toLocaleString("es-PE")}
            </span>
          </div>
          <div className="fw-bold text-success fs-5">
            S/. <span className="ms-1">
              {Number(totalActivos).toLocaleString("es-PE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>


      <Card>
        <DataTable
          columns={columns}
          data={filteredData}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
          responsive
          customStyles={customStyles}
        />
      </Card>
      <div className="d-flex justify-content-between align-items-center border rounded p-3 shadow-sm bg-white mt-4">
        <div>
          <h6 className="text-muted mb-1">Compras para enviar a secar</h6>
        </div>

      </div>

      <Card className="">
        <DataTable
          columns={columns}
          data={props.rowData.filter((row) => row.activo === "1")}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
          responsive
          customStyles={customStyles}
        />
      </Card>

      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="lg"
        title="Guardar compra"
        formId="formIdModulo"
        aceptarTexto={idmodulo ? "Modificar" : "Guardar"}
        cancelarTexto="Cancelar"
      >
        <SecadoGuardarRegistrar
          formId="formIdModulo"
          idmodulo={idmodulo}
          handleClose={handleClose}
          totalActivos={totalActivos}
          totalQQ={totalQQ}
          rowData={props.rowData}
        />
      </ModalD>

    </Container>
  );
};

export default Secado;
