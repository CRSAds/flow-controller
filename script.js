document.addEventListener("DOMContentLoaded", () => {
  const sectionIds = [
    "heroimage",
    "prelander",
    "surveyquestion",
    "surveyquestion",
    "surveyquestion",
    "shortform",
    "longform",
    "bedanktscherm" // ✅ correct gespeld
  ];

  let activeIndex = 0;

  const getSections = () => {
    return sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el);
  };

  const showOnlySection = (index) => {
    const sections = getSections();
    sections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });

    // Progressbar pas tonen vanaf survey
    const progressbar = document.getElementById('progressbar');
    if (progressbar) {
      progressbar.style.display = index > 1 ? 'block' : 'none';
    }

    // Hero verkleinen na prelander
    const hero = document.getElementById('heroimage');
    if (hero) {
      if (index > 1) {
        hero.classList.add('hero-small');
      } else {
        hero.classList.remove('hero-small');
      }
    }

    updateProgressbar(index);
  };

  const updateProgressbar = (index) => {
    const progress = document.getElementById("progress");
    const totalSteps = getSections().length - 2; // hero + prelander tellen niet mee
    const realIndex = Math.max(0, index - 2);
    if (progress) {
      const percentage = Math.min(100, (realIndex / totalSteps) * 100);
      progress.style.width = `${percentage}%`;
    }
  };

  const handleClick = (e) => {
    const btn = e.target.closest("[data-next]");
    if (!btn) return;

    const sections = getSections();
    activeIndex = Math.min(activeIndex + 1, sections.length - 1);
    showOnlySection(activeIndex);
  };

  // Init
  const sections = getSections();
  if (sections.length > 0) {
    showOnlySection(0);
    document.body.addEventListener("click", handleClick);
  }
});
