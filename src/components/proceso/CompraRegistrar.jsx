import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import Compra from "./Compra";
import { useNavigate } from "react-router-dom";

const CompraRegistrar = (props) => {
  const navigate = useNavigate();
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
    if (idmodulo != null) {
      //get_modulo(idmodulo);
      get_lista(idmodulo);
    } else {
      get_lista_temp("");
    }
  }, [idmodulo]);

  useEffect(() => {
    get_lista_producto();

    // eslint-disable-next-line
  }, []);

  const get_lista_temp = async (id) => {
    let _datos = JSON.stringify({ id: id });
    const res = await Axios.post(
      window.globales.url + "/compra/lista_temp",
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
    const res = await Axios.post(window.globales.url + "/compra/lista", _datos);

    setRowdata(res.data.items);
    formik.setFieldValue("operacion", "1");
  };
  // const buscar_dni = (e) => {
  //   const nuevoValor = e;
  //   if (
  //     nuevoValor &&
  //     typeof nuevoValor === "string" &&
  //     nuevoValor.length === 8
  //   ) {
  //     formik.setFieldValue("swdni", true);

  //     get_dni_externo(nuevoValor);
  //   }
  // };

  // const get_modulo = async (id) => {
  //   let _datos = JSON.stringify({
  //     id: id,
  //   });
  //   await Axios.post(window.globales.url + "/proveedor/modulo", _datos)
  //     .then((res) => {
  //       if (res.data.rpta === "1") {
  //         formik.setFieldValue("operacion", "1");
  //         formik.setFieldValue("dni", res.data.items.dni);
  //         formik.setFieldValue("proveedor", res.data.items.proveedor);
  //         formik.setFieldValue("direccion", res.data.items.direccion);
  //         formik.setFieldValue("telefono", res.data.items.telefono);
  //         formik.setFieldValue("id_ubigeo", res.data.items.id_ubigeo);
  //         formik.setFieldValue("ubigeo", res.data.items.ubigeo);
  //         const opciones = [
  //           { value: res.data.items.id_ubigeo, label: res.data.items.ubigeo },
  //         ];
  //         formik.setFieldValue("id_ubigeo", res.data.items.id_ubigeo);
  //         formik.setFieldValue("ubigeo", res.data.items.ubigeo);
  //       } else {
  //         Swal.fire({ text: res.data.msg, icon: "warning" });
  //       }
  //     })
  //     .catch((error) => {
  //       Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
  //     });
  // };
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

  const limpiarRowdata = () => {
    setRowdata([]);
    setTotal("0.00");
  };

  const initialValues = {
    operacion: idmodulo ? "1" : "0",
    idmodulo: idmodulo ? idmodulo : "",
    id_credito: "",
    id_detalle: "",
    id_producto: "",
    id_categoria: "",
    producto: "",
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
    taza: "0",
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
        <Compra
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

export default CompraRegistrar;
