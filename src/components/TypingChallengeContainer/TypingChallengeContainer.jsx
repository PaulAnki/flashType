import React from "react";
import "./TypingChallengeContainer.css";
import ChallengeDetailsCard from "../ChallengeDetailsCard/ChallengeDetailsCard";
import TypingChallenge from "../TypingChallenge/TypingChallenge";

const TypingChallengeContainer = ({
  selectedParagraph,
  timerStarted,
  timeRemaining,
  words,
  characters,
  wpm,
  testInfo,
  onInputChange,
}) => {
  return (
    <div className="typing-challenge-container">
      {/* Details Container */}
      <div className="details-container">
        {/* Words Typed */}
        <ChallengeDetailsCard cardName="Words" cardValue={words} />
        {/* Characters Typed */}
        <ChallengeDetailsCard cardName="Characters" cardValue={characters} />
        {/*  WPM */}
        <ChallengeDetailsCard cardName="Speed" cardValue={wpm} />
      </div>
      {/* The REAL Challenge */}
      <div className="typewriter-container">
        <TypingChallenge
          selectedParagraph={selectedParagraph}
          timerStarted={timerStarted}
          timeRemaining={timeRemaining}
          testInfo={testInfo}
          onInputChange={onInputChange}
        />
      </div>
    </div>
  );
};
export default TypingChallengeContainer;
