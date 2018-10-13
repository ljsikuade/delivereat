import React from "react";
import "../styles/App.scss";
import Navigation from "./Navigation";
import Menu from "./Menu";
import Footer from "./Footer";

class App extends React.Component {
  constructor() {
    super();
    this.state = { menu: null, orders: [], orderId: 0 };
    this.addToOrder = this.addToOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:8080/menu")
      .then(response => response.json())
      .then(body => {
        console.log(body);
        this.setState({ menu: body });
      });
  }
  //foodItem: {id: 1, name: "food", image: "src" }
  addToOrder(foodItem) {
    //Give each item an order id.
    const id = this.state.orderId;
    foodItem.orderId = id;
    this.setState({ orderId: this.state.orderId + 1 });

    const orders = this.state.orders;
    orders.push(foodItem);
    this.setState({ orders: orders });
  }

  removeOrder(removeOrder) {
    const orders = this.state.orders;
    //New array with all the orders that don't have the order id.
    const filteredOrderArray = orders.filter(
      order => order.orderId != removeOrder.orderId
    );
    this.setState({ orders: filteredOrderArray });

    //If told to delete all orders from state.
    if (removeOrder.command === "all") {
      this.setState({ orders: [] });
    }
  }

  render() {
    if (!this.state.menu) {
      console.log(this.state.menu);
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <Navigation
            orders={this.state.orders}
            removeOrder={this.removeOrder}
          />
          <Menu menu={this.state.menu} addToOrder={this.addToOrder} />
          <Footer />
        </div>
      );
    }
  }
}

export default App;
