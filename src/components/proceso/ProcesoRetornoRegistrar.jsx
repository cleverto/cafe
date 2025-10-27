import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import ProcesoRetorno from "./ProcesoRetorno";

const ProcesoRetornoRegistrar = () => {
  const [idmodulo, setIdmodulo] = useState("");
  const [listaProducto, setListaProducto] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [rowDataSalida, setRowDataSalida] = useState([]);
  const [total, setTotal] = useState("0");

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");

    setIdmodulo(idParam);
    formik.setFieldValue("idmodulo", idParam);
  }, []);

  useEffect(() => {

    if (idmodulo) {
      get_lista(idmodulo);
      get_lista_salida(idmodulo);
    }
  }, [idmodulo]);

  useEffect(() => {
    get_lista_producto();

    // eslint-disable-next-line
  }, []);

  const get_lista_producto = async () => {
    try {
      let _datos = JSON.stringify({ modulo: "producto", campo: "producto" });

      const res = await Axios.post(
        `${window.globales.url}/producto/lista_stock`,
        _datos
      );
      // Transformamos los datos para que React-Select los entienda
      const opciones = res.data.items.map((data) => ({
        value: data.id_producto,
        label: data.producto,
        id_categoria: data.id_categoria,
        stock: data.stock,
        qq: data.qq,
        tara: data.tara,

      }));
      setListaProducto(opciones);
    } catch (error) {
      console.error("Error lista producto", error);
      setListaProducto([]);
    }
  };

  const get_lista = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    const res = await Axios.post(window.globales.url + "/secado/lista_detalle", _datos);

    setRowdata(res.data.items);
    setTotal(res.data.total);
  };

  const get_lista_salida = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    const res = await Axios.post(window.globales.url + "/proceso/lista_detalle_salida", _datos);

    setRowDataSalida(res.data.items);
  };
  const guardar_all = async (fecha) => {
    let _datos = JSON.stringify({
      id: idmodulo,
      fecha: fecha,
      rowdata: rowdata,
    });


    await Axios.post(window.globales.url + "/proceso/guardar_retorno", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          window.history.back();

        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const guardar = async (data) => {
    // const ide = `${localStorage.getItem("idusuario")}-${Date.now()}`;
    // data.id_detalle = ide;
    // data.id_usuario = localStorage.getItem("idusuario");

    //let _datos = JSON.stringify(data);

    const obj = {
      id_detalle: Date.now() + Math.floor(Math.random() * 1000),
      id_producto: data.id_producto,
      producto: data.producto,
      id_categoria: data.id_categoria,
      rendimiento: data.rendimiento,
      cascara: data.cascara,
      humedad: data.humedad,
      cantidad: data.cantidad,
      precio: data.precio,
      total: data.total,
    };
    setRowdata((prevData) => [obj, ...prevData]);
    //setTotal(res.data.total);
  };
  const eliminar = (e, id) => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");


    setRowdata((prevData) =>
      prevData.filter((row) => row.id_detalle !== id)
    );

    return;


    let _datos = JSON.stringify({ id: id, idmodulo: idParam });
    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "¿Estás seguro de que deseas eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(window.globales.url + "/compra/eliminar_producto", _datos)
          .then((res) => {
            if (res.data.rpta === "1") {
              setRowdata((prevData) =>
                prevData.filter((row) => row.id_detalle !== id)
              );
            }

            setTotal(res.data.total);
          })
          .catch((error) => {
            Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };


  // const calcular_pesos = (e) => {
  //   let value = e.target.value;
  //   if (/^\d*\.?\d{0,2}$/.test(value)) {
  //     formik.setFieldValue("kg_bruto", value);
  //     const total = (value * formik.values.precio).toFixed(2);
  //     formik.setFieldValue(
  //       "total", total
  //     );

  //     const kg_neto = (value - formik.values.tara).toFixed(2);
  //     const qq_bruto = (value / formik.values.cfg_qq).toFixed(2);
  //     const qq_neto = (kg_neto / formik.values.cfg_qq).toFixed(2);

  //     formik.setFieldValue("qq_bruto", qq_bruto);
  //     formik.setFieldValue("kg_neto", kg_neto);
  //     formik.setFieldValue("cantidad", qq_neto);
  //   }
  // };
  const calcular_total_cantidad = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      formik.setFieldValue("cantidad", value);
      formik.setFieldValue(
        "total",
        (value * formik.values.precio).toFixed(2)
      );
    }
  };
  const calcular_total_precio = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,3}$/.test(value)) {
      formik.setFieldValue("precio", value);
      formik.setFieldValue(
        "total",
        (formik.values.cantidad * value).toFixed(2)
      );
    }
  };

  const setData = (data) => {
    setRowdata(data);
  };
  const limpiarRowdata = () => {
    setRowdata([]);
    setTotal("0.00");
  };

  const initialValues = {
    operacion: idmodulo ? "1" : "0",
    idmodulo: idmodulo ? idmodulo : "",
    rendimiento: "0",
    cascara: "0",
    humedad: "0",
    cantidad: "0",
    precio: "0",
    total: "0",
  };

  const validationSchema = Yup.object({
    id_producto: Yup.string().required("Requerido"),
    rendimiento: Yup.string().required("Requerido"),
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
    onSubmit: (values) => {
      guardar(values);
      // resetForm();
    },
  });

  return (
    <Dashboard
      componente={
        <ProcesoRetorno
          {...formik}
          idmmodulo={idmodulo}
          listaProducto={listaProducto}
          rowdata={rowdata}
          rowDataSalida={rowDataSalida}
          setData={setData}
          total={total}
          guardar={guardar}
          guardar_all={guardar_all}
          eliminar={eliminar}
          limpiarRowdata={limpiarRowdata}
          calcular_total_cantidad={calcular_total_cantidad}
          calcular_total_precio={calcular_total_precio}
        />
      }
    />
  );
};

export default ProcesoRetornoRegistrar;

