import { createSubinput } from "./store.js";
const subForm = document.querySelector("#form-sub");
subForm.addEventListener("submit", handleSubformSubmit);
const addInputBtn = document.getElementById("add-input");
/// onSubmit
function handleSubformSubmit(e) {
    var _a, _b;
    e.preventDefault();
    const parentId = Number((_a = subForm.attributes.getNamedItem("parentId")) === null || _a === void 0 ? void 0 : _a.value);
    const questionType = (_b = subForm.attributes.getNamedItem("questionType")) === null || _b === void 0 ? void 0 : _b.value;
    const questionInput = document.querySelector("#form-sub #question");
    const selectQuestionType = document.querySelector("#form-sub #select-type");
    const selectConditionType = document.querySelector(".form-control select#condition");
    const condition = selectConditionType.value;
    const valueToCondition = document.querySelector(questionType === "binary"
        ? ".form-control select#value"
        : ".form-control input#value");
    const value = valueToCondition.value.trim();
    const questionName = questionInput.value.trim();
    const selectedType = selectQuestionType.value;
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
export function disableAllSubinputBtns() {
    const allAddSubinputBtns = document.querySelectorAll("#subinputBtn");
    Array.from(allAddSubinputBtns).forEach((subinputBtn) => {
        subinputBtn.setAttribute("disabled", "");
    });
}
export function enableAllSubinputBtns() {
    const allAddSubinputBtns = document.querySelectorAll("#subinputBtn");
    Array.from(allAddSubinputBtns).forEach((subinputBtn) => {
        subinputBtn.removeAttribute("disabled");
    });
}
export function handleSubinputFormShowing(e) {
    var _a, _b;
    disableAllSubinputBtns();
    const subForm = document.querySelector("#form-sub");
    const btnClicked = e.target;
    const parentElement = btnClicked.parentElement;
    if (!parentElement)
        return;
    const questionId = parentElement.id;
    const questionType = (_a = Array.from(parentElement.children).find((child) => child.classList.contains("type"))) === null || _a === void 0 ? void 0 : _a.textContent;
    const conditionalInput = createInputBasedOnType(questionType);
    subForm.insertBefore(conditionalInput, subForm.firstChild);
    addInputBtn.className = "hide";
    subForm.className = "form";
    subForm.setAttribute("parentId", questionId);
    subForm.setAttribute("questionType", questionType);
    (_b = document.querySelector("body")) === null || _b === void 0 ? void 0 : _b.scrollIntoView();
}
// handle cancle button
function handleSubFormCancelation() {
    const subForm = document.querySelector("#form-sub");
    // cleaning up
    subForm.firstChild && subForm.removeChild(subForm.firstChild);
    subForm.removeAttribute("parentId");
    subForm.removeAttribute("questionType");
    // hiding form
    subForm.className = "form hide";
    addInputBtn.className = "";
    enableAllSubinputBtns();
}
const subCancelBtn = document.getElementById("subCancelBtn");
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
function createInputBasedOnType(type) {
    const formControl = document.createElement("div");
    formControl.className = "form-control";
    formControl.id = "conditional";
    formControl.innerHTML = FormControlforType[type];
    return formControl;
}
