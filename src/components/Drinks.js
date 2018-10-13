import React from "react";

class Drinks extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props.drinks);
    return (
      <ul>
        {this.props.drinks.map(drink => {
          return (
            <li key={drink.name}>
              <p>{drink.name}</p>
              <img src={drink.image} />
            </li>
          );
        })}
      </ul>
    );
  }
}
export default Drinks;
