import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const Ventas = () => {
  const [lista, setLista] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const desde = searchParams.get("desde");
  const hasta = searchParams.get("hasta");

  const url = `${window.globales.url}/reporte/ventas?desde=${desde}&hasta=${hasta}`;

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

export default Ventas;
