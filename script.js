
const campaignData = {
  heroImage: "https://cdn.pixabay.com/photo/2016/11/29/06/17/bicycle-1869187_960_720.jpg",
  introText: "Win een nieuwe Gazelle E-bike!",
  steps: [
    {
      type: "question",
      question: "Hoe vaak zit jij op de fiets?",
      options: ["Elke dag", "Paar keer per week", "Paar keer per maand", "Anders"]
    },
    {
      type: "question",
      question: "Waar gebruik jij de fiets meestal voor?",
      options: ["Woon-werkverkeer", "Boodschappen", "Sport", "Anders"]
    },
    {
      type: "shortform",
      form: [
        {label: "Voornaam", type: "text"},
        {label: "Achternaam", type: "text"},
        {label: "Email", type: "email"},
        {label: "Geboortedatum", type: "birthdate"}
      ]
    },
    {
      type: "longform",
      form: [
        {label: "Postcode", type: "text"},
        {label: "Straat & huisnummer", type: "text"},
        {label: "Woonplaats", type: "text"},
        {label: "Telefoonnummer", type: "tel"}
      ]
    },
    {
      type: "thankyou",
      text: "Bedankt voor je deelname! We nemen contact met je op."
    }
  ]
};

const hero = document.getElementById('hero');
const progressWrapper = document.getElementById('progressWrapper');
const progressFill = document.getElementById('progressFill');
const stepContainer = document.getElementById('stepContainer');

let currentStep = 0;

function renderStep() {
  const step = campaignData.steps[currentStep];
  stepContainer.innerHTML = '';

  if (step.type === 'question') {
    const div = document.createElement('div');
    div.className = 'step';
    div.innerHTML = `<h2>${step.question}</h2>`;
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';

    step.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = nextStep;
      optionsDiv.appendChild(button);
    });

    div.appendChild(optionsDiv);
    stepContainer.appendChild(div);

  } else if (step.type === 'shortform' || step.type === 'longform') {
    const div = document.createElement('div');
    div.className = 'step';
    const form = document.createElement('form');

    step.form.forEach(field => {
      if (field.type === 'birthdate') {
        const birthGroup = document.createElement('div');
        birthGroup.className = 'birthdate-group';
        birthGroup.innerHTML = `
          <input type="number" placeholder="DD" maxlength="2">
          <input type="number" placeholder="MM" maxlength="2">
          <input type="number" placeholder="JJJJ" maxlength="4">
        `;
        form.appendChild(birthGroup);
      } else {
        const input = document.createElement('input');
        input.type = field.type;
        input.placeholder = field.label;
        form.appendChild(input);
      }
    });

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'form-submit';
    submit.textContent = 'Ga Verder';
    form.appendChild(submit);

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      nextStep();
    });

    div.appendChild(form);
    stepContainer.appendChild(div);

  } else if (step.type === 'thankyou') {
    const div = document.createElement('div');
    div.className = 'step';
    div.innerHTML = `<h2>${step.text}</h2>`;
    stepContainer.appendChild(div);
  }

  updateProgress();
}

function nextStep() {
  currentStep++;

  if (currentStep === 1) {
    hero.style.transform = "scale(0.7)";
    progressWrapper.style.display = 'flex';
  }

  if (currentStep < campaignData.steps.length) {
    renderStep();
  }
}

function updateProgress() {
  const percent = ((currentStep) / (campaignData.steps.length - 1)) * 100;
  progressFill.style.width = `${percent}%`;
}

renderStep();
