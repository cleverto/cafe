import "./App.css";
import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/dashboard/Home";

import Producto from "./components/administracion/Producto";
import Proveedor from "./components/administracion/Proveedor";

import CompraRegistrar from "./components/proceso/CompraRegistrar";
import CompraBuscar from "./components/proceso/CompraBuscar";

import CreditoPagar from "./components/proceso/CreditoPagar";

import Caja from "./components/proceso/Caja";

//Almacen
import AlmacenRegistrar from "./components/proceso/AlmacenRegistrar";
import AlmacenBuscar from "./components/proceso/AlmacenBuscar";
//Secado
import SecadoRegistrar from "./components/proceso/SecadoRegistrar";
import SecadoBuscar from "./components/proceso/SecadoBuscar";
import SecadoRetornoRegistrar from "./components/proceso/SecadoRetornoRegistrar";
//Proceso
import ProcesoRegistrar from "./components/proceso/ProcesoRegistrar";
import ProcesoBuscar from "./components/proceso/ProcesoBuscar";
import ProcesoRetornoRegistrar from "./components/proceso/ProcesoRetornoRegistrar";
//Venta
import VentaRegistrar from "./components/proceso/VentaRegistrar";
import VentaBuscar from "./components/proceso/VentaBuscar";
//reportes
import ReporteComprasFiltro from "./components/reporte/ComprasFiltro";
import ReporteCompras from "./components/reporte/Compras";
import ReporteAlmacenFiltro from "./components/reporte/AlmacenFiltro";
import ReporteAlmacen from "./components/reporte/Almacen";
import ReporteComprasSecadoFiltro from "./components/reporte/ComprasSecadoFiltro";
import ReporteComprasSecado from "./components/reporte/ComprasSecado";



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
          <Route path="/proceso/compra/buscar" element={<CompraBuscar />} />
          {/* Proceso credito*/}
          <Route path="/proceso/compra/pagar" element={<CreditoPagar />} />
          {/* Proceso caja*/}
          <Route path="/proceso/caja" element={<Caja />} />
          {/* Proceso almacen*/}
          <Route path="/proceso/almacen" element={<AlmacenRegistrar />} />
          <Route path="/proceso/almacen/buscar" element={<AlmacenBuscar />} />
          {/* Proceso secado */}
          <Route path="/proceso/secado" element={<SecadoRegistrar />} />
          <Route path="/proceso/secado/buscar" element={<SecadoBuscar />} />
          <Route path="/proceso/secado/retorno" element={<SecadoRetornoRegistrar />} />
          {/* Proceso procesar */}
          <Route path="/proceso/procesar" element={<ProcesoRegistrar />} />
          <Route path="/proceso/procesar/buscar" element={<ProcesoBuscar />} />
          <Route path="/proceso/procesar/retorno" element={<ProcesoRetornoRegistrar />} />
          {/* Proceso venta */}
          <Route path="/proceso/venta" element={<VentaRegistrar />} />
          <Route path="/proceso/venta/buscar" element={<VentaBuscar />} />      

          {/* Reporte */}

          <Route
            path="/reporte/comprasbuscar"
            element={<ReporteComprasFiltro />}
          />

          <Route
            path="/reporte/almacenbuscar"
            element={<ReporteAlmacenFiltro />}
          />
          <Route
            path="/reporte/compras_secado_buscar"
            element={<ReporteComprasSecadoFiltro />}
          />
          <Route path="/reporte/almacen" element={<ReporteAlmacen />} />
          <Route path="/reporte/compras" element={<ReporteCompras />} />
          <Route
            path="/reporte/compras_secado"
            element={<ReporteComprasSecado />}
          />



          <Route path="/cambiar" element={<CambiarContrasena />} />
          <Route path="/configuracion/usuario" element={<Usuario />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;
