import { data } from "./store.js";
import { Question, Subquestion } from "./store";
import { handleSubinputFormShowing } from "./subForm.js";
import { showResult } from "./result.js";

// Genereting HTML

function generateOverviewItemHTML(question: Question): string {
  return `
  <ul>
  <li id="${question.id}">
    Question:<span class="question">${
      question.name
    }</span>  Type:<span class="type">${question.type}</span>
    <button id="subinputBtn">Add subinput</button>
  </li>
  ${
    question.subinputs &&
    question.subinputs
      .map((subinputId) => data.subquestions[subinputId])
      .map((subinput) => generateOverviewSubitemHTML(subinput))
      .join("")
  }
  </ul>
  `;
}

function generateOverviewSubitemHTML(subinput: Subquestion): string {
  return `
    <ul>
    <li id="${subinput.id}" parentId="${subinput.parentId}">
      Question:<span class="question">${subinput.name}</span>
        Type:<span class="type">${subinput.type}</span>
         Condition: <span class="condition">${subinput.condition}</span>
          Value: <span class="value">${subinput.answer}</span>
      <button id="subinputBtn">Add Subinput</button>
    </li>
    ${
      subinput.subinputs &&
      subinput.subinputs
        .map((subinputId) => data.subquestions[subinputId])
        .map((subinput) => generateOverviewSubitemHTML(subinput))
        .join("")
    }
    </ul>
    `;
}

export function showOverview(): void {
  const overviewContainer = document.querySelector("#overview");
  if (!overviewContainer) return;

  overviewContainer.innerHTML = Object.values(data.questions)
    .map((question: Question) => generateOverviewItemHTML(question))
    .join("");

  const allSubinputBtns = document.querySelectorAll("#subinputBtn");

  Array.from(allSubinputBtns).forEach((subinputBtn) => {
    subinputBtn.addEventListener("click", handleSubinputFormShowing);
  });

  showResult();
}
