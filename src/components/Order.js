import axios from 'axios';
import React, { Component } from 'react'

export default class Order extends Component {
    constructor(props){
        super(props);
        this.state ={
            OrderList:[],
            Count: 0,
            

        }
    }
    apiData=()=>{
      axios
        .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
        .then((response) => {
          this.setState({
            OrderList: response.data,
            Count: response.data.length,
          });
        });

    }
    componentDidMount(){     
        this.apiData()
        }
    render() {
    const handleChange = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          OrderList: this.state.OrderList.filter(
            (order) =>
              order.orderStatus === "Delivered" ||
              order.orderStatus === "InTransit" ||
              order.orderStatus === "Packed"
          ),
          Count: this.state.OrderList.length,
        });
      } else {
        this.apiData();
      }

      console.log(value,  this.state.OrderList);
    };

    const Packed = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          OrderList: this.state.OrderList.filter(
            (order) =>
              order.orderStatus === "Delivered" ||
              order.orderStatus === "InTransit" ||
              order.orderStatus === "New"
          ),
          Count: this.state.OrderList.length,
        });
      } else {
        this.apiData();
      }

      console.log(value, this.state.OrderList);
    };

    const Intrasnsit = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          OrderList: this.state.OrderList.filter(
            (order) =>
              order.orderStatus === "Delivered" ||
              order.orderStatus === "Packed" ||
              order.orderStatus === "New"
          ),
          Count: this.state.OrderList.length,
        });
      } else {
        this.apiData();
      }

      console.log(value, this.state.OrderList);
    };

    const Delivered = (value, type) => {
      if (!value) {
        this.setState({
          ...this.state,
          OrderList: this.state.OrderList.filter(
            (order) =>
              order.orderStatus === "InTransit" ||
              order.orderStatus === "Packed" ||
              order.orderStatus === "New"
          ),
          Count: this.state.OrderList.length,
        });
      } else {
        this.apiData();
      }

      console.log(value, this.state.OrderList);
    };

    return (
      <div className="PageWrapper">
        <h1 className="MainHeading">Orders</h1>
        <div className="OrdersWrapper">
          <div className="FilterWrapper">
            <h3>Filters</h3>
            <div className="FilterOptions">
              <p className="count">
                Count: <span id="count">{this.state.Count} </span>
              </p>
              <label className="FilterCheckbox">
                <input
                  type="checkbox"
                  id="OrderStatus"
                  name="orders-new"
                  defaultChecked
                  onChange={(e) => {
                    handleChange(e.target.checked, "New");
                  }}
                />
                New
                {console.log(this.state.New)}
              </label>
              <label className="FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-packed"
                  defaultChecked
                  id="Packed"
                  onChange={(e) => {
                    Packed(e.target.checked, "New");
                  }}
                />
                Packed
              </label>
              <label className="FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-transit"
                  defaultChecked
                  id="Intrasnsit"
                  onChange={(e) => {
                    Intrasnsit(e.target.checked, "New");
                  }}
                />
                InTransit
              </label>
              <label className="FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-delivered"
                  defaultChecked
                  id="delivered"
                  onChange={(e)=>{
                    Delivered(e.target.checked, "Delivered");
                  }}
                />
                Delivered
              </label>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <table className="OrderTable">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </tbody>
              <tbody id="orders-data">
                {this.state.OrderList.map((product) => {
                  return (
                    <tr className="TableRow">
                      <td className="SecondaryText">{product.id}</td>
                      <td className="PrimaryText">{product.customerName}</td>
                      <td className="PrimaryText">
                        {product.orderDate} <br />
                        <span className="SecondaryText">
                          {product.orderTime}
                        </span>
                      </td>
                      <td className="SecondaryText">${product.amount}</td>
                      <td className="PrimaryText">{product.orderStatus}</td>
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
