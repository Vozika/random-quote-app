import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Square from "./components/Square";
import squares from "./components/SquareData";
import buttons from "./components/ButtonData";

function App() {
  const [quote, setQuote] = React.useState({
    text: "",
    author: "",
  });
  const [allQuotes, setAllQuotes] = React.useState([]);
  const [image, setImage] = React.useState(
    "https://source.unsplash.com/random/"
  );
  const [bgColor, setBgColor] = React.useState("qc--black");

  React.useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => setAllQuotes(data));
  }, []);

  React.useEffect(() => {
    allQuotes.length && getQuote();
  }, [allQuotes]);

  function getQuote() {
    const randomNumber = Math.floor(Math.random() * allQuotes.length);
    const text = allQuotes[randomNumber].text;
    const author = allQuotes[randomNumber].author;

    setQuote((prevQuote) => ({
      ...prevQuote,
      text: text,
      author: author,
    }));

    animateImage(document.getElementById("animate-div"));
  }

  function getImage() {
    fetch("https://source.unsplash.com/random/").then((generator) =>
      setImage(generator.url)
    );
    console.log(image);
  }

  function animateImage(imageDiv) {
    console.log(imageDiv);
    imageDiv.className = "animate__animated animate__flipInX animate__faster";
    setTimeout(() => {
      imageDiv.className = "animate__animated";
    }, 500);
  }

  function getAll() {
    getQuote();
    getImage();
  }

  return (
    <main className="App">
      <div className="center--container">
        <Header />

        <div
          className="image--container"
          style={{ backgroundImage: `url(${image})` }}
          onClick={getAll}
          id="capture"
        >
          <div className={`quote--container ${bgColor}`}>
            <h2 id="animate-div">{quote.text}</h2>
            <p>- {quote.author} -</p>
          </div>
        </div>

        <br />

        <div className="rgb--squares">
          {squares.map((square) => {
            console.log(square);
            return (
              <Square
                squarebgcolor={square.bgcolor}
                getbusy={() => setBgColor(square.bgcolor)}
                key={square.id}
              />
            );
          })}
        </div>

        <br />

        <div className="buttons--container">
          <Button text={buttons[0].text} getbusy={getAll} />

          <Button text={buttons[1].text} getbusy={getQuote} />

          <Button text={buttons[2].text} getbusy={getImage} />
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default App;
