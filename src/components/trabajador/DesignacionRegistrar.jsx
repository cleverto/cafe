import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import DesignacionForm from "./DesignacionForm";
import { useLocation } from "react-router-dom";

const TrabajadorRegistrar = () => {
  const [listaTrabajador, setListaTrabajador] = useState([]);
  const [listaCargo, setListaCargo] = useState([]);
  const [listaDependencia, setListaDependencia] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      modulo(id);
    }
    // eslint-disable-next-line
  }, [id, listaTrabajador]);

  useEffect(() => {
    get_lista_trabajador();
    get_lista_cargo();
    get_lista_dependencia();
    // eslint-disable-next-line
  }, []);

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/designacion/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("id_designacion", res.data.items.id_designacion);
          formik.setFieldValue("id_trabajador", res.data.items.id_trabajador);
          formik.setFieldValue("id_cargo", res.data.items.id_cargo);
         
          formik.setFieldValue("id_dependencia", res.data.items.id_dependencia);
          formik.setFieldValue("inicio", res.data.items.inicio);
          if (res.data.items.fin !== null) {
            formik.setFieldValue("fin", res.data.items.fin);
          }
          formik.setFieldValue("resolucion", res.data.items.resolucion);
        } else {
          Swal.fire({ text: res.data.msg, icon: "warning" });
        }
      })
      .catch((error) => {
        Swal.fire({ text: "Algo pasó! " + error, icon: "error" });
      });
  };

  const get_lista_trabajador = async () => {
    let _datos = JSON.stringify({
      modulo: "trabajador",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaTrabajador(res.data.items);
    formik.setFieldValue("id_trabajador", res.data.items[0].id);
  };
  const get_lista_cargo = async () => {
    let _datos = JSON.stringify({
      modulo: "cargo",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaCargo(res.data.items);
    formik.setFieldValue("id_cargo", res.data.items[0].id);
  };
  const get_lista_dependencia = async () => {
    let _datos = JSON.stringify({
      modulo: "dependencia",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista",
      _datos
    );
    setListaDependencia(res.data.items);
    formik.setFieldValue("id_dependencia", res.data.items[0].id);
  };

  const guardar = async (data) => {
    let _datos = JSON.stringify(data);

    await Axios.post(window.globales.url + "/designacion/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          Swal.fire({ text: res.data.msg, icon: "info" });
          window.history.back();
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
    id_designacion: "",
    id_trabajador: "",
    id_cargo: "",
    id_dependencia: "",
    inicio: new Date().toISOString().split("T")[0],
    fin: "",
    resolucion: "",
  };

  const validationSchema = Yup.object({
    resolucion: Yup.string().required(
      "Por favor, ingrese el número de resolución"
    ),
    inicio: Yup.date()
      .required("La fecha es obligatoria")
      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    fin: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .test(
        "fin-mayor-que-inicio",
        "La fecha de fin debe ser posterior o igual a la de inicio",
        function (fin) {
          const { inicio } = this.parent;
          if (!fin) return true; // ✅ Si no hay fecha de fin, pasa
          return new Date(fin) >= new Date(inicio); // ✅ Solo valida si hay valor
        }
      ),
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
    <Dashboard
      componente={
        <DesignacionForm
          {...formik}
          listaTrabajador={listaTrabajador}
          listaCargo={listaCargo}
          listaDependencia={listaDependencia}
        />
      }
    />
  );
};

export default TrabajadorRegistrar;
