import React, { useState, useEffect } from "react";
import "./App.css"; // Ensure to create this CSS file for font and style changes

const App = () => {
  const question = "Name a few rock bands that programmers might";
  const answers = ["Perl Jam", "Fleetwood PC", "Depeche Code"];
  const imageMap = {
    "Perl Jam":
      "https://www.udiscovermusic.com/wp-content/uploads/2020/10/Pearl-Jam-GettyImages-86111976.jpg",
    "Fleetwood PC":
      "https://i.guim.co.uk/img/media/9d18a7f8c72057d58ee94cb7c586c30fef47e683/0_122_3004_1802/master/3004.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=cad377b4c2f655f11088f197742a1582",
    "Depeche Code":
      "https://nbhap.com/wp-content/uploads/2020/11/Depeche-Mode-1990s.jpg",
  };
  const encryptionMethods = [
    "Unicode",
    "Caesar Cipher",
    "ROT13",
    "Base64",
    "Hex",
  ];

  // Function to convert the answer to its corresponding Unicode values
  const toUnicodeValues = (str) => {
    return str
      .split("")
      .map((char) => `U+${char.charCodeAt(0).toString(16).toUpperCase()}`)
      .join(" ");
  };

  // Function to apply Caesar Cipher
  const toCaesarCipher = (str, shift = 3) => {
    return str
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          // Uppercase letters
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          }
          // Lowercase letters
          if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
        }
        return char;
      })
      .join("");
  };

  // Function to apply ROT13
  const toROT13 = (str) => {
    return str
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          let code = char.charCodeAt(0);
          // Uppercase letters
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + 13) % 26) + 65);
          }
          // Lowercase letters
          if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + 13) % 26) + 97);
          }
        }
        return char;
      })
      .join("");
  };

  // Function to apply Base64 Encoding
  const toBase64 = (str) => {
    return btoa(str);
  };

  // Function to apply Hexadecimal Encoding
  const toHex = (str) => {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(16))
      .join(" ");
  };

  // Function to encrypt based on selected method
  const encrypt = (str, method) => {
    switch (method) {
      case "Caesar Cipher":
        return toCaesarCipher(str);
      case "ROT13":
        return toROT13(str);
      case "Base64":
        return toBase64(str);
      case "Hex":
        return toHex(str);
      case "Unicode":
      default:
        return toUnicodeValues(str);
    }
  };

  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0]);
  const [encryptedAnswer, setEncryptedAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showKeepTrying, setShowKeepTrying] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [randomImageUrl, setRandomImageUrl] = useState(imageMap[answers[0]]);
  const [selectedMethod, setSelectedMethod] = useState(encryptionMethods[0]);

  useEffect(() => {
    const encrypted = encrypt(selectedAnswer, selectedMethod);
    const imageUrl = imageMap[selectedAnswer];
    setEncryptedAnswer(encrypted);
    setRandomImageUrl(imageUrl);
  }, [selectedAnswer, selectedMethod]);

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

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleNext = () => {
    const nextIndex = (currentAnswerIndex + 1) % answers.length;
    setCurrentAnswerIndex(nextIndex);
    setSelectedAnswer(answers[nextIndex]);
    setUserInput("");
    setShowCorrect(false);
    setShowKeepTrying(false);
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
        <p>{encryptedAnswer}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <img
          src={randomImageUrl}
          alt="Random"
          style={{ margin: "20px auto", height: "250px", width: "250px" }}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <select
          value={selectedMethod}
          onChange={handleMethodChange}
          style={{ marginBottom: "20px" }}
        >
          {encryptionMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
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
        <button onClick={handleNext} style={{ marginTop: "10px" }}>
          Next
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
