import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import CajaForm from "./CajaForm";

const CajaRegistrar = (props) => {
  const [listaConcepto, setListaConcepto] = useState([]);
  const [listaTipoCaja, setListaTipoCaja] = useState([]);
  const [listaMoneda, setListaMoneda] = useState([]);

  useEffect(() => {
    get_lista_concepto();
    get_lista_tipo_caja();
    get_lista_moneda();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const get_lista_moneda = async () => {
    let _datos = JSON.stringify({
      modulo: "moneda",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaMoneda(res.data.items);
    formik.setFieldValue("id_moneda", "PEN");
  };
  const get_lista_concepto = async () => {
    let _datos = JSON.stringify({
      modulo: "concepto",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaConcepto(res.data.items);
    formik.setFieldValue("id_concepto", res.data.items[0].id);
    console.log("id_concepto.id");
  };

  const get_lista_tipo_caja = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_caja",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaTipoCaja(res.data.items);
    formik.setFieldValue("id_tipo_caja", res.data.items[0].id);
  };

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/caja/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          console.log(res.data.items.id_concepto);
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("movimiento", res.data.items.movimiento);
          formik.setFieldValue("id_concepto", res.data.items.id_concepto);
          formik.setFieldValue("fecha", res.data.items.fecha);
          formik.setFieldValue("observaciones", res.data.items.observaciones);
          formik.setFieldValue("monto", res.data.items.monto);
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

    await Axios.post(window.globales.url + "/caja/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          props.handleClose();
          if (data.operacion === "0") {
            props.get_lista();
          } else {
            
            
            const obj = {
              id_caja: res.data.modulo.id_caja,
              concepto: res.data.modulo.concepto,
              referencia: res.data.modulo.referencia,
              quien: res.data.modulo.proveedor,
              observaciones: res.data.modulo.observaciones,
              simbolo: res.data.modulo.simbolo,
              monto: res.data.modulo.monto,
            };

            props.modifica(obj);
          }
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
    id_concepto: "",
    movimiento: "S",
    id_concepto: "",
    fecha: new Date().toISOString().slice(0, 10),
    observaciones: "",
    monto: "0.00",
  };

  const validationSchema = Yup.object({
    fecha: Yup.date()
      .typeError("Ingrese una fecha válida") // Si no es fecha
      .required("La fecha es obligatoria"),

    monto: Yup.number()
      .typeError("Ingrese un monto válido") // Si no es número
      .positive("El monto debe ser mayor que 0") // Mayor a 0
      .required("El monto es obligatorio"),
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
    <CajaForm
      {...formik}
      listaConcepto={listaConcepto}
      listaTipoCaja={listaTipoCaja}
      listaMoneda={listaMoneda}
    />
  );
};

export default CajaRegistrar;
