const isAdmisionBaseUrl = window.location.hostname === "smartrockola.com";

const url = isAdmisionBaseUrl
  ? "https://smartrockola.com/my-app/api-cafe/index.php"
  : "http://localhost:8080/api-cafe";

<<<<<<< HEAD
const isAdmisionBaseUrl = window.location.hostname.includes("smartrockola.com");

const url = isAdmisionBaseUrl
  ? "https://smartrockola.com/api-cafe/index.php"
  : "http://localhost:8080/api-cafe";
=======
>>>>>>> d50994e02a05e24201b9bec209bf7e0c315b5231

const globales = {
  nombre:"colibri",
  url: url,
};

export default globales;