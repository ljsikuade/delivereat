import React from "react";
import CurrentOrder from "./CurrentOrder";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      serverResponse: false,
      orderNameList: [],
      orderDate: null,
      superOrderId: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.cancelCurrent = this.cancelCurrent.bind(this);
    this.formatResponse = this.formatResponse.bind(this);
  }
  handleClick(order) {
    this.props.removeOrder(order);
  }
  cancelCurrent(orderId) {
    this.setState({ orderNameList: [], serverResponse: false });
    //Cancel submitted order
    fetch("http://localhost:8080/ammend", {
      method: "DELETE",
      body: JSON.stringify(orderId),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  //Need to give each order a specific overarching ID
  submitOrder() {
    const orderPackage = { [this.state.superOrderId]: this.props.orders };
    if (this.props.orders.length > 0) {
      //Post to server.
      fetch("http://localhost:8080/orders", {
        method: "POST",
        body: JSON.stringify(orderPackage),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          if (response) {
            this.formatResponse(response, this.state.superOrderId);
            this.setState({ superOrderId: this.state.superOrderId + 1 });
          } else {
            console.log("Still not sure how to handle errors.");
          }
        });
    } else {
      alert("You must order something first!");
    }
    //Delete current orders from state.
    this.props.removeOrder({ command: "all" });
  }
  formatResponse(JSONResponse, ID) {
    let date = new Date();
    let today = date.toUTCString();

    console.log(JSONResponse);
    JSONResponse[ID].forEach(order => {
      const orderNameList = this.state.orderNameList;
      orderNameList.push(order.name);
      this.setState({ orderNameList: orderNameList });
    });
    this.setState({ orderDate: today });
    this.setState({ serverResponse: true });
  }
  render() {
    return (
      <div>
        <p>Your Current Order</p>
        <ul>
          {this.props.orders.map(order => {
            return (
              <li key={order.orderId}>
                {order.name}
                <button onClick={event => this.handleClick(order)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        {this.props.orders && (
          <button onClick={this.submitOrder}>Submit Order</button>
        )}
        {this.state.serverResponse && (
          <CurrentOrder
            cancelCurrent={this.cancelCurrent}
            orderNameList={this.state.orderNameList}
            orderDate={this.state.orderDate}
          />
        )}
      </div>
    );
  }
}
export default Orders;
