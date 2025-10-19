document.addEventListener("DOMContentLoaded", () => {
  let darkMode = true;

  function handleSwitchDarkMode() {
    darkMode = !darkMode;

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
    darkMode = true;
  } else {
    document.documentElement.classList.remove("dark");
    darkMode = false;
  }

  document
    .getElementById("theme-toggle")
    .addEventListener("click", handleSwitchDarkMode);
});
