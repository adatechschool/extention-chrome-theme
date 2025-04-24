const ADD_NAME = document.querySelector("#add-name");
const VALUE = document.querySelector("#name");
const USER_NAME = document.querySelector("#username");

const ADD_GOAL = document.querySelector("#add-goal");
const VALUE_GOAL = document.querySelector("#goal-name");
const GOAL = document.querySelector("#goal");

const FORM_NAME = document.querySelector("#form-name");
const FORM_GOAL = document.querySelector("#form-goal");

const getUserName = () => {
  ADD_NAME.addEventListener("click", () => {
    const newValue = VALUE.value;
    localStorage.setItem("name", newValue);
  });

  const storedName = localStorage.getItem("name");

  if (storedName === null || storedName === "") {
    USER_NAME.textContent = "Visiteur";
    FORM_NAME.style.display = "block";
  } else {
    USER_NAME.textContent = storedName;
    FORM_NAME.style.display = "none";
  }
};
getUserName();

const removeSpecificKey = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const timeToMidnight = tomorrow - now;

  setTimeout(() => {
    localStorage.removeItem("goal-name");
    addedGoal();
  }, timeToMidnight);
};

const addedGoal = () => {
  ADD_GOAL.addEventListener("click", () => {
    const newValue = VALUE_GOAL.value;
    localStorage.setItem("goal-name", newValue);
  });

  const goalName = localStorage.getItem("goal-name");

  if (goalName === null || goalName === "") {
    GOAL.textContent = "Aucun objectif aujourd'hui :'(";
    FORM_GOAL.style.display = "block";
  } else {
    GOAL.textContent = goalName;
    FORM_GOAL.style.display = "none";
  }
  removeSpecificKey();
};
addedGoal();
