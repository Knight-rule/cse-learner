"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/data/courses";
import { trackQuizComplete } from "@/lib/tracker";

interface QuizProps {
  questions: QuizQuestion[];
  courseSlug?: string;
  quizTitle?: string;
}

export default function Quiz({ questions, courseSlug = "", quizTitle = "Quiz" }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const trackedRef = useRef(false);

  const question = questions[current];

  useEffect(() => {
    if (current >= questions.length && !trackedRef.current && questions.length > 0) {
      trackedRef.current = true;
      trackQuizComplete(courseSlug, quizTitle, score, questions.length);
    }
  }, [current, questions.length, score, courseSlug, quizTitle]);

  const handleSelect = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    if (selected === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
  };

  if (current >= questions.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{score === questions.length ? "🎉" : score >= questions.length / 2 ? "👍" : "📚"}</div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-xl text-dark-500 mb-6">
          You scored <span className="font-bold text-primary-600">{score}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-dark-400">
          Question {current + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-primary-600">
          Score: {score}
        </span>
      </div>

      <div className="w-full bg-dark-100 rounded-full h-2 mb-8">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        {question.chapter && (
          <span className="text-xs bg-dark-100 text-dark-600 px-2 py-1 rounded-md font-medium">
            {question.chapter}
          </span>
        )}
        {question.difficulty && (
          <span className={`text-xs px-2 py-1 rounded-md font-medium ${
            question.difficulty === "easy" ? "bg-green-100 text-green-700" :
            question.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-700"
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                showCorrect
                  ? "border-green-500 bg-green-50 text-green-800"
                  : showWrong
                  ? "border-red-500 bg-red-50 text-red-800"
                  : isSelected
                  ? "border-primary-500 bg-primary-50"
                  : "border-dark-200 hover:border-primary-300 hover:bg-primary-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  showCorrect ? "bg-green-500 text-white" : showWrong ? "bg-red-500 text-white" : isSelected ? "bg-primary-500 text-white" : "bg-dark-100"
                }`}>
                  {showCorrect ? <CheckCircle className="w-5 h-5" /> : showWrong ? <XCircle className="w-5 h-5" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-4 rounded-xl mb-6 ${selected === question.correctIndex ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className="text-sm font-medium mb-1">
            {selected === question.correctIndex ? "✅ Correct!" : "❌ Incorrect"}
          </p>
          <p className="text-sm text-dark-600">{question.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            {current < questions.length - 1 ? "Next Question" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
