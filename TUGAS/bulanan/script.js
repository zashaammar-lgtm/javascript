const candidates = [
    { id: "game", name: "Mini Game", votes: 0 },
    { id: "store", name: "Mini Store", votes: 0 },
    { id: "todo", name: "To-Do App", votes: 0 },
    { id: "quiz", name: "Quiz App", votes: 0 }
];

function updateVote() {

    let total = 0;

    // Menghitung total vote
    for (let i = 0; i < candidates.length; i++) {
        total += candidates[i].votes;
    }

    // Menampilkan total vote
    document.getElementById("totalVotesText").textContent = total;


    // Menampilkan vote dan persentase
    for (let i = 0; i < candidates.length; i++) {

        let candidate = candidates[i];

        let percentage = 0;

        if (total > 0) {
            percentage = Math.round(
                candidate.votes / total * 100
            );
        }

        document.getElementById(
            "votes-" + candidate.id
        ).textContent = candidate.votes;

        document.getElementById(
            "percent-" + candidate.id
        ).textContent = percentage + "%";

        document.getElementById(
            "bar-" + candidate.id
        ).style.width = percentage + "%";
    }


    // Mencari project dengan vote terbanyak
    let leader = candidates[0];

    for (let i = 1; i < candidates.length; i++) {

        if (candidates[i].votes > leader.votes) {
            leader = candidates[i];
        }
    }

    document.getElementById("leaderTitle").textContent =
        leader.name;

    document.getElementById("leaderDesc").textContent =
        leader.votes + " vote - menjadi yang terbanyak";
}


// Tombol vote
for (let i = 0; i < candidates.length; i++) {

    let button = document.getElementById(
        "btn-" + candidates[i].id
    );

    button.addEventListener("click", function() {

        candidates[i].votes++;

        updateVote();
    });
}


// Tombol reset
document.getElementById("resetBtn").addEventListener("click", function() {

    for (let i = 0; i < candidates.length; i++) {
        candidates[i].votes = 0;
    }

    updateVote();
});


// Menjalankan program pertama kali
updateVote();