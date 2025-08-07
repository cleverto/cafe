import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  ListGroup,
  Row,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "../global/Modal_lg";
import Dashboard from "../dashboard/Dashboard";
// import '../../App.css';
import Swal from "sweetalert2";
import TrabajadorAcademicoRegistrar from "./TrabajadorAcademicoRegistrar";
import TrabajadorMain from "./TrabajadorMain";
import TrabajadorAdjuntoItem from "./TrabajadorAdjuntoItem";
import { useLocation } from "react-router-dom";
import TrabajadorAdjuntoRegistrar from "./TrabajadorAdjuntoRegistrar";

const TrabajadorAdjunto = () => {
  const [lista, setLista] = useState([]);
  const [show, setShow] = useState(false);
  const [idmodulo, setIdmodulo] = useState("");
  const [datos, setDatos] = useState({});
  const handleClose = () => setShow(false);

  const [showNotif, setShowNotif] = useState(false);
  const [notification, setNotification] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      get_lista();
      modulo();
    }
    // eslint-disable-next-line
  }, [id]);

  const abrir_form = (id) => {
    setIdmodulo(id);
    setShow(!show);
  };

  const modulo = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/trabajador/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          const consulta = {
            operacion: "1",
            id_trabajador: res.data.items.id_trabajador,
            trabajador: res.data.items.trabajador,
            dni: res.data.items.dni,
            id_estado_civil: res.data.items.id_estado_civil,
          };

          setDatos(consulta);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const get_lista = async () => {
    let _datos = JSON.stringify({
      id: id,
    });
    const res = await Axios.post(
      window.globales.url + "/trabajador/lista_adjunto", _datos
    );
    setLista(res.data.items);
  };

  const inserta = (obj) => {
    setLista((prevData) => [obj, ...prevData]);
    setShow(!show);
  };
  const modifica = (obj) => {
    setLista((prevData) =>
      prevData.map((item) =>
        String(item.id_trabajador_academica) ===
        String(obj.id_trabajador_academica)
          ? { ...item, ...obj }
          : item
      )
    );
    setShow(!show);
  };

  // const eliminar = async (id) => {
  //   let _datos = JSON.stringify({
  //     id: id,
  //   });

  //   Swal.fire({
  //     title: "¿Confirmar Eliminación?",
  //     text: "¿Estás seguro de que deseas eliminar este registro?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, continuar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Axios.post(
  //         window.globales.url + "/trabajador/eliminar_academica",
  //         _datos
  //       )
  //         .then((res) => {
  //           if (res.data.rpta === "1") {
  //             setLista((prevData) =>
  //               prevData.filter((row) => row.id_trabajador_academica !== id)
  //             );
  //           }
  //         })
  //         .catch((error) => {
  //           Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
  //         });
  //     }
  //   });
  // };
  const eliminar = (id_requisito) => {
    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let _datos = JSON.stringify({
          id_trabajador: id,
          id_requisito: id_requisito,
        });
        Axios.post(window.globales.url + "/trabajador/eliminar_adjunto", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setLista((prevData) =>
                prevData.filter((row) => row.id_requisito !== id_requisito)
              );
            }
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      }
    });
  };

  const handleFileSelect = (file1, id_requisito) => {
    guardar(file1, id_requisito);
  };
  const handleRuta = (data) => {
    let ruta = `${window.globales.url}/home/file?file=docs/${datos.dni}-${data.id_requisito}.pdf`;
    return ruta;
  };
  const guardar = (file, id_requisito) => {
    let _datos = JSON.stringify({
      ...datos,
      id_requisito: id_requisito,
    });

    const formData = new FormData();
    formData.append("data", _datos);
    formData.append(id_requisito, file);

    Axios.post(window.globales.url + "/trabajador/guardar_adjunto", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (ProgressEvent) => {},
    })
      .then((res) => {
        if (res.data.rpta === "1") {
          setNotification([res.data.msg, res.data.color]);
          setShowNotif(true);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((err) => {
        Swal.fire({ text: err.message, icon: "error" });
      });
  };

  const componente = (
    <>
      <Container className="mt-3">
        <TrabajadorMain modulo="/trabajador_adjunto" />
        <hr style={{ margin: 0, padding: 0, marginTop: "5px" }} />
        <div className="d-flex justify-content-between mt-4">
          <div>
            {" "}
            <h5>Documentación adjunta</h5>
            <p>Consigne aquí toda la documentación digital del servidor</p>
          </div>
          <div>
            <Button
              onClick={() => abrir_form(id)}
              className="mt-2 mb-4"
              variant="primary"
            >
              <i className="bi bi-file-earmark-plus-fill me-2"></i>
              Adjuntar documento
            </Button>
          </div>
        </div>

        <Container>
          <Row>
            <Col lg="12" className="p-0 mb-3 ">
              <span className="p-2 ">
                <ListGroup as="ul">
                  {lista.map((data, index) => (
                    <ListGroup.Item
                      as="li"
                      key={data.id_requisito}
                      className=""
                    >
                      <div className="d-flex">
                        <div className="flex-grow-1 d-flex align-items-center">
                          {data.requisito}
                        </div>
                        <div>
                          <TrabajadorAdjuntoItem
                            id={index}
                            title_short={""}
                            onFileSelect={(file) =>
                              handleFileSelect(file, data.id_requisito)
                            }
                            ruta={handleRuta(data)}
                          />
                        </div>
                        <Button
                          variant=""
                          className="pt-2"
                          size="sm"
                          onClick={() => eliminar(data.id_requisito)}
                        >
                          <i className="bi bi-x fs-4"></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </span>
            </Col>
          </Row>
        </Container>

        <Modal
          comp={
            <TrabajadorAdjuntoRegistrar
              handleClose={handleClose}
              inserta={inserta}
              modifica={modifica}
              lista={lista}
              idmodulo={idmodulo}
            />
          }
          title="Añadir Documentación digital"
          show={show}
          handleClose={handleClose}
        />
      </Container>
    </>
  );

  return (
    <>
      <Dashboard componente={componente} />
    </>
  );
};

export default TrabajadorAdjunto;
