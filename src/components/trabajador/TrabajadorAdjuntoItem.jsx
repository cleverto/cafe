import React, { useState } from "react";
import { Card, ListGroup, Modal } from "react-bootstrap";

const TrabajadorAdjuntoItem = (props) => {
  // const [titledialog, setTitledialog] = useState("");
  // const [activeIndex, setActiveIndex] = useState(2);

  const imagen150 =
    props.ruta ??
    "https://placehold.co/150x200?text=JPG&bgcolor=cccccc&color=333333";
  const imagenpdf =
    "https://placehold.co/250x250?text=PDF&bgcolor=cccccc&color=333333";
  const rutapdf = props.ruta;

  const [foto, setFoto] = useState(imagen150);
  const [file, setFile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(URL.createObjectURL(file));
    setFile(file);

    // Llama a la función callback para pasar el archivo al componente padre
    if (props.onFileSelect) {
      props.onFileSelect(file);
    }
  };

  return (
    <>
      <div className="d-flex ">
        <div className="">
          <Card className="">
            {file ? (
              <Card.Img
                className=""
                variant="top"
                src={`https://placehold.co/70x70?text=${encodeURIComponent(
                  file.name
                )}&bgcolor=cccccc&color=333333`}
                data-holder-rendered={foto ? "false" : "true"}
                alt="foto"
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={handleImageClick}
              />
            ) : (
              <Card.Img
                className=""
                variant="top"
                src={imagenpdf}
                data-holder-rendered={foto ? "false" : "true"}
                alt="foto"
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={handleImageClick}
              />
            )}
          </Card>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="btn btn-outline-secondary mx-2 p-0">
            <label
              htmlFor={`file-upload-foto-${props.id}`}
              style={{ padding: "2px" }}
              title="Seleccione el archivo pdf"
            >
              <i className="bi bi-paperclip fs-3"></i>
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              accept=".pdf"
              id={`file-upload-foto-${props.id}`}
              style={{ display: "none" }}
              className=""
              multiple={false}
            />
          </div>
        </div>
      </div>

      {/* Modal para mostrar la imagen o PDF */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Vista previa </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-0">
          {rutapdf ? (
            <embed
              className="p-0 m-0"
              src={rutapdf}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          ) : file ? (
            <embed
              className="p-0 m-0"
              src={URL.createObjectURL(file)}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          ) : (
            <p>No hay información para mostrar</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrabajadorAdjuntoItem;
