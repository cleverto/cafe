import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
const PerfilOpcion = (props) => {
  const [lista, setLista] = useState([]);



  useEffect(() => {
    getLista(props.idmodulo);
  }, [props.idmodulo]);

  const getLista = async (id) => {
    const data = { perfil: id };
    let _datos = JSON.stringify(data);
    try {
      const res = await Axios.post(
        `${window.globales.url}/administracion/lista_perfil_opcion`,
        _datos
      );
      setLista(res.data.items);
    } catch (error) {
      console.error("Error al cargar la lista ", error);
    }
  };

  const guardar = async (id) => {
    let _datos = JSON.stringify({ id: id, perfil: props.idmodulo });
    await Axios.post(window.globales.url + "/perfil/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "true") {


          setLista((listaActual) =>
            listaActual.map((item) =>
              item.cod_opcion === id ? { ...item, coincide: "1" } : item
            )
          );
        } else {
          Swal.fire({ text: "Algo pasó! " + res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const eliminar = async (id) => {
    let _datos = JSON.stringify({ id: id, perfil: props.idmodulo });
    await Axios.post(window.globales.url + "/perfil/eliminar", _datos)
      .then((res) => {
        if (res.data.rpta === "true") {

          setLista((listaActual) =>
            listaActual.map((item) =>
              item.cod_opcion === id ? { ...item, coincide: "0" } : item
            )
          );
        } else {
          Swal.fire({ text: "Algo pasó! " + res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  return (
    <Card className=" mb-4 border-0">
      <ListGroup className="shadow">
        {lista.map((data, index) => (
          <ListGroup.Item
            variant={data.coincide === "1" ? "primary" : "light"}
            action
            key={data.cod_opcion}
            onClick={(e) => {
              //setIdModalidad(e.target.dataset.id);
            }}
          >
            <div class="d-flex justify-content-between">
              <div>
                {" "}
                {data.desc_opcion}
              </div>

              <div>
                {data.coincide === "1" ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => eliminar(data.cod_opcion)}
                  >
                    Quitar
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => guardar(data.cod_opcion)}
                  >
                    Añadir
                  </Button>
                )}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

    </Card>

    // <Container>
    // <Row>
    //   {lista.map((data, index) => (
    //     <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-4">
    //       <Card bg="info" text="white" style={{ width: "100%" }}>
    //         <Card.Body>
    //           <Card.Title>{data.menu}</Card.Title>
    //           <Card.Text>{data.opcion}</Card.Text>
    //         </Card.Body>
    //         <Card.Body>
    //           <Button variant="primary">Añadir</Button>
    //           <Button variant="primary" className="mx-2">Quitar</Button>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>
    // </Container>
  );
};

export default PerfilOpcion;
