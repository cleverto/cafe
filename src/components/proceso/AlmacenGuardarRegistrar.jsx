import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import AlmacenGuardarForm from "./AlmacenGuardarForm";

const AlmacenGuardarRegistrar = (props) => {
  const [listaTipoComprobante, setListaTipoComprobante] = useState([]);

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }

    // eslint-disable-next-line
  }, [props.idmodulo]);

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
      opcion: "almacen",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaTipoComprobante(res.data.items);
    formik.setFieldValue("id_tipo_comprobante", "04");
  };

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
          formik.setFieldValue("dni", res.data.items.dni);
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
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/almacen/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("idmodulo", res.data.id);

          if (data.operacion === "0") {
            props.limpiarRowdata();
          }
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
    id_tipo_comprobante: "",
    fecha: new Date().toISOString().slice(0, 10),
    motivo: "",
  };



  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      guardar(values);
    },
  });

  return (
    <AlmacenGuardarForm
      {...formik}
      listaTipoComprobante={listaTipoComprobante}
    />
  );
};

export default AlmacenGuardarRegistrar;
