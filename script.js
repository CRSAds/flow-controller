document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const prelander = document.getElementById("prelander");
  const flow = document.getElementById("flow");
  const questionContainer = document.getElementById("questionContainer");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progressContainer");

  let currentStep = 0;

  const steps = [
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
      form: "short"
    },
    {
      form: "long"
    }
  ];

  const totalSteps = steps.length;

  startButton.addEventListener("click", () => {
    prelander.style.display = "none";
    progressContainer.style.display = "flex";
    flow.style.display = "block";
    showStep();
  });

  function showStep() {
    const current = steps[currentStep];
    if (current.form === "short") {
      questionContainer.innerHTML = `
        <form id="shortForm">
          <div>
            <label>Geslacht</label>
            <select name="gender" autocomplete="sex" required>
              <option value="">Kies...</option>
              <option value="De heer">De heer</option>
              <option value="Mevrouw">Mevrouw</option>
            </select>
          </div>
          <div>
            <label>Voornaam</label>
            <input type="text" name="firstName" autocomplete="given-name" required>
          </div>
          <div>
            <label>Achternaam</label>
            <input type="text" name="lastName" autocomplete="family-name" required>
          </div>
          <div>
            <label>Geboortedatum</label>
            <div class="birthdate-group">
              <input type="number" name="birthDay" placeholder="DD" maxlength="2" required>
              <input type="number" name="birthMonth" placeholder="MM" maxlength="2" required>
              <input type="number" name="birthYear" placeholder="JJJJ" maxlength="4" required>
            </div>
          </div>
          <div>
            <label>E-mail</label>
            <input type="email" name="email" autocomplete="email" required>
          </div>
          <button type="submit">Ga verder</button>
        </form>
      `;

      setupBirthdateInputs();

      document.getElementById("shortForm").addEventListener("submit", (e) => {
        e.preventDefault();
        nextStep();
      });

    } else if (current.form === "long") {
      questionContainer.innerHTML = `
        <form id="longForm">
          <div>
            <label>Postcode</label>
            <input type="text" name="zip" autocomplete="postal-code" required>
          </div>
          <div>
            <label>Straat & huisnummer</label>
            <input type="text" name="street" autocomplete="street-address" required>
          </div>
          <div>
            <label>Woonplaats</label>
            <input type="text" name="city" autocomplete="address-level2" required>
          </div>
          <div>
            <label>Telefoonnummer</label>
            <input type="tel" name="phone" autocomplete="tel" required>
          </div>
          <button type="submit">Verzenden</button>
        </form>
      `;

      document.getElementById("longForm").addEventListener("submit", (e) => {
        e.preventDefault();
        showThanks();
      });

    } else {
      questionContainer.innerHTML = `
        <h2>${current.question}</h2>
        ${current.answers.map(ans => `<button class="answer">${ans}</button>`).join('')}
      `;

      document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', nextStep);
      });
    }

    updateProgress();
  }

  function nextStep() {
    currentStep++;
    if (currentStep < totalSteps) {
      showStep();
    }
  }

  function updateProgress() {
    const percentage = (currentStep / (totalSteps - 1)) * 100;
    progress.style.width = `${percentage}%`;
  }

  function showThanks() {
    questionContainer.innerHTML = "<h2>Bedankt voor je deelname!</h2><p>We nemen snel contact met je op.</p>";
  }

  function setupBirthdateInputs() {
    const day = document.querySelector('input[name="birthDay"]');
    const month = document.querySelector('input[name="birthMonth"]');
    const year = document.querySelector('input[name="birthYear"]');

    if (day && month && year) {
      [day, month, year].forEach((input, index, arr) => {
        input.addEventListener('input', (e) => {
          const value = e.target.value;

          if (input.name === "birthDay" && (parseInt(value) >= 4 || value.length >= 2)) {
            arr[index + 1]?.focus();
          }
          if (input.name === "birthMonth" && (parseInt(value) >= 2 || value.length >= 2)) {
            arr[index + 1]?.focus();
          }
          if (input.name === "birthYear" && value.length >= 4) {
            arr[index + 1]?.blur();
          }
        });
      });
    }
  }
});
