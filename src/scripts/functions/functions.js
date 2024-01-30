function addEventToCheckButtons() {
  const checkBtns = document.querySelectorAll(".check-btn");
  checkBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("complete");
      if (btn.parentElement.classList.contains("complete")) {
        btn.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
      } else {
        btn.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      }
    });
  });
}

function getFormattedDate(date) {
  const systemDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

  const systemHour = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
  }).format(date);

  const currentTime = {
    date: systemDate,
    hour: systemHour,
  };
  return currentTime;
}

function setDate() {
  const currentTime = getFormattedDate(new Date());

  const hour = document.querySelector(".system-hour");
  const date = document.querySelector(".system-date");

  hour.innerText = `${currentTime.hour}`;
  date.innerText = `${currentTime.date}`;
}

function openModal() {
  const modal = document.querySelector(".modal-container");
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
  }
}

function closeModal() {
  const modal = document.querySelector(".modal-container");
  if (!modal.classList.contains("hide")) {
    modal.classList.add("hide");
  }
}

function updateTime() {
  setInterval(() => {
    setDate();
  }, 1000);
}
