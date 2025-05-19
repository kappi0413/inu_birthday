// スタートボタン処理（index.html）
const startBtn = document.getElementById("startButton");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    const overlay = document.getElementById("fadeout-overlay");
    overlay.classList.add("active");
    setTimeout(() => {
      location.href = "question1.html";
    }, 800);
  });
}

// SNS共有ボタン
const shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
  shareBtn.addEventListener("click", () => {
    const text = "或世イヌの誕生日謎解き、これから挑戦してみる！✨\n#或世イヌ誕生日";
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(shareUrl, "_blank");
  });
}

// Q1：記述式（question1.html）
const answerInput = document.getElementById("answerInput");
if (answerInput) {
  document.querySelector("button").addEventListener("click", () => {
    const answer = answerInput.value.trim();
    if (answer === "イチゴタルト") {
      const confetti = document.getElementById("confetti");
      confetti.classList.remove("hidden");
      confetti.classList.add("show");
      setTimeout(() => {
        window.location.href = "question2.html";
      }, 1500);
    } else {
      alert("違うよ！もう一度考えてみよう！");
    }
  });
}

// Q2〜Q3：選択式（1問正解）
document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const correct = button.getAttribute("data-correct") === "true";
    const feedback = document.getElementById("feedback");

    if (correct) {
      feedback.textContent = "正解です！次の問題へ進みます。";
      feedback.className = "feedback-correct";
      feedback.classList.remove("hidden");

      const overlay = document.getElementById("fadeout-overlay");
      overlay?.classList.add("active");

      const currentPage = window.location.pathname;
      const nextPage = currentPage.includes("question2")
        ? "question3.html"
        : "question4.html";

      setTimeout(() => {
        window.location.href = nextPage;
      }, 800);
    } else {
      feedback.textContent = "不正解です。もう一度選んでね。";
      feedback.className = "feedback-wrong";
      feedback.classList.remove("hidden");
    }
  });
});

// Q4：2つ正解で通過
const isQ4 = document.querySelector('[data-id]');
if (isQ4) {
  let correctAnswers = {
    r99: false,
    peacekeeper: false,
  };

  document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const feedback = document.getElementById("feedback");

      if (id === "r99" || id === "peacekeeper") {
        if (!correctAnswers[id]) {
          correctAnswers[id] = true;
          feedback.textContent = `「${button.textContent}」 正解！`;
          feedback.className = "feedback-correct";
        } else {
          feedback.textContent = `「${button.textContent}」 はもう選ばれています。`;
          feedback.className = "feedback-warn";
        }
        feedback.classList.remove("hidden");

        if (correctAnswers.r99 && correctAnswers.peacekeeper) {
          const overlay = document.getElementById("fadeout-overlay");
          overlay?.classList.add("active");
          setTimeout(() => {
            window.location.href = "final.html";
          }, 800);
        }
      } else {
        // 不正解：リセット
        correctAnswers = { r99: false, peacekeeper: false };
        feedback.textContent = `「${button.textContent}」 は不正解！！正解リセット！`;
        feedback.className = "feedback-wrong";
        feedback.classList.remove("hidden");
      }
    });
  });
}
