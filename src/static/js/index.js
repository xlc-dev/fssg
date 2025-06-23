document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".doc-tab");
  const panels = document.querySelectorAll(".doc-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetPanelId = tab.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetPanelId);

      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => {
        p.classList.remove("active");
        p.style.display = "none";
      });

      tab.classList.add("active");
      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.style.display = "block";
      }
    });
  });

  document.querySelectorAll("pre").forEach((preElement) => {
    const wrapper =
      preElement.closest(".code-block-wrapper") ||
      preElement.closest(".feature-visual");
    if (wrapper && !wrapper.querySelector(".copy-code-button")) {
      const copyButton = document.createElement("button");
      copyButton.classList.add("copy-code-button");
      copyButton.setAttribute("aria-label", "Copy code to clipboard");
      copyButton.textContent = "Copy";
      wrapper.appendChild(copyButton);
      copyButton.addEventListener("click", () => {
        const codeElement = preElement.querySelector("code");
        const codeToCopy = codeElement ? codeElement.innerText : "";
        navigator.clipboard
          .writeText(codeToCopy)
          .then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => {
              copyButton.textContent = "Copy";
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy code: ", err);
            copyButton.textContent = "Error";
          });
      });
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});