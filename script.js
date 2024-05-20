//inisiasi soal dalam quiz
const questions = [
    {
        question: "Penggambaran secara diagram alir dari langkah -langkah prosedur dari suatu program",
        optionA: "Pengulangan",
        optionB: "Pseudecode",
        optionC: "Proses",
        optionD: "Flowchart",
        correctOption: "optionD"
    },

    {
        question: "Untuk menampilkan hasil yang sudah di input pada program C disebut...",
        optionA: "Input",
        optionB: "Output",
        optionC: "Proses",
        optionD: "Start",
        correctOption: "optionB"
    },

    {
        question: "Tipe data yang menyatakan TRUE FALSE dalam sebuah program adalah...",
        optionA: "Boolean",
        optionB: "String",
        optionC: "Char",
        optionD: "Int",
        correctOption: "optionA"
    },

    {
        question: "Sebuah perintah atau struktur yang terus mengulang agar mencapai suatu kondisi adalah...",
        optionA: "Sequence",
        optionB: " Looping",
        optionC: "Selection",
        optionD: "String",
        correctOption: "optionB"
    },

    {
        question: "Struktur ini memiliki dua kondisi if dan else untuk menentukan suatu kondisi adalah...",
        optionA: "Sequence",
        optionB: " Looping",
        optionC: "Selection",
        optionD: "String",
        correctOption: "optionC"
    },

    {
        question: "Data yang harus diberikan pada komputer disebut...",
        optionA: "Input",
        optionB: "Output",
        optionC: "Proses",
        optionD: "Start",
        correctOption: "optionA"
    },

    {
        question: "Deklarasi array dalam program C diberi tanda...",
        optionA: "{}",
        optionB: "?>",
        optionC: "//",
        optionD: "[]",
        correctOption: "optionD"
    },

    {
        question: "Yang tidak termasuk ke dalam struktur percabangan pada C adalah...",
        optionA: "for",
        optionB: "if else",
        optionC: "switch",
        optionD: "case",
        correctOption: "optionA"
    },

    {
        question: "Pernyataan yang berfungsi untuk menghentikan perulangan adalah...",
        optionA: "getch",
        optionB: "return0",
        optionC: "end",
        optionD: "break",
        correctOption: "optionD"
    },
    {
        question: "Untuk membuat komentar di dalam program C adalah...",
        optionA: "//",
        optionB: "&&",
        optionC: "{}",
        optionD: "**",
        correctOption: "optionA"
    }
]


let shuffledQuestions = [] //array kosong untuk menampung pertanyaan

function handleQuestions() { 
    //function memilih pertanyaan secara acak dan dimasukkan ke shuffledQuestions
    while (shuffledQuestions.length <= 5) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function menampilkan pertanyaan selanjutnya ke array
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //mengambil pertanyaan saat ini 
    const currentQuestionAnswer = currentQuestion.correctOption //mengambil jawaban pertanyaan saat ini 
    const options = document.getElementsByName("option"); //mendapatkan semua elemen di dom dengan nama 'option' 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //mendapatkan input yang benar dengan dengan jawaban yang benar
            correctOption = option.labels[0].id
        }
    })
   
    //memeriksa apakah user sudah memilih opsi dalam jawaban
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //memeriksa apakah jawaban yang dipilih user sudah sama dengan kunci jawaban
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //mengatur delay nomor pertanyaan hingga pertanyaan selanjutnya dimuat
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //mengatur delay nomor pertanyaan hingga pertanyaan selanjutnya dimuat
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//mengatur delay nomor pertanyaan hingga pertanyaan selanjutnya dimuat
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //tunda pertanyaan berikutnya ditampilkan 
    setTimeout(() => {
        if (indexNumber <= 4) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//mengatur latar belakang opsi kembali ke nol setelah menampilkan warna yang benar/salah
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

//hapus centang semua tombol radio untuk pertanyaan berikutnya
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

//periksa kondisi untuk komentar pemain dan warna komentar
function handleEndGame() {
    let remark = null
    let remarkColor = null
    const playerGrade = (playerScore / 5) * 100

    //data untuk ditampilkan ke papan skor
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//menutup modal skor dan mengatur ulang game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function untuk menutup modal peringatan
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}