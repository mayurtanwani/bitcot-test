import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar }) => {
  return (
    <div className={sidebar ? "sidebar sidebaropen" : "sidebar"}>
      <Dropdown className="dropdown">
        <Dropdown.Toggle className="dropdowntitle">ecommerce</Dropdown.Toggle>

        <Dropdown.Menu className="dropdownmenu">
          <Dropdown.Item className="dropdownitem">
            <Link to="/productlist">Product list</Link>
          </Dropdown.Item>
          <Dropdown.Item className="dropdownitem">
            <Link to="/addproduct">Add product</Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
