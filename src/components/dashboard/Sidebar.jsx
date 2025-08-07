import React, { useEffect, useState } from "react";
//import NavDropdown from "react-bootstrap/NavDropdown";
//import Offcanvas from 'react-bootstrap/Offcanvas';
import "bootstrap-icons/font/bootstrap-icons.css";
//import '../../App.css';
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

import {
  Accordion,
  Button,
  CloseButton,
  Container,
  ListGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import logo from "../../assets/imagen/logo64.png";

const Sidebar = ({ show, handle }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  // const [listaMenu, setListaMenu] = useState([]);
  // const [listaMenuOpcion, setListaMenuOpcion] = useState([]);

  // const isAdmisionBaseUrl = window.location.origin === "https://admision.unj.edu.pe";
  // const baseRoute = isAdmisionBaseUrl ? "/admision" : "";

  const getActiveAccordion = () => {
    console.log(location.pathname.includes("trabajador"));
    if (location.pathname.includes("administracion")) {
      return "0";
    }
    if (location.pathname.includes("trabajador")) {
      return "1";
    }
    if (location.pathname.includes("designacion")) {
      return "1";
    }

    if (location.pathname.includes("rotacion")) {
      return "1";
    }
    if (location.pathname.includes("asistencia")) {
      return "2";
    }
    if (location.pathname.includes("reportes")) {
      return "3";
    }
    return null;
  };
  const menu = getActiveAccordion();
  const [activeAccordion, setActiveAccordion] = useState(menu);

  const handleAccordionChange = (key) => {
    console.log(key);
    setActiveAccordion(key === activeAccordion ? null : key);
  };

  // const handleDropdownToggle = (dropdownId) => {
  //   console.log(dropdownId);
  //   setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  // };

  useEffect(() => {
    lista_menu();
    // eslint-disable-next-line
  }, []);

  const lista_menu = async () => {
    // const res = await Axios.post(window.globales.url + "/home/lista_menu");
    // setListaMenu(res.data.items);
    // setListaMenuOpcion(res.data.items_opcion);
  };

  return (
    <>
      <Navbar
        key="lg"
        expand={false}
        className="p-0"
        bg="light"
        data-bs-theme="light"
      >
        <Container fluid>
          <div id={show ? "mySidenav" : "mySidenav2"}>
            <div className="d-flex justify-content-between pb-4 ">
              <div>
                <div class="d-flex">
                  <div class=" flex-fill">
                    <Link to="/home">
                      <img
                        src={logo}
                        width="45"
                        height="30"
                        className="d-inline-block align-top "
                        alt="logo-sidebar"
                        href={`/home`}
                      />
                    </Link>
                  </div>
                  <div class="p-1  flex-fill">
                    <h6>Escalafón</h6>
                  </div>
                </div>
              </div>
              <div>
                <CloseButton
                  style={{ color: "#fff", opacity: "1" }}
                  onClick={() => {
                    show = handle(false);
                  }}
                />
              </div>
            </div>
            <Nav className="justify-content-end flex-grow-1">
              <Accordion
                activeKey={activeAccordion}
                onSelect={handleAccordionChange}
                flush
                className="w-100 border-0"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <i className="bi bi-stop-fill mx-2 text-secondary"></i>
                    <strong>Administración</strong>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/cargo"
                        active={isActive("/administracion/cargo")}
                      >
                        Cargo
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/carrera"
                        active={isActive("/administracion/carrera")}
                      >
                        Carrera
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/dedicacion"
                        active={isActive("/administracion/dedicacion")}
                      >
                        Dedicación
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/departamento_academico"
                        active={isActive(
                          "/administracion/departamento_academico"
                        )}
                      >
                        Departamento académico
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/estado_civil"
                        active={isActive("/administracion/estado_civil")}
                      >
                        Estado civil
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/grado"
                        active={isActive("/administracion/grado")}
                      >
                        Grado
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/institucion"
                        active={isActive("/administracion/institucion")}
                      >
                        Institución
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/pension"
                        active={isActive("/administracion/pension")}
                      >
                        Sistemas de pensiones
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/regimen"
                        active={isActive("/administracion/regimen")}
                      >
                        Régimen laboral
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/requisito"
                        active={isActive("/administracion/requisito")}
                      >
                        Requisitos documentos
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/tipo_contrato"
                        active={isActive("/administracion/tipo_contrato")}
                      >
                        Tipo de contrato
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/tipo_remuneracion"
                        active={isActive("/administracion/tipo_remuneracion")}
                      >
                        Tipo de remuneración
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/tipo_resolucion"
                        active={isActive("/administracion/tipo_resolucion")}
                      >
                        Tipo de resolución
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/tipo_trabajador"
                        active={isActive("/administracion/tipo_trabajador")}
                      >
                        Tipo de trabajador
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/tipo_via"
                        active={isActive("/administracion/tipo_via")}
                      >
                        Tipo de vía
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <i className="bi bi-stop-fill mx-2 text-secondary"></i>
                    <strong>Gestión de personal</strong>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/trabajador"
                        active={isActive("/trabajador")}
                      >
                        Trabajador
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/designacion"
                        active={isActive("/designacion")}
                      >
                        Designación
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/rotacion"
                        active={isActive("/rotacion")}
                      >
                        Rotación
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <i className="bi bi-stop-fill mx-2 text-secondary"></i>
                    <strong>Asistencia</strong>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/asistencia/importar"
                        active={isActive("/asistencia/importar")}
                      >
                        Importar asistencia
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <i className="bi bi-stop-fill mx-2 text-secondary"></i>
                    <strong>Reportes</strong>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/escalafonrario10"
                        active={isActive("/reporte/escalafonrario10")}
                      >
                        Individuales
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/carrera"
                        active={isActive("/reporte/013")}
                      >
                        Escalafonario Nro 013
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/macro"
                        active={isActive("/reporte/014")}
                      >
                        Escalafonario Nro 014
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/constancia"
                        active={isActive("/reporte/015")}
                      >
                        Escalafonario Nro 015
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
