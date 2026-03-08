let progress = Number(localStorage.getItem("progress") || 0);
let streak = Number(localStorage.getItem("streak") || 0);
let lastDate = localStorage.getItem("lastDate");

const gitaQuotes = {
  confused: "When the mind is confused, seek knowledge. – BG 4.38",
  lazy: "A person is elevated by self-effort. – BG 6.5",
  motivated: "Set thy heart upon thy work, not on its reward. – BG 2.47",
  disciplined: "With discipline comes inner peace. – BG 6.15",
  sad: "Even a little effort saves one from great fear. – BG 2.40"
};

function updateUI() {
  document.getElementById("progressFill").style.width = progress + "%";
  document.getElementById("progressText").innerText = progress + "% completed";
  document.getElementById("streakText").innerText = "🔥 Streak: " + streak + " days";
}

function addProgress(type) {
  let value = { daily: 2, weekly: 15, monthly: 30 }[type];
  progress = Math.min(100, progress + value);
  localStorage.setItem("progress", progress);
  updateUI();
}

function saveDay() {
  const today = new Date().toDateString();

  if (lastDate !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", today);
  }

  localStorage.setItem("dailyLog", dailyLog.value);
  localStorage.setItem("mood", mood.value);
  document.getElementById("gitaQuote").innerText = gitaQuotes[mood.value];

  alert("Day saved 🌸");
  updateUI();
}

function addImage(event) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = reader.result;
    let images = JSON.parse(localStorage.getItem("images") || "[]");
    images.push(img);
    localStorage.setItem("images", JSON.stringify(images));
    loadImages();
  };
  reader.readAsDataURL(event.target.files[0]);
}

function loadImages() {
  const board = document.getElementById("visionBoard");
  board.innerHTML = "";
  const images = JSON.parse(localStorage.getItem("images") || "[]");
  images.forEach(img => {
    const i = document.createElement("img");
    i.src = img;
    board.appendChild(i);
  });
}

function loadData() {
  identity.value = localStorage.getItem("identity") || "";
  weeklyGoal.value = localStorage.getItem("weeklyGoal") || "";
  monthlyGoal.value = localStorage.getItem("monthlyGoal") || "";
  yearlyGoal.value = localStorage.getItem("yearlyGoal") || "";
  dailyLog.value = localStorage.getItem("dailyLog") || "";
  mood.value = localStorage.getItem("mood") || "confused";

  document.getElementById("gitaQuote").innerText =
    gitaQuotes[mood.value];

  updateUI();
  loadImages();
}

["identity","weeklyGoal","monthlyGoal","yearlyGoal"].forEach(id=>{
  document.getElementById(id).addEventListener("input", e=>{
    localStorage.setItem(id, e.target.value);
  });
});

loadData();
