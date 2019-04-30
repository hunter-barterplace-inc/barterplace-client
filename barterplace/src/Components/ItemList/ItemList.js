import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import ItemCard from "./ItemCard/ItemCard";
import "./ItemList.css";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = { items: [] };
  }

  componentWillReceiveProps(nextProps) {
    let render = "list";
    if (nextProps.renderList === "AllItems") {
      render = "list";
    } else if (nextProps.renderList === "MyList") {
      render = "list/user";
    } else if (nextProps.renderList === "WishList") {
      //Backend isnt working for this at the moment
      //render = "/favorite";
    }
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }
    fetch(`https://hunterbarter.herokuapp.com/${render}`, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        let newResponse = response.map(item => {
          let image = new Image();
          image.src = "data:image/jpeg;base64," + item.picture.$binary;
          let date = new Date(item.dateAdded.$date);
          date = date.toLocaleDateString();
          return {
            name: item.item,
            description: item.description,
            username: item.username,
            date: date,
            image: image,
            category: item.category,
            condition: item.condition
          };
        });
        this.setState({ items: newResponse });
      });
    this.setState({ state: this.state });
  }

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="ItemList">
        <div className="List">
          {this.state.items.map((item, index) => (
            <div key={index} className="itemCard">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AddItem;
