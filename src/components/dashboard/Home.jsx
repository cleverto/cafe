import { useEffect } from "react";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";

const Home = () => {
  useEffect(() => {
    verifica_token();
    //eslint-disable-next-line
  }, []);

  const verifica_token = () => {
    const logged = window.localStorage.getItem("loggedEscalafon");

    if (!logged) {
      window.location.href = "#/login";
    }
  };

  const componente2 = <Container fluid>hola amigos</Container>;
  return (
    <>
      <Dashboard componente={componente2} />
    </>
  );
};

export default Home;
