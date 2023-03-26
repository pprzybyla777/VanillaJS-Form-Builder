import { data } from "./store.js";
export function showResult() {
    const resultContainer = document.querySelector("#result");
    if (!resultContainer)
        return;
    const questionsArr = Object.values(data.questions);
    resultContainer.innerHTML = `
    <form class="form">
      ${questionsArr
        .map((question) => generateResultInputHTML(question))
        .join("")}
    </form>
  `;
    questionsArr.forEach((question) => listenToInput(question));
}
function generateResultInputHTML(question) {
    return `<div class="result-input" id="result-input-r${question.id}">
      <label for="r${question.id}">${question.name}</label>
      ${createResultInputBasedOnType(question.id, question.type)}
    </div>
    `;
}
function createResultInputBasedOnType(inputId, type) {
    const inputTypes = {
        text: `
    <input type="text" id="r${inputId}" required />
    `,
        numeric: `
    <input type="number" id="r${inputId}" required />
    `,
        binary: `
    <fieldset id="fieldset-r${inputId}">
      <label>
        <input type="radio" id="r${inputId}" name="radio-answer-r${inputId}" value="yes"/>
        Yes
      </label>
      <label>
        <input type="radio" id="r${inputId}" name="radio-answer-r${inputId}" value="no" />
        No
      </label>
    </fieldset>
    `,
    };
    return inputTypes[type];
}
function listenToInput(item) {
    if (item.type === "binary") {
        const radioFieldset = document.getElementById(`fieldset-r${item.id}`);
        if (!radioFieldset)
            return;
        radioFieldset.addEventListener("click", handleRadioInput);
    }
    else {
        const input = document.getElementById(`r${item.id}`);
        if (!input)
            return;
        input.addEventListener("input", handleInput);
    }
}
function handleInput(e) {
    const inputElem = e.target;
    if (!inputElem)
        return;
    const questionId = Number(inputElem.id.slice(1));
    const inputValue = inputElem.value;
    displaySubinputs(questionId, inputValue);
}
function handleRadioInput(e) {
    const inputElem = e.target;
    if (!inputElem || !inputElem.matches("input[type='radio']")) {
        return;
    }
    enableRadioButtons(inputElem.id);
    inputElem.setAttribute("disabled", "");
    const questionId = Number(inputElem.id.slice(1));
    const inputValue = inputElem.value;
    displaySubinputs(questionId, inputValue);
}
function displaySubinputs(questionId, inputValue) {
    const item = `${questionId}` in data.questions
        ? data.questions[questionId]
        : data.subquestions[questionId];
    const answer = item.type === "numeric" ? Number(inputValue) : inputValue;
    const subitems = item.subinputs.map((subinputId) => data.subquestions[subinputId]);
    const subitemsToHide = subitems.filter((subitem) => !giveDisplayCondition(subitem)(answer));
    const subitemsToDisplay = subitems.filter((subitem) => giveDisplayCondition(subitem)(answer));
    subitemsToHide.forEach((subitem) => {
        var _a;
        const subitemElement = document.querySelector(`#result-input-r${subitem.id}`);
        if (subitemElement) {
            (_a = subitemElement.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        }
    });
    subitemsToDisplay.forEach((subitem) => {
        const duplicate = document.querySelector(`#result-input-r${subitem.id}`);
        if (duplicate)
            return;
        const div = document.createElement("div");
        div.innerHTML = generateResultInputHTML(subitem);
        const insertElem = document.querySelector(`#result-input-r${item.id}`);
        insertElem.appendChild(div);
        listenToInput(subitem);
    });
}
function giveDisplayCondition(item) {
    const displayConditions = {
        equals: (a) => a === item.answer,
        greater: (a) => a > item.answer,
        less: (a) => a < item.answer,
    };
    return displayConditions[item.condition];
}
function enableRadioButtons(btnId) {
    const allRadioBtns = Array.from(document.querySelectorAll(`#fieldset-${btnId} input[type='radio']`));
    allRadioBtns
        .filter((radioBtn) => radioBtn.hasAttribute("disabled"))
        .forEach((radioBtn) => radioBtn.removeAttribute("disabled"));
}
