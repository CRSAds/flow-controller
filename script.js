document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const prelander = document.getElementById('prelander');
  const progressContainer = document.getElementById('progressContainer');
  const questionContainer = document.getElementById('questionContainer');
  const progressBar = document.getElementById('progress');

  let currentStep = 0;

  const questions = [
    {
      type: 'question',
      text: 'Hoe vaak zit jij op de fiets?',
      answers: ['Elke dag', 'Paar keer per week', 'Paar keer per maand', 'Anders']
    },
    {
      type: 'question',
      text: 'Waar gebruik jij de fiets meestal voor?',
      answers: ['Woon - Werkverkeer', 'Anders']
    },
    {
      type: 'question',
      text: 'Hoeveel kilometers fiets jij per jaar?',
      answers: ['Minder dan 100 km', 'Meer dan 100 km']
    },
    {
      type: 'form-short',
      fields: [
        { name: 'gender', type: 'select', options: ['De heer', 'Mevrouw'], placeholder: 'Geslacht' },
        { name: 'firstname', type: 'text', placeholder: 'Voornaam', autocomplete: 'given-name' },
        { name: 'lastname', type: 'text', placeholder: 'Achternaam', autocomplete: 'family-name' },
        { name: 'birthdate', type: 'birthdate', placeholder: 'Geboortedatum' },
        { name: 'email', type: 'email', placeholder: 'E-mail', autocomplete: 'email' },
      ]
    },
    {
      type: 'form-long',
      fields: [
        { name: 'postcode', type: 'text', placeholder: 'Postcode', autocomplete: 'postal-code' },
        { name: 'address', type: 'text', placeholder: 'Straat + Huisnummer', autocomplete: 'street-address' },
        { name: 'city', type: 'text', placeholder: 'Woonplaats', autocomplete: 'address-level2' },
        { name: 'phone', type: 'tel', placeholder: 'Telefoonnummer', autocomplete: 'tel' },
      ]
    }
  ];

  function renderStep() {
    questionContainer.innerHTML = '';
    const step = questions[currentStep];

    if (step.type === 'question') {
      const question = document.createElement('h2');
      question.textContent = step.text;
      questionContainer.appendChild(question);

      step.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = nextStep;
        questionContainer.appendChild(button);
      });
    } else if (step.type.startsWith('form')) {
      const form = document.createElement('form');

      step.fields.forEach(field => {
        if (field.type === 'birthdate') {
          const group = document.createElement('div');
          group.className = 'birthdate-group';

          ['DD', 'MM', 'JJJJ'].forEach((label, idx) => {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = label;
            input.required = true;
            input.min = 1;
            input.max = idx === 0 ? 31 : idx === 1 ? 12 : 2099;
            group.appendChild(input);
          });

          form.appendChild(group);
        } else if (field.type === 'select') {
          const select = document.createElement('select');
          select.required = true;

          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = 'Kies...';
          select.appendChild(defaultOption);

          field.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
          });

          form.appendChild(select);
        } else {
          const input = document.createElement('input');
          input.type = field.type;
          input.placeholder = field.placeholder;
          input.required = true;
          input.autocomplete = field.autocomplete || '';
          form.appendChild(input);
        }
      });

      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.className = 'form-button';
      submitButton.textContent = 'Ga verder';
      form.appendChild(submitButton);

      form.onsubmit = function (e) {
        e.preventDefault();
        nextStep();
      };

      questionContainer.appendChild(form);
    }

    updateProgressBar();
  }

  function nextStep() {
    currentStep++;
    if (currentStep < questions.length) {
      renderStep();
    } else {
      questionContainer.innerHTML = '<h2>Bedankt voor je deelname!</h2>';
    }
  }

  function updateProgressBar() {
    const percent = (currentStep / questions.length) * 100;
    progressBar.style.width = `${percent}%`;
  }

  startButton.addEventListener('click', function () {
    prelander.style.display = 'none';
    progressContainer.style.display = 'block';
    renderStep();
  });
});
