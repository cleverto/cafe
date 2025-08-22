import "./App.css";
import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/dashboard/Home";

import Producto from "./components/administracion/Producto";
import Proveedor from "./components/administracion/Proveedor";

import CompraRegistrar from "./components/proceso/CompraRegistrar";

import CreditoPagar from "./components/proceso/CreditoPagar";





import Trabajador from "./components/trabajador/Trabajador";

import TrabajadorRegistrar from "./components/trabajador/TrabajadorRegistrar";
import TrabajadorHijos from "./components/trabajador/TrabajadorHijos";
import TrabajadorPension from "./components/trabajador/TrabajadorPension";
import TrabajadorFamiliar from "./components/trabajador/TrabajadorFamiliar";
import TrabajadorCuenta from "./components/trabajador/TrabajadorCuenta";
import TrabajadorAcademico from "./components/trabajador/TrabajadorAcademico";
import TrabajadorVinculo from "./components/trabajador/TrabajadorVinculo";
import TrabajadorVinculoDocente from "./components/trabajador/TrabajadorVinculoDocente";
import TrabajadorAdjunto from "./components/trabajador/TrabajadorAdjunto";
import TrabajadorBuscar from "./components/trabajador/TrabajadorBuscar";

import DocenteAdjuntar from "./components/ficha/DocenteAdjuntar";
import DocenteVinculo from "./components/ficha/DocenteVinculo";
import DocenteEducacion from "./components/ficha/DocenteEducacion";
import DocenteFormacion from "./components/ficha/DocenteFormacion";
import DocenteOtros from "./components/ficha/DocenteOtros";
import DocenteMain from "./components/ficha/DocenteMain";
import FichaDocente from "./components/ficha/Docente";
import FichaJudicial from "./components/ficha/Judicial";
import FichaCas from "./components/ficha/Cas";

import Designacion from "./components/trabajador/Designacion";
import DesignacionRegistrar from "./components/trabajador/DesignacionRegistrar";
import Rotacion from "./components/trabajador/Rotacion";
import RotacionRegistrar from "./components/trabajador/RotacionRegistrar";

import Adm from "./components/administracion/Adm";




import CambiarContrasena from "./components/configuracion/CambiarConstrasena";
import Usuario from "./components/configuracion/Usuario";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* Administracion */}
          <Route path="/administracion/producto" element={<Producto />} />
          <Route path="/administracion/proveedor" element={<Proveedor />} />

          {/* Proceso compra */}
          <Route path="/proceso/compra" element={<CompraRegistrar />} />
          {/* Proceso credito*/}
          <Route path="/proceso/compra/pagar" element={<CreditoPagar />} />





          {/* Reporte */}

          <Route path="/trabajador" element={<Trabajador />} />

          <Route path="/trabajador/nuevo" element={<TrabajadorRegistrar />} />
          <Route
            path="/trabajador/modificar"
            element={<TrabajadorRegistrar />}
          />
          <Route path="/trabajador_hijos" element={<TrabajadorHijos />} />
          <Route path="/Trabajador_pension" element={<TrabajadorPension />} />
          <Route path="/trabajador_familiar" element={<TrabajadorFamiliar />} />
          <Route path="/trabajador_cuenta" element={<TrabajadorCuenta />} />
          <Route path="/trabajador_buscar" element={<TrabajadorBuscar />} />
          <Route
            path="/trabajador_academico"
            element={<TrabajadorAcademico />}
          />
          <Route path="/trabajador_vinculo" element={<TrabajadorVinculo />} />
          <Route
            path="/trabajador_vinculo_docente"
            element={<TrabajadorVinculoDocente />}
          />
          <Route path="/trabajador_adjunto" element={<TrabajadorAdjunto />} />

          <Route path="/docente_vinculo" element={<DocenteVinculo />} />
          <Route path="/docente_adjuntar" element={<DocenteAdjuntar />} />
          <Route path="/docente_educacion" element={<DocenteEducacion />} />
          <Route path="/docente_formacion" element={<DocenteFormacion />} />
          <Route path="/docente_otros" element={<DocenteOtros />} />
          <Route path="/docente_main" element={<DocenteMain />} />
          <Route path="/docente" element={<FichaDocente />} />
          <Route path="/judicial" element={<FichaJudicial />} />
          <Route path="/cas" element={<FichaCas />} />

          <Route path="/administracion/cargo" element={<Adm />} />
          <Route path="/administracion/carrera" element={<Adm />} />
          <Route path="/administracion/condicion" element={<Adm />} />
          <Route path="/administracion/dedicacion" element={<Adm />} />
          <Route
            path="/administracion/departamento_academico"
            element={<Adm />}
          />
          <Route path="/administracion/estado_civil" element={<Adm />} />
          <Route path="/administracion/grado" element={<Adm />} />
          <Route path="/administracion/institucion" element={<Adm />} />
          <Route path="/administracion/pension" element={<Adm />} />
          <Route path="/administracion/regimen" element={<Adm />} />
          <Route path="/administracion/requisito" element={<Adm />} />
          <Route path="/administracion/tipo_contrato" element={<Adm />} />
          <Route path="/administracion/tipo_remuneracion" element={<Adm />} />
          <Route path="/administracion/tipo_resolucion" element={<Adm />} />
          <Route path="/administracion/tipo_trabajador" element={<Adm />} />
          <Route path="/administracion/tipo_via" element={<Adm />} />

          <Route path="/designacion" element={<Designacion />} />
          <Route path="/designacion/nuevo" element={<DesignacionRegistrar />} />
          <Route
            path="/designacion/editar"
            element={<DesignacionRegistrar />}
          />
          <Route path="/rotacion" element={<Rotacion />} />
          <Route path="/rotacion/nuevo" element={<RotacionRegistrar />} />
          <Route path="/rotacion/editar" element={<RotacionRegistrar />} />





          <Route path="/cambiar" element={<CambiarContrasena />} />
          <Route path="/configuracion/usuario" element={<Usuario />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;
