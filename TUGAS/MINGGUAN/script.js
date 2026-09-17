const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");
const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");
const alertMessage = document.getElementById("alertMessage");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const formTitle = document.getElementById("formTitle");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function showAlert(message) {
  alertMessage.textContent = message;
  alertMessage.classList.add("show");

  setTimeout(function () {
    alertMessage.textContent = "";
    alertMessage.classList.remove("show");
  }, 3000);
}

function updateStatistics() {
  totalStudents.textContent = students.length;

  if (students.length === 0) {
    averageScore.textContent = "0";
    return;
  }

  let total = 0;

  for (let i = 0; i < students.length; i++) {
    total += students[i].score;
  }

  const average = total / students.length;
  averageScore.textContent = average.toFixed(1);
}

function renderStudents() {
  const keyword = searchInput.value.toLowerCase().trim();

  const filteredStudents = students.filter(function (student) {
    return student.name.toLowerCase().includes(keyword);
  });

  studentList.innerHTML = "";

  if (filteredStudents.length === 0) {
    studentList.innerHTML = `
      <div class="empty-state">
        Tidak ada data siswa.
      </div>
    `;

    updateStatistics();
    return;
  }

  for (let i = 0; i < filteredStudents.length; i++) {
    const student = filteredStudents[i];

    studentList.innerHTML += `
      <div class="student-item">
        <div class="student-info">
          <h3>${escapeHTML(student.name)}</h3>
          <p>Nilai: ${student.score}</p>
        </div>

        <div class="student-actions">
          <button
            type="button"
            class="edit-button"
            onclick="editStudent(${student.id})"
          >
            Ubah
          </button>

          <button
            type="button"
            class="delete-button"
            onclick="deleteStudent(${student.id})"
          >
            Hapus
          </button>
        </div>
      </div>
    `;
  }

  updateStatistics();
}

function addStudent(name, score) {
  const newStudent = {
    id: Date.now(),
    name: name,
    score: score
  };

  students.push(newStudent);

  saveStudents();
  renderStudents();
  studentForm.reset();

  showAlert(`Data siswa ${name} berhasil ditambahkan.`);
}

function editStudent(id) {
  const student = students.find(function (student) {
    return student.id === id;
  });

  if (!student) {
    return;
  }

  editId = id;

  studentName.value = student.name;
  studentScore.value = student.score;

  formTitle.textContent = "Edit Siswa";
  submitButton.textContent = "Update Siswa";
  cancelEditButton.hidden = false;

  studentName.focus();
}

function updateStudent() {
  const name = studentName.value.trim();
  const score = Number(studentScore.value);

  if (name === "") {
    alert("Nama siswa wajib diisi.");
    return;
  }

  if (score < 0 || score > 100 || studentScore.value === "") {
    alert("Nilai harus berada di antara 0 sampai 100.");
    return;
  }

  const student = students.find(function (student) {
    return student.id === editId;
  });

  if (!student) {
    return;
  }

  student.name = name;
  student.score = score;

  saveStudents();
  renderStudents();
  resetEditMode();

  showAlert(`Data siswa ${name} berhasil diperbarui.`);
}

function deleteStudent(id) {
  const student = students.find(function (student) {
    return student.id === id;
  });

  if (!student) {
    return;
  }

  const confirmed = confirm(
    `Apakah kamu yakin ingin menghapus siswa ${student.name}?`
  );

  if (!confirmed) {
    return;
  }

  students = students.filter(function (student) {
    return student.id !== id;
  });

  saveStudents();
  renderStudents();

  if (editId === id) {
    resetEditMode();
  }

  showAlert(`Data siswa ${student.name} berhasil dihapus.`);
}

function resetEditMode() {
  editId = null;
  studentForm.reset();

  formTitle.textContent = "Tambah Siswa";
  submitButton.textContent = "Tambah Siswa";
  cancelEditButton.hidden = true;
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = studentName.value.trim();
  const score = Number(studentScore.value);

  if (name === "") {
    alert("Nama siswa wajib diisi.");
    return;
  }

  if (studentScore.value === "" || score < 0 || score > 100) {
    alert("Nilai harus berada di antara 0 sampai 100.");
    return;
  }

  if (editId === null) {
    addStudent(name, score);
  } else {
    updateStudent();
  }
});

cancelEditButton.addEventListener("click", function () {
  resetEditMode();
});

searchInput.addEventListener("input", function () {
  renderStudents();
});

renderStudents();
