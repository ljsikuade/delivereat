import React from "react";

class CurrentOrder extends React.Component {
  constructor() {
    super();
    this.handleCancelOrder = this.handleCancelOrder.bind(this);
  }
  handleCancelOrder() {
    this.props.cancelCurrent();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.orderNameList.map(name => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
        <p>{this.props.orderDate}</p>
        <button onClick={this.handleCancelOrder}>Cancel Order</button>
      </div>
    );
  }
}
export default CurrentOrder;
