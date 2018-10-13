import React from "react";

class Desserts extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.desserts);
    return (
      <ul>
        {this.props.desserts.map(des => {
          return (
            <li key={des.name}>
              <p>{des.name}</p>
              <img src={des.image} />
            </li>
          );
        })}
      </ul>
    );
  }
}
export default Desserts;
