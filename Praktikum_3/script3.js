// DOM JS
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");
  const newTaskInput = document.getElementById("newTask");
  const fontSlider = document.getElementById("fontslider");
  const sizeValue = document.getElementById("sizevalue");
  const fontStyleSelect = document.getElementById("fontStyleSelect");
  const bgColorInput = document.getElementById("bgcolor");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkLightModeLabel = document.getElementById("spanDoL");
  const container = document.querySelector(".container");
  let isDarkMode = false;
  let customBgColor = "";

  // Fungsi untuk menambahkan tugas baru
  function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === "") {
      alert("Please write something!");
      return;
    }

    const listItem = document.createElement("li");

    // Membuat checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";

    // Menambahkan event listener untuk checkbox
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        checkbox.style.backgroundColor = "black";
        taskLabel.classList.add("completed");
      } else {
        taskLabel.classList.remove("completed");
      }
    });

    listItem.appendChild(checkbox);

    // Membuat label tugas
    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;
    taskLabel.style.borderBottom = "1px solid black";
    taskLabel.style.display = "inline-block";
    taskLabel.style.width = "15.625em";
    taskLabel.style.marginRight = "10px";
    listItem.appendChild(taskLabel);

    // Membuat ikon edit
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-square-pen";
    editIcon.onclick = () => editTask(taskLabel);
    listItem.appendChild(editIcon);

    // Membuat ikon hapus
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-square-minus";
    deleteIcon.onclick = () => deleteTask(listItem);
    listItem.appendChild(deleteIcon);

    // Menambahkan tugas baru ke daftar tugas
    taskList.appendChild(listItem);
    newTaskInput.value = "";
  }

  // Fungsi untuk mengedit tugas
  function editTask(taskLabel) {
    const newTaskText = prompt("Edit tugas Anda:", taskLabel.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskLabel.textContent = newTaskText.trim();
    }
  }

  // Fungsi untuk menghapus tugas
  function deleteTask(listItem) {
    taskList.removeChild(listItem);
  }

  // Fungsi untuk menerapkan warna background tergantung pada mode
  function applyBackgroundColor() {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#0C0C0C";
      container.style.backgroundColor = "#191A19";
      container.style.color = "white";
      newTaskInput.style.color = "white";
      newTaskInput.style.backgroundColor = "#333";
    } else {
      document.body.style.backgroundColor = customBgColor || "white";
      container.style.backgroundColor = "white";
      container.style.color = "black";
      newTaskInput.style.color = "black";
      newTaskInput.style.backgroundColor = "white";
    }
  }

  // Event listeners
  addButton.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Mengubah ukuran font
  fontSlider.addEventListener("input", function () {
    const Size = fontSlider.value + "px";
    sizeValue.textContent = Size;
    document.body.style.fontSize = Size;
  });

  // Mengubah gaya font
  fontStyleSelect.addEventListener("change", function () {
    document.body.style.fontFamily = fontStyleSelect.value;
  });

  // Event listener untuk mengaktifkan atau menonaktifkan dark mode
  darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
      isDarkMode = true;
      darkLightModeLabel.textContent = "Light Mode";
    } else {
      isDarkMode = false; // Nonaktifkan dark mode
      darkLightModeLabel.textContent = "Dark Mode";
    }
    applyBackgroundColor();
  });

  // Event listener untuk mengubah warna background melalui color picker
  bgColorInput.addEventListener("input", function () {
    customBgColor = bgColorInput.value;
    if (!isDarkMode) {
      applyBackgroundColor();
    }
  });
});
