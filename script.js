document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById('startButton');
  const introSection = document.getElementById('intro');
  const progressHeader = document.getElementById('progressHeader');
  const surveySection = document.getElementById('survey');
  const progressBar = document.getElementById('progressBar');
  const answers = document.querySelectorAll('#answers button');

  let currentQuestion = 0;
  const totalQuestions = 3; // Aantal vragen dat je hebt

  startButton.addEventListener('click', () => {
    introSection.style.display = 'none';
    progressHeader.classList.remove('hidden');
    surveySection.classList.remove('hidden');
    updateProgress();
  });

  answers.forEach(button => {
    button.addEventListener('click', () => {
      currentQuestion++;
      if (currentQuestion < totalQuestions) {
        // Hier kun je nieuwe vragen laden als je meerdere vragen wilt
        document.getElementById('question').innerText = `Vraag ${currentQuestion + 1}: Nieuwe vraag hier`;
        updateProgress();
      } else {
        // Alle vragen beantwoord
        document.getElementById('question').innerText = "Bedankt voor je deelname!";
        document.getElementById('answers').style.display = 'none';
        updateProgress(100);
      }
    });
  });

  function updateProgress(force = null) {
    let percentage = force !== null ? force : Math.min((currentQuestion / totalQuestions) * 100, 100);
    progressBar.style.width = `${percentage}%`;
  }
});
