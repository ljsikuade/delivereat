import React from "react";

class Mains extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(foodItem) {
    this.props.addToOrder(foodItem);
  }
  render() {
    console.log(this.props.mains);
    return (
      <ul>
        {this.props.mains.map(main => {
          return (
            <li key={main.name}>
              <p>{main.name}</p>
              <img src={main.image} />
              <button onClick={event => this.handleClick(main)}>
                Add to Order
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default Mains;
