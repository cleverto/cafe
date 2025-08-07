
const isAdmisionBaseUrl =
window.location.origin === "https://escalafon.unj.edu.pe";
const url = isAdmisionBaseUrl ? "https://escalafon.unj.edu.pe/admision/index.php" : "http://10.10.116.14:8080/escalafon";

const globales = {
  nombre:"escalafon",
  url: url,
};

export default globales;