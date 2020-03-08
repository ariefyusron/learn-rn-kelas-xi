import React, { Component } from "react";
import axios from "axios";

import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingHeader: true,
      dataHeader: {},
      isErrorHeader: false,
      isLoadingList: true,
      list: [],
      isErrorList: false
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => {
        console.log(res.data);
        this.setState({ dataHeader: res.data, isLoadingHeader: false });
      })
      .catch(err => {
        this.setState({ isLoadingHeader: false, isErrorHeader: true });
      });

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        console.log(res.data);
        this.setState({ isLoadingList: false, list: res.data });
      })
      .catch(err => {
        this.setState({ isLoadingList: false, isErrorList: true });
      });
  }

  titleHeader() {
    let result = "";
    if (this.state.isLoadingHeader) {
      result = "Loading..";
    } else if (this.state.isErrorHeader) {
      result = "Error";
    } else {
      result = this.state.dataHeader.title;
    }

    return result;
  }

  render() {
    return (
      <div>
        <Header title={this.titleHeader()} />
        {this.state.isLoadingList ? (
          <p>Loading</p>
        ) : (
          this.state.list.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.name}</p>
                <p>{item.username}</p>
                <p>{item.email}</p>
                <p>----------------------</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default App;
