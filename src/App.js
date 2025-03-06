import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from 'react-helmet';
import ReactGA from "react-ga4";

ReactGA.initialize("G-FPDFW27EW9");


const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
  { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Jane Austen"], answer: "Harper Lee" },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },

  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    answer: "Abuja",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars",
  },

  {
    question: "Who wrote 'Things Fall Apart'?",
    options: ["Wole Soyinka", "Chimamanda Adichie", "Chinua Achebe", "Ngugi wa Thiong'o"],
    answer: "Chinua Achebe",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "NaCl"],
    answer: "H2O",
  },
  {
    question: "What is 50% of 200?",
    options: ["50", "100", "75", "120"],
    answer: "100",
  },
  {
    question: "Which organ in the human body pumps blood?",
    options: ["Liver", "Lungs", "Heart", "Kidney"],
    answer: "Heart",
  },
  {
    question: "Who won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: "France",
  },
  {
    question: "What is the antonym of 'Brave'?",
    options: ["Fearless", "Cowardly", "Bold", "Daring"],
    answer: "Cowardly",
  },
  {
    question: "What is the synonym of 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Confused"],
    answer: "Joyful"
  },
  {
    question: "What is 5! (5 factorial)?",
    options: ["15", "25", "120", "60"],
    answer: "120",
  },
  {
    question: "Who is the current president of Nigeria (2024)?", options:
      ["Bola Tinubu", "Muhammadu Buhari", "Goodluck Jonathan", "Olusegun Obasanjo"], answer: "Bola Tinubu"
  },
  { question: "What is the probability of rolling a 6 on a fair six-sided die?", options: ["1/2", "1/3", "1/6", "1/4"], answer: "1/6" },
  { question: "Which of these is a psychological disorder?", options: ["Bipolar disorder", "Flu", "Diabetes", "Hypertension"], answer: "Bipolar disorder" },
  { question: "What is 40% of 200?", options: ["60", "70", "80", "90"], answer: "80" },
  { question: "Who won the FIFA World Cup in 2022?", options: ["Argentina", "France", "Brazil", "Germany"], answer: "Argentina" },
  { question: "Which Nollywood actress is famous for her role in 'Lionheart'?", options: ["Genevieve Nnaji", "Rita Dominic", "Omotola Jalade", "Mercy Johnson"], answer: "Genevieve Nnaji" },
  { question: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: "12" },
  { question: "Which country is the largest producer of crude oil in Africa?", options: ["Nigeria", "Angola", "Libya", "Algeria"], answer: "Nigeria" },
  { question: "If a train moves at 60 km/h, how far will it travel in 2.5 hours?", options: ["120 km", "150 km", "180 km", "200 km"], answer: "150 km" },
  { question: "What is the antonym of 'benevolent'?", options: ["Malevolent", "Generous", "Kind", "Humble"], answer: "Malevolent" },
  { question: "Which software is used for data analysis and visualization?", options: ["Excel", "PowerPoint", "Photoshop", "Premiere Pro"], answer: "Excel" },
  { question: "Which of these popular Lagos landmarks is known for its historical significance related to the slave trade?", options: ["The National Theatre", "Freedom Park", "Lekki Conservation Centre", "The Cathedral Church of Christ"], answer: "Freedom Park" },
  { question: "What is the sum of the angles in a triangle?", options: ["90°", "120°", "180°", "360°"], answer: "180°" },
  { question: "Which of these is a unit of data storage?", options: ["Byte", "Joule", "Newton", "Kelvin"], answer: "Byte" },
  { question: "What is the currency of Japan?", options: ["Yen", "Won", "Dollar", "Peso"], answer: "Yen" },
  { question: "Who is the richest man in the world as of 2024?", options: ["Elon Musk", "Jeff Bezos", "Bernard Arnault", "Bill Gates"], answer: "Elon Musk" },
  { question: "Solve for x: 3x + 5 = 20", options: ["3", "5", "7", "10"], answer: "5" },
  { question: "Which of these is a prime number?", options: ["21", "29", "35", "49"], answer: "29" },
  { question: "Which is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" },
  { question: "Which element has the highest electrical conductivity?", options: ["Gold", "Silver", "Copper", "Aluminum"], answer: "Silver" },
  { question: "Which organ in the human body is responsible for filtering blood?", options: ["Kidney", "Liver", "Heart", "Lungs"], answer: "Kidney" },
  { question: "What part of the brain controls balance and coordination?", options: ["Cerebellum", "Cerebrum", "Brainstem", "Medulla"], answer: "Cerebellum" },
  { question: "Which vitamin is essential for blood clotting?", options: ["Vitamin A", "Vitamin B12", "Vitamin K", "Vitamin D"], answer: "Vitamin K" },
  { question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"], answer: "Mitochondria" },
  { question: "Which hormone regulates blood sugar levels?", options: ["Insulin", "Glucagon", "Cortisol", "Adrenaline"], answer: "Insulin" },

  { question: "What is the largest ocean in the world?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
  { question: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "200,000 km/s"], answer: "300,000 km/s" },
  { question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Elephant", "Giraffe"], answer: "Lion" },
  { question: "What is the largest desert in the world?", options: ["Sahara", "Antarctic", "Arabian", "Gobi"], answer: "Antarctic" },
  { question: "Which planet is known as the 'Morning Star' or 'Evening Star'?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Venus" },
  { question: "What is the chemical symbol for sodium?", options: ["So", "Na", "Sd", "Si"], answer: "Na" },
  { question: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Europe", "Africa", "Australia"], answer: "Africa" },
  { question: "What is the boiling point of water in Celsius?", options: ["50", "100", "150", "200"], answer: "100" },
  { question: "Which gas makes up the majority of Earth's atmosphere?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
  { question: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Brain"], answer: "Skin" },
  { question: "Which country is known as the 'Land of the Rising Sun'?", options: ["China", "Korea", "Japan", "Vietnam"], answer: "Japan" },
  { question: "What is the process by which plants make their own food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], answer: "Photosynthesis" },
  { question: "Which planet is known as the 'Blue Planet'?", options: ["Mars", "Earth", "Venus", "Neptune"], answer: "Earth" },
  { question: "What is the chemical symbol for iron?", options: ["Ir", "Fe", "In", "Io"], answer: "Fe" },
  { question: "Which animal is known as the 'Ship of the Desert'?", options: ["Horse", "Camel", "Donkey", "Elephant"], answer: "Camel" },
  { question: "What is the largest rainforest in the world?", options: ["Congo", "Amazon", "Daintree", "Valdivian"], answer: "Amazon" },
  { question: "Which gas is used in balloons to make them float?", options: ["Oxygen", "Carbon dioxide", "Helium", "Nitrogen"], answer: "Helium" },
  { question: "What is the capital of Canada?", options: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
  { question: "Which element is essential for bone health?", options: ["Iron", "Calcium", "Potassium", "Sodium"], answer: "Calcium" },
  { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
  { question: "Which country is known as the 'Land of Kangaroos'?", options: ["New Zealand", "Australia", "South Africa", "Argentina"], answer: "Australia" },
  { question: "What is the process by which water changes into vapor?", options: ["Condensation", "Evaporation", "Precipitation", "Melting"], answer: "Evaporation" },
  { question: "Which planet is known as the 'Ringed Planet'?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: "Saturn" },
  { question: "What is the chemical symbol for potassium?", options: ["Po", "Pt", "K", "Pn"], answer: "K" },
  { question: "Which animal is known as the 'Silent Hunter'?", options: ["Fox", "Owl", "Wolf", "Hawk"], answer: "Owl" },
  { question: "What is the largest coral reef system in the world?", options: ["Great Barrier Reef", "Belize Barrier Reef", "Red Sea Coral Reef", "Florida Reef"], answer: "Great Barrier Reef" },
  { question: "Which gas is used in fire extinguishers?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
  { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília" },
  { question: "Which vitamin is essential for vision?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin A" },
  { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
  { question: "Which continent is known as the 'White Continent'?", options: ["Asia", "Europe", "Africa", "Antarctica"], answer: "Antarctica" },
  { question: "What is the process of a liquid turning into a solid?", options: ["Melting", "Freezing", "Boiling", "Evaporation"], answer: "Freezing" },
  { question: "Which planet is known as the 'Giant Planet'?", options: ["Mars", "Earth", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "What is the chemical symbol for copper?", options: ["Co", "Cu", "Cp", "Cr"], answer: "Cu" },
  { question: "Which animal is known as the 'Fastest Land Animal'?", options: ["Lion", "Tiger", "Cheetah", "Leopard"], answer: "Cheetah" },
  { question: "What is the largest waterfall in the world (by volume)?", options: ["Angel Falls", "Victoria Falls", "Niagara Falls", "Iguazu Falls"], answer: "Victoria Falls" },
  { question: "Which gas is used in photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
  { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Brisbane", "Canberra"], answer: "Canberra" },
  { question: "Which mineral is essential for red blood cell production?", options: ["Calcium", "Iron", "Potassium", "Sodium"], answer: "Iron" },
  { question: "What is the largest bird in the world?", options: ["Eagle", "Ostrich", "Penguin", "Albatross"], answer: "Ostrich" },
  { question: "Which country is known as the 'Land of the Midnight Sun'?", options: ["Iceland", "Norway", "Sweden", "All of the above"], answer: "All of the above" },
  { question: "What is the process of a gas turning into a liquid?", options: ["Evaporation", "Condensation", "Sublimation", "Melting"], answer: "Condensation" },
  { question: "Which planet is known as the 'Ice Giant'?", options: ["Jupiter", "Saturn", "Uranus", "Mars"], answer: "Uranus" },
  { question: "What is the chemical symbol for aluminum?", options: ["Al", "Am", "Au", "Ag"], answer: "Al" },
  { question: "Which animal is known as the 'Largest Land Animal'?", options: ["Giraffe", "Hippopotamus", "Elephant", "Rhinoceros"], answer: "Elephant" },
  { question: "If you flip two fair coins, what is the probability of getting at least one head?", options: ["1/4", "1/2", "3/4", "1"], answer: "3/4" },
  { question: "If a train travels 100 km in 2 hours, what is its average speed?", options: ["25 km/h", "50 km/h", "75 km/h", "100 km/h"], answer: "50 km/h" },
  { question: "Which number logically follows this series: 2, 4, 8, 16, ...", options: ["18", "20", "32", "64"], answer: "32" },
  { question: "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?", options: ["Yes", "No", "Cannot be determined", "Always"], answer: "Cannot be determined" },
  { question: "Which is the next number in the sequence: 1, 1, 2, 3, 5, 8, ?", options: ["10", "11", "13", "15"], answer: "13" },
  { question: "What comes next in the pattern: O, T, T, F, F, S, S, ?", options: ["E", "N", "T", "W"], answer: "E" },
  { question: "If five cats can catch five mice in five minutes, how many cats are needed to catch 100 mice in 100 minutes?", options: ["5", "10", "20", "100"], answer: "5" },
  { question: "Which statement is logically equivalent to 'If it rains, then the ground is wet'?", options: ["If the ground is wet, then it rains", "If the ground is not wet, then it does not rain", "It rains if and only if the ground is wet", "The ground is wet only if it rains"], answer: "If the ground is not wet, then it does not rain" },
  { question: "What is the next letter in the series: A, C, F, J, O, ?", options: ["T", "U", "W", "X"], answer: "U" },
  { question: "If the day after tomorrow is two days before Thursday, what day is it today?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: "Sunday" },
  { question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", options: ["5 minutes", "10 minutes", "50 minutes", "100 minutes"], answer: "5 minutes" },
  { question: "Which number does not belong in the series: 2, 4, 6, 8, 11, 10?", options: ["2", "4", "11", "10"], answer: "11" },
  { question: "If a rectangle's length is doubled and its width is tripled, by what factor does its area increase?", options: ["3", "4", "5", "6"], answer: "6" },
  { question: "What is the missing number in the sequence: 3, 9, 27, ?, 243?", options: ["54", "81", "108", "243"], answer: "81" },
  { question: "Which of these statements best summarizes the scientific method?", options: ["Observation, Hypothesis, Experiment, Conclusion", "Theory, Fact, Law, Hypothesis", "Observation, Experiment, Conclusion, Belief", "Experiment, Observation, Hypothesis, Conclusion"], answer: "Observation, Hypothesis, Experiment, Conclusion" },

];

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);


  const resetTimer = useCallback(() => {
    setTimer(10);
    setTimeLeft(10);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      resetTimer();
    } else {
      setShowResult(true);
    }
  }, [currentQuestion, resetTimer]);

  useEffect(() => {
    if (gameStarted && timer > 0 && !showResult) {
      const timeout = setTimeout(() => {
        setTimer(timer - 1);
        setTimeLeft(timer - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (gameStarted && timer === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timer, showResult, gameStarted, handleNextQuestion]);

  useEffect(() => {
    setTimeLeft(timer);
  }, [currentQuestion, timer]);

  const handleAnswerClick = (option) => {
    //Function called when a user clicks an answer option.
    if (selectedAnswer) return;
    if (!questions[currentQuestion]) {
      console.error("current question index is out of bounds");
      return;
    }

    setSelectedAnswer(option); //Set the selected answer.
    if (option === questions[currentQuestion].answer) { //Check if the answer is correct
      setScore(score + 1);
    }
    setTimeout(() => { //wait 2 seconds, then move to the next questions.
      handleNextQuestion();
    }, 2000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    resetTimer();
    setGameStarted(false);
  };


  const startGame = () => {
    setGameStarted(true);
    console.log("Game started by user.");
    // Track the Play button click using react-ga4

    ReactGA.event({
      category: "Quiz Game",
      action: "Play Button Clicked",
      label: "start_game",
      value: 1,
    });

  };

  const resultMessage =
    score >= questions.length / 2
      ? "Great job! You have good knowledge! 🚀"
      : "Keep learning! You can do better next time! 📚";

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-5">
      <Helmet>
        <title>Quiz Game | Test Your IQ</title>
        <meta property="og:title" content="Quiz Game | Test Your IQ" />
        <meta property="og:description" content="Challenge yourself with 100 educative questions spanning multiple fields. 
        Test your IQ and share your score.!" />
        <meta property="og:image" content="https://imgur.com/a/R00ZvSo" />
        <meta property="og:url" content="https://fantastic-kheer-0fd999.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
        {!gameStarted ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to the Ultimate Quiz Challenge!
            </h1>
            <p className="mb-6">
              Test your IQ with 100 educative questions from different fields and subjects.
              How far do you think you can go? Are you ready? Let's go Champ!
            </p>
            <button
              className="bg-gray-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600"
              onClick={startGame}
            >
              Play
            </button>
          </div>
        ) : !showResult ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">
              Let’s test your IQ! 🤔
              <br /> How many questions do you think you will answer correctly?
            </h1>
            <div className="bg-blue-200 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}
              </h2>
            </div>
            <div className="flex justify-center mb-4" aria-live="polite">
              <CircularProgress
                variant="determinate"
                value={(timeLeft / 10) * 100}
                size={80}
                thickness={5}
                style={{ color: "lightblue" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {timeLeft}
                </motion.span>
              </CircularProgress>
            </div>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!selectedAnswer}
                  aria-disabled={!!selectedAnswer}
                  aria-label={`Answer option ${index + 1}: ${option}`}
                  role="radio"
                  aria-checked={selectedAnswer === option}
                  className={`p-3 w-full rounded-lg text-lg font-medium transition-all ${selectedAnswer
                    ? option === questions[currentQuestion].answer
                      ? "bg-green-600"
                      : "bg-red-600"
                    : "bg-blue-500 hover:bg-blue-700"
                    }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {selectedAnswer && (
              <div className="mt-4 flex items-center gap-2 text-lg">
                {selectedAnswer === questions[currentQuestion].answer ? (
                  <FaCheckCircle className="text-green-500" size={24} />
                ) : (
                  <FaTimesCircle className="text-red-500" size={24} />
                )}
                <span>
                  {selectedAnswer === questions[currentQuestion].answer
                    ? "Correct! ✅"
                    : `Wrong! ❌ The correct answer is ${questions[currentQuestion].answer}`}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center" aria-live="assertive">
            <h1 className="text-2xl font-bold mb-4">Quiz Completed! 🎉</h1>
            <p className="text-xl">Your score: <strong>{score}</strong> / {questions.length}</p>
            <p className="mt-2">{resultMessage}</p>
            <button
              className="mt-5 bg-blue-500 px-4 py-2 rounded-lg text-lg font-medium hover:bg-blue-600"
              onClick={restartQuiz}
            >
              Play Again 🔄
            </button>
          </div>
        )}
        <footer className="mt-6 text-center text-gray-400 text-sm">
          Powered by <span className="text-blue-400 font-semibold">Nenenj2024</span> - All Rights Reserved
        </footer>
      </div>
    </div >
  );
};

export default QuizGame;

