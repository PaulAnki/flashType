import React from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Landing from "../Landing/Landing";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import Footer from "../Footer/Footer";
import { SAMPLE_PARAGRAPHS } from "./../../data/sampleParagraph";

const TotalTime = 60;
const ServiceURL = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
  selectedParagraph: "",
  timerStarted: false,
  timeRemaining: TotalTime,
  words: 0,
  characters: 0,
  wpm: 0,
  testInfo: [],
};

class App extends React.Component {
  state = DefaultState;

  fetchNewParagraphFallback = () => {
    const data =
      SAMPLE_PARAGRAPHS[Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)];

    const selectedParagraphArray = data.split("");
    const testInfo = selectedParagraphArray.map((selectedLetter) => {
      return {
        testLetter: selectedLetter,
        status: "notAttempted",
      };
    });
    this.setState({ ...DefaultState, testInfo, selectedParagraph: data });
  };

  fetchNewParagraph = () => {
    fetch(ServiceURL)
      .then((response) => response.text())
      .then((data) => {
        const selectedParagraphArray = data.split("");
        const testInfo = selectedParagraphArray.map((selectedLetter) => {
          return {
            testLetter: selectedLetter,
            status: "notAttempted",
          };
        });
        this.setState({ ...DefaultState, testInfo, selectedParagraph: data });
      });
  };

  componentDidMount() {
    this.fetchNewParagraphFallback();
  }

  startTimer = () => {
    this.setState({ timerStarted: true });
    const timer = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        //Change the WPM (Speed)
        const timeSpend = TotalTime - this.state.timeRemaining;
        const wpm =
          timeSpend > 0 ? (this.state.words / timeSpend) * TotalTime : 0;
        this.setState({
          timeRemaining: this.state.timeRemaining - 1,
          wpm: parseInt(wpm),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };

  startAgain = () => {
    this.fetchNewParagraphFallback();
  };

  handleInputValue = (inputValue) => {
    if (!this.state.timerStarted) this.startTimer();

    const characters = inputValue.length;
    const words = inputValue.split(" ").length;
    const index = characters - 1;

    if (index < 0) {
      this.setState({
        testInfo: [
          {
            testLetter: this.state.testInfo[0].testLetter,
            status: "notAttempted",
          },
          ...this.state.testInfo.slice(1),
        ],
        characters,
        words,
      });
      return;
    }

    if (index >= this.state.selectedParagraph.length) {
      this.setState({ characters, words });
      return;
    }

    //Make A Copy Of Test Info
    const testInfo = this.state.testInfo;
    if (!(index === this.state.selectedParagraph.length - 1))
      testInfo[index + 1].status = "notAttempted";

    //Check for the Correct Typed Letter
    const isCorrect = inputValue[index] === testInfo[index].testLetter;

    //Update the Test Info
    testInfo[index].status = isCorrect ? "correct" : "incorrect";

    //Update the State
    this.setState({
      testInfo,
      words,
      characters,
    });
  };

  render() {
    return (
      <div className="app">
        {/* Navigation Bar*/}
        <Nav />
        {/* Landing Page*/}
        <Landing />

        {/* Challenge Section*/}
        <ChallengeSection
          selectedParagraph={this.state.selectedParagraph}
          timerStarted={this.state.timerStarted}
          timeRemaining={this.state.timeRemaining}
          words={this.state.words}
          characters={this.state.characters}
          wpm={this.state.wpm}
          testInfo={this.state.testInfo}
          onInputChange={this.handleInputValue}
          startAgain={this.startAgain}
        />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
