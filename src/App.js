import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    super();
    this.getQuote = this.getQuote.bind(this);
    this.state = {
      quote: "loading...",
      title: "loading...",
      link: null
    };
  }

  getQuote() {
    console.log("Fired function");
    fetch(
      "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
      }
    )
      .then(results => {
        if (results.ok) {
          return results.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
        let res = data[0];
        console.log(res);
        if (res) {
          this.setState({
            quote: res.content,
            title: res.title,
            link: res.link
          });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getQuote();
  }
  render() {
    const { link, quote, title } = this.state;
    return (
      <div className="App">
        <h1>FCC - Random Quote Generator</h1>
        <h5>Created by Dustin Patterson</h5>
        <div key="quote" id="quote-box">
          <div className="card">
            <a href={link} rel="noopener noreferrer" target="_blank">
              <span dangerouslySetInnerHTML={{ __html: quote }} id="text" />
            </a>
            <p id="author"> - {title}</p>
            <a
              href={`https://twitter.com/intent/tweet?text=${quote.replace(
                /<[^>]+>/g,
                ""
              )}%20-%20${title}`}
              id="tweet-quote"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="fab fa-twitter fa-2x" />
            </a>
          </div>
          <button
            type="button"
            onClick={this.getQuote}
            id="new-quote"
            class="btn btn-primary"
          >
            Get new quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
