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
                        to="/administracion/producto"
                        active={isActive("/administracion/producto")}
                      >
                        Producto
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/proveedor"
                        active={isActive("/administracion/proveedor")}
                      >
                        Proveedor
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/administracion/cliente"
                        active={isActive("/administracion/cliente")}
                      >
                        Cliente
                      </ListGroup.Item>

                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <i className="bi bi-stop-fill mx-2 text-secondary"></i>
                    <strong>Proceso</strong>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/proceso/compra"
                        active={isActive("/proceso/compra")}
                      >
                        Compra
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/deposito"
                        active={isActive("/deposito")}
                      >
                        Deposito
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/designacion"
                        active={isActive("/designacion")}
                      >
                        Venta
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/rotacion"
                        active={isActive("/rotacion")}
                      >
                        Caja
                      </ListGroup.Item>
                      <ListGroup.Item
                        className="border-0"
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/rotacion"
                        active={isActive("/rotacion")}
                      >
                        Almacén
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
                        Compras
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/carrera"
                        active={isActive("/reporte/013")}
                      >
                        Ventas
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/carrera"
                        active={isActive("/reporte/013")}
                      >
                        Compras y Ventas
                      </ListGroup.Item>
                      <ListGroup.Item
                        action
                        style={{ paddingLeft: "45px" }}
                        as={Link}
                        to="/reporte/macro"
                        active={isActive("/reporte/014")}
                      >
                        Caja
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
