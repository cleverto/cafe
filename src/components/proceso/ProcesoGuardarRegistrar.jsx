import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProcesoGuardarForm from "./ProcesoGuardarForm";

const SecadoGuardarRegistrar = (props) => {

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }

    // eslint-disable-next-line
  }, [props.idmodulo]);


  // useEffect(() => {
  //   if (props.idmodulo) {
  //     modulo(props.idmodulo);
  //   }
  //   // eslint-disable-next-line
  // }, [props.idmodulo]);


  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/compra/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("id_moneda", res.data.items.id_moneda);
          formik.setFieldValue("total", res.data.items.total);
          formik.setFieldValue("sinbolo", res.data.items.sinbolo);
          formik.setFieldValue("dni", res.data.items.nro);
          formik.setFieldValue("id_proveedor", res.data.items.id_proveedor);
          formik.setFieldValue("proveedor", res.data.items.proveedor);
          formik.setFieldValue("fecha", res.data.items.fecha);
          formik.setFieldValue(
            "id_tipo_comprobante",
            res.data.items.id_tipo_comprobante
          );
          formik.setFieldValue("referencia", res.data.items.referencia);
          formik.setFieldValue("total", res.data.total);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify({
      form: data,
      compras: props.rowData.filter((row) => row.activo === "1"),
    });


    await Axios.post(window.globales.url + "/secado/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          window.location.reload();

        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const buscar_dni = (e) => {
    const nuevoValor = e;
    if (
      nuevoValor &&
      typeof nuevoValor === "string" &&
      nuevoValor.length === 8
    ) {
      formik.setFieldValue("swdni", true);

      get_dni_externo(nuevoValor);
    }
  };

  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({ tipo: "dni", nro: cad });
    formik.setFieldValue("proveedor", "");
    await Axios.post(
      window.globales.url + "/funciones/get_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("id_proveedor", `${res.data.items.id_proveedor}`);
        formik.setFieldValue("proveedor", `${res.data.items.nombrecompleto}`);
      }
      formik.setFieldValue("swdni", false);
    });
  };

  const initialValues = {
    operacion: "0",
    idmodulo: props.idmodulo,
    id_tipo_comprobante: "",    
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
      buscar_dni={buscar_dni}
      totalActivos={props.totalActivos}
      totalQQ={props.totalQQ}
    />
  );
};

export default SecadoGuardarRegistrar;
