import React from "react";
import Orders from "./Orders";
import History from "./History";

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = { showOrderTab: false, showHistoryTab: false };
    this.handleOrders = this.handleOrders.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
  }
  handleHistory() {
    this.setState({ showHistoryTab: !this.state.showHistoryTab });
  }
  handleOrders() {
    this.setState({ showOrderTab: !this.state.showOrderTab });
  }
  render() {
    return (
      <div>
        <ul>
          <li onClick={this.handleHistory}>Order History</li>
          <li>Contact</li>
          <li onClick={this.handleOrders}>Orders</li>
        </ul>

        {this.state.showOrderTab && (
          <Orders
            orders={this.props.orders}
            removeOrder={this.props.removeOrder}
          />
        )}
        {this.state.showHistoryTab && <History />}
      </div>
    );
  }
}
export default Navigation;
