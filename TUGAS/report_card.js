console.log("=========================================");
console.log("\t  DATA - DATA RAHASIA");
console.log("=========================================");
const tanggal = new Date();
console.log("\tTANGGAL LAPORAN " + tanggal.getMonth() + "/" + tanggal.getDate() + "/" + tanggal.getFullYear());
console.log("\t   JAM LAPORAN " + tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds());

const students = [
  {
    name: "Abdulloh",
    className: "XI RPL A",
    scores: [80, 90, 85],
    attendance: 90,
    hasViolation: false,
  },
  {
    name: "Ahmad",
    className: "XI RPL A",
    scores: [70, 75, 80],
    attendance: 85,
    hasViolation: false,
  },
  {
    name: "Muhammad",
    className: "XI RPL A",
    scores: [60, 65, 70],
    attendance: 75,
    hasViolation: true,
  },
];

let totalPassed = 0;
let totalFailed = 0;
let highestAverage = 0;
let highestStudent = "";

for (let i = 0; i < students.length; i++) {
  let total = 0;

  for (let j = 0; j < students[i].scores.length; j++) {
    total += students[i].scores[j];
  }

  let average = total / students[i].scores.length;

  let grade;

  if (average >= 90) {
    grade = "A";
  } else if (average >= 80) {
    grade = "B";
  } else if (average >= 70) {
    grade = "C";
  } else {
    grade = "D";
  }

  let status;

  if (average >= 75 && students[i].attendance >= 80 && !students[i].hasViolation) {
    status = "LULUS";
    totalPassed++;
  } else {
    status = "BELUM LULUS";
    totalFailed++;
  }

  if (average > highestAverage) {
    highestAverage = average;
    highestStudent = students[i].name;
  }

  console.log(`
    Student #${i + 1}
    Nama        : ${students[i].name}
    Kelas       : ${students[i].className}
    Nilai       : ${students[i].scores}
    Total       : ${total}
    Rata-rata   : ${average}
    Grade       : ${grade}
    Kehadiran   : ${students[i].attendance}%
    Pelanggaran : ${students[i].hasViolation}
    Status      : ${status}
`);
}

console.log(`
   Jumlah LULUS       : ${totalPassed}
   Jumlah BELUM LULUS : ${totalFailed}
   Nilai tertinggi    : ${highestStudent} (${highestAverage})
`);
