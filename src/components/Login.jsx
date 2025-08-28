import React, { useState } from "react";
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import fondo from "../assets/imagen/fondo_login.jpg";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  let navigate = useNavigate();
  const [nivel, setNivel] = useState("S");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    logueado();
    // eslint-disable-next-line
  }, []);

  const bgImageStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  const logueado = () => {
    const logged = window.localStorage.getItem("loggedEscalafon");

    if (logged) {
      const users = JSON.parse(logged);

      setNivel(users.nivel);
      setUsuario(users.usuario);
      setPassword(users.password);

      //setUser(users)
    }
  };
  const attachTokenToHeaders = () => {
    const storedData = localStorage.getItem("token");

    if (storedData) {
      const token = storedData;
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };
  const aceptar = async (data) => {
    let _datos = JSON.stringify(data);

    Axios.post(window.globales.url + "/auth/auth", _datos).then((res) => {
      if (res.data.rpta === "0") {
        Swal.fire({
          text: res.data.msg,
          icon: res.data.icon,
        });
        document.body.classList.remove("swal2-height-auto");
        return false;
      }
      const id_perfil = res.data.data.id_perfil;
      const id_usuario = res.data.data.id_usuario;

      localStorage.setItem("loggedEscalafon", _datos);
      localStorage.setItem("idusuario", res.data.data.id_usuario);
      localStorage.setItem("usuario", res.data.data.usuario);
      localStorage.setItem("idperfil", res.data.data.id_perfil);
      localStorage.setItem("perfil", res.data.data.perfil);
      localStorage.setItem("token", res.data.data.token);

      attachTokenToHeaders();

      if (id_perfil === "1") {
        navigate("./../home");
      } else if (nivel === "2") {
        navigate("./../trabajador");
      } else if (nivel === "P") {
        navigate("./../trabajador_registrar?id=" + id_usuario);
      }
    });
  };
  const initialValues = {
    usuario: "",
    password: "",
  };
  const validationSchema = Yup.object({
    usuario: Yup.string()
      .trim()
      .required("Por favor ingrese su nombre de usuario"),
    password: Yup.string()
      .trim()
      .matches(/^\S*$/, "La contraseña no debe contener espacios en blanco")
      .required("Ingrese su contraseña"),
  });
  return (
    <Container fluid style={bgImageStyle}>
      <div className="col-sm-10 col-md-9 col-lg-5 mx-auto  w-100 h-100  d-flex justify-content-center align-items-center">
        <Card className="border-0 shadow  p-3 rounded-3 " style={{ opacity: 0.8 }}> 
          <Card.Body className="p-4 p-sm-5 ">
            <Card.Title className="text-center mt-3 fw-light ">
              Inicio de sesión
            </Card.Title>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(valores) => {
                aceptar(valores);
              }}
            >
              {({ values, handleChange, errors, handleSubmit, touched }) => (
                <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <Form.Group className="mb-2">
                    <Form.Control
                      value={values.usuario}
                      onChange={handleChange}
                      name="usuario"
                      className="rounded-pill"
                      size="lg"
                      type="text"
                      placeholder="Usuario"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Control
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      className="rounded-pill"
                      size="lg"
                      type="password"
                      placeholder="Contraseña"
                    />
                  </Form.Group>
                  {/* Mostrar errores en un div al final del formulario */}
                  {Object.keys(errors).length > 0 &&
                    Object.keys(touched).length > 0 && (
                      <Alert
                        variant={"danger"}
                        className="mt-2 "
                        style={{ fontSize: "14px" }}
                      >
                        {errors.usuario && (
                          <p className="m-0 ">{errors.usuario}</p>
                        )}
                        {errors.password && (
                          <p className="m-0">{errors.password}</p>
                        )}
                      </Alert>
                    )}

                  <div className="d-grid gap-2">
                    <Button
                      className="mt-2 "
                      variant="primary"
                      size="lg"
                      type="submit"
                    >
                      Ingresar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
export default Login;
