// Elementen ophalen
const prelander = document.getElementById('prelander');
const startButton = document.getElementById('startButton');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progress');
const flow = document.getElementById('flow');
const questionContainer = document.getElementById('questionContainer');

// Vragen + Formulieren setup
const questions = [
  {
    type: 'question',
    title: 'Hoe vaak zit jij op de fiets?',
    options: ['Elke dag', 'Paar keer per week', 'Paar keer per maand', 'Anders']
  },
  {
    type: 'question',
    title: 'Waar gebruik jij de fiets meestal voor?',
    options: ['Woon - Werkverkeer', 'Boodschappen', 'Vrije tijd', 'Anders']
  },
  {
    type: 'shortform',
    title: 'Vul je gegevens in'
  },
  {
    type: 'longform',
    title: 'Waar kunnen we je bereiken?'
  },
  {
    type: 'thankyou',
    title: 'Bedankt voor je deelname! 🎉'
  }
];

let currentStep = 0;

// Start de flow
startButton.addEventListener('click', () => {
  prelander.style.display = 'none';
  progressContainer.style.display = 'flex';
  flow.style.display = 'block';
  showStep();
});

// Toon volgende stap
function showStep() {
  const step = questions[currentStep];
  updateProgress();

  if (!step) return;

  questionContainer.innerHTML = '';

  if (step.type === 'question') {
    const title = document.createElement('h2');
    title.className = 'question-title';
    title.innerText = step.title;
    questionContainer.appendChild(title);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'question-buttons';

    step.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.onclick = () => nextStep();
      buttonContainer.appendChild(button);
    });

    questionContainer.appendChild(buttonContainer);
  }

  if (step.type === 'shortform') {
    renderShortForm();
  }

  if (step.type === 'longform') {
    renderLongForm();
  }

  if (step.type === 'thankyou') {
    const title = document.createElement('h2');
    title.className = 'question-title';
    title.innerText = step.title;
    questionContainer.appendChild(title);
  }
}

// Volgende stap
function nextStep() {
  currentStep++;
  showStep();
}

// Voortgangsbalk
function updateProgress() {
  const total = questions.length - 1;
  const progress = (currentStep / total) * 100;
  progressBar.style.width = `${progress}%`;
}

// Shortform renderen
function renderShortForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <label for="gender">Geslacht</label>
    <select id="gender" required autocomplete="sex">
      <option value="">Kies...</option>
      <option value="man">De heer</option>
      <option value="vrouw">Mevrouw</option>
    </select>

    <label for="firstName">Voornaam</label>
    <input type="text" id="firstName" name="firstName" required autocomplete="given-name">

    <label for="lastName">Achternaam</label>
    <input type="text" id="lastName" name="lastName" required autocomplete="family-name">

    <label for="birthdate">Geboortedatum</label>
    <div class="birthdate-group">
      <input type="tel" id="birthDay" name="birthDay" placeholder="DD" maxlength="2" pattern="[0-9]*" inputmode="numeric" required>
      <input type="tel" id="birthMonth" name="birthMonth" placeholder="MM" maxlength="2" pattern="[0-9]*" inputmode="numeric" required>
      <input type="tel" id="birthYear" name="birthYear" placeholder="JJJJ" maxlength="4" pattern="[0-9]*" inputmode="numeric" required>
    </div>

    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required autocomplete="email">

    <button type="submit" class="primary-button">Ga verder</button>
  `;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    nextStep();
  });

  setupAutoTab();
  questionContainer.appendChild(form);
}

// Longform renderen
function renderLongForm() {
  const form = document.createElement('form');
  form.innerHTML = `
    <label for="zip">Postcode</label>
    <input type="text" id="zip" name="zip" required autocomplete="postal-code">

    <label for="address">Straat + huisnummer</label>
    <input type="text" id="address" name="address" required autocomplete="street-address">

    <label for="city">Woonplaats</label>
    <input type="text" id="city" name="city" required autocomplete="address-level2">

    <label for="phone">Telefoonnummer</label>
    <input type="tel" id="phone" name="phone" required autocomplete="tel">

    <button type="submit" class="primary-button">Verzenden</button>
  `;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    nextStep();
  });

  questionContainer.appendChild(form);
}

// AutoTab voor geboortedatum
function setupAutoTab() {
  const day = document.getElementById('birthDay');
  const month = document.getElementById('birthMonth');
  const year = document.getElementById('birthYear');

  day.addEventListener('input', () => {
    if (day.value.length === 2 || parseInt(day.value) > 3) {
      month.focus();
    }
  });

  month.addEventListener('input', () => {
    if (month.value.length === 2 || parseInt(month.value) > 1) {
      year.focus();
    }
  });
}
