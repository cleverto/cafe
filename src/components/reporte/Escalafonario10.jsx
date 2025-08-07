import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const Escalafonario10 = () => {
  const [lista, setLista] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const opt = searchParams.get("opt");

  const url = `${window.globales.url}/reporte/escalafonario10?id=${id}`;

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

export default Escalafonario10;
