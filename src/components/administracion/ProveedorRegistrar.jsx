import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProveedorForm from "./ProveedorForm";
import { useLocation } from "react-router-dom";

const ProveedorRegistrar = (props) => {
  const [listaUbigeo, setListaUbigeo] = useState([]);
  const location = useLocation();

  const esProveedor = location.pathname.includes("proveedor");

  useEffect(() => {
    const opciones = [{ value: "060801", label: "CAJAMARCA - JAEN - JAEN" }];

    setListaUbigeo(opciones);
    formik.setFieldValue("id_ubigeo", "060801");
    formik.setFieldValue("ubigeo", "CAJAMARCA - JAEN - JAEN");

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const buscar_ubigeo = async (inputValue) => {
    const texto = String(inputValue || "").trim();

    // Evitamos búsquedas vacías o muy cortas
    if (texto.length < 2) {
      setListaUbigeo([]);
      return;
    }

    try {
      const _datos = JSON.stringify({ text: texto });

      const res = await Axios.post(
        `${window.globales.url}/funciones/buscar_ubigeo`,
        _datos
      );

      // Transformamos los datos para que React-Select los entienda
      const opciones = res.data.items.map((data) => ({
        value: data.id_ubigeo,
        label: data.ubigeo,
      }));
      setListaUbigeo(opciones);
    } catch (error) {
      console.error("Error buscando ubigeo:", error);
      setListaUbigeo([]);
    }
  };
  const buscar_dni = (e) => {
    const nuevoValor = e;

    if (nuevoValor && typeof nuevoValor === "string") {
      if (nuevoValor.length === 8) {
        // Es DNI
        formik.setFieldValue("swdni", true);
        get_dni_externo(nuevoValor);
      } else if (nuevoValor.length === 11) {
        // Es RUC
        formik.setFieldValue("swdni", false);
        get_dni_externo(nuevoValor);
      }
    }
  };

  const get_dni_externo = async (cad) => {
    let tipo = "";
    if (cad.length === 8) {
      tipo = "dni";
    } else if (cad.length === 11) {
      tipo = "ruc";
    } else {
      return;
    }

    let _datos = JSON.stringify({ tipo: tipo, nro: cad });
    formik.setFieldValue("proveedor", "");
    await Axios.post(
      window.globales.url + "/funciones/get_solo_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("dni", cad);
        formik.setFieldValue("proveedor", `${res.data.items.nombrecompleto}`);
      }
      formik.setFieldValue("swdni", false);
    });
  };

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/proveedor/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("dni", res.data.items.nro);
          formik.setFieldValue("proveedor", res.data.items.proveedor);
          formik.setFieldValue("direccion", res.data.items.direccion);
          formik.setFieldValue("telefono", res.data.items.telefono);
          formik.setFieldValue("id_ubigeo", res.data.items.id_ubigeo);
          formik.setFieldValue("ubigeo", res.data.items.ubigeo);

          const opciones = [
            { value: res.data.items.id_ubigeo, label: res.data.items.ubigeo },
          ];
          setListaUbigeo(opciones);
          formik.setFieldValue("id_ubigeo", res.data.items.id_ubigeo);
          formik.setFieldValue("ubigeo", res.data.items.ubigeo);
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

    await Axios.post(window.globales.url + "/proveedor/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("foco", "1");
          const obj = {
            id_proveedor: data.operacion === "0" ? res.data.id : data.idmodulo,
            nro: data.dni,
            proveedor: data.proveedor,
            direccion: data.direccion,
            telefono: data.telefono,
            ubigeo: data.ubigeo,
          };

          if (data.operacion === "0") {
            props.inserta(obj);
          } else {
            props.modifica(obj);
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
    proveedor: "",
    tipo: esProveedor ? "0" : "1",
    dni: "",
    direccion: "",
    telefono: "",
    foco: "0",
    id_ubigeo: "060801",
    ubigeo: "",
    swdni: false,
    loaging: false,
  };

  const validationSchema = Yup.object({
    proveedor: Yup.string().required("Requerido"),
    dni: Yup.string()
      .matches(/^\d+$/, "Solo se permiten números")
      .test(
        "len",
        "Debe tener 8 o 11 dígitos",
        (val) => val && (val.length === 8 || val.length === 11)
      )
      .required("Requerido"),
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
    <ProveedorForm
      {...formik}
      buscar_dni={buscar_dni}
      listaUbigeo={listaUbigeo}
      buscar_ubigeo={buscar_ubigeo}
    />
  );
};

export default ProveedorRegistrar;
