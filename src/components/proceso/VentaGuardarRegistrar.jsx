import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import VentaGuardarForm from "./VentaGuardarForm";
import { useCallback } from "react";

const VentaGuardarRegistrar = (props) => {
  const [rowData, setRowData] = useState(props.rowData);
  const [rowDetalle, setRowDetalle] = useState([]);
  //const [total, setTotal] = useState("0");
  const [totalQQ, setTotalQQ] = useState(0);

  const initialValues = {
    operacion: "S",
    idmodulo: props.idmodulo ?? "",
    modulo:"venta",
    fecha: new Date().toISOString().slice(0, 10),
    id_proveedor: "",
    proveedor: "",
    direccion: "",
    referencia: "",
    qq: props.totalQQ,
    total: "0",
    id_tipo_identidad: "1",
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
    enableReinitialize: false,
    onSubmit: (values) => {
      guardar(values);
    },
  });

  useEffect(() => {
    get_lista(rowData);

    // eslint-disable-next-line
  }, []);
  const get_lista = async (rowData) => {
    let _datos = JSON.stringify({
      rowData: rowData,
    });
    const res = await Axios.post(
      window.globales.url + "/venta/lista_detalle_guardar",
      _datos
    );

    setRowDetalle(res.data.items);
  };

  const guardar = async (data) => {

    let _datos = JSON.stringify({
      form: data,
      compras: rowDetalle,
    });

    await Axios.post(window.globales.url + "/venta/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          props.showPagar();
          props.id_credito(res.data.id_credito);
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
  const handlePrecioChange = (row, nuevoPrecio) => {
    const nuevasFilas = rowDetalle.map((r) =>
      r.modulo === row.modulo &&
        r.id_detalle === row.id_detalle &&
        r.id_producto === row.id_producto
        ? {
          ...r,
          precio: nuevoPrecio,
          total: (r.cantidad * nuevoPrecio).toLocaleString("es-PE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        }
        : r
    );

    setRowDetalle(nuevasFilas);

    const total =
      nuevasFilas.reduce((acc, item) => {
        const totalNumerico = Number(String(item.total || 0).replace(/,/g, ""));
        return acc + totalNumerico;
      }, 0);

    formik.setFieldValue("total", total);

  };



  const buscar_dni = useCallback(
    (e) => {
      const nuevoValor = e.trim();

      if (nuevoValor.length !== 8 && nuevoValor.length !== 11) {
        Swal.fire({
          icon: "warning",
          title: "Número inválido",
          text: "El número ingresado debe tener 8 dígitos (DNI) o 11 dígitos (RUC).",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      formik.setFieldValue("swdni", true);
      get_dni_externo(nuevoValor);
    },
    [formik] // dependencias necesarias
  );

  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({
      tipo:
        formik.values.id_tipo_identidad === "1"
          ? "dni"
          : formik.values.id_tipo_identidad === "6"
            ? "ruc"
            : "",
      nro: cad,
    });
    formik.setFieldValue("proveedor", "");
    await Axios.post(
      window.globales.url + "/funciones/get_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("id_proveedor", `${res.data.items.id_proveedor}`);
        formik.setFieldValue("proveedor", `${res.data.items.nombrecompleto}`);
        if (formik.values.id_tipo_identidad === "6") {
          formik.setFieldValue("direccion", `${res.data.items.direccion}`);
        }
      }
      formik.setFieldValue("swdni", false);
    });
  };



  return (
    <VentaGuardarForm
      {...formik}
      buscar_dni={buscar_dni}
      rowData={props.rowData}
      rowDetalle={rowDetalle}
      totalQQ={props.totalQQ}
      handlePrecioChange={handlePrecioChange}


    />
  );
};

export default VentaGuardarRegistrar;
