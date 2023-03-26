import { showOverview } from "./overview.js";
export const data = {
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
export function addQuestion(name, type) {
    const question = {
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
export function createSubinput(parentId, name, type, answer, condition) {
    const subinput = {
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
    }
    else {
        data.subquestions[parentId].subinputs.push(subinput.id);
    }
    data.idCounter++;
    localStorage.setItem("idCounter", JSON.stringify(data.idCounter));
    localStorage.setItem("questions", JSON.stringify(data.questions));
    localStorage.setItem("subquestions", JSON.stringify(data.subquestions));
    showOverview();
}
