import { data } from "./store.js";
import { Answer, Question, QuestionType, Subquestion } from "./store";

export function showResult(): void {
  const resultContainer = document.querySelector("#result");
  if (!resultContainer) return;

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

function generateResultInputHTML(question: Question): string {
  return `<div class="result-input" id="result-input-r${question.id}">
      <label for="r${question.id}">${question.name}</label>
      ${createResultInputBasedOnType(question.id, question.type)}
    </div>
    `;
}

function createResultInputBasedOnType(
  inputId: number,
  type: QuestionType
): string {
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

function listenToInput(item: Question): void {
  if (item.type === "binary") {
    const radioFieldset = document.getElementById(`fieldset-r${item.id}`);
    if (!radioFieldset) return;

    radioFieldset.addEventListener("click", handleRadioInput);
  } else {
    const input = document.getElementById(`r${item.id}`);
    if (!input) return;

    input.addEventListener("input", handleInput);
  }
}

function handleInput(e: Event): void {
  const inputElem = e.target as HTMLInputElement;

  if (!inputElem) return;

  const questionId = Number(inputElem.id.slice(1));

  const inputValue = inputElem.value;

  displaySubinputs(questionId, inputValue);
}

function handleRadioInput(e: Event): void {
  const inputElem = e.target as HTMLInputElement;

  if (!inputElem || !inputElem.matches("input[type='radio']")) {
    return;
  }

  enableRadioButtons(inputElem.id);

  inputElem.setAttribute("disabled", "");

  const questionId = Number(inputElem.id.slice(1));

  const inputValue = inputElem.value;

  displaySubinputs(questionId, inputValue);
}

function displaySubinputs(questionId: number, inputValue: string): void {
  const item: Question | Subquestion =
    `${questionId}` in data.questions
      ? data.questions[questionId]
      : data.subquestions[questionId];

  const answer = item.type === "numeric" ? Number(inputValue) : inputValue;

  const subitems = item.subinputs.map(
    (subinputId) => data.subquestions[subinputId]
  );
  const subitemsToHide = subitems.filter(
    (subitem) => !giveDisplayCondition(subitem)(answer)
  );
  const subitemsToDisplay = subitems.filter((subitem) =>
    giveDisplayCondition(subitem)(answer)
  );

  subitemsToHide.forEach((subitem) => {
    const subitemElement = document.querySelector(
      `#result-input-r${subitem.id}`
    ) as HTMLDivElement;
    if (subitemElement) {
      subitemElement.parentElement?.remove();
    }
  });

  subitemsToDisplay.forEach((subitem) => {
    const duplicate = document.querySelector(`#result-input-r${subitem.id}`);
    if (duplicate) return;

    const div = document.createElement("div");
    div.innerHTML = generateResultInputHTML(subitem);
    const insertElem = document.querySelector(
      `#result-input-r${item.id}`
    ) as HTMLDivElement;
    insertElem.appendChild(div);
    listenToInput(subitem);
  });
}

function giveDisplayCondition(item: Subquestion): (a: Answer) => boolean {
  const displayConditions = {
    equals: (a: Answer) => a === item.answer,
    greater: (a: Answer) => a > item.answer,
    less: (a: Answer) => a < item.answer,
  };

  return displayConditions[item.condition];
}

function enableRadioButtons(btnId: string): void {
  const allRadioBtns = Array.from(
    document.querySelectorAll(`#fieldset-${btnId} input[type='radio']`)
  );

  allRadioBtns
    .filter((radioBtn) => radioBtn.hasAttribute("disabled"))
    .forEach((radioBtn) => radioBtn.removeAttribute("disabled"));
}
