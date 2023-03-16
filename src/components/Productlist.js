import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import icon from "../assets/icon_dots.png";
import Dropdown from "react-bootstrap/Dropdown";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import { Link, useNavigate } from "react-router-dom";

const Productlist = (props) => {
  const [page, setPage] = useState(1);
  const [sidebar, setSidebar] = useState(false);

  const togglesidebar = () => {
    setSidebar((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(localStorage.getItem("user"));
  }, []);

  const selectPageHandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= Math.ceil(props.formdata.length / 10) &&
      selectedpage !== page
    ) {
      setPage(selectedpage);
    }
  };

  const handledelete = (id) => {
    var index = props.formdata
      .map((e) => {
        return e.id;
      })
      .indexOf(id);
    navigate("/productlist");

    props.formdata.splice(index, 1);
  };
  console.log(props.formdata);

  return (
    <div className="plcontainer">
      {auth && <Toolbar openSidebar={togglesidebar} />}
      {auth && <Backdrop sidebar={sidebar} closesidebar={togglesidebar} />}
      {auth && <Sidebar sidebar={sidebar} />}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        {props.formdata.slice(page * 10 - 10, page * 10).map((val, i) => {
          return (
            <tbody key={val.id}>
              <tr>
                <td>{val.id}</td>
                <td>
                  <img
                    className="productImg"
                    src={val.variation[0].productImage}
                  />
                  {val.productName}
                </td>
                <td>{val.category}</td>
                <td>${val.variation[0].price}</td>
                <td>{val.variation[0].stock}</td>
                <td>{val.status}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle className="toggle">
                      <img src={icon} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to={"/editproduct/" + val.id}>Edit</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handledelete(val.id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      {props.formdata.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => {
              selectPageHandler(page - 1);
            }}
          >
            ◀
          </span>
          {[...Array(Math.ceil(props.formdata.length / 10))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "paginationselected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => {
              selectPageHandler(page + 1);
            }}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};

export default Productlist;
