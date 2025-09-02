
const isAdmisionBaseUrl = window.location.hostname.includes("smartrockola.com");

const url = isAdmisionBaseUrl
  ? "https://smartrockola.com/api-cafe/index.php"
  : "http://localhost:8080/api-cafe";

const globales = {
  nombre:"colibri",
  url: url,
};

export default globales;