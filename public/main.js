import { addQuestion } from "./store.js";
import { showOverview } from "./overview.js";
import "./subForm.js";
import { disableAllSubinputBtns, enableAllSubinputBtns } from "./subForm.js";
function handleShowingInputForm() {
    disableAllSubinputBtns();
    mainForm.className = "form";
    addInputBtn.className = "hide";
}
function handleMainFormCancelation() {
    mainForm.className = "form hide";
    addInputBtn.className = "";
    enableAllSubinputBtns();
}
function handleMainFormSubmit(e) {
    e.preventDefault();
    const questionInput = document.querySelector("#form-main #question");
    const questionTypeSelect = document.querySelector("#form-main #select-type");
    const questionName = questionInput.value.trim();
    const selectedType = questionTypeSelect.value;
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
const mainForm = document.getElementById("form-main");
const addInputBtn = document.getElementById("add-input");
addInputBtn.addEventListener("click", handleShowingInputForm);
// Main form add button
mainForm.addEventListener("submit", handleMainFormSubmit);
// handle cancel button
const mainCancelBtn = document.getElementById("mainCancelBtn");
mainCancelBtn.addEventListener("click", handleMainFormCancelation);
showOverview();
