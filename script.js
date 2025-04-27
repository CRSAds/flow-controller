document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  const introStep = document.getElementById('intro-step');
  const progressHeader = document.getElementById('progress-header');
  const surveyContainer = document.getElementById('survey-container');
  const progressFill = document.querySelector('.progress-bar-fill');
  const answerButtons = document.querySelectorAll('.answer-button');

  let totalSteps = answerButtons.length;
  let currentStep = 0;

  startButton.addEventListener('click', () => {
    introStep.classList.add('hidden');
    progressHeader.classList.remove('hidden');
    surveyContainer.classList.remove('hidden');
    updateProgress();
  });

  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentStep++;
      updateProgress();
    });
  });

  function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
  }
});
