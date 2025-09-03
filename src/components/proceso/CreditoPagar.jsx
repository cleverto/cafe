import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";

const CreditoPagar = (props) => {
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    get_columns();

    // eslint-disable-next-line
  }, []);

  const get_columns = () => {
    setColumns([
      {
        id: 0,
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        reorder: true,
        omit: true
      },
      {
        id: 1,
        name: "Fecha",
        cell: (row) => (
          <div>
            <div><strong>{row.fecha}</strong></div>
            <Badge bg="success">{row.tipo_caja}</Badge>
          </div>
        ),
        sortable: true,
        reorder: true,
      },
      {
        id: 2,
        name: "Monto",
        selector: (row) => row.monto,
        sortable: true,
        width: "6rem",
        right: true,
      },
      {
        id: 3,
        name: " ",
        button: true,
        width: "5rem",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
          <>
            <Button
              variant="outline-light"
              onClick={(e) => props.eliminar(e, row.id)}
            >
              <i class="bi bi-archive text-danger"></i>
            </Button>

          </>
        ),
      },
    ]);
  };

  const componente = (
    <>


      {/* Datos del proveedor */}
      <Alert variant={"secondary"} key={"info"} >
        <Row>
          <Col lg={4} >Beneficiario</Col>
          <Col>  <strong>{props.values.proveedor}</strong></Col>

        </Row>
        <Row>
          <Col lg={4}>Total</Col>

          <Col>
            <strong>
              {props.values.simbolo} {" "}
              {(Number(props.values.total) || 0).toFixed(2)}
            </strong>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>Pendiente</Col>

          <Col>
            <strong>
              <Badge bg="danger">
                {props.values.simbolo} {" "}
                {(Number(props.values.saldo) || 0).toFixed(2)}
              </Badge>
            </strong>
          </Col>
        </Row>

      </Alert>


      <Card className="border-0">
        <Form.Label>Medio de Pago</Form.Label>
        <ListGroup>
          {props.listaTipoCaja.map((data, index) => (
            <ListGroup.Item
              variant="primary"
              action
              key={data.id}
              onClick={(e) => {
                props.setFieldValue("id_tipo_caja", e.currentTarget.dataset.id);
                props.setFieldValue("tipo_caja", e.currentTarget.dataset.value);
              }}
              active={props.values.id_tipo_caja === data.id}
              data-id={data.id}
              data-value={data.descripcion}
            >
              {data.descripcion}
            </ListGroup.Item>

          ))}
        </ListGroup>
      </Card>


      <Form
        noValidate
        id="formIdPagar"
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <Row className="mb-3 g-3 mt-2">
          <Col md={12}>
            <Form.Group controlId="fecha">
              <Form.Label>Fecha de Pago</Form.Label>
              <Form.Control
                type="date"
                value={props.values.fecha}
                onChange={props.handleChange}
                name="fecha"
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="monto">
              <Form.Label>Monto a Pagar</Form.Label>
              <InputGroup>
                <InputGroup.Text>S/.</InputGroup.Text>
                <Form.Control
                  required
                  type="text"
                  maxLength="8"
                  value={props.values.monto}
                  onChange={(e) => {
                    const val = e.target.value;

                    // Solo números con hasta 8 enteros y 2 decimales
                    if (/^\d{0,8}(\.\d{0,2})?$/.test(val)) {
                      props.setFieldValue("monto", val);
                    }
                  }}

                  name="monto"
                  isInvalid={
                    !!props.errors.monto &
                    props.touched.monto
                  }
                  
                  isValid={!!props.touched.monto}

                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {props.errors.monto}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Registrar Pago
          </Button>
        </div>
      </Form>
      <Card className="mt-4">
        <DataTable
          columns={columns}
          data={props.rowData}
          noDataComponent={<span>No hay pagos</span>}
          persistTableHead
          responsive
        />
      </Card>


    </>
  );

  return (
    <>
      {componente}
    </>
  );
};

export default CreditoPagar;
