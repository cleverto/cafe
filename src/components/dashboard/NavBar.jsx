import * as React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../App.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const NavBar = (props) => {
  let navigate = useNavigate();

  const cerrar_sesion = () => {
    //Axios.interceptors.response.eject();
    delete Axios.defaults.headers.common["Authorization"];
    localStorage.clear();
    //navigate(window.globales.baseapp+"/login");
    navigate("/login");
  };
  return (
    <>
      <Navbar
        id="navbar-header"
        expand={false}
        className={
          props.show
            ? "mb-3 fixed-top  shadow bg-primary w-page"
            : "mb-3 fixed-top  shadow bg-primary"
        }
      >
        <Container fluid>
          <Navbar.Toggle
            className="mx-2 "
            onClick={() => {
              props.handle(false);
            }}
          />

          <Navbar.Text className="justify-content-end ">
            <div className="d-flex ">
              <div className="align-content-center">
                <NavDropdown
                  className="hide-split-after "
                  title={
                    <div className="d-flex">
                      <div className="align-content-center">
                        <span className="  text-white">
                          Hola,{" "}
                          <strong>{localStorage.getItem("usuario")} </strong>
                        </span>
                        <p className="small text-white  text-end  m-0">
                          {localStorage.getItem("perfil")}
                        </p>
                      </div>
                      <i className="bi bi-person-circle btn-lg fs-1 ps-3 text-white"></i>
                    </div>
                  }
                >
                  <NavDropdown.Item as={Link} to="/cambiar">
                    <i className="bi bi-key-fill"></i> Cambiar mi contraseña
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={(e) => cerrar_sesion()}>
                    <i className="bi bi-door-closed-fill"></i> Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className="mx-4 pt-1">
                <NavDropdown
                  className="hide-split-before"
                  drop="start"
                  title={<i className="bi bi-gear-fill fs-2 text-white"></i>}
                >
                  {localStorage.getItem("idperfil") === "1" && (
                    <>
                      <NavDropdown.Item as={Link} to="/configuracion/usuario">
                        <i className="bi bi-person-fill"></i> Usuarios
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/configuracion/usuario">
                        <i className="bi bi-person-fill"></i> Perfil
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </div>
            </div>
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
