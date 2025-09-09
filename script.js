// Game state
let currentLevel = 1
let score = 0
let currentRound = 1
let gameData = []
let selectedAnswer = null

// Image data for different levels (using placeholder images)
const levelImages = {
  1: [
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
  ],
  2: [
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
    { fake: "/placeholder.svg?height=200&width=200", real: "/placeholder.svg?height=200&width=200" },
  ],
}

// Generate images for levels 3-10 (similar pattern with increasing difficulty)
for (let level = 3; level <= 10; level++) {
  levelImages[level] = [
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge1`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo1`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge2`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo2`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge3`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo3`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge4`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo4`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge5`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo5`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge6`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo6`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge7`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo7`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge8`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo8`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge9`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo9`,
    },
    {
      fake: `/placeholder.svg?height=200&width=200&query=fake+AI+level${level}+challenge10`,
      real: `/placeholder.svg?height=200&width=200&query=real+level${level}+photo10`,
    },
  ]
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")
}

function showStart() {
  showScreen("startScreen")
}

function showLevelSelect() {
  showScreen("levelScreen")
}

function startGame(level) {
  currentLevel = level
  score = 0
  currentRound = 1

  // Shuffle the images for this level
  gameData = [...levelImages[level]].sort(() => Math.random() - 0.5)

  document.getElementById("currentLevel").textContent = level
  document.getElementById("score").textContent = score

  showScreen("gameScreen")
  loadRound()
}

function loadRound() {
  if (currentRound > 10) {
    endGame()
    return
  }

  const roundData = gameData[currentRound - 1]
  const leftImage = document.getElementById("leftImage")
  const rightImage = document.getElementById("rightImage")

  // Randomly decide which side gets the fake image
  const fakeOnLeft = Math.random() < 0.5

  if (fakeOnLeft) {
    leftImage.src = roundData.fake
    rightImage.src = roundData.real
    leftImage.dataset.type = "fake"
    rightImage.dataset.type = "real"
  } else {
    leftImage.src = roundData.real
    rightImage.src = roundData.fake
    leftImage.dataset.type = "real"
    rightImage.dataset.type = "fake"
  }

  // Reset UI
  document.querySelectorAll(".image-option").forEach((option) => {
    option.classList.remove("selected", "correct", "incorrect")
  })
  document.getElementById("feedback").innerHTML = ""
  document.getElementById("nextBtn").style.display = "none"
  selectedAnswer = null
}

function selectImage(side) {
  if (selectedAnswer !== null) return // Prevent multiple selections

  selectedAnswer = side
  const selectedElement =
    side === "left"
      ? document.querySelector(".image-option:first-child")
      : document.querySelector(".image-option:last-child")

  selectedElement.classList.add("selected")

  // Check if the selected image is fake
  const selectedImg = document.getElementById(side + "Image")
  const isFake = selectedImg.dataset.type === "fake"

  setTimeout(() => {
    checkAnswer(isFake, selectedElement)
  }, 500)
}

function checkAnswer(selectedFake, selectedElement) {
  const feedback = document.getElementById("feedback")
  const allOptions = document.querySelectorAll(".image-option")

  // Show correct answer
  allOptions.forEach((option) => {
    const img = option.querySelector("img")
    if (img.dataset.type === "fake") {
      option.classList.add("correct")
    }
  })

  if (selectedFake) {
    feedback.innerHTML = "🎉 Correct! You identified the fake image!"
    feedback.className = "feedback correct"
    score++
    document.getElementById("score").textContent = score
  } else {
    feedback.innerHTML = "❌ Wrong! The other image was fake."
    feedback.className = "feedback incorrect"
    selectedElement.classList.add("incorrect")
  }

  document.getElementById("nextBtn").style.display = "inline-block"
}

function nextRound() {
  currentRound++
  loadRound()
}

function endGame() {
  document.getElementById("completedLevel").textContent = currentLevel
  document.getElementById("finalScore").textContent = score

  const scoreMessage = document.getElementById("scoreMessage")
  if (score >= 9) {
    scoreMessage.innerHTML =
      '<p style="color: #28a745; font-weight: bold;">🏆 Excellent! You have a great eye for detecting fake images!</p>'
  } else if (score >= 7) {
    scoreMessage.innerHTML =
      '<p style="color: #667eea; font-weight: bold;">👍 Good job! You did well at spotting the fakes.</p>'
  } else if (score >= 5) {
    scoreMessage.innerHTML =
      '<p style="color: #ffc107; font-weight: bold;">⚡ Not bad! Keep practicing to improve your detection skills.</p>'
  } else {
    scoreMessage.innerHTML =
      '<p style="color: #dc3545; font-weight: bold;">🎯 Keep trying! Detecting fake images takes practice.</p>'
  }

  showScreen("winScreen")
}

// Initialize the game
showStart()
