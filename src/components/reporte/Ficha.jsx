import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import FichaDocente from "./FichaDocente";
import FichaCAS from "./FichaCAS";
import FichaJudicial from "./FichaJudicial";

const Ficha = () => {
  const [lista, setLista] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const opt = searchParams.get("opt");


  useEffect(() => {
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    // eslint-disable-next-line
  }, []);


  const componente = (
    <>
      <Container
        fluid
        style={{
          width: "794px",
          margin: "0",
          height: "100%",
          padding: "30px",
          fontSize: "10px",
          fontFamily: "Arial, Verdana, Helvetica, sans-serif",
        }}
      >
        {opt === "1" && <FichaDocente id={id} />}
        {opt === "2" && <FichaCAS id={id} />}
        {opt === "3" && <FichaJudicial id={id}  />}
      </Container>
    </>
  );

  return <>{componente}</>;
};

export default Ficha;
