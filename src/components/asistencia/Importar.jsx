import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import Dashboard from "../dashboard/Dashboard.jsx";
import Swal from "sweetalert2";

const Importar = () => {
  const [lista, setLista] = useState([]);
  const [idproceso, setIdproceso] = useState("");
  const [data, setData] = useState([]);
  const [cont, setCont] = useState(["0"]);

  useEffect(() => {
    get_lista_proceso();

    //eslint-disable-next-line
  }, []);

  const get_lista_proceso = async () => {
    let _datos = JSON.stringify({
      modulo: "adm_proceso",
      campo: "proceso",
    });
    const res = await Axios.post(
      window.globales.url + "/proceso/lista_proceso_descripcion",
      _datos
    );
    setLista(res.data.items);
    setIdproceso(res.data.items[0].proceso);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { defval: "" }); 
      setData(parsedData);
      setCont(parsedData.length);
    };

    reader.readAsBinaryString(file);
  };

  const guardar = async () => {
    // Mostrar el spinner o indicador de carga
    Swal.fire({
      title: "Cargando...",
      text: "Subiendo información, por favor espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Activar animación de carga
      },
    });

    let _datos = JSON.stringify({
      id: idproceso,
      data: data,
    });

    try {
      const res = await Axios.post(
        window.globales.url + "/reporte/importar",
        _datos
      );

      if (res.data.rpta === "1") {
        Swal.fire({ text: res.data.msg, icon: "info" });
      } else {
        Swal.fire({ text: res.data.msg, icon: "error" });
      }
    } catch (error) {
      Swal.fire({
        text: "Ocurrió un error al subir la información.",
        icon: "error",
      });
    }
  };

  const componente = (
    <>
      <h2>Importar asistencia</h2>
      <p>Importe los resultados del examen de calificación</p>
      <Alert variant={"primary"}>
        <p className="m-0">
          ● Las cabeceras deben estar en minúsculas (nombre, fecha, entrada,
          salida).
        </p>
        <p className="m-0">● No interesa el orden de las cabeceras</p>
        <p className="m-0">
          ● El nombre de la primera columna debe empezar en A1.
        </p>
        <p className="m-0">● Las celdas no deben estar combinadas</p>
      </Alert>
      <Row>
        <Form.Group controlId="formFile" className="mb-3 ">
          <Form.Label>
            Seleccione el archivo de excel con la asistencia
          </Form.Label>
          <Form.Control
            type="file"
            accept={".xls, .xlsx"}
            multiple={false}
            onChange={handleFileUpload}
          />
        </Form.Group>
        <div class="d-flex justify-content-between">
          <div>
            <Form.Group className="mb-4">
              <Button variant="primary" onClick={guardar}>
                Proceder a importar resultados
              </Button>
            </Form.Group>
          </div>
          <div>{cont} registros</div>
        </div>
      </Row>

      {data.length > 0 && (
        <Card className="">
          <div style={{ height: "calc(100vh - 650px)", overflowY: "auto" }}>
            <Table striped bordered hover responsive className="m-0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Entrada</th>
                  <th>Salida</th>                  
                </tr>
              </thead>
              <tbody>
                {data.map((fila, index) => (
                  <tr key={index}>
                    <td>{fila.nombre}</td>
                    <td>{fila.fecha}</td>
                    <td>{fila.entrada}</td>
                    <td>{fila.salida}</td>                    
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default Importar;
