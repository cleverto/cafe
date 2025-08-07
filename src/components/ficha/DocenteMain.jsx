
import Nav from "react-bootstrap/Nav";

const DocenteMain = (props) => {
  return (
   <>
      <Nav variant="underline" defaultActiveKey={props.modulo}>
        <Nav.Item>
          <Nav.Link href="#/docente_adjuntar" eventKey="/docente_adjuntar">
            Adjuntar documentos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/docente_vinculo" eventKey="/docente_vinculo">
            Vínculo laboral
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/docente_educacion" eventKey="/docente_educacion">
            Educación
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/docente_formacion" eventKey="/docente_formacion">
            Formación Académica
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/docente_otros" eventKey="/docente_otros">
            Otros
          </Nav.Link>
        </Nav.Item>
      </Nav>
      

    </>
  );
};

export default DocenteMain;
