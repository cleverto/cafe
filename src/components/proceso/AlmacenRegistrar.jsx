import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import Almacen from "./Almacen";

const AlmacenRegistrar = (props) => {
  const [idmodulo, setIdmodulo] = useState("");
  const [listaProducto, setListaProducto] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [total, setTotal] = useState("0");

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");

    setIdmodulo(idParam);
    formik.setFieldValue("idmodulo", idParam);
  }, []);

  useEffect(() => {
   
      if (!idmodulo) { 
      get_lista_temp("");
    } else {
      get_lista(idmodulo);
      
    }
  }, [idmodulo]);

  useEffect(() => {
    get_lista_producto();

    // eslint-disable-next-line
  }, []);

  const get_lista_temp = async (id) => {
    let _datos = JSON.stringify({ id: id });
    const res = await Axios.post(
      window.globales.url + "/almacen/lista_temp",
      _datos
    );
    setRowdata(res.data.items);
    setTotal(res.data.total);
  };

  const get_lista_producto = async () => {
    try {
      let _datos = JSON.stringify({ modulo: "producto", campo: "producto" });

      const res = await Axios.post(
        `${window.globales.url}/producto/lista`,
        _datos
      );

      // Transformamos los datos para que React-Select los entienda
      const opciones = res.data.items.map((data) => ({
        value: data.id_producto,
        label: data.producto,
        id_categoria: data.id_categoria,
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
    const res = await Axios.post(window.globales.url + "/almacen/lista", _datos);

    setRowdata(res.data.items);
    formik.setFieldValue("operacion", "1");
    setTotal(res.data.total);
  };
 
  const guardar = async (data) => {

    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/almacen/guardar_producto", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          const obj = {
            id_detalle: res.data.id,
            idmodulo: idmodulo,
            id_producto: data.id_producto,
            id_categoria: data.id_categoria,
            producto: data.producto,
            cantidad: data.cantidad,
            precio: data.precio,
            total: data.total,
          };
          setRowdata((prevData) => [obj, ...prevData]);
          setTotal(res.data.total);
        } else {
          Swal.fire({ text: res.data.msg, icon: "error" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };
  const eliminar = (e, id) => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const idParam = params.get("id");

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
        Axios.post(window.globales.url + "/almacen/eliminar_producto", _datos)
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

  const limpiarRowdata = () => {
    setRowdata([]);
    setTotal("0.00");
  };

  const initialValues = {
    operacion: idmodulo ? "1" : "0",
    idmodulo: idmodulo ? idmodulo : "",
    id_empresa:"1",
    id_sucursal:"1",
    id_almacen:"1",
    id_detalle: "",
    id_producto: "",
    id_categoria: "",
    producto: "",
    cantidad: "0",
    precio: "0",
    total: "0",
  };

  const validationSchema = Yup.object({
    id_producto: Yup.string().required("Requerido"),
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
        <Almacen
          {...formik}
          idmmodulo={idmodulo}
          listaProducto={listaProducto}
          rowdata={rowdata}
          total={total}
          eliminar={eliminar}
          limpiarRowdata={limpiarRowdata}
        />
      }
    />
  );
};

export default AlmacenRegistrar;
