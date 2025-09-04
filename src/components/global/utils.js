export const abrirReporte = (url) => {
    const width = 1050// window.innerWidth * 0.5;
    const height = 850 // window.innerHeight * 1;
  
    // Calcular posición para centrar la ventana
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2
  
    window.open(
      url,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };
  export const convertirFechaEnPalabras = (fecha) => {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const diasSemana = [
      "domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"
    ];
  
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.toLocaleString('es-ES', { day: '2-digit' }); 
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
  
    return `${diaSemana} ${dia} de ${mes} de ${año}`;
  };