document.addEventListener("DOMContentLoaded", () => {
  const ADD_NAME = document.querySelector("#add-name");
  const VALUE = document.querySelector("#name");
  const ADD_GOAL = document.querySelector("#add-goal");
  const VALUE_GOAL = document.querySelector("#goal-name");

  chrome.storage.local.get(["name", "goal-name"], (result) => {
    VALUE.value = result.name || "";
    VALUE_GOAL.value = result["goal-name"] || "";
  });

  ADD_NAME.addEventListener("click", (e) => {
    const newValue = VALUE.value;
    chrome.storage.local.set({ name: newValue }, () => {
      console.log("Nom sauvegardé :", newValue);
    });
  });

  const removeSpecificKey = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeToMidnight = tomorrow - now;

    setTimeout(() => {
      chrome.storage.local.remove("goal-name", () => {
        console.log("Objectif supprimé à minuit");
      });
    }, timeToMidnight);
  };
  removeSpecificKey();

  ADD_GOAL.addEventListener("click", (e) => {
    e.preventDefault();
    const newValue = VALUE_GOAL.value;
    chrome.storage.local.set({ "goal-name": newValue }, () => {
      console.log("Objectif sauvegardé :", newValue);
    });
  });
});
