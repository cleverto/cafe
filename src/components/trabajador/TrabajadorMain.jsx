import Axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const TrabajadorMain = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";
  const url = id ? `#/trabajador/modificar?id=${id}` : `#/trabajador/nuevo`;

  const [idTipoTrabajador, setIdTipoTrabajador] = useState("");

useEffect(() => {
  if (id) {
    get_tipo_trabajador();
  }
}, [id]); // se ejecutará solo cuando 'id' tenga valor

  const get_tipo_trabajador = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(
      window.globales.url + "/trabajador/get_tipo_trabajador",
      _datos
    )
      .then((res) => {
        if (res.data.rpta === "1") {
          setIdTipoTrabajador(res.data.items.id_tipo_trabajador);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  return (
    <>
      <div className="d-flex">
        <div className="mt-2">
          <Button
            href="#"
            variant="light"
            size="sm"
            title="regresar"
            as={Link}
            to={`../trabajador`}
          >
            <i className="bi bi-arrow-left-short "></i>
          </Button>
        </div>
        <div className="mx-4">
          <Nav variant="underline" defaultActiveKey={props.modulo}>
            <Nav.Item>
              <Nav.Link href={url} eventKey="/trabajador/nuevo">
                Datos del servidor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_hijos?id=${id}`}
                eventKey="/trabajador_hijos"
                disabled={!id}
              >
                Hijos menores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_pension?id=${id}`}
                eventKey="/trabajador_pension"
                disabled={!id}
              >
                Sistema de pensiones
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_cuenta?id=${id}`}
                eventKey="/trabajador_cuenta"
                disabled={!id}
              >
                Cuenta de ahorros
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_familiar?id=${id}`}
                eventKey="/trabajador_familiar"
                disabled={!id}
              >
                Familiar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_academico?id=${id}`}
                eventKey="/trabajador_academico"
                disabled={!id}
              >
                Formación Académica
              </Nav.Link>
            </Nav.Item>



            {idTipoTrabajador === "2" && (
              <Nav.Item>
                <Nav.Link
                  href={`#/trabajador_vinculo?id=${id}`}
                  eventKey="/trabajador_vinculo"
                  disabled={!id}
                >
                  Vínculo laboral
                </Nav.Link>
              </Nav.Item>
            )}
            {idTipoTrabajador === "3" && (
              <Nav.Item>
                <Nav.Link
                  href={`#/trabajador_vinculo?id=${id}`}
                  eventKey="/trabajador_vinculo"
                  disabled={!id}
                >
                  Vínculo laboral
                </Nav.Link>
              </Nav.Item>
            )}
            {idTipoTrabajador === "1" && (
              <Nav.Item>
                <Nav.Link
                  href={`#/trabajador_vinculo_docente?id=${id}`}
                  eventKey="/trabajador_vinculo_docente"
                  disabled={!id}
                >
                  Vínculo laboral
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link
                href={`#/trabajador_adjunto?id=${id}`}
                eventKey="/trabajador_adjunto"
                disabled={!id}
              >
                Adjuntos
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default TrabajadorMain;
