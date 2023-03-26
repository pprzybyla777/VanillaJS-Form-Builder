import { createSubinput } from "./store.js";
import { QuestionType, ConditionType } from "./store";

const subForm = document.querySelector("#form-sub") as HTMLFormElement;
subForm.addEventListener("submit", handleSubformSubmit);

const addInputBtn = document.getElementById("add-input") as HTMLButtonElement;

/// onSubmit

function handleSubformSubmit(e: Event): void {
  e.preventDefault();

  const parentId = Number(subForm.attributes.getNamedItem("parentId")?.value);
  const questionType = subForm.attributes.getNamedItem("questionType")
    ?.value as QuestionType;

  const questionInput = document.querySelector(
    "#form-sub #question"
  ) as HTMLInputElement;
  const selectQuestionType = document.querySelector(
    "#form-sub #select-type"
  ) as HTMLSelectElement;

  const selectConditionType = document.querySelector(
    ".form-control select#condition"
  ) as HTMLSelectElement;

  const condition = selectConditionType.value as ConditionType;

  const valueToCondition = document.querySelector(
    questionType === "binary"
      ? ".form-control select#value"
      : ".form-control input#value"
  ) as HTMLSelectElement | HTMLInputElement;

  const value = valueToCondition.value.trim();

  const questionName = questionInput.value.trim();
  const selectedType = selectQuestionType.value as QuestionType;

  if (questionName !== "" && value !== "") {
    const answer = questionType === "numeric" ? Number(value) : value;
    createSubinput(parentId, questionName, selectedType, answer, condition);
  }

  // cleaning up

  subForm.firstChild && subForm.removeChild(subForm.firstChild);

  subForm.removeAttribute("parentId");
  subForm.removeAttribute("questionType");

  // reseting inputs

  questionInput.value = "";
  selectQuestionType.value = "";

  // hiding form

  subForm.className = "form hide";
  addInputBtn.className = "";

  enableAllSubinputBtns();
}

export function disableAllSubinputBtns(): void {
  const allAddSubinputBtns = document.querySelectorAll("#subinputBtn");

  Array.from(allAddSubinputBtns).forEach((subinputBtn) => {
    subinputBtn.setAttribute("disabled", "");
  });
}

export function enableAllSubinputBtns(): void {
  const allAddSubinputBtns = document.querySelectorAll("#subinputBtn");

  Array.from(allAddSubinputBtns).forEach((subinputBtn) => {
    subinputBtn.removeAttribute("disabled");
  });
}

export function handleSubinputFormShowing(e: Event): void {
  disableAllSubinputBtns();

  const subForm = document.querySelector("#form-sub") as HTMLFormElement;

  const btnClicked = e.target as HTMLButtonElement;

  const parentElement = btnClicked.parentElement;
  if (!parentElement) return;

  const questionId = parentElement.id;

  const questionType = Array.from(parentElement.children).find((child) =>
    child.classList.contains("type")
  )?.textContent as QuestionType;

  const conditionalInput = createInputBasedOnType(questionType);

  subForm.insertBefore(conditionalInput, subForm.firstChild);

  addInputBtn.className = "hide";
  subForm.className = "form";

  subForm.setAttribute("parentId", questionId);
  subForm.setAttribute("questionType", questionType);

  document.querySelector("body")?.scrollIntoView();
}

// handle cancle button

function handleSubFormCancelation() {
  const subForm = document.querySelector("#form-sub") as HTMLFormElement;

  // cleaning up

  subForm.firstChild && subForm.removeChild(subForm.firstChild);
  subForm.removeAttribute("parentId");
  subForm.removeAttribute("questionType");

  // hiding form

  subForm.className = "form hide";
  addInputBtn.className = "";

  enableAllSubinputBtns();
}

const subCancelBtn = document.getElementById(
  "subCancelBtn"
) as HTMLButtonElement;
subCancelBtn.addEventListener("click", handleSubFormCancelation);

const FormControlforType = {
  text: `
  <label for="condition">Condition:</label>
  <select name="conditions" id="condition" required>
    <option value="equals">Equals</option>
  </select>
  <input type="text" id="value" required />
  `,

  numeric: `
  <label for="condition">Condition:</label>
  <select name="conditions" id="condition" required>
    <option value="equals">Equals</option>
    <option value="greater">Greater than</option>
    <option value="less">Less than</option>
  </select>
  <input type="number" id="value" required />
  `,
  binary: `
  <label for="condition">Condition:</label>
  <select name="conditions" id="condition" required>
    <option value="equals">Equals</option>
  </select>
  <select name="valueToCondition" id="value">
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
  `,
};

function createInputBasedOnType(type: QuestionType): HTMLDivElement {
  const formControl = document.createElement("div");

  formControl.className = "form-control";
  formControl.id = "conditional";

  formControl.innerHTML = FormControlforType[type];

  return formControl;
}
