import { QuizQuestion } from "../courses";
import { cFundamentalsQuestions } from "./c-fundamentals";
import { cPointersQuestions } from "./c-pointers";
import { cStructuresQuestions } from "./c-structures";
import { cFileHandlingQuestions } from "./c-filehandling";
import { cDynamicQuestions } from "./c-dynamic";

export const cLanguageQuestions: QuizQuestion[] = [
  ...cFundamentalsQuestions,
  ...cPointersQuestions,
  ...cStructuresQuestions,
  ...cFileHandlingQuestions,
  ...cDynamicQuestions,
];
