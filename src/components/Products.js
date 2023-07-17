import React, { Component } from "react";
import axios from "axios";
import "./product.css";
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductList: [],
      Count: 0,
      Expaired: false,
      LowStock: false,
    };
  }
  apiData = () => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((response) => {
        this.setState({
          ProductList: response.data,
          Count: response.data.length,
        });
      });
  };
  componentDidMount() {
    this.apiData();
  }
  render() {
    const handleChange = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          ProductList: this.state.ProductList.filter(
            (product) => new Date(product.expiryDate) >= new Date()
          ),
          Count: this.state.ProductList.length,
        });
      } else {
        this.apiData();
      }

      console.log(value, type, this.state.ProductList);
    };
    const Lowstock = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          ProductList: this.state.ProductList.filter(
            (product) => product.stock >= 100
          ),
          Count: this.state.ProductList.length,
        });
      } else {
        this.apiData();
      }
    };
    return (
      <div className="PageWrapper">
        
        <h1 className="MainHeading">Products</h1>
        <div className="OrdersWrapper">
          <div className="FilterWrapper">
            <h3>Filters</h3>
            <div className="FilterOptions">
              <p className="count">
                Count: <span id="count">{this.state.Count}</span>
              </p>
              <label className="FilterCheckbox">
                <input
                  type="checkbox"
                  name="product-expired"
                  defaultChecked
                  id="expired"
                  
                  onChange={(e) => {
                    handleChange(e.target.checked, "expired");
                  }}
                />
                Expired
              </label>
              <label className="FilterCheckbox">
                <input
                  id="lowStock"
                  type="checkbox"
                  name="product-low-stock"
                  defaultChecked
                  onChange={(e) => {
                    Lowstock(e.target.checked, "Lowstock");
                  }}
                />
                Low Stock
              </label>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <table className="OrderTable">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Brand</th>
                  <th style={{ minWidth: "100px" }}>Expiry Date</th>
                  <th>Unit Price</th>
                  <th>Stock</th>
                </tr>
              </tbody>
              <tbody id="products-data">
                {this.state.ProductList.map((product) => {
                  return (
                    <tr className="TableRow ExpiredRow">
                      <td className="SecondaryText">{product.id}</td>
                      <td className="PrimaryText">{product.medicineName}</td>
                      <td className="SecondaryText">
                        {product.medicineBrand}.
                      </td>
                      <td className="PrimaryText__">{product.expiryDate}</td>
                      <td className="SecondaryText">${product.unitPrice}</td>
                      <td className="SecondaryText">{product.stock}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
