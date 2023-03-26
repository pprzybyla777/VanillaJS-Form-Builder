import { addQuestion } from "./store.js";
import { QuestionType } from "./store";
import { showOverview } from "./overview.js";
import "./subForm.js";
import { disableAllSubinputBtns, enableAllSubinputBtns } from "./subForm.js";

function handleShowingInputForm(): void {
  disableAllSubinputBtns();

  mainForm.className = "form";
  addInputBtn.className = "hide";
}

function handleMainFormCancelation(): void {
  mainForm.className = "form hide";
  addInputBtn.className = "";
  enableAllSubinputBtns();
}

function handleMainFormSubmit(e: Event): void {
  e.preventDefault();

  const questionInput = document.querySelector(
    "#form-main #question"
  ) as HTMLInputElement;
  const questionTypeSelect = document.querySelector(
    "#form-main #select-type"
  ) as HTMLSelectElement;

  const questionName = questionInput.value.trim();

  const selectedType = questionTypeSelect.value as QuestionType;

  if (questionName !== "") {
    addQuestion(questionName, selectedType);
  }

  questionInput.value = "";
  questionTypeSelect.value = "";

  mainForm.className = "form hide";
  addInputBtn.className = "";

  enableAllSubinputBtns();
}

// Mainform - showing and hiding

const mainForm = document.getElementById("form-main") as HTMLFormElement;

const addInputBtn = document.getElementById("add-input") as HTMLButtonElement;

addInputBtn.addEventListener("click", handleShowingInputForm);

// Main form add button

mainForm.addEventListener("submit", handleMainFormSubmit);

// handle cancel button

const mainCancelBtn = document.getElementById(
  "mainCancelBtn"
) as HTMLButtonElement;

mainCancelBtn.addEventListener("click", handleMainFormCancelation);

showOverview();
