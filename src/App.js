import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure to create this CSS file for font and style changes

const App = () => {
  const question = "What kind of bands does a programmer listen to?";
  const answers = ["Perl Jam", "Fleetwood PC", "Depeche Code"];
  const imageMap = {
    "Perl Jam":
      "https://www.udiscovermusic.com/wp-content/uploads/2020/10/Pearl-Jam-GettyImages-86111976.jpg",
    "Fleetwood PC":
      "https://i.guim.co.uk/img/media/9d18a7f8c72057d58ee94cb7c586c30fef47e683/0_122_3004_1802/master/3004.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=cad377b4c2f655f11088f197742a1582",
    "Depeche Code":
      "https://nbhap.com/wp-content/uploads/2020/11/Depeche-Mode-1990s.jpg",
  };

  const toUnicodeValues = (str) => {
    return str
      .split("")
      .map((char) => `U+${char.charCodeAt(0).toString(16).toUpperCase()}`)
      .join(" ");
  };

  const getRandomAnswer = () => {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
  };

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [unicodeAnswer, setUnicodeAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showKeepTrying, setShowKeepTrying] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [randomImageUrl, setRandomImageUrl] = useState("");

  useEffect(() => {
    const answer = getRandomAnswer();
    const unicode = toUnicodeValues(answer);
    const imageUrl = imageMap[answer];
    setSelectedAnswer(answer);
    setUnicodeAnswer(unicode);
    setRandomImageUrl(imageUrl);
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (checkAnswer()) {
      setShowCorrect(true);
      setShowKeepTrying(false);
    } else {
      setShowKeepTrying(true);
      setShowCorrect(false);
      setTimeout(() => setShowKeepTrying(false), 5000);
    }
  };

  const checkAnswer = () => {
    return userInput.toLowerCase() === selectedAnswer.toLowerCase();
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial Narrow, sans-serif",
      }}
    >
      <h1>{question}</h1>
      <div style={{ marginTop: "20px" }}>
        <p>{unicodeAnswer}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <img
          src={randomImageUrl}
          alt="Random"
          style={{ margin: "20px auto", height: "250px", width: "250px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Enter the answer"
          style={{
            width: "300px",
            textAlign: "center",
            fontFamily: "Arial Narrow, sans-serif",
          }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Submit
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {showCorrect && <p>Correct!</p>}
        {showKeepTrying && <p>Keep Trying!</p>}
      </div>
    </div>
  );
};

export default App;
