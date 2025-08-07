import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const Trabajador = () => {
  const [lista, setLista] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const opt = searchParams.get("opt");

  const url = `${window.globales.url}/reporte/trabajador?id=${id}&opt=${opt}`;

  const [contenido, setContenido] = useState("");

  useEffect(() => {
    Axios.post(url).then((res) => {
      setContenido(res.data);
    });
  });

  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    // eslint-disable-next-line
  }, []);

  const componente = (
    <>
      <Container
        style={{
          width: "794px",
          margin: "0",
          padding: "0px",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: contenido }} />
      </Container>
    </>
  );

  return <>{componente}</>;
};

export default Trabajador;
