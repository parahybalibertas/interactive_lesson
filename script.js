const correctMessages = [
    "That's right!", "You got it!", "Well done!", "Great job!", "Correct!",
    "Keep it up!", "Nicely done!", "Excellent!", "Perfect!", "You nailed it!"
];

let correctCount = 0;

const words = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

words.forEach(word => {
    word.addEventListener("dragstart", dragStart);
    word.addEventListener("dragend", dragEnd);
});

dropzones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("dragenter", dragEnter);
    zone.addEventListener("dragleave", dragLeave);
    zone.addEventListener("drop", drop);
});

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
    e.dataTransfer.setData("text/id", e.target.id);
    setTimeout(() => e.target.classList.add("dragging"), 0);
}

function dragEnd(e) {
    e.target.classList.remove("dragging");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
}

function dragLeave(e) {
    e.target.classList.remove("drag-over");
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove("drag-over");
    const draggedText = e.dataTransfer.getData("text/plain");
    const correctAnswer = e.target.getAttribute("data-answer");
    const draggedElement = document.getElementById(e.dataTransfer.getData("text/id"));

    if (draggedText === correctAnswer) {
        e.target.textContent = draggedText;
        e.target.classList.add("correct");
        e.target.setAttribute("draggable", "false");
        draggedElement.remove();
        correctCount++;
        document.getElementById("correct-count").textContent = `${correctCount}/10`;
        alert(correctMessages[Math.floor(Math.random() * correctMessages.length)]);
    } else {
        draggedElement.classList.remove("dragging");
        e.target.classList.add("incorrect");
        setTimeout(() => e.target.classList.remove("incorrect"), 1000);
        setTimeout(() => draggedElement.style.visibility = 'visible', 1000); // Ensure the dragged element is visible again after jiggling
        alert("Wrong answer. Try again.");
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const words = document.querySelectorAll(".word");
    const dropzones = document.querySelectorAll(".dropzone");
    let correctCount = 0;

    words.forEach(word => {
        word.addEventListener("dragstart", dragStart);
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener("dragover", dragOver);
        dropzone.addEventListener("drop", drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData("text", e.target.textContent);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const droppedWord = e.dataTransfer.getData("text");
        const correctWords = e.target.closest(".sentence").dataset.correct.split(",");

        if (correctWords.includes(droppedWord) && !e.target.classList.contains("filled")) {
            e.target.textContent = droppedWord;
            e.target.classList.add("correct", "filled");
            e.target.classList.remove("dropzone");

            correctCount++;
            document.getElementById("correct-count").textContent = correctCount;

        } else {
            e.target.classList.add("incorrect");
            setTimeout(() => {
                e.target.classList.remove("incorrect");
            }, 500);
            const sentence = e.target.closest(".sentence");
            sentence.classList.add("wrong");
            setTimeout(() => {
                sentence.classList.remove("wrong");
            }, 500);
        }
    }
    const verbInputs = document.querySelectorAll('.verb-input');
    let verbCorrectCount = 0;
    
    verbInputs.forEach(input => {
        input.addEventListener('blur', (event) => {
            const userAnswer = event.target.value.trim().toLowerCase();
            const correctAnswer = event.target.dataset.answer.toLowerCase();
            if (userAnswer === correctAnswer) {
                event.target.classList.add('correct');
                event.target.classList.remove('incorrect');
                event.target.disabled = true; // prevent further changes
                verbCorrectCount++;
                document.getElementById('verb-correct-count').innerText = verbCorrectCount;
            } else {
                event.target.classList.add('incorrect');
                event.target.classList.remove('correct');
                event.target.value = ''; // clear the incorrect answer
            }
        });
    });
});
