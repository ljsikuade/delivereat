import React from "react";

class History extends React.Component {
  constructor() {
    super();
    this.state = { body: null, keys: [], currentKey: null };
    this.storeInState = this.storeInState.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:8080/history")
      .then(res => res.json())
      .then(body => this.storeInState(body));
  }

  storeInState(body) {
    let keys = body.map(orderCase => Object.keys(orderCase));
    this.setState({ keys: keys });
    this.setState({ body: body }, () => console.log(body));
  }
  //[{"0":[{"name":"Actual Kidney (Beans) Stew","price":3,"image":"static/kidney_stew.jpg","orderId":0},{"name":"Hotdog Horror","price":4,"image":"static/hotdog.jpg","orderId":1}]}]
  render() {
    if (this.state.body) {
      return (
        <div>
          <ul>
            {this.state.body.map(order => {
              //For each key in state get me the matching child array.
              return this.state.keys
                .map(key => order[key])
                .map(actualOrderObject => {
                  //actualOrderObject = [{…}, {…}]
                  return (
                    <li key={actualOrderObject.orderId}>
                      {actualOrderObject.name}
                      {actualOrderObject.price}
                    </li>
                  );
                });
            })}
          </ul>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}
export default History;
