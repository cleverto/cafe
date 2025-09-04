import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import ProductoForm from "./ProductoForm";

const ProductoRegistrar = (props) => {
  const [listaCategoria, setListaCategoria] = useState([]);

  useEffect(() => {
    if (props.idmodulo) {
      modulo(props.idmodulo);
    }
    // eslint-disable-next-line
  }, [props.idmodulo]);

  useEffect(() => {
    get_lista_categoria();

    // eslint-disable-next-line
  }, []);

  const get_lista_categoria = async () => {
    try {
      let _datos = JSON.stringify({
        modulo: "categoria",
      });
      const res = await Axios.post(
        window.globales.url + "/administracion/lista",
        _datos
      );

      setListaCategoria(res.data.items);
      formik.setFieldValue("id_categoria", res.data.items[0].id);
    } catch (error) {
      console.error("Error lista", error);
      setListaCategoria([]);
    }
  };

  const modulo = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    await Axios.post(window.globales.url + "/producto/modulo", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("operacion", "1");
          formik.setFieldValue("producto", res.data.items.producto);
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

    await Axios.post(window.globales.url + "/producto/guardar", _datos)
      .then((res) => {
        if (res.data.rpta === "1") {
          formik.setFieldValue("foco", "1");
          const obj = {
            id_producto: data.operacion === "0" ? res.data.id : data.idmodulo,
            producto: data.producto,
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
    id_categoria: "",
    producto: "",
    foco: "0",
  };

  const validationSchema = Yup.object({
    producto: Yup.string().required("Requerido"),
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

  return <ProductoForm {...formik} listaCategoria={listaCategoria} />;
};

export default ProductoRegistrar;
