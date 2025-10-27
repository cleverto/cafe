import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import VentaGuardarForm from "./VentaGuardarForm";

const SecadoGuardarRegistrar = (props) => {



  const guardar = async (data) => {
    let _datos = JSON.stringify({
      form: data,
      compras: props.rowData.filter((row) => row.activo === "1"),
    });


    await Axios.post(window.globales.url + "/venta/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          props.updateLista();
          props.handleClose();
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const initialValues = {
    operacion: "S",
    idmodulo: props.idmodulo,
    fecha: new Date().toISOString().slice(0, 10),
    qq: props.totalQQ,    
    id_tipo_identidad:"1",
  };

  const validationSchema = Yup.object({

  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      guardar(values);
    },
  });

  return (
    <VentaGuardarForm
      {...formik}
      totalActivos={props.totalActivos}
      totalQQ={props.totalQQ}
    />
  );
};

export default SecadoGuardarRegistrar;
