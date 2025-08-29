import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import CajaForm from "./CajaForm";
import { useLocation } from "react-router-dom";

const CajaRegistrar = (props) => {
  const [listaConcepto, setListaConcepto] = useState([]);
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
    get_lista_concepto();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  const get_lista_concepto = async () => {
    let _datos = JSON.stringify({
      modulo: "concepto",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaConcepto(res.data.items);
    formik.setFieldValue("id_concepto", res.data.items.id);
  };

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
    if (
      nuevoValor &&
      typeof nuevoValor === "string" &&
      nuevoValor.length === 8
    ) {
      formik.setFieldValue("swdni", true);

      get_dni_externo(nuevoValor);
    }
  };

  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({ tipo: "dni", nro: cad });
    formik.setFieldValue("proveedor", "");
    await Axios.post(
      window.globales.url + "/funciones/get_solo_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("dni", cad);
        formik.setFieldValue(
          "proveedor",
          `${res.data.items.nombres} ${res.data.items.paterno} ${res.data.items.materno}`
        );
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
          formik.setFieldValue("dni", res.data.items.dni);
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
            dni: data.dni,
            proveedor: data.proveedor,
            direccion: data.direccion,
            telefono: data.telefono,
            ubigeo: data.ubigeo,
          };
          console.log(obj);
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
    movimiento:"S",
    id_concepto:"",
    fecha:"",
    observaciones:"",
    monto: "0.00",
  };

  const validationSchema = Yup.object({
    proveedor: Yup.string().required("Requerido"),
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
      
    />
  );
};

export default CajaRegistrar;
