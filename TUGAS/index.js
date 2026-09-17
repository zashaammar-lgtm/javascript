// ========================================
// Student Data Processor
// Nama   : [ISI NAMA KAMU]
// Kelas  : XI [ISI KELAS KAMU]
// ========================================


// ========================================
// 📦 RAW DATA
// ========================================

const studentName = "  aHmAd fAuZaN  ";
const ageText = "17 tahun";
const scoreText = "85.678";
const registrationText = "21-08-2026";


// ========================================
// 🧹 PART 1 — CLEAN THE NAME
// ========================================

// Menghapus spasi di awal dan akhir
const trimmedName = studentName.trim();

// Mengubah semua huruf menjadi kecil
const lowerName = trimmedName.toLowerCase();

// Memisahkan nama menjadi array
const nameArray = lowerName.split(" ");

// Membuat setiap kata menjadi huruf kapital di awal
const cleanNameArray = nameArray.map(function (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
});

// Menggabungkan kembali array menjadi string
const cleanName = cleanNameArray.join(" ");



const username = cleanName
    .toLowerCase()
    .split(" ")
    .join(".");



// Mengecek apakah nama mengandung Ahmad
const containsAhmad = cleanName.includes("Ahmad");

// Mengambil 5 karakter pertama
const firstFiveChars = cleanName.slice(0, 5);

// Mengganti Ahmad menjadi Budi
const replacementName = cleanName.replace("Ahmad", "Budi");



// Mengambil angka dari "17 tahun"
const age = parseInt(ageText);

// Mengambil tahun sekarang
const currentYear = new Date().getFullYear();

// Menghitung tahun lahir
const birthYear = currentYear - age;



// Mengubah String menjadi Number
const score = parseFloat(scoreText);

// Format menjadi 2 angka di belakang koma
const formattedScore = score.toFixed(2);

// Pembulatan
const roundedScore = Math.round(score);
const floorScore = Math.floor(score);
const ceilScore = Math.ceil(score);



let grade;

if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "E";
}



// Memisahkan tanggal
const registrationArray = registrationText.split("-");

// Mengubah setiap bagian menjadi Number
const registrationDay = Number(registrationArray[0]);
const registrationMonth = Number(registrationArray[1]);
const registrationYear = Number(registrationArray[2]);



const now = new Date();

const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const day = now.getDay();
const hours = now.getHours();
const minutes = now.getMinutes();

// Menambahkan 0 jika angka kurang dari 10
const formattedTime =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0");



function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
}



// Random angka 1 sampai 6
const dice = Math.floor(Math.random() * 6) + 1;

let diceResult;

if (dice === 6) {
    diceResult = "🔥 JACKPOT!";
} else if (dice === 1) {
    diceResult = "💀 BAD LUCK!";
} else {
    diceResult = "😎 GOOD LUCK!";
}



let status;

if (score >= 75) {
    status = "LULUS";
} else {
    status = "BELUM LULUS";
}


// ========================================
// 🖥️ PART 10 — FINAL REPORT
// ========================================

console.log(`
╔════════════════════════════════════╗
║      🎓 STUDENT DATA PROCESSOR     ║
╚════════════════════════════════════╝

👤 STUDENT
────────────────────────────────────
Original Name : "${studentName}"
Clean Name    : ${cleanName}
Username      : ${username}

🔎 NAME ANALYSIS
────────────────────────────────────
Contains Ahmad : ${containsAhmad}
First 5 chars  : ${firstFiveChars}
Replacement    : ${replacementName}

🎂 AGE
────────────────────────────────────
Age Text       : ${ageText}
Age            : ${age}
Birth Year     : ${birthYear}

📊 SCORE
────────────────────────────────────
Original Score : ${scoreText}
Formatted      : ${formattedScore}
Round          : ${roundedScore}
Floor          : ${floorScore}
Ceil           : ${ceilScore}
Grade          : ${grade}
Status         : ${status}

📅 REGISTRATION
────────────────────────────────────
Date           : ${registrationDay}/${String(registrationMonth).padStart(2, "0")}/${registrationYear}

🕐 REPORT GENERATED
────────────────────────────────────
Year           : ${year}
Month          : ${month}
Date           : ${date}
Day            : ${day}
Time           : ${formattedTime}

📅 Report Date : ${formatDate(now)}

🎲 LUCKY DICE
────────────────────────────────────
Dice           : ${dice}
Result         : ${diceResult}

╔════════════════════════════════════╗
║       🚀 PROCESS COMPLETE!         ║
╚════════════════════════════════════╝
`);