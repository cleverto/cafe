import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import ModalD from "../global/ModalD";
import Dashboard from "../dashboard/Dashboard.jsx";
import ProductoRegistrar from "../administracion/ProductoRegistrar.jsx";
import Swal from "sweetalert2";


const Producto = () => {

  const [buscar, setBuscar] = useState("");
  const [show, setShow] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [idmodulo, setIdmodulo] = useState("");
  const handleClose = () => setShow(false);


  useEffect(() => {
    get_columns();
    get_lista();
    // eslint-disable-next-line
  }, []);

  const get_lista = async () => {
    const res = await Axios.post(window.globales.url + "/producto/lista");

    var data = res.data.items.map(function (el, i) {
      return Object.assign({ nro: i + 1 }, el);
    });
    setRowdata(data);
  };

  const inserta = (obj) => {
    setRowdata((prevData) => [obj, ...prevData]);
  };
  const modifica = (obj) => {
    setRowdata((prevData) =>
      prevData.map((item) =>
        String(item.id_producto) === String(obj.id_producto)
          ? { ...item, ...obj }
          : item
      )
    );
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
        Axios.post(window.globales.url + "/producto/eliminar", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_producto !== id)
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

  const get_columns = () => {
    setColumns([
      {
        id: 1,
        name: "Id",
        selector: (row) => row.id_producto,
        sortable: true,
        reorder: true,
        width: "6rem",
      },
      {
        id: 2,
        name: "Producto",
        selector: (row) => row.producto,
        sortable: true,
      },
      {
        id: 3,
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
                  onClick={() => {
                    setIdmodulo(row.id_producto);
                    setShow(!show);
                  }}
                >
                  <i className="bi bi-pencil-fill me-2"></i>Modificar
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => eliminar(row.id_producto)}
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

  const filteredData = rowdata.filter((item) => {
    const values = Object.values(item).join(" ").toLowerCase();
    return values.includes(buscar.toLowerCase());
  });

  const componente = (
    <>
      <div className="d-flex justify-content-between">
        <div className="">
          <h2>Producto</h2>
          <p>Registre los productos que vende</p>
        </div>
        <div className="pt-4">

          <Button onClick={() => {
            setIdmodulo("");
            setShow(!show);
          }}
            className="mb-3 " variant="primary">
            <i className="bi bi-file-earmark-plus-fill me-2"></i>
            Nuevo
          </Button>

        </div>
      </div>
      <div className="d-flex justify-content-end mb-2">
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

      <Card>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: "Filas",
            rangeSeparatorText: "de",
          }}
          noDataComponent={<span>No hay información por mostrar</span>}
          persistTableHead
        />
      </Card>
      <ModalD
        operacion={idmodulo ? "1" : "0"}
        show={show}
        onClose={() => setShow(false)}
        size="lg"
        title="Registrar productos"
        formId="formId"
        aceptarTexto="Aceptar"
        cancelarTexto="Cancelar"
      >
        <ProductoRegistrar
          formId="formId"
          handleClose={handleClose}
          inserta={inserta}
          modifica={modifica}
          rowdata={rowdata}
          idmodulo={idmodulo}
        />
      </ModalD>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Producto;
