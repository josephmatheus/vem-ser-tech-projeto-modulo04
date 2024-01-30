// Atualizar Data e Hora
setDate();
updateTime();

// Eventos abrir e fechar modal
const modalTitle = document.getElementById("modal-title");
document.querySelector(".add-task-btn").addEventListener("click", () => {
  modalTitle.innerHTML = "Nova tarefa";
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  openModal();
});
document.getElementById("close-modal-btn").addEventListener("click", () => {
  closeModal();
});

const tasksContainer = document.getElementById("task-list");
let taskId;
let tasks = [];

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const hour = document.getElementById("hour").value;

  const task = {
    title,
    category,
    hour,
    isComplete: false,
  };

  if (modalTitle.innerHTML === "Nova tarefa") {
    createTask(task);
  } else {
    saveEditTask(task, taskId);
  }
  closeModal();
});

function refreshList() {
  tasksContainer.innerHTML = "";
  tasks.map((task) => {
    tasksContainer.innerHTML += `
    <li class="task">
    <button class="check-btn">
    <i class="fa-regular fa-circle"></i>
    </button>
    <div class="task-info">
    <h3 class="task-title">${task.title}</h3>
    <p class="task-category">
    ${task.category}
    <span class="separator">
    <i class="fa-solid fa-circle"></i>
    </span>
    <i class="fa-regular fa-clock"></i>${task.hour}
    </p>
    </div>
    <div class="task-buttons">
    <button class="edit-btn" onclick="editTask('${task._id}')">
    <i class="fa-solid fa-pen"></i>
    </button>
    <button class="delete-btn" onclick="removeTask('${task._id}')">
    <i class="fa-solid fa-trash"></i>
    </button>
    </div>
    </li>
    `;
  });
}

function getTasks() {
  findTasks()
    .then((data) => {
      tasks = data;
      refreshList();
      addEventToCheckButtons();
    })
    .catch((error) => {
      console.error(error);
    });
}

getTasks();

function createTask(task) {
  addTask(task)
    .then(() => {
      getTasks();
    })
    .catch((error) => {
      console.error("Erro ao adicionar tarefa: ", error);
    });
}

function removeTask(id) {
  delTask(id)
    .then(() => {
      getTasks();
    })
    .catch((error) => {
      console.error("Erro ao excluir tarefa: ", error);
    });
}

function editTask(id) {
  findTaskById(id).then((task) => {
    taskId = task._id;
    setFormData(task);
    modalTitle.innerHTML = "Editar tarefa";
    openModal();
  });
}

function setFormData(task) {
  document.getElementById("title").value = task.title;
  document.getElementById("category").value = task.category;
  document.getElementById("hour").value = task.hour;
}

function saveEditTask(task, id) {
  updateTask(task, id)
    .then(() => {
      getTasks();
      refreshList();
    })
    .catch((error) => {
      console.error("Erro ao editar tarefa: ", error);
    });
}
