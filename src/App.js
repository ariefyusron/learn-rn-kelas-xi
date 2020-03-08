import React, { Component } from "react";

import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      text: "ini text",
      isLoading: true
    };
  }

  componentDidMount() {}

  render() {
    console.log("ini render");
    return (
      <div>
        <Header title="Header" />
        <p>{this.state.isLoading ? "Loading ..." : this.state.text}</p>
      </div>
    );
  }
}

export default App;
