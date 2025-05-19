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
// フェードアウト＋正誤チェック
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const correct = button.getAttribute("data-correct") === "true";
    const feedback = document.getElementById("feedback");

    if (correct) {
      feedback.textContent = "正解です！次の問題へ進みます。";
      feedback.classList.remove("hidden");

      const overlay = document.getElementById("fadeout-overlay");
      overlay.classList.add("active");

      setTimeout(() => {
        window.location.href = "question2.html"; // 次の問題へ
      }, 800);
    } else {
      feedback.textContent = "不正解です。もう一度選んでね。";
      feedback.classList.remove("hidden");
    }
  });
});
