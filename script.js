const questions = [
  {
    question: "Hoe vaak zit jij op de fiets?",
    answers: ["Elke dag", "Paar keer per week", "Paar keer per maand", "Anders"]
  },
  {
    question: "Gebruik je de fiets vooral voor woon-werkverkeer?",
    answers: ["Ja", "Nee"]
  },
  {
    question: "Ben je geïnteresseerd in elektrische fietsen?",
    answers: ["Zeker!", "Misschien", "Nee"]
  }
];

let currentStep = 0;

document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('progressContainer').classList.add('active');
  showStep();
});

function showStep() {
  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h2>${questions[currentStep].question}</h2>
    ${questions[currentStep].answers.map(ans => `<button class="answer">${ans}</button>`).join('')}
  `;

  document.querySelectorAll('.answer').forEach(button => {
    button.addEventListener('click', () => {
      currentStep++;
      updateProgressBar();
      if (currentStep < questions.length) {
        showStep();
      } else {
        showThanks();
      }
    });
  });
}

function updateProgressBar() {
  const fill = document.getElementById('progressFill');
  const percentage = ((currentStep) / questions.length) * 100;
  fill.style.width = `${percentage}%`;
}

function showThanks() {
  const container = document.getElementById('questionContainer');
  container.innerHTML = `
    <h2>Bedankt voor je deelname!</h2>
    <p>We nemen binnenkort contact met je op.</p>
  `;
}
