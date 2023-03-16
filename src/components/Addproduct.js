import React, { useEffect, useState } from "react";
import "./Addproduct.css";
import Button from "react-bootstrap/Button";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Addproduct(props) {
  const navigate = useNavigate();
  const [data1, setData1] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    variant1: "",
    price1: "",
    sku1: "",
    variant2: "",
    price2: "",
    sku2: "",
    url1: "",
    url2: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setData1({
      ...data1,
      [e.target.name]: e.target.value,
    });
  }
  const [sidebar, setSidebar] = useState(false);

  const togglesidebar = () => {
    setSidebar((prevState) => !prevState);
  };
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(localStorage.getItem("user"));
  }, []);

  const [toggleState, setToggleState] = useState(1);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const sumbithandler = () => {
    console.log(data1);

    uploadImage();
    uploadImage1();
  };
  const ourobject = {
    category: data1.category,
    description: data1.description,
    id: (props.formdata.length + 1).toString(),
    productName: data1.name,

    variation: [
      {
        variant: data1.variant1,
        productImage: data1.url1,
        price: data1.price1,
        stock: data1.sku1,
      },
      {
        variant: data1.variant2,
        productImage: data1.url2,
        price: data1.price2,
        stock: data1.sku2,
      },
    ],
  };
  console.log(props.formdata);

  const uploadImage = (files) => {
    const formdata1 = new FormData();
    formdata1.append("file", image);
    formdata1.append("upload_preset", "roomhnfr");

    axios
      .post("https://api.cloudinary.com/v1_1/djiqa7z9v/image/upload", formdata1)
      .then(
        (response) => (ourobject.variation[0].productImage = response.data.url)
      );
  };

  const uploadImage1 = (files) => {
    const formdata2 = new FormData();
    formdata2.append("file", image1);
    formdata2.append("upload_preset", "roomhnfr");

    axios
      .post("https://api.cloudinary.com/v1_1/djiqa7z9v/image/upload", formdata2)
      .then((response) => {
        ourobject.variation[1].productImage = response.data.url;
        if (
          ourobject.variation[0].stock == 0 &&
          ourobject.variation[1].stock == 0
        ) {
          ourobject.status = "Out of stock";
        } else {
          ourobject.status = "Limited stock";
        }
        console.log(ourobject);
        if (
          data1.name &&
          data1.description &&
          data1.category &&
          data1.variant1 &&
          data1.price1 &&
          data1.sku1 &&
          data1.variant2 &&
          data1.price2 &&
          data1.sku2 &&
          data1.url1 &&
          data1.url2
        ) {
        } else {
          setError(true);
          setErrorMessage("fill all the fields");
        }
        props.formdata.push(ourobject);
        console.log(props.formdata);
        navigate("/productlist");
      })
      .catch(() => {
        setError(true);
        setErrorMessage("fill all the fields");
      });
  };
  const imagehandler = (e) => {
    uploadImage(e.target.files);
  };

  return (
    <div className="apcontainer">
      {auth && <Toolbar openSidebar={togglesidebar} />}
      {auth && <Backdrop sidebar={sidebar} closesidebar={togglesidebar} />}
      {auth && <Sidebar sidebar={sidebar} />}
      <div>
        <Button
          className="addbutton"
          type="submit"
          variant="primary"
          onClick={sumbithandler}
        >
          Add
        </Button>

        <div className="forms">
          <div className="bloc-tabs">
            <button
              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(1)}
            >
              General
            </button>
            <button
              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => toggleTab(2)}
            >
              Variant
            </button>
          </div>

          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <Form className="nameform">
                <p>Basic info</p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    placeholder="product name"
                    name="name"
                    onChange={handleChange}
                    value={data1.name}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={handleChange}
                    value={data1.description}
                  />
                </Form.Group>
              </Form>
              <Form className="organization">
                <p>Organization</p>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      required
                      placeholder="category"
                      name="category"
                      onChange={handleChange}
                      value={data1.category}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      placeholder="tags"
                      name="tags"
                      onChange={handleChange}
                      value={data1.tags}
                    />
                  </Form.Group>
                </Row>
              </Form>
              {error && (
                <div className="alertdiv">
                  <Alert variant="danger">{errorMessage}</Alert>
                </div>
              )}
            </div>

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <Form className="variant1">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Variant</Form.Label>
                    <Form.Control
                      required
                      placeholder="variant"
                      name="variant1"
                      onChange={handleChange}
                      value={data1.variant1}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      placeholder="price"
                      name="price1"
                      onChange={handleChange}
                      value={data1.price1}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Stock Keeping Unit</Form.Label>
                    <Form.Control
                      required
                      placeholder="stock keeping unit"
                      name="sku1"
                      onChange={handleChange}
                      value={data1.sku1}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Upload</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    size="lg"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                    name="image1"
                  />
                </Form.Group>
              </Form>

              <Form className="variant2">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Variant</Form.Label>
                    <Form.Control
                      required
                      placeholder="variant"
                      name="variant2"
                      onChange={handleChange}
                      value={data1.variant2}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      required
                      placeholder="price"
                      name="price2"
                      onChange={handleChange}
                      value={data1.price2}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Stock Keeping Unit</Form.Label>
                    <Form.Control
                      required
                      placeholder="stock keeping unit"
                      name="sku2"
                      onChange={handleChange}
                      value={data1.sku2}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Upload</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    name="image2"
                    size="lg"
                    onChange={(event) => {
                      setImage1(event.target.files[0]);
                    }}
                  />
                </Form.Group>
              </Form>
              {error && (
                <div className="alertdiv">
                  <Alert variant="danger">{errorMessage}</Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproduct;
