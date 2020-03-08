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
      isErrorList: false,
      title: "",
      body: "",
      isLoadingSubmit: false
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
      .get("https://jsonplaceholder.typicode.com/posts")
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

  handleSubmit() {
    this.setState({ isLoadingSubmit: true });
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: this.state.title,
        body: this.state.body,
        userId: 1
      })
      .then(res => {
        this.setState({
          isLoadingSubmit: false,
          list: [res.data, ...this.state.list],
          body: "",
          title: ""
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoadingSubmit: false });
      });
  }

  render() {
    return (
      <div>
        <Header title={this.titleHeader()} />

        <div>
          <input
            placeholder="title"
            type="text"
            onChange={res => {
              this.setState({ title: res.target.value });
            }}
            value={this.state.title}
          />
          <input
            placeholder="body"
            type="text"
            onChange={res => {
              this.setState({ body: res.target.value });
            }}
            value={this.state.body}
          />
          <button onClick={() => this.handleSubmit()}>
            {this.state.isLoadingSubmit ? "Loading" : "Add"}
          </button>
        </div>

        {this.state.isLoadingList ? (
          <p>Loading</p>
        ) : (
          this.state.list.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.userId}</p>
                <p>{item.title}</p>
                <p>{item.body}</p>
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
