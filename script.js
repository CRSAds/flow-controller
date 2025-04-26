document.addEventListener("DOMContentLoaded", () => {
  const sectionIds = [
    "heroimage",
    "prelander",
    "surveyquestion",
    "shortform",
    "longform",
    "bedanktscherm",
    "sovendus"
  ];

  let activeIndex = 0;

  const getSections = () => {
    return sectionIds
      .flatMap((id) => Array.from(document.querySelectorAll(`#${id}`)))
      .filter((el) => el);
  };

  const showOnlySection = (index) => {
    const sections = getSections();
    sections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });

    // Progressbar updaten
    const progress = document.querySelector(".progress-fill");
    if (progress) {
      const percentage = (index / (sections.length - 1)) * 100;
      progress.style.width = `${percentage}%`;
    }

    // Hero-image verkleinen + progressbar tonen vanaf stap 2
    const hero = document.getElementById("heroimage");
    const progressBar = document.getElementById("progressbar");
    if (index > 1) {
      hero?.classList.add("hero-small");
      progressBar?.classList.add("visible");
    }
  };

  const handleClick = (e) => {
    const btn = e.target.closest(".go-next");
    if (!btn) return;

    const sections = getSections();
    activeIndex = Math.min(activeIndex + 1, sections.length - 1);
    showOnlySection(activeIndex);
  };

  // Form submits afvangen en laten navigeren
  document.getElementById("shortForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    handleClick(e);
  });
  document.getElementById("longForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    handleClick(e);
  });

  // Init: eerste sectie tonen
  const sections = getSections();
  if (sections.length > 0) {
    showOnlySection(0);
    document.body.addEventListener("click", handleClick);
  }

  // Autofocus tussen geboortedatum velden
  ["dob_day", "dob_month", "dob_year"].forEach((id, index, arr) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        if (el.value.length >= el.maxLength && arr[index + 1]) {
          document.getElementById(arr[index + 1])?.focus();
        }
      });
    }
  });
});
