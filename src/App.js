import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Productlist from "./components/Productlist";
import axios from "axios";
import Editproduct from "./components/Editproduct";

import { useEffect, useState } from "react";
import Addproduct from "./components/Addproduct";

function App() {
  const [formdata, setFormData] = useState([]);

  const loadData = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/abdulbitcot/React-Coding-Challenge-Experience/main/sample.json"
      )
      .then((res) => setFormData(res.data))
      .catch((error) => {
        console.log(error);
      });
  };
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    loadData();
    setAuth(localStorage.getItem("user"));
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        {/*  */}

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              exact
              path="/productlist"
              element={
                <Productlist formdata={formdata} setFormData={setFormData} />
              }
            ></Route>
            <Route
              exact
              path="/addproduct"
              element={
                <Addproduct formdata={formdata} setFormData={setFormData} />
              }
            ></Route>
            <Route
              exact
              path="/editproduct/:id"
              element={
                <Editproduct formdata={formdata} setFormData={setFormData} />
              }
            ></Route>
          </Route>

          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
