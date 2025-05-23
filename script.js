// スタートボタン処理（index.html）
const startBtn = document.getElementById("startButton");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    const overlay = document.getElementById("fadeout-overlay");
    overlay.classList.add("active");
    setTimeout(() => {
      location.href = "question1.html";
    }, 2000);
  });
}

// SNS共有ボタン（final.htmlなどで使用）
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

// Q2〜Q3：選択式（button.choice + data-correct）
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

// Q3：種類によって数字の選択肢を変える
const typeSelect = document.getElementById("typeSelect");
if (typeSelect) {
  typeSelect.addEventListener("change", () => {
    const numberSelect = document.getElementById("numberSelect");
    numberSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--選択--";
    numberSelect.appendChild(defaultOption);

    const type = typeSelect.value;
    let options = [];

    if (type === "字") {
      options = ["東", "南", "西", "北", "白", "發", "中"];
    } else if (type === "萬" || type === "筒" || type === "索") {
      options = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    }

    options.forEach(val => {
      const option = document.createElement("option");
      option.value = val;
      option.textContent = val;
      numberSelect.appendChild(option);
    });
  });

  const q3AnswerBtn = document.getElementById("q3AnswerBtn");
  if (q3AnswerBtn) {
    q3AnswerBtn.addEventListener("click", () => {
      const num = document.getElementById("numberSelect").value;
      const type = document.getElementById("typeSelect").value;
      const feedback = document.getElementById("feedback");

      if (!num || !type) {
        feedback.textContent = "両方選んでね！";
        feedback.className = "feedback-wrong";
        feedback.classList.remove("hidden");
        return;
      }

      if (num === "五" && type === "萬") {
        feedback.textContent = "正解です！次の問題へ進みます。";
        feedback.className = "feedback-correct";
        feedback.classList.remove("hidden");

        const overlay = document.getElementById("fadeout-overlay");
        overlay?.classList.add("active");

        setTimeout(() => {
          window.location.href = "question4.html";
        }, 800);
      } else {
        feedback.textContent = "ちがうよ！もう一度考えてみて！";
        feedback.className = "feedback-wrong";
        feedback.classList.remove("hidden");
      }
    });
  }
}

// Q4：2つ正解で通過（data-id使用）
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
        correctAnswers = { r99: false, peacekeeper: false };
        feedback.textContent = `「${button.textContent}」 は不正解！！正解リセット！`;
        feedback.className = "feedback-wrong";
        feedback.classList.remove("hidden");
      }
    });
  });
}
