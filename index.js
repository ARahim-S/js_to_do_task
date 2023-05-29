//DOM ELEMENTS INITIALIZE
let task = JSON.parse(localStorage.getItem("task"))
  ? JSON.parse(localStorage.getItem("task"))
  : [];

const addButton = document.querySelector("#liveToastBtn");
const ulElement = document.querySelector("#list");
const userInput = document.querySelector("#task");

function randomNumber() {
  if (Math.ceil(Math.random() * 10) === 0) {
    return randomNumber();
  }
  return Math.ceil(Math.random() * 10);
}

userInput.addEventListener("input", function (e) {
  newTask = { id: randomNumber(), task: e.target.value };
});

addButton.addEventListener("click", addTask);

function addTask(e) {
  if (userInput.value.trim().length == 0) {
    alert("boş olmaz");
  } else {
    task = [...task, newTask];
    localStorage.setItem("task", JSON.stringify(task));
    let i = document.createElement("i");
    i.setAttribute("class", "bi bi-x-circle-fill iSet");
    i.classList.add("iSet");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${newTask.task}`));
    li.appendChild(i);
    ulElement.appendChild(li);
    userInput.value = "";
    getLiElement();
    getIconElement();
  }
}
function getLocalStorage() {
  let resultTask = JSON.parse(localStorage.getItem("task"));
  resultTask?.map((item) => {
    let i = document.createElement("i");
    i.setAttribute("class", "bi bi-x-circle-fill iSet");
    i.classList.add("iSet");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${item?.task}`));
    li.appendChild(i);
    ulElement.appendChild(li);
  });
  getLiElement();
  getIconElement();
}

function getLiElement() {
  let liElement = document.querySelectorAll("li");
  liElement.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.target.classList.toggle("done");
    });
  });
}
let modifiedTask = [];
function getIconElement() {
  const iconElements = document.querySelectorAll("i");
  iconElements.forEach((item) => {
    item.addEventListener("click", function (e) {
      this.parentElement.remove();
      console.log(task);
      modifiedTask = task.filter((a) => {
        return a.task !== this.parentElement.innerText;
      });

      localStorage.setItem("task", JSON.stringify(modifiedTask));
    });
  });
}

window.addEventListener("load", getLocalStorage);
