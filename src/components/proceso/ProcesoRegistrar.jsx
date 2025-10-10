import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import Proceso from "./Proceso";

const ProcesoRegistrar = (props) => {
  const [idmodulo, setIdmodulo] = useState("");
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState("0");



  useEffect(() => {
    get_lista(idmodulo);

    // eslint-disable-next-line
  }, []);


  const get_lista = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    const res = await Axios.post(window.globales.url + "/proceso/lista", _datos);

    setRowData(res.data.items);
    formik.setFieldValue("operacion", "1");
    setTotal(res.data.total);
  };

  const guardar = async (data) => {

    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/compra/guardar_producto", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          const obj = {
            id_detalle: res.data.id,
            idmodulo: idmodulo,
            id_producto: data.id_producto,
            id_categoria: data.id_categoria,
            producto: data.producto,
            muestra: data.muestra,
            rendimiento: data.rendimiento,
            segunda: data.segunda,
            bola: data.bola,
            cascara: data.cascara,
            humedad: data.humedad,
            descarte: data.descarte,
            pasilla: data.pasilla,
            negro: data.negro,
            ripio: data.ripio,
            impureza: data.impureza,
            defectos: data.defectos,
            taza: data.taza,
            cantidad: data.cantidad,
            precio: data.precio,
            total: data.total,
          };
          setRowData((prevData) => [obj, ...prevData]);
          setTotal(res.data.total);
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };


  const updateRowData = (data) => {
    console.log(data);
    setRowData(data);
  };
  const initialValues = {
    operacion: idmodulo ? "1" : "0",
    idmodulo: idmodulo ? idmodulo : "",
    id_credito: "",
    id_detalle: "",
    id_producto: "",
    id_categoria: "",
    producto: "",
    rendimiento: "0",
    cascara: "0",
    humedad: "0",
    cantidad: "0",
    precio: "0",
    total: "0",
  };

  const validationSchema = Yup.object({
    id_producto: Yup.string().required("Requerido"),
    muestra: Yup.string().required("Requerido"),
    rendimiento: Yup.string().required("Requerido"),
    segunda: Yup.string().required("Requerido"),
    bola: Yup.string().required("Requerido"),
    cascara: Yup.string().when("id_categoria", (id_categoria, schema) => {
      return id_categoria === "1"
        ? schema.required("Requerido")
        : schema.notRequired();
    }),

    humedad: Yup.string().required("Requerido"),
    cantidad: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Máximo dos decimales")
      .required("Es obligatorio"),
    precio: Yup.string()
      .matches(/^\d+(\.\d{1,3})?$/, "Máximo tres decimales")
      .required("Es obligatorio"),
    total: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Máximo dos decimales")
      .required("Es obligatorio"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      guardar(values);
      resetForm();
    },
  });

  return (
    <Dashboard
      componente={
        <Proceso
          {...formik}
          rowData={rowData}
          updateRowData={updateRowData}
        />
      }
    />
  );
};

export default ProcesoRegistrar;

