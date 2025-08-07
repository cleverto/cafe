import { Breadcrumb, Card, Col, Container, Form, Row } from "react-bootstrap";
import DocenterMain from "./DocenteMain";
import Dashboard from "../dashboard/Dashboard";

const DocenteCabecera = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#/">Regresar</Breadcrumb.Item>
      </Breadcrumb>
      <hr className="mt-1 " />
      <div style={{marginTop:"30px"}}></div>
      <div className="p-4">
        <h1 className="display-6">E. CLEVER TORRES</h1>
        <h6>MANCO CAPAC 699 JAEN</h6>
      </div>
    </>
  );
};

export default DocenteCabecera;
