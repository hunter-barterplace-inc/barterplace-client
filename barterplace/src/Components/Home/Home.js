import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import SearchBar from "../SearchBar/SearchBar";
import { Button } from "@material-ui/core";

import logo from "./hunter-college-logo.png";
import "./Home.css";
//import Navbar from "../Navbar/Navbar";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      addItemModal: false,
      showProfile: false,
      //by default render all items. dont know if you wanna make it have a
      //different behavior
      renderList: "Items"
    };
  }

  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    //console.log(auth);
    if (auth !== null) {
      this.setState({
        isAuthenticated: true
      });

      fetch(`https://hunterbarter.herokuapp.com/user`, {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      })
        .then(response => response.json())
        .then(user => sessionStorage.setItem("user", user.username));
    }
  }
  rerender = () => {
    this.setState({
      renderList: this.state.renderList
    });
  };
  signOut = () => {
    this.setState({
      state: this.state
    });
  };
  toggleProfile = () => {
    this.setState({
      showProfile: !this.state.showProfile
    });
  };
  toggleAddItemModal = () => {
    this.setState({
      addItemModal: !this.state.addItemModal
    });
  };
  renderWishList = () => {
    this.setState({
      renderList: "WishList"
    });
  };
  renderMyList = () => {
    this.setState({
      renderList: "List"
    });
  };
  renderAllItems = () => {
    this.setState({
      renderList: "Items"
    });
  };

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="Home">
        <Navigation signOut={this.signOut} />
        <img src={logo} width="20%" alt="hunter" />
        <h1 id="banner">Hunter Barter App</h1>

        <Modal open={this.state.addItemModal} onClose={this.toggleAddItemModal}>
          <DialogContent>
            <AddItem close={this.toggleAddItemModal} />
          </DialogContent>
        </Modal>
        <Modal open={this.state.showProfile} onClose={this.toggleProfile}>
          <DialogContent>
            <AddItem close={this.toggleProfile} />
          </DialogContent>
        </Modal>
        <div className="buttonGroup">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.toggleAddItemModal}
          >
            Add Item
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderAllItems}
          >
            All Items
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderMyList}
          >
            My Items
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderWishList}
          >
            Wishlist
          </Button>
        </div>
        <SearchBar />

        <ItemList renderList={this.state.renderList} rerender={this.rerender} />
      </div>
    );
  }
}

export default Home;
