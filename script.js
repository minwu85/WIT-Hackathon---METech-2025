// Game state
let currentLevel = 1
let score = 0
let currentRound = 1
let gameData = []
let selectedAnswer = null
let gameMode = "basic" // 'basic', 'ball', 'circle'
let ballTimer = null
let ballTimeLeft = 3

// Image data for different levels with proper fake/unfake folder structure
const levelImages = {
  1: [{ fake: "images/fake/f1(1).jpg", real: "images/unfake/u1(1).jpg" }],
  2: [
    { fake: "images/fake/f1(1).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f2(1).jpg", real: "images/unfake/u1(2).jpg" },
  ],
  3: [
    { fake: "images/fake/f1(1).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f1(2).jpg", real: "images/unfake/u1(2).jpg" },
    { fake: "images/fake/f2(2).jpg", real: "images/unfake/u1(3).jpg" },
  ],
  4: [
    { fake: "images/fake/f2(1).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f2(2).jpg", real: "images/unfake/u1(2).jpg" },
    { fake: "images/fake/f4(2).jpg", real: "images/unfake/u1(3).jpg" },
    { fake: "images/fake/f1(3).jpg", real: "images/unfake/u1(4).jpg" },
  ],
  5: [
    { fake: "images/fake/f2(1).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f2(2).jpg", real: "images/unfake/u1(2).jpg" },
    { fake: "images/fake/f2(3).jpg", real: "images/unfake/u1(3).jpg" },
    { fake: "images/fake/f4(2).jpg", real: "images/unfake/u1(4).jpg" },
    { fake: "images/fake/f4(3).jpg", real: "images/unfake/u1(1).jpg" },
  ],
  6: [
    { fake: "images/fake/f2(1).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f2(2).jpg", real: "images/unfake/u1(2).jpg" },
    { fake: "images/fake/f2(3).jpg", real: "images/unfake/u1(3).jpg" },
    { fake: "images/fake/f2(4).jpg", real: "images/unfake/u1(4).jpg" },
    { fake: "images/fake/f4(2).jpg", real: "images/unfake/u1(1).jpg" },
    { fake: "images/fake/f4(3).jpg", real: "images/unfake/u1(2).jpg" },
  ],
}

for (let level = 7; level <= 9; level++) {
  levelImages[level] = []
  for (let i = 1; i <= level; i++) {
    const fakeOptions = [
      "f1(1).jpg",
      "f1(2).jpg",
      "f1(3).jpg",
      "f2(1).jpg",
      "f2(2).jpg",
      "f2(3).jpg",
      "f2(4).jpg",
      "f4(2).jpg",
      "f4(3).jpg",
    ]
    const realOptions = ["u1(1).jpg", "u1(2).jpg", "u1(3).jpg", "u1(4).jpg"]

    const fakeIndex = (i - 1) % fakeOptions.length
    const realIndex = (i - 1) % realOptions.length

    levelImages[level].push({
      fake: `images/fake/${fakeOptions[fakeIndex]}`,
      real: `images/unfake/${realOptions[realIndex]}`,
    })
  }
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active")
  })
  document.getElementById(screenId).classList.add("active")
}

function showHome() {
  showScreen("homeScreen")
}

function showInformation() {
  showScreen("informationScreen")
}

function showMoreInformation() {
  showScreen("moreInformationScreen")
}

function showCaseStudy() {
  showScreen("caseStudyScreen")
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

  if (level >= 1 && level <= 3) {
    gameMode = "basic"
  } else if (level >= 4 && level <= 6) {
    gameMode = "ball"
  } else if (level >= 7 && level <= 9) {
    gameMode = "circle"
  }

  // Shuffle the images for this level
  gameData = [...levelImages[level]].sort(() => Math.random() - 0.5)

  // Show appropriate game screen based on mode
  if (gameMode === "basic") {
    document.getElementById("currentLevel").textContent = level
    document.getElementById("score").textContent = score
    const totalRounds = levelImages[currentLevel].length
    document.getElementById("roundCounter").textContent = `${currentRound}/${totalRounds}`
    showScreen("gameScreen")
    loadRound()
  } else if (gameMode === "ball") {
    document.getElementById("ballCurrentLevel").textContent = level
    document.getElementById("ballScore").textContent = score
    const totalRounds = levelImages[currentLevel].length
    document.getElementById("ballRoundCounter").textContent = `${currentRound}/${totalRounds}`
    showScreen("ballGameScreen")
    loadBallRound()
  } else if (gameMode === "circle") {
    document.getElementById("circleCurrentLevel").textContent = level
    document.getElementById("circleScore").textContent = score
    const totalRounds = levelImages[currentLevel].length
    document.getElementById("circleRoundCounter").textContent = `${currentRound}/${totalRounds}`
    showScreen("circleGameScreen")
    loadCircleRound()
  }
}

