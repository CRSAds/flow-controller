document.addEventListener("DOMContentLoaded", () => {
  const sectionIds = [
    "hero",
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

  const handleClick = (e) => {
    const btn = e.target.closest(".go-next");
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
