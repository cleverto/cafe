import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import CreditoPagar from "./CreditoPagar";

const CreditoPagarRegistrar = (props) => {
  const [listaTipoCaja, setListaTipoCaja] = useState([]);
  const [rowData, setRowdata] = useState([]);


  useEffect(() => {
    if (props.id_credito) {
      modulo(props.id_credito);
      get_lista(props.id_credito);
    }
    // eslint-disable-next-line
  }, [props.id_credito]);

  const get_lista = async (id) => {
    let _datos = JSON.stringify({ id: id, modulo: props.modulo });

    const res = await Axios.post(
      window.globales.url + "/credito/lista_pago",
      _datos
    );
    setRowdata(res.data.items);
  };



  useEffect(() => {
    get_lista_medio_pago();

    // eslint-disable-next-line
  }, []);

  const get_lista_medio_pago = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_caja",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaTipoCaja(res.data.items);
    formik.setFieldValue("id_tipo_caja", res.data.items[0].id);
    formik.setFieldValue("tipo_caja", res.data.items[0].descripcion);
  };


  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id, modulo: props.modulo,
    });
    await Axios.post(window.globales.url + "/credito/modulo_origen", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("id_empresa", res.data.items.id_empresa);
          formik.setFieldValue("id_sucursal", res.data.items.id_sucursal);
          formik.setFieldValue("id_proveedor", res.data.items.id_proveedor);
          formik.setFieldValue("proveedor", res.data.items.proveedor);
          formik.setFieldValue("total", res.data.items.total);
          formik.setFieldValue("simbolo", res.data.items.simbolo);
          formik.setFieldValue("referencia", res.data.items.nro_comprobante);
          formik.setFieldValue("saldo", res.data.items.saldo);


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

    await Axios.post(window.globales.url + "/credito/guardar_detalle", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {

          const obj = {
            id: res.data.id,
            fecha: data.fecha,
            tipo_caja: data.tipo_caja,
            monto: data.monto,
          };
          formik.setFieldValue("saldo", res.data.saldo);

          setRowdata((prevData) => [obj, ...prevData]);

          return true;
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
          return false;
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
        return false;
      });
  };
  const eliminar = (e, id) => {
    let _datos = JSON.stringify({ id: id, idmodulo: props.id_credito });
    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(window.globales.url + "/credito/eliminar_detalle", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) => prevData.filter((row) => row.id !== id));
            }
            formik.setFieldValue("saldo", res.data.saldo);
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  };
  const initialValues = {
    idmodulo: props.id_credito,
    modulo: "",
    id_empresa: "",
    id_sucursal: "",
    id_tipo_caja: "",
    id_proveedor: "",
    tipo_caja: "",
    proveedor: "",
    fecha: new Date().toISOString().slice(0, 10),
    monto: "0",
    saldo: "0",
    referencia: "",
  };

  ;

  const validationSchema = Yup.object({
    monto: Yup.string()
      .required("Requerido")
      .matches(/^\d+(\.\d{1,2})?$/, "Solo se permiten números con máximo dos decimales")
      .test("mayor-a-cero", "Debe ser mayor a cero", value => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
      })
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const exito = await guardar(values);
      if (exito) {
        resetForm(); // Limpia el formulario
        console.log("Guardado exitoso");
      } else {
        console.error("Error al guardar");
      }

    },
  });

  return (

    <CreditoPagar
      {...formik}
      eliminar={eliminar}
      listaTipoCaja={listaTipoCaja}
      idmodulo={props.id_credito}
      rowData={rowData}
    />

  );
};

export default CreditoPagarRegistrar;
