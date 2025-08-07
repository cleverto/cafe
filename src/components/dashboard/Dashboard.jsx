import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

import Sidebar from "./Sidebar";
import { useState } from "react";

export const Dashboard = (props) => {
  const [show, setShow] = useState(
    JSON.parse(localStorage.getItem("open-sider"))
  );
  const handle = () => {
    localStorage.setItem("open-sider", JSON.stringify(!show));
    setShow(!show);
  };

  return (
    <div
      className="vh-100"
      style={{ backgroundColor: "#edf2f9", overflow: "auto" }}
    >
      <Sidebar show={show} handle={handle} />
      <main className={show ? "page" : "page2"}>
        <NavBar show={show} handle={handle} />
        <Container style={{ paddingTop: "100px" }} className="vh-100 ">
          {props.componente}
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
