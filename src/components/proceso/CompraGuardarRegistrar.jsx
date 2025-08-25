import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import CompraGuardarForm from "./CompraGuardarForm";

const CompraGuardarRegistrar = (props) => {


  const [listaTipoComprobante, setListaTipoComprobante] = useState([]);

  useEffect(() => {
    get_lista_tipo_comprobante();

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (props.idmodulo) {
  //     modulo(props.idmodulo);
  //   }
  //   // eslint-disable-next-line
  // }, [props.idmodulo]);

  const get_lista_tipo_comprobante = async (id) => {
    let _datos = JSON.stringify({
      modulo: "tipo_comprobante",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaTipoComprobante(res.data.items);
    formik.setFieldValue("id_tipo_comprobante", "04");
  };

  // const modulo = async (id) => {
  //   let _datos = JSON.stringify({
  //     id: id,
  //   });
  //   await Axios.post(window.globales.url + "/producto/modulo", _datos)
  //     .then((res) => {
  //       if (res.data.rpta === "1") {
  //         formik.setFieldValue("operacion", "1");
  //         formik.setFieldValue("producto", res.data.items.producto);
  //       } else {
  //         Swal.fire({ text: res.data.msg, icon: "warning" });
  //       }
  //     })
  //     .catch((error) => {
  //       Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
  //     });
  // };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/compra/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("idmodulo", res.data.id);

          props.handleClose();
          props.limpiarRowdata();
          props.showPagar();
          props.id_credito(res.data.id_credito);
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
    id_proveedor: "",
    id_tipo_comprobante: "",
    id_moneda: "PEN",
    fecha: new Date().toISOString().slice(0, 10),
    proveedor: "",
    referencia: "",
    simbolo:"S/ ",
    total: props.total,
  };

  const validationSchema = Yup.object({
    id_proveedor: Yup.string().required("Requerido"),
    referencia: Yup.string()
      .required("Requerido")
      .matches(/^\d*$/, "Solo se permiten números")
      .max(8, "Debe tener máximo 8 dígitos"),
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
    <CompraGuardarForm
      {...formik}
      buscar_dni={buscar_dni}
      listaTipoComprobante={listaTipoComprobante}
    />
  );
};

export default CompraGuardarRegistrar;
