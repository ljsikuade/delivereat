const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

let orders = [];
//To be filled.
const orderControl = {
  addToOrder: function(order) {
    orders.push(order);
  },
  cancelOrder: function(order) {
    //Placeholder, it's probs better to remove by id
    orders.pop(order);
  },
  getOrders: function() {
    return orders;
  }
};

const menu = {
  mains: [
    {
      name: "Actual Kidney (Beans) Stew",
      price: 3,
      image: "static/kidney_stew.jpg"
    },
    {
      name: "Hotdog Horror",
      price: 4,
      image: "static/hotdog.jpg"
    },
    {
      name: "Creepy Calimari",
      price: 6,
      image: "static/squid.jpg"
    },
    {
      name: "Ghastly Goulash",
      price: 6,
      image: "static/goulash.jpg"
    },
    {
      id: 5,
      name: "Haunted Ham and Cheddar Ploughmans",
      price: 4,
      image: "static/ham.jpg"
    },
    {
      name: "Undead Udon",
      price: 5,
      image: "static/udon.jpg"
    },
    {
      name: "Killer Kale Salad",
      price: 20,
      image: "static/kale.jpg"
    }
  ],
  desserts: [
    {
      name: "Spooky ShortBread Platter",
      price: 5,
      image: "static/shortbread.jpg"
    },
    {
      name: "Terrifying Treacle Tart",
      price: 6,
      image: "static/tart.jpg"
    },
    {
      name: "Dead and Butter Pudding",
      price: 4,
      image: "static/bread.jpg"
    },
    {
      name: "Monstrous Molten Chocolate Cake",
      price: 6,
      image: "static/molten.jpg"
    }
  ],
  drinks: [
    {
      name: "Bloody Mary",
      price: 7,
      image: "static/bloody.jpg"
    },
    {
      name: "Blood Red Wine (glass)",
      price: 8,
      image: "static/wine.jpg"
    },
    {
      name: "Axeman's Ale",
      image: "static/beer.jpg"
    }
  ]
};
//req.body: [{0: 0:{id: 1, name: x, price: 7, image: y, orderID: 4}, 1:{id: 1, name: z;dk, price: 7, image: y, orderID: 4}}]
app.post("/orders", (req, res) => {
  //Array > object, store object in order array.
  orderControl.addToOrder(req.body);
  //Respond with the array as a JSON string.
  res.json(req.body);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.json(menu);
});
app.get("/history", (req, res) => {
  const ord = orderControl.getOrders();
  console.log(ord);
  res.json(ord);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
