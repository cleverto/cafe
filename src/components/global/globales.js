
const isAdmisionBaseUrl =
window.location.origin === "https://escalafon.unj.edu.pe";
const url = isAdmisionBaseUrl ? "https://escalafon.unj.edu.pe/admision/index.php" : "http://localhost:8080/api-cafe";

const globales = {
  nombre:"colibri",
  url: url,
};

export default globales;