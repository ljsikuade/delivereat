import React from "react";
import Mains from "./Mains";
import Desserts from "./Desserts";
import Drinks from "./Drinks";

function Menu({ menu, addToOrder }) {
  console.log(menu.mains);
  return (
    <div>
      <Mains mains={menu.mains} addToOrder={addToOrder} />
      <Desserts desserts={menu.desserts} addToOrder={addToOrder} />
      <Drinks drinks={menu.drinks} addToOrder={addToOrder} />
    </div>
  );
}

export default Menu;
