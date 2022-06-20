import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";

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

  const buttons = [
    {
      id: 1,
      text: "More Wisdom",
    },
    {
      id: 2,
      text: "Change the Quote",
    },
    {
      id: 3,
      text: "Change the Image",
    },
  ];

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

    animateImage(document.getElementById("image-div"));
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
    <div className="App">
      <div className="center--con">
        <Header />
        <div
          className="container"
          style={{ backgroundImage: `url(${image})` }}
          onClick={getAll}
        >
          <div className={`quote--container ${bgColor}`}>
            <h2 id="image-div">{quote.text}</h2>
            <p>- {quote.author} -</p>
          </div>
        </div>
        <br />
        <Button text={buttons[0].text} getbusy={getAll} />
        <br />
        <Button text={buttons[1].text} getbusy={getQuote} />
        <br />
        <Button text={buttons[2].text} getbusy={getImage} />
        <br />
        <div className="rgb--squares">
          <div
            className="square qc--black"
            onClick={() => setBgColor("qc--black")}
          ></div>
          <div
            className="square qc--red"
            onClick={() => setBgColor("qc--red")}
          ></div>
          <div
            className="square qc--blue"
            onClick={() => setBgColor("qc--blue")}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