function loadRound() {
  const totalRounds = levelImages[currentLevel].length
  if (currentRound > totalRounds) {
    endGame()
    return
  }

  document.getElementById("roundCounter").textContent = `${currentRound}/${totalRounds}`

  const roundData = gameData[currentRound - 1]
  const leftImage = document.getElementById("leftImage")
  const rightImage = document.getElementById("rightImage")

  console.log("[v0] Loading round", currentRound, "with images:", roundData)

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

  leftImage.onerror = function () {
    console.log("[v0] Failed to load left image:", this.src)
    this.src = "/happy-golden-retriever.png"
  }
  rightImage.onerror = function () {
    console.log("[v0] Failed to load right image:", this.src)
    this.src = "/happy-golden-retriever.png"
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

function loadBallRound() {
  const totalRounds = levelImages[currentLevel].length
  if (currentRound > totalRounds) {
    endGame()
    return
  }

  document.getElementById("ballRoundCounter").textContent = `${currentRound}/${totalRounds}`

  const roundData = gameData[currentRound - 1]
  const ballImage = document.getElementById("ballImage")

  // Randomly choose fake or real image
  const showFake = Math.random() < 0.5
  ballImage.src = showFake ? roundData.fake : roundData.real
  ballImage.dataset.type = showFake ? "fake" : "real"

  console.log("[v0] Ball round", currentRound, "showing", showFake ? "fake" : "real", "image")

  // Reset ball position and UI
  const ball = document.getElementById("ball")
  ball.style.left = "50%"
  ball.style.transform = "translateX(-50%)"

  document.getElementById("ballFeedback").innerHTML = ""
  document.getElementById("ballNextBtn").style.display = "none"

  selectedAnswer = null
  startBallTimer()
}

function startBallTimer() {
  ballTimeLeft = 3
  document.getElementById("ballTimer").textContent = ballTimeLeft

  const timerFill = document.getElementById("ballTimerFill")
  if (timerFill) {
    timerFill.style.width = "100%"
  }

  ballTimer = setInterval(() => {
    ballTimeLeft--
    document.getElementById("ballTimer").textContent = ballTimeLeft

    // Update timer bar
    if (timerFill) {
      const percentage = (ballTimeLeft / 3) * 100
      timerFill.style.width = percentage + "%"
    }

    if (ballTimeLeft <= 0) {
      clearInterval(ballTimer)
      if (selectedAnswer === null) {
        // Time's up, random choice
        const randomChoice = Math.random() < 0.5 ? "left" : "right"
        rollBall(randomChoice, true)
      }
    }
  }, 1000)
}

function rollBall(direction, timeUp = false) {
  if (selectedAnswer !== null) return

  clearInterval(ballTimer)
  selectedAnswer = direction

  const ball = document.getElementById("ball")
  const ballImage = document.getElementById("ballImage")
  const isImageFake = ballImage.dataset.type === "fake"

  console.log("[v0] Rolling ball", direction, "image is", isImageFake ? "fake" : "real")

  // Animate ball rolling
  if (direction === "left") {
    ball.style.left = "15%"
  } else {
    ball.style.left = "85%"
  }

  setTimeout(() => {
    checkBallAnswer(direction, isImageFake, timeUp)
  }, 1000)
}

function checkBallAnswer(direction, isImageFake, timeUp) {
  const feedback = document.getElementById("ballFeedback")
  const correctAnswer = isImageFake ? "right" : "left"
  const isCorrect = direction === correctAnswer

  if (timeUp) {
    feedback.innerHTML = "⏰ Time's up! Random choice made."
    feedback.className = "ball-feedback incorrect"
  } else if (isCorrect) {
    feedback.innerHTML = "🎉 Correct! Good ball control!"
    feedback.className = "ball-feedback correct"
    score++
    document.getElementById("ballScore").textContent = score
  } else {
    feedback.innerHTML = `❌ Wrong! The image was ${isImageFake ? "fake" : "real"}.`
    feedback.className = "ball-feedback incorrect"
  }

  document.getElementById("ballNextBtn").style.display = "inline-block"
}

function nextBallRound() {
  currentRound++
  loadBallRound()
}

function loadCircleRound() {
  const totalRounds = levelImages[currentLevel].length
  if (currentRound > totalRounds) {
    endGame()
    return
  }

  document.getElementById("circleRoundCounter").textContent = `${currentRound}/${totalRounds}`

  const roundData = gameData[currentRound - 1]

  // Create array of 4 images (3 real, 1 fake)
  const images = [roundData.fake, roundData.real, roundData.real, roundData.real]

  // Shuffle the images
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[images[i], images[j]] = [images[j], images[i]]
  }

  // Set images and track which one is fake
  for (let i = 0; i < 4; i++) {
    const img = document.getElementById(`circleImage${i}`)
    img.src = images[i]
    img.dataset.type = images[i] === roundData.fake ? "fake" : "real"

    // Reset overlays
    document.getElementById(`circleOverlay${i}`).classList.remove("selected", "correct", "incorrect")
  }

  document.getElementById("circleFeedback").innerHTML = ""
  document.getElementById("circleNextBtn").style.display = "none"
  selectedAnswer = null
}

function selectCircleImage(index) {
  if (selectedAnswer !== null) return

  selectedAnswer = index
  const selectedImg = document.getElementById(`circleImage${index}`)
  const selectedOverlay = document.getElementById(`circleOverlay${index}`)

  selectedOverlay.classList.add("selected")

  setTimeout(() => {
    checkCircleAnswer(index)
  }, 500)
}

function checkCircleAnswer(selectedIndex) {
  const feedback = document.getElementById("circleFeedback")
  let correctIndex = -1

  // Find the fake image
  for (let i = 0; i < 4; i++) {
    const img = document.getElementById(`circleImage${i}`)
    const overlay = document.getElementById(`circleOverlay${i}`)

    if (img.dataset.type === "fake") {
      correctIndex = i
      overlay.classList.add("correct")
    }
  }

  const isCorrect = selectedIndex === correctIndex

  if (isCorrect) {
    feedback.innerHTML = "🎯 Excellent! You found the fake image!"
    feedback.className = "feedback correct"
    score++
    document.getElementById("circleScore").textContent = score
  } else {
    feedback.innerHTML = "❌ Not quite! The fake image was highlighted in green."
    feedback.className = "feedback incorrect"
    document.getElementById(`circleOverlay${selectedIndex}`).classList.add("incorrect")
  }

  document.getElementById("circleNextBtn").style.display = "inline-block"
}

function nextCircleRound() {
  currentRound++
  loadCircleRound()
}

function endGame() {
  document.getElementById("completedLevel").textContent = currentLevel
  document.getElementById("finalScore").textContent = score

  const totalQuestions = levelImages[currentLevel].length
  document.getElementById("totalQuestions").textContent = totalQuestions

  const scoreMessage = document.getElementById("scoreMessage")
  const scorePercentage = (score / totalQuestions) * 100

  if (scorePercentage >= 90) {
    scoreMessage.innerHTML =
      '<p style="color: #28a745; font-weight: bold;">🏆 Excellent! You have a great eye for detecting fake images!</p>'
  } else if (scorePercentage >= 70) {
    scoreMessage.innerHTML =
      '<p style="color: #667eea; font-weight: bold;">👍 Good job! You did well at spotting the fakes.</p>'
  } else if (scorePercentage >= 50) {
    scoreMessage.innerHTML =
      '<p style="color: #ffc107; font-weight: bold;">⚡ Not bad! Keep practicing to improve your detection skills.</p>'
  } else {
    scoreMessage.innerHTML =
      '<p style="color: #dc3545; font-weight: bold;">🎯 Keep trying! Detecting fake images takes practice.</p>'
  }

  // Show case study based on completed level
  if (currentLevel === 1 || currentLevel === 2 || currentLevel === 3) {
    // After levels 1-3, show case study about deepfake abuse
    setTimeout(() => {
      showScreen("caseStudyLevel1Screen")
    }, 2000)
  } else if (currentLevel === 4 || currentLevel === 5 || currentLevel === 6) {
    // After levels 4-6, show case study about who is affected
    setTimeout(() => {
      showScreen("caseStudyLevel4Screen")
    }, 2000)
  } else if (currentLevel === 7 || currentLevel === 8 || currentLevel === 9) {
    // After levels 7-9, show case study about the law
    setTimeout(() => {
      showScreen("caseStudyLevel7Screen")
    }, 2000)
  } else {
    showScreen("winScreen")
  }
}

function continueToNextLevel() {
  const nextLevel = currentLevel + 1
  if (nextLevel <= 9) {
    startGame(nextLevel)
  } else {
    showLevelSelect()
  }
}

document.addEventListener("keydown", (event) => {
  // Only handle keyboard controls when ball game is active
  const ballGameScreen = document.getElementById("ballGameScreen")
  if (!ballGameScreen.classList.contains("active")) return

  if (event.key === "ArrowLeft") {
    event.preventDefault()
    rollBall("left")
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    rollBall("right")
  }
})

showHome()
