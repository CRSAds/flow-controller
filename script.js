document.addEventListener("DOMContentLoaded", () => {
  const sectionIds = [
    "heroimage",
    "prelander",
    "surveyquestion",
    "surveyquestion",
    "surveyquestion",
    "shortform",
    "longform",
    "bedankscherm"
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
  };

  const handleClick = (e) => {
    const btn = e.target.closest(".go-next, [type='submit']");
    if (!btn) return;

    const sections = getSections();
    activeIndex = Math.min(activeIndex + 1, sections.length - 1);
    showOnlySection(activeIndex);

    // Hero image verkleinen + progressbar tonen na eerste klik
    if (activeIndex === 1) {
      document.getElementById("heroimage")?.classList.add("hero-small");
      document.getElementById("progressbar")?.classList.add("progressbar-visible");
    }

    updateProgress();
  };

  const updateProgress = () => {
    const progressFill = document.getElementById("progressFill");
    const totalSteps = getSections().length - 2; // -2 omdat heroimage en prelander geen echte stappen zijn
    const completedSteps = Math.max(0, activeIndex - 2);
    const percentage = Math.min(100, (completedSteps / totalSteps) * 100);

    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  };

  // Init
  const sections = getSections();
  if (sections.length > 0) {
    showOnlySection(0); // Alleen heroimage zichtbaar bij starten
    document.body.addEventListener("click", handleClick);
  }
});
