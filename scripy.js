document.getElementById("startButton").addEventListener("click", function () {
  const overlay = document.getElementById("fadeout-overlay");
  overlay.classList.add("active");
  setTimeout(() => {
    location.href = "question1.html"; // 遷移先
  }, 800);
});

document.getElementById("shareBtn").addEventListener("click", function () {
  const text = "或世イヌの誕生日謎解き、これから挑戦してみる！✨\n#或世イヌ誕生日";
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(shareUrl, "_blank");
});
