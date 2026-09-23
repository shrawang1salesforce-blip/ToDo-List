const tasks = [];

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");

function renderTasks() {
  list.replaceChildren();

  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = "task-item";
    item.dataset.index = index;
    item.innerHTML = `
      <span class="task-text"></span>
      <button class="delete-button" type="button" data-action="delete">Remove</button>
    `;
    item.querySelector(".task-text").textContent = task;
    list.append(item);
  });

  const taskLabel = tasks.length === 1 ? "task" : "tasks";
  count.textContent = `${tasks.length} ${taskLabel}`;
  emptyMessage.hidden = tasks.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = input.value.trim();
  if (!task) return;

  tasks.push(task);
  input.value = "";
  renderTasks();
  input.focus();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="delete"]');
  if (!button) return;

  const item = button.closest(".task-item");
  tasks.splice(Number(item.dataset.index), 1);
  renderTasks();
});

renderTasks();
