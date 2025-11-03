import { useEffect, useState } from "react";
import { Form, Col, Container, Button, Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModalD from "../global/ModalD";
import { useNavigate } from "react-router-dom";
import VentaGuardarRegistrar from "./VentaGuardarRegistrar";

const Venta = (props) => {
  const navigate = useNavigate();
  const [buscar, setBuscar] = useState("");

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

  const customStyles = {
    rows: {
      style: {
        minHeight: "32px",
      },
    },
  };

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
        name: "Módulo",
        selector: (row) => row.modulo,
        sortable: true,
        reorder: true,
        width: "6rem",
        cell: (row) => {
          // Colores suaves según el tipo de módulo
          const colorMap = {
            compra: { background: "#e6f4ea", color: "#2d6a4f" }, // verde suave
            secado: { background: "#fff4e6", color: "#b76e00" }, // naranja suave
          };

          const estilo = colorMap[row.modulo?.toLowerCase()] || {
            background: "#f0f0f0",
            color: "#555",
          };

          return (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.4rem",
                fontWeight: 500,
                backgroundColor: estilo.background,
                color: estilo.color,
                textTransform: "capitalize",
                whiteSpace: "nowrap", // evita salto de línea
              }}
            >
              {row.modulo}
              {row.modulo === "Secado" && row.operacion === "S" && ` (${row.operacion})`}
            </div>
          );


        },
      },
      {
        name: "Fecha",
        selector: (row) => row.fecha,
        sortable: true,
        reorder: true,
        width: "7rem",
      },
      {
        name: "Nro Comp.",
        selector: (row) => row.nro_comprobante,
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
        cell: (row) => (
          <div
            title={row.referencia} // muestra el texto completo al pasar el mouse
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "6.5rem", // ligeramente menor que el width
            }}
          >
            {row.referencia}
          </div>
        ),
      },
      {
        name: "Proveedor",
        selector: (row) => row.proveedor,
        sortable: true,
        reorder: true,
        wrap: true, // permite que el DataTable maneje la altura, pero limitamos visualmente
        cell: (row) => (
          <div
            title={row.proveedor}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,  // 🔑 solo una línea visible
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
              whiteSpace: "normal", // necesario con line-clamp
              flex: "1 1 0",        // evita que la celda crezca por el contenido
            }}
          >
            {row.proveedor}
          </div>
        ),
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
        cell: (row) => (
          <div style={{ textAlign: "right", width: "100%" }}>
            {Number(row.total).toLocaleString("es-PE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        ),
      },

      {
        name: "",
        width: "4rem",
        cell: (row) => (
          <input
            type="checkbox"
            checked={row.activo === "1"}
            onChange={() => props.handleToggleActivo(row)}
            disabled={row.operacion === "S"} // 🔒 Desactiva el check si la operación es "S"
            style={{ cursor: row.operacion === "S" ? "not-allowed" : "pointer" }}
          />
        ),
      }

    ]);
  };

  return (
    <Container
      className="mb-4 responsive-container"
      style={{ paddingBottom: "80px" }}
    >
      <div className="d-flex justify-content-between">
        <div className="pt-4">
          <h5>Venta</h5>
        </div>

        <div className="pt-3 mb-3">
          <Button
            className="  mx-1"
            variant="outline-primary"
            title="Buscar"
            onClick={() => navigate("/proceso/venta/buscar")}
          >
            <i className="bi bi-search"></i>
          </Button>
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
          <h6 className="text-muted mb-1">Compras + Secados + Procesar</h6>
        </div>
        <div className="text-end">
          <div className="fw-bold text-primary fs-6">
            QQ{" "}
            <span className="ms-1">
              {Number(props.totalQQ).toLocaleString("es-PE")}
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
          <h6 className="text-muted mb-1">Envío a procesar</h6>
        </div>
      </div>

      <Card className="">
        <DataTable
          columns={columns}
          data={props.rowData.filter((row) => row.activo === "1")}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
          responsive
          customStyles={{
            table: {
              style: {
                minHeight: "200px",
                overflow: "auto",
              },
            },
            rows: {
              style: {
                minHeight: "32px",
              },
            },
          }}
        />
      </Card>

      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="lg"
        title="Guardar venta"
        formId="formIdModulo"
        aceptarTexto={idmodulo ? "Modificar" : "Guardar"}
        cancelarTexto="Cancelar"
      >
        <VentaGuardarRegistrar
          formId="formIdModulo"
          idmodulo={idmodulo}
          handleClose={handleClose}
          updateLista={props.updateLista}
          totalActivos={props.totalActivos}
          totalQQ={props.totalQQ}
          rowData={props.rowData.filter((row) => row.activo === "1")}
        />
      </ModalD>
    </Container>
  );
};

export default Venta;
