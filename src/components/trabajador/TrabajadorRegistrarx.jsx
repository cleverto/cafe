import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Dashboard from "../dashboard/Dashboard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TrabajadorForm from "./TrabajadorForm";

const TrabajadorRegistrarx = () => {
  const [swdni, setSwdni] = useState(false);
  const navigate = useNavigate();

  const [listadepartamento, setListadepartamento] = useState([]);
  const [listaprovincia, setListaprovincia] = useState([]);
  const [listadistrito, setListadistrito] = useState([]);
  const [listaestadocivil, setListaEstadoCivil] = useState([]);
  const [listavia, setListaVia] = useState([]);

  const [swCasado, setSwCasado] = useState(false);
  const [swConviviente, setSwConviviente] = useState(false);

  const [adjunto, setAdjunto] = useState({
    file_casado: "",
    file_conviviente: null,
  });

  //placeholder de codigo modular
  useEffect(() => {
    get_lista_departamento();
    get_lista_provincia("06");
    get_lista_distrito("06", "08");
    get_lista_estado_civil();
    get_lista_via();

    // eslint-disable-next-line
  }, []);

  const get_lista_estado_civil = async () => {
    let _datos = JSON.stringify({
      modulo: "estado_civil",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista_admi",
      _datos
    );
    setListaEstadoCivil(res.data.items);
    formik.setFieldValue("id_estado_civil", "1");
  };
  const get_lista_via = async () => {
    let _datos = JSON.stringify({
      modulo: "tipo_via",
    });
    const res = await Axios.post(
      window.globales.url + "/administracion/lista_admi",
      _datos
    );
    setListaVia(res.data.items);
    formik.setFieldValue("id_tipo_via", res.data.items[0].id_tipo_via);
  };
  const get_lista_departamento = async () => {
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_departamento"
    );
    setListadepartamento(res.data.items);
  };
  const get_lista_provincia = async (cad) => {
    let _datos = JSON.stringify({ departamento: cad });
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_provincia",
      _datos
    );
    setListaprovincia(res.data.items);
  };
  const get_lista_distrito = async (departamento, provincia) => {
    let _datos = JSON.stringify({
      departamento: departamento,
      provincia: provincia,
    });
    const res = await Axios.post(
      window.globales.url + "/funciones/lista_distrito",
      _datos
    );
    setListadistrito(res.data.items);
  };

  const handleInputChangeDNI = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  const handleKeyDownDNI = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que se envíe el formulario
      buscar_dni();
    }
  };
  const buscar_dni = () => {
    // const nuevoValor = values.numerodocumento_buscar;
    // if (
    //   nuevoValor &&
    //   typeof nuevoValor === "string" &&
    //   nuevoValor.length === 8
    // ) {
    //   setSwdni(true);
    //   get_dni_externo(nuevoValor);
    // }
  };

  const get_dni_externo = async (cad) => {
    let _datos = JSON.stringify({ tipo: "dni", nro: cad });
    formik.setFieldValue("dni", "");
    formik.setFieldValue("nombres", "");
    formik.setFieldValue("paterno", "");
    formik.setFieldValue("materno", "");
    formik.setFieldValue("", "");
    await Axios.post(
      window.globales.url + "/funciones/get_nombre",
      _datos
    ).then((res) => {
      if (res.data.rpta === "1") {
        formik.setFieldValue("dni", cad);
        formik.setFieldValue("nombres", res.data.items.nombres);
        formik.setFieldValue("paterno", res.data.items.paterno);
        formik.setFieldValue("materno", res.data.items.materno);
      }
      setSwdni(false);
    });
  };

  function valida_file() {
    let error = "";
    if (swCasado) {
      if (!adjunto.file_casado) {
        error = "Por favor, seleccione el documento adjunto para casados";
      }
    }
    if (swConviviente) {
      if (!adjunto.file_conviviente) {
        error = "Por favor, seleccione el documento adjunto para convivientes";
      }
    }
    return error;
  }
  const guardar = async (data) => {
    const error = valida_file();
    if (error) {
      Swal.fire({
        title: "¡Información incompleta!",
        text: error,
        icon: "warning",
      });
      console.log(error);
      return false;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file_casado", adjunto.file_casado);
    formData.append("file_conviviente", adjunto.file_conviviente);

    const res = await Axios.post(
      window.globales.url + "/trabajador/guardar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          let progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log(`Progreso de subida: ${progress}%`);
        },
      }
    );
    if (res.data.rpta === "1") {
      navigate("/trabajador");
    }
  };
  const initialValues = {
    operacion: "0",
    id_trabajador: "",
    id_tipo_via: "1",
    id_estado_civil: "1",
    id_tipo_trabajador: "1",
    paterno: "TORRES",
    materno: "TORRES",
    nombres: "CLEVER",
    dni: "41249637",
    carne: "",
    pasaporte: "",
    libreta: "",
    sexo: "",
    nacimiento: "1981-01-01",
    lugar: "",
    domicilio: "",
    distrito: "01",
    provincia: "08",
    departamento: "06",
    fijo: "",
    celular: "969886406",
    correo: "clever@gmail.com",
    institucional: "",
    ruc: "",
    essalud: "",
    privada: "",
    publica: "",
    arirhsp: "",
    rdp: "",
    rdl: "",
    sisper: "",
    tregistro: "",
    siga: "",
    essalud: "",
  };

  const validationSchema = Yup.object({
    paterno: Yup.string().required("Requerido"),
    materno: Yup.string().required("Requerido"),
    nombres: Yup.string().required("Requerido"),
    dni: Yup.string()
      .required("Requerido")
      .matches(/^\d{8}$/, "DNI debe tener 8 dígitos"),
    correo: Yup.string()
      .required("Requerido")
      .email("Correo personal inválido"),
    institucional: Yup.string().email("Correo institucional inválido"),
    nacimiento: Yup.date()
      .required("La fecha es obligatoria")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Debes tener al menos 18 años"
      )
      .nullable()
      .transform((value, originalValue) => {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(originalValue)) {
          const [day, month, year] = originalValue.split("/");
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      }),
    celular: Yup.string().required("Requerido"),
    departamento: Yup.string().required("Requerido"),
    provincia: Yup.string().required("Requerido"),
    distrito: Yup.string().required("Requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Guardando...", values);
    },
  });

  return (
    <Dashboard
      componente={
        <TrabajadorForm
          {...formik}
          listadepartamento={listadepartamento}
          listaprovincia={listaprovincia}
          listadistrito={listadistrito}
          listaestadocivil={listaestadocivil}
          listavia={listavia}
          handleInputChangeDNI={(e) => handleInputChangeDNI}
          handleKeyDownDNI={(e) => handleKeyDownDNI}
          // buscar_dni={(e) => buscar_dni}
          get_lista_provincia={(e) => get_lista_provincia}
          get_lista_distrito={(e) => get_lista_provincia}
        />
      }
    />
  );
};

export default TrabajadorRegistrarx;
