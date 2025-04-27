let currentStep = 0;

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
  },
  {
    question: "Vul je gegevens in.",
    form: "short"
  },
  {
    question: "Nog even je adresgegevens.",
    form: "long"
  }
];

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('startButton').addEventListener('click', startQuiz);
});

function startQuiz() {
  document.getElementById('header').style.display = 'none';
  document.getElementById('progressContainer').style.display = 'flex';
  document.getElementById('questionContainer').style.display = 'block';
  updateProgressBar();
  showStep();
}

function showStep() {
  const container = document.getElementById('questionContainer');
  const current = questions[currentStep];

  if (current.form === "short") {
    container.innerHTML = `
      <h2>Vul je gegevens in.</h2>
      <form id="shortForm">
        <div class="form-group">
          <label>Geslacht</label>
          <select required>
            <option value="">Kies...</option>
            <option value="De heer">De heer</option>
            <option value="Mevrouw">Mevrouw</option>
          </select>
        </div>
        <div class="form-group">
          <label>Voornaam</label>
          <input type="text" required>
        </div>
        <div class="form-group">
          <label>Achternaam</label>
          <input type="text" required>
        </div>
        <div class="form-group birthdate">
          <label>Geboortedatum</label>
          <input type="number" placeholder="DD" required id="day" maxlength="2">
          <input type="number" placeholder="MM" required id="month" maxlength="2">
          <input type="number" placeholder="JJJJ" required id="year" maxlength="4">
        </div>
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" required>
        </div>
        <button type="submit" class="form-button">Ga verder</button>
      </form>
    `;

    setupBirthdateAutoFocus();

    document.getElementById('shortForm').addEventListener('submit', function (e) {
      e.preventDefault();
      nextStep();
    });

  } else if (current.form === "long") {
    container.innerHTML = `
      <h2>Nog even je adresgegevens.</h2>
      <form id="longForm">
        <div class="form-group">
          <label>Postcode</label>
          <input type="text" required>
        </div>
        <div class="form-group">
          <label>Straat & huisnummer</label>
          <input type="text" required>
        </div>
        <div class="form-group">
          <label>Woonplaats</label>
          <input type="text" required>
        </div>
        <div class="form-group">
          <label>Telefoonnummer</label>
          <input type="tel" inputmode="numeric" required>
        </div>
        <button type="submit" class="form-button">Ga verder</button>
      </form>
    `;

    document.getElementById('longForm').addEventListener('submit', function (e) {
      e.preventDefault();
      nextStep();
    });

  } else {
    container.innerHTML = `
      <h2>${current.question}</h2>
      ${current.answers.map(ans => `<button class="answer">${ans}</button>`).join('')}
    `;

    document.querySelectorAll('.answer').forEach(button => {
      button.addEventListener('click', nextStep);
    });
  }
}

function nextStep() {
  currentStep++;
  updateProgressBar();
  if (currentStep < questions.length) {
    showStep();
  } else {
    showThanks();
  }
}

function updateProgressBar() {
  const progress = (currentStep / questions.length) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

function showThanks() {
  const container = document.getElementById('questionContainer');
  container.innerHTML = "<h2>Bedankt voor je deelname! 🚲</h2><p>We nemen snel contact met je op.</p>";
}

function setupBirthdateAutoFocus() {
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');

  day.addEventListener('input', () => {
    if (day.value.length >= 2) month.focus();
  });

  month.addEventListener('input', () => {
    if (month.value.length >= 2) year.focus();
  });
}
