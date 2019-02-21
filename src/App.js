import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.getQuote = this.getQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      quote: null
    };
  }
  handleClick() {
    this.getQuote();
  }
  getQuote() {
    fetch(
      "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        let res = data[0];
        let quote = (
          <div key="quote" id="quote-box">
            <a href={res.link} rel="noopener noreferrer" target="_blank">
              <span
                dangerouslySetInnerHTML={{ __html: res.content }}
                id="text"
              />
              <p id="author">{res.title}</p>
            </a>
            <button type="button" onClick={this.handleClick} id="new-quote">
              Get new quote
            </button>
            <a
              href="https://twitter.com/intent/tweet"
              id="tweet-quote"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tweet this quote
            </a>
          </div>
        );
        this.setState({ quote: quote });
      });
  }
  componentDidMount() {
    this.getQuote();
  }
  render() {
    return (
      <div className="App">
        <h1>FCC - Random Quote Generator</h1>
        <h5>Created by Dustin Patterson</h5>
        {this.state.quote}
      </div>
    );
  }
}

export default App;
