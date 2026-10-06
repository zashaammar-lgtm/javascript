console.log('==========================');
console.log('HSI STUDENT MANAGEMENT');
console.log('==========================');

// Ambil data dari LocalStorage.
// Kalau belum ada data, gunakan array kosong.
let students = JSON.parse(localStorage.getItem('students')) || [];

// Menyimpan id siswa yang sedang diedit.
// null berarti sedang dalam mode Tambah.
let editId = null;

// Mengambil elemen HTML
const studentList = document.getElementById('studentList');
const studentForm = document.getElementById('studentForm');
const studentName = document.getElementById('studentName');
const studentScore = document.getElementById('studentScore');
const totalStudents = document.getElementById('totalStudents');
const averageScore = document.getElementById('averageScore');
const alertMessage = document.getElementById('alertMessage');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');
const searchInput = document.getElementById('searchInput');

// Menyimpan array students ke LocalStorage
function saveStudents() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Menampilkan pesan sukses
function showAlert(message) {
  alertMessage.textContent = message;
  alertMessage.className = 'alert success show';

  setTimeout(() => {
    alertMessage.textContent = '';
    alertMessage.className = 'alert';
  }, 3000);
}

// Mengubah mode form kembali menjadi Tambah
function resetForm() {
  editId = null;
  studentForm.reset();

  formTitle.textContent = '➕ Tambah Siswa';
  submitBtn.textContent = '➕ Tambah Siswa';
  cancelBtn.hidden = true;
}

// Menghitung total dan rata-rata
function updateStats() {
  totalStudents.textContent = students.length;

  if (students.length === 0) {
    averageScore.textContent = '0';
    return;
  }

  let total = 0;

  for (let i = 0; i < students.length; i++) {
    total += Number(students[i].score);
  }

  const average = total / students.length;
  averageScore.textContent = average.toFixed(1);
}

// Menampilkan daftar siswa ke halaman
function renderStudentList() {
  studentList.innerHTML = '';

  const keyword = searchInput.value.toLowerCase().trim();

  const filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().includes(keyword);
  });

  if (filteredStudents.length === 0) {
    studentList.innerHTML = "<div class='empty'>Belum ada data siswa</div>";
    updateStats();
    return;
  }

  for (let i = 0; i < filteredStudents.length; i++) {
    const student = filteredStudents[i];

    studentList.innerHTML += `
      <div class="student-item">
        <div class="student-name">
          <span class="student-number">${students.indexOf(student) + 1}.</span>
          ${escapeHTML(student.name)}
        </div>

        <div class="score">${student.score}</div>

        <div class="action-buttons">
          <button class="edit-btn" type="button" data-id="${student.id}">✏️ Ubah</button>
          <button class="delete-btn" type="button" data-id="${student.id}">🗑️ Hapus</button>
        </div>
      </div>
    `;
  }

  updateStats();
}

// Menambah siswa
function addStudent() {
  const name = studentName.value.trim();
  const score = Number(studentScore.value);

  if (name === '') {
    alert('Nama siswa wajib diisi.');
    return;
  }

  if (studentScore.value === '' || score < 0 || score > 100) {
    alert('Nilai harus berada di antara 0 sampai 100.');
    return;
  }

  const newStudent = {
    id: Date.now(),
    name: name,
    score: score
  };

  students.push(newStudent);

  saveStudents();
  renderStudentList();
  resetForm();

  showAlert(`✅ Data siswa ${name} berhasil ditambahkan.`);
}

// Memasukkan data siswa ke form untuk diedit
function editStudent(id) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    return;
  }

  editId = id;

  studentName.value = student.name;
  studentScore.value = student.score;

  formTitle.textContent = '✏️ Edit Siswa';
  submitBtn.textContent = '💾 Update Siswa';
  cancelBtn.hidden = false;

  studentName.focus();
}

// Mengupdate siswa
function updateStudent() {
  const name = studentName.value.trim();
  const score = Number(studentScore.value);

  if (name === '') {
    alert('Nama siswa wajib diisi.');
    return;
  }

  if (studentScore.value === '' || score < 0 || score > 100) {
    alert('Nilai harus berada di antara 0 sampai 100.');
    return;
  }

  const student = students.find((student) => student.id === editId);

  if (!student) {
    return;
  }

  student.name = name;
  student.score = score;

  saveStudents();
  renderStudentList();
  resetForm();

  showAlert(`🔄 Data siswa ${name} berhasil diperbarui.`);
}

// Menghapus siswa setelah confirm
function deleteStudent(id) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    return;
  }

  const confirmed = confirm(`Apakah kamu yakin ingin menghapus siswa ${student.name}?`);

  if (!confirmed) {
    return;
  }

  students = students.filter((student) => student.id !== id);

  saveStudents();
  renderStudentList();

  // Kalau siswa yang dihapus sedang diedit, batalkan mode edit.
  if (editId === id) {
    resetForm();
  }

  showAlert(`🗑️ Data siswa ${student.name} berhasil dihapus.`);
}

// Supaya nama siswa yang ditampilkan aman dari HTML injection
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Submit form: menentukan Add atau Update
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (editId === null) {
    addStudent();
  } else {
    updateStudent();
  }
});

// Tombol Batal Edit
cancelBtn.addEventListener('click', () => {
  resetForm();
});

// Tombol Ubah dan Hapus dibuat dinamis,
// jadi event ditangani melalui parent studentList.
studentList.addEventListener('click', (e) => {
  const button = e.target.closest('button');

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);

  if (button.classList.contains('edit-btn')) {
    editStudent(id);
  }

  if (button.classList.contains('delete-btn')) {
    deleteStudent(id);
  }
});

// Search tanpa refresh halaman
searchInput.addEventListener('input', () => {
  renderStudentList();
});

// Render pertama kali saat halaman dibuka
renderStudentList();
