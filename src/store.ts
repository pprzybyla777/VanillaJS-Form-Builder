import { showOverview } from "./overview.js";

export type Answer = string | number;

export type QuestionType = "binary" | "numeric" | "text";

export type ConditionType = "equals" | "greater" | "less";

type Questions = {
  [id: string]: Question;
};

type Subquestions = {
  [id: string]: Subquestion;
};

type Data = {
  questions: Questions;
  subquestions: Subquestions;
  idCounter: number;
};

export const data: Data = {
  questions: {},
  subquestions: {},
  idCounter: 1,
};

const storedQuestions = localStorage.getItem("questions");
const storedSubquestions = localStorage.getItem("subquestions");
const storedIdCounter = localStorage.getItem("idCounter");

if (storedQuestions !== null) {
  data.questions = JSON.parse(storedQuestions);
}

if (storedSubquestions !== null) {
  data.subquestions = JSON.parse(storedSubquestions);
}

if (storedIdCounter !== null) {
  data.idCounter = Number(JSON.parse(storedIdCounter));
}

export type Question = {
  id: number;
  name: string;
  type: QuestionType;
  subinputs: number[];
};

export type Subquestion = {
  id: number;
  parentId: number;
  name: string;
  type: QuestionType;
  condition: ConditionType;
  answer: Answer;
  subinputs: number[];
};

export function addQuestion(name: string, type: QuestionType): void {
  const question: Question = {
    id: data.idCounter,
    name: name,
    type: type,
    subinputs: [],
  };

  data.questions[data.idCounter] = question;

  data.idCounter++;

  localStorage.setItem("idCounter", JSON.stringify(data.idCounter));
  localStorage.setItem("questions", JSON.stringify(data.questions));

  showOverview();
}

export function createSubinput(
  parentId: number,
  name: string,
  type: QuestionType,
  answer: Answer,
  condition: ConditionType
): void {
  const subinput: Subquestion = {
    id: data.idCounter,
    parentId: parentId,
    name: name,
    type: type,
    answer: answer,
    condition: condition,
    subinputs: [],
  };

  data.subquestions[subinput.id] = subinput;

  if (`${parentId}` in data.questions) {
    data.questions[parentId].subinputs.push(subinput.id);
  } else {
    data.subquestions[parentId].subinputs.push(subinput.id);
  }

  data.idCounter++;

  localStorage.setItem("idCounter", JSON.stringify(data.idCounter));
  localStorage.setItem("questions", JSON.stringify(data.questions));
  localStorage.setItem("subquestions", JSON.stringify(data.subquestions));

  showOverview();
}
