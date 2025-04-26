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
  };

  const updateProgressBar = () => {
    const sections = getSections();
    const percentage = Math.round((activeIndex / (sections.length - 1)) * 100);
    const fill = document.getElementById("progressFill");
    if (fill) fill.style.width = `${percentage}%`;
  };

  const handleClick = (e) => {
    const btn = e.target.closest(".go-next");
    if (!btn) return;

    const sections = getSections();
    activeIndex = Math.min(activeIndex + 1, sections.length - 1);
    showOnlySection(activeIndex);

    // Na eerste klik: hero-image verkleinen + progressie tonen
    if (activeIndex === 1) {
      const hero = document.getElementById("heroimage");
      const progress = document.getElementById("progressbar");
      if (hero) hero.classList.add("hero-small");
      if (progress) progress.style.display = "flex";
    }

    updateProgressBar();
  };

  const sections = getSections();
  if (sections.length > 0) {
    showOnlySection(0);
    document.body.addEventListener("click", handleClick);
  }
});
