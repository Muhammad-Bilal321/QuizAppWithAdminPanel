import React, { useState, useEffect } from 'react';

function QuizScreen() {
  const [questions, setQuestions] = useState([]);
  const [ind, setInd] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAnswer = () => {
    let correctValue = questions[ind].correctAns;
    if (selectedValue === correctValue) {
      setScore(score + 1);
    }
    if (ind < questions.length - 1) {
      setInd(ind + 1);
      setSelectedValue('');
    } else {
      setShowResult(true);
    }
  };

  const getTask = () => {
    // Replace this with your data fetching logic (e.g., API call)
    // Sample data for testing
    const sampleQuestions = [
      {
        question: 'Sample Question 1',
        options: ['Option 1', 'Option 2', 'Option 3'],
        correctAns: 'Option 2',
      },
      {
        question: 'Sample Question 2',
        options: ['Option A', 'Option B', 'Option C'],
        correctAns: 'Option A',
      },
    ];

    setQuestions(sampleQuestions);
    setIsLoading(false);
  };

  useEffect(() => {
    getTask();
  }, []);

  const renderQuestion = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (showResult) {
      return (
        <div className="container mt-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Result</h5>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${((score / questions.length) * 100).toFixed(2)}%`,
                  }}
                  aria-valuenow={((score / questions.length) * 100).toFixed(2)}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {((score / questions.length) * 100).toFixed(2)}%
                </div>
              </div>
              <p className="card-text">
                {score / questions.length < 0.6 ? 'Fail' : 'Pass'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[ind];

    return (
      <div className="container mt-4">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">
              Question Number {ind + 1} of {questions.length}
            </h5>
            <p className="card-text py-2">{currentQuestion.question}</p>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedValue(option)}
                className="btn btn-primary btn-block mb-2"
              >
                {option}
              </button>
            ))}
            {selectedValue && (
              <button
                onClick={checkAnswer}
                className="btn btn-success btn-block mt-2"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderQuestion()}</div>;
}

export default QuizScreen;
