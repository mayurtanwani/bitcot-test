import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import "./Signup.css";
import Alert from "react-bootstrap/Alert";

function Signup() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    // await axios
    //   .post("http://localhost:5000/register", formData)
    //   .then((response) => {
    //     console.log(response.data);
    //     setAlert(false);
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     setAlert(true);
    //     setAlertData(err.response.data.msg);
    //   });
    if (formData.password == formData.confirmpassword) {
      localStorage.setItem("user", JSON.stringify(formData));
      navigate("/");
    } else {
      setError(true);
      setErrorMessage("password and confirm password didn't match");
    }
  }

  return (
    <div className="container">
      <img className="logo" src={logo} />
      <p>Create an account</p>
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={handleChange}
            value={formData.confirmpassword}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submitbutton">
          Submit
        </Button>
        <p>
          <Link to="/">Already have account</Link>
        </p>
        {error && (
          <div className="alertdiv">
            <Alert variant="danger">{errorMessage}</Alert>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Signup;
