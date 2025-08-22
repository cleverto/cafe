import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";

import Dashboard from "../dashboard/Dashboard.jsx";
import { useState } from "react";

const CreditoPagar = () => {
  const [medioPago, setMedioPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [monto, setMonto] = useState("");

  // Datos fijos de ejemplo
  const proveedor = "Proveedor ABC S.A.";
  const montoPendiente = 1500.75;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      proveedor,
      medioPago,
      fechaPago,
      monto,
    });
    alert("Pago registrado correctamente ✅");
  };

  const componente = (
    <>
      <div className="mt-3 mb-3">
        <Button variant="outline-primary">Ir a compras</Button>
        <Button variant="outline-primary mx-2">Ir a Ventas</Button>        
      </div>

      <Card className="shadow-lg p-4 rounded-4">
        <Card.Body>
          <Card.Title className="mb-4  fw-bold">
            <h1 class="display-6">Registrar el pago</h1>
          </Card.Title>

          {/* Datos del proveedor */}
          <div className="mb-3">
            <Table
              bordered
              hover
              responsive
            >
              <tbody>
                <tr>
                  <td style={{width:"150px"}} >Proveedor</td>
                  <td >
                    <strong>{proveedor}</strong>
                  </td>
                </tr>
                <tr>
                  <td >
                    Monto pendiente
                  </td>
                  <td className=" fw-bold text-success">
                    S/. {montoPendiente.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          {/* Formulario */}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="medioPago">
                  <Form.Label>Medio de Pago</Form.Label>
                  <Form.Select
                    value={medioPago}
                    onChange={(e) => setMedioPago(e.target.value)}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="deposito">Depósito Bancario</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="fechaPago">
                  <Form.Label>Fecha de Pago</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="monto">
                  <Form.Label>Monto a Pagar</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>S/.</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el monto"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Registrar Pago
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default CreditoPagar;
