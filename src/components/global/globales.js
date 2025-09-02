const isAdmisionBaseUrl = window.location.hostname === "smartrockola.com";

const url = isAdmisionBaseUrl
  ? "https://smartrockola.com/my-app/api-cafe/index.php"
  : "http://localhost:8080/api-cafe";


const globales = {
  nombre:"colibri",
  url: url,
};

export default globales;