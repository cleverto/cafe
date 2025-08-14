import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProveedorForm from "./ProveedorForm";

const ProveedorRegistrar = (props) => {
  const [listaUbigeo, setListaUbigeo] = useState([]);

  // useEffect(() => {
  //   get_lista_ubigeo();

  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  // const get_lista_ubigeo = async () => {
  //   let _datos = JSON.stringify({
  //     modulo: "ubigeo",
  //   });
  //   const res = await Axios.post(
  //     window.globales.url + "/administracion/lista",
  //     _datos
  //   );
  //   setListaUbigeo(res.data.items);
  //   formik.setFieldValue("id_ubigeo", res.data.items[0].id);
  // };

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
      window.globales.url + "/funciones/get_nombre",
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
          formik.setFieldValue("proveedor", res.data.items.proveedor);
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
            proveedor: data.proveedor,
          };

          if (data.operacion === "0") {
            props.inserta(obj);
          } else {
            props.modifica(obj);
            props.handleClose();
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
    proveedor: "",
    dni: "",
    direccion: "",
    telefono: "",
    foco: "0",
    id_ubigeo: "060801",
    swdni: false,
    loaging: false,
  };

  const validationSchema = Yup.object({
    proveedor: Yup.string().required("Requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      guardar(values);
      if (formik.values.operacion === "0") {
        resetForm();
      }
    },
  });

  return (
    <ProveedorForm
      {...formik}
      buscar_dni={buscar_dni}
      listaUbigeo={listaUbigeo}
    />
  );
};

export default ProveedorRegistrar;
