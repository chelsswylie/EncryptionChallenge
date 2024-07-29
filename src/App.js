import React, { useState } from "react";

const App = () => {
  const question = "What kind of bands does a programmer listen to?";
  const answer = "Perl Jam";

  // Function to encrypt the answer
  const encrypt = (str) => {
    return str
      .split("")
      .map((char) => String.fromCharCode(char.charCodeAt(0) + 3))
      .join("");
  };

  const encryptedAnswer = encrypt(answer);

  const [userInput, setUserInput] = useState(
    Array(encryptedAnswer.length).fill("")
  );

  const handleChange = (value, index) => {
    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);

    // Move to the next input field if not the last one
    if (index < encryptedAnswer.length - 1 && value !== "") {
      document.getElementById(`char-${index + 1}`).focus();
    }
  };

  const checkAnswer = () => {
    return userInput.join("").toLowerCase() === answer.toLowerCase();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{question}</h1>
      <div style={{ marginTop: "20px" }}>
        {encryptedAnswer.split("").map((char, index) => (
          <input
            key={index}
            id={`char-${index}`}
            type="text"
            maxLength="1"
            value={userInput[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            style={{ width: "30px", margin: "0 5px", textAlign: "center" }}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        {checkAnswer() ? <p>Correct!</p> : <p>Keep Trying!</p>}
      </div>
    </div>
  );
};

export default App;
