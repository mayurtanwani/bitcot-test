// import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import logo from "../assets/Logo.svg";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [match, setMatch] = useState(true);

  async function submitHandler(e) {
    e.preventDefault();
    // await axios
    //   .post("http://localhost:5000/login", formData)
    //   .then((response) => {
    //     if (response.data.token) {
    //       localStorage.setItem("token", response.data.token);
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     setError(true);
    //     setErrorMessage(err.response.data.msg);
    //     console.log(err.response.data.msg);
    //   });
    const data = localStorage.getItem("user");
    const data1 = await JSON.parse(data);
    // console.log(data1.email);
    // console.log(formData.email);
    if (data1.email == formData.email && data1.password == formData.password) {
      navigate("/productlist");
    } else {
      setMatch(false);
      setErrorMessage("password didn't matched");
      setError(true);
    }
  }

  return (
    <div className="container">
      <img className="logo" src={logo} />
      <p>
        Don’t have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
      <Form className="form" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="submitbutton">
          Submit
        </Button>

        {error && (
          <div className="alertdiv">
            <Alert variant="danger">{errorMessage}</Alert>
          </div>
        )}
        {/* {!setMatch && (
          <div className="alertdiv">
            <Alert variant="danger">{errorMessage}</Alert>
          </div>
        )} */}
      </Form>
    </div>
  );
}

export default Login;
