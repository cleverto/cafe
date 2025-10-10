import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "../dashboard/Dashboard";
import Proceso from "./Proceso";

const ProcesoRegistrar = (props) => {
  const [idmodulo, setIdmodulo] = useState("");
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState("0");
  const [totalActivos, setTotalActivos] = useState(0.0);
  const [totalQQ, setTotalQQ] = useState(0);


  useEffect(() => {
    get_lista(idmodulo);

    // eslint-disable-next-line
  }, []);


  const get_lista = async (id) => {
    let _datos = JSON.stringify({
      id: id,
    });
    const res = await Axios.post(window.globales.url + "/proceso/lista", _datos);

    setRowData(res.data.items);
    formik.setFieldValue("operacion", "1");
    setTotal(res.data.total);
  };




  
  const handleToggleActivo = (row) => {
    const newData = rowData.map((item) =>
      String(item.id_compra) === String(row.id_compra)
        ? { ...item, activo: item.activo === "1" ? "0" : "1" }
        : item
    );

    setRowData(newData);

    setTotalActivos(
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







  const updateRowData = (data) => {
    setRowData(data);
  };
  const initialValues = {
  };
  const validationSchema = Yup.object({

  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    // onSubmit: (values, { resetForm }) => {
    //   // guardar(values);
    //   // resetForm();
    // },
  });

  return (
    <Dashboard
      componente={
        <Proceso
          {...formik}
          rowData={rowData}
          updateRowData={updateRowData}
          handleToggleActivo={handleToggleActivo}
          total={total}
          totalQQ={totalQQ}
          totalActivos={totalActivos}
        />
      }
    />
  );
};

export default ProcesoRegistrar;

