const addButton = document.getElementById("add-button");
const createModal = document.getElementById("create-modal");
const closeButtons = document.querySelectorAll(".close-button");
const createListButton = document.getElementById("create-list-button");
const createNoteButton = document.getElementById("create-note-button");
const listModal = document.getElementById("list-modal");
const listTitleInput = document.getElementById("list-title");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const validateListButton = document.getElementById("validate-list-button");
const cancelListButton = document.getElementById("cancel-list-button");
const noteModal = document.getElementById("note-modal");
const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const validateNoteButton = document.getElementById("validate-note-button");
const cancelNoteButton = document.getElementById("cancel-note-button");
const container = document.querySelector(".container");

let cards = [];

addButton.addEventListener("click", () => {
  createModal.style.display = "flex";
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.parentElement.style.display = "none";
  });
});

createListButton.addEventListener("click", () => {
  createModal.style.display = "none";
  listModal.style.display = "flex";
});

createNoteButton.addEventListener("click", () => {
  createModal.style.display = "none";
  noteModal.style.display = "flex";
});

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
    taskInput.value = "";
  }
});

validateListButton.addEventListener("click", () => {
  const title = listTitleInput.value.trim();
  const tasks = [];
  const taskItems = taskList.querySelectorAll("li");
  taskItems.forEach((item) => {
    tasks.push(item.textContent);
  });
  if (title !== "" && tasks.length > 0) {
    const card = createListCard(title, tasks);
    cards.unshift(card);
    container.insertBefore(card, addButton);
    resetListModal();
    listModal.style.display = "none";
  }
});

cancelListButton.addEventListener("click", () => {
  resetListModal();
  listModal.style.display = "none";
});

validateNoteButton.addEventListener("click", () => {
  const title = noteTitleInput.value.trim();
  const content = noteContentInput.value.trim();
  if (title !== "" && content !== "") {
    const card = createNoteCard(title, content);
    cards.unshift(card);
    container.insertBefore(card, addButton);
    resetNoteModal();
    noteModal.style.display = "none";
  }
});

cancelNoteButton.addEventListener("click", () => {
  resetNoteModal();
  noteModal.style.display = "none";
});

const createListCard = (title, tasks) => {
  const card = document.createElement("div");
  card.classList.add("card", "card-item");

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;
  card.appendChild(cardTitle);

  const taskList = document.createElement("ul");
  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
  });
  card.appendChild(taskList);

  const editButton = document.createElement("button");
  editButton.textContent = "Éditer";
  editButton.addEventListener("click", () => {
    editListCard(card, title, tasks);
  });
  card.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });
  card.appendChild(deleteButton);

  return card;
};

const createNoteCard = (title, content) => {
  const card = document.createElement("div");
  card.classList.add("card", "card-item");

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;
  card.appendChild(cardTitle);

  const cardContent = document.createElement("p");
  cardContent.textContent = content;
  card.appendChild(cardContent);

  const editButton = document.createElement("button");
  editButton.textContent = "Éditer";
  editButton.addEventListener("click", () => {
    editNoteCard(card, title, content);
  });
  card.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });
  card.appendChild(deleteButton);

  return card;
};

const editListCard = (card, title, tasks) => {
  listModal.style.display = "flex";
  listTitleInput.value = title;
  taskList.innerHTML = "";
  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.addEventListener("click", () => {
      taskItem.classList.toggle("completed");
    });
    taskList.appendChild(taskItem);
  });
  deleteCard(card);
};

const editNoteCard = (card, title, content) => {
  noteModal.style.display = "flex";
  noteTitleInput.value = title;
  noteContentInput.value = content;
  deleteCard(card);
};

const deleteCard = (card) => {
  const index = cards.indexOf(card);
  if (index !== -1) {
    cards.splice(index, 1);
    card.remove();
  }
};

const resetListModal = () => {
  listTitleInput.value = "";
  taskList.innerHTML = "";
  taskInput.value = "";
};

const resetNoteModal = () => {
  noteTitleInput.value = "";
  noteContentInput.value = "";
};
