import React, { Component } from "react";
export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
    };

    this.fetchQuotes = this.fetchQuotes.bind(this);
  }

  componentDidMount() {
    this.fetchQuotes();
  }
  fetchQuotes() {
    fetch("https://type.fit/api/quotes")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const quote = data.map((res) => {
          //console.log(res);
        });
        this.setState({ quote: data[0].text, author: data[0].author });

        console.log("qotes" + this.state.quote);
      });
  }
  render() {
    return (
      <div id="quote-box">
        <p id="text">{this.state.quote}</p>
        <span id="author">{this.state.author}</span>
        <br />
        <button id="new-quote" onClick={this.fetchQuotes}>
          New Quote
        </button>
        <a id="tweet-quote" href="#" />
      </div>
    );
  }
}
