import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import VentaGuardarForm from "./VentaGuardarForm";

const VentaGuardarRegistrar = (props) => {
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState("0");
  const [totalQQ, setTotalQQ] = useState(0);

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
  const handlePrecioChange = (row, nuevoPrecio) => {
    // aquí actualizas el precio en tu estado principal
    const nuevasFilas = rowData.map((r) =>
      r.id_compra === row.id_compra
        ? { ...r, precio: nuevoPrecio, total: r.cantidad * nuevoPrecio }
        : r
    );
    setRowData(nuevasFilas);
  };

  const buscar_dni = (e) => {
    const nuevoValor = e.trim();

    // Validar longitud
    if (nuevoValor.length !== 8 && nuevoValor.length !== 11) {
      Swal.fire({
        icon: "warning",
        title: "Número inválido",
        text: "El número ingresado debe tener 8 dígitos (DNI) o 11 dígitos (RUC).",
        confirmButtonColor: "#3085d6",
      });
      return; // no continúa si es inválido
    }

    // Si es válido
    formik.setFieldValue("swdni", true);
    // Llamar a la función que obtiene los datos
    get_dni_externo(nuevoValor);
  };
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
  const handleToggleActivo = (row) => {
    const newData = rowData.map((item) =>
      String(item.id_compra) === String(row.id_compra)
        ? { ...item, activo: item.activo === "1" ? "0" : "1" }
        : item
    );

    setRowData(newData);

    setTotal(
      newData
        .filter((item) => item.activo === "1")
        .reduce((acc, item) => acc + Number(item.total || 0), 0)
    );
    setTotalQQ(
      newData
        .filter((item) => item.activo === "1")
        .reduce((acc, item) => acc + Number(item.cantidad || 0), 0)
    );
  };

  const initialValues = {
    operacion: "S",
    idmodulo: props.idmodulo,
    fecha: new Date().toISOString().slice(0, 10),
    qq: props.totalQQ,
    id_tipo_identidad: "1",
  };
  const validationSchema = Yup.object({});

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
      buscar_dni={buscar_dni}
      rowData={props.rowData}
      totalQQ={props.totalQQ}
      total={props.total}
      handleToggleActivo={handleToggleActivo}
      handlePrecioChange={handlePrecioChange}
    />
  );
};

export default VentaGuardarRegistrar;
