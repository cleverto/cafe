import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import Secado from "./Secado";

const SecadoRegistrar = (props) => {
  const [idmodulo, setIdmodulo] = useState("");
  const [listaProducto, setListaProducto] = useState([]);
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
    const res = await Axios.post(window.globales.url + "/compra/lista_sin_secar", _datos);

    setRowData(res.data.items);
    formik.setFieldValue("operacion", "1");
    setTotal(res.data.total);
  };

  const guardar = async (data) => {
    // const ide = `${localStorage.getItem("idusuario")}-${Date.now()}`;
    // data.id_detalle = ide;
    // data.id_usuario = localStorage.getItem("idusuario");

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
  // const eliminar = (e, id) => {
  //   const params = new URLSearchParams(window.location.hash.split("?")[1]);
  //   const idParam = params.get("id");

  //   let _datos = JSON.stringify({ id: id, idmodulo: idParam });
  //   Swal.fire({
  //     title: "¿Confirmar Eliminación?",
  //     text: "¿Estás seguro de que deseas eliminar este registro?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, continuar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Axios.post(window.globales.url + "/compra/eliminar_producto", _datos)
  //         .then((res) => {
  //           if (res.data.rpta === "1") {
  //             setRowData((prevData) =>
  //               prevData.filter((row) => row.id_detalle !== id)
  //             );
  //           }

  //           setTotal(res.data.total);
  //         })
  //         .catch((error) => {
  //           Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
  //         });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //     }
  //   });
  // };


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
  // const calcular_total_cantidad = (e) => {
  //   let value = e.target.value;
  //   if (/^\d*\.?\d{0,2}$/.test(value)) {
  //     formik.setFieldValue("cantidad", value);
  //     formik.setFieldValue(
  //       "total",
  //       (value * formik.values.precio).toFixed(2)
  //     );
  //   }
  // };
  // const calcular_total_precio = (e) => {
  //   let value = e.target.value;
  //   if (/^\d*\.?\d{0,3}$/.test(value)) {
  //     formik.setFieldValue("precio", value);
  //     formik.setFieldValue(
  //       "total",
  //       (formik.values.cantidad * value).toFixed(2)
  //     );
  //   }
  // };
 
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
    cfg_tara: "0",
    cfg_qq: "0",
    producto: "",
    sacos: "0",
    muestra: "300",
    rendimiento: "0",
    segunda: "0",
    bola: "0",
    cascara: "0",
    humedad: "0",
    impureza: "0",
    descarte: "0",
    pasilla: "0",
    negro: "0",
    ripio: "0",
    impureza: "0",
    defectos: "0",
    tara: "0",
    kg_bruto: "0",
    kg_neto: "0",
    qq_bruto: "0",
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
        <Secado
          {...formik}
          rowData={rowData}
          updateRowData={updateRowData}
        />
      }
    />
  );
};

export default SecadoRegistrar;

