import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProcesoGuardarForm from "./ProcesoGuardarForm";

const SecadoGuardarRegistrar = (props) => {



  const guardar = async (data) => {
    let _datos = JSON.stringify({
      form: data,
      compras: props.rowData.filter((row) => row.activo === "1"),
    });


    await Axios.post(window.globales.url + "/proceso/guardar", _datos)
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
    operacion: "0",
    idmodulo: props.idmodulo,
    fecha: new Date().toISOString().slice(0, 10),
    qq: props.totalQQ,
    total: props.totalActivos,
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
    <ProcesoGuardarForm
      {...formik}
      totalActivos={props.totalActivos}
      totalQQ={props.totalQQ}
    />
  );
};

export default SecadoGuardarRegistrar;
