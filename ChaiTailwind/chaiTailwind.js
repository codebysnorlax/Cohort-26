const chaiTailwind = {
  // Layout and Display
  "chai-flex": "display: flex;",
  "chai-flex-col": "flex-direction: column;",
  "chai-flex-wrap": "flex-wrap: wrap;",
  "chai-items-center": "align-items: center;",
  "chai-justify-center": "justify-content: center;",
  "chai-justify-between": "justify-content: space-between;",
  "chai-hidden": "display: none;",
  "chai-block": "display: block;",
  "chai-inline-block": "display: inline-block;",

  // Positioning
  "chai-relative": "position: relative;",
  "chai-absolute": "position: absolute;",
  "chai-fixed": "position: fixed;",
  "chai-top-0": "top: 0;",
  "chai-bottom-0": "bottom: 0;",

  // Text and Fonts
  "chai-text-center": "text-align: center;",
  "chai-text-left": "text-align: left;",
  "chai-text-right": "text-align: right;",
  "chai-font-bold": "font-weight: bold;",
  "chai-font-normal": "font-weight: normal;",
  "chai-italic": "font-style: italic;",

  // UI
  "chai-border": "border: 1px solid #ccc;", // Default thin border
  "chai-shadow": "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
  "chai-cursor-pointer": "cursor: pointer;",
  "chai-overflow-hidden": "overflow: hidden;",
  // Chai color
  "chai-color-red": "color: #ff0000;",
  "chai-color-blue": "color: #0000ff;",
  "chai-white": "color: #ffffff",
    "chai-bg-black": "background-color: #000000",
  "chai-td-none": "text-decoration: none",

  // Added
  "chai-justify-end": "justify-content: flex-end;",
  "chai-items-start": "align-items: flex-start;",
  "chai-font-semibold": "font-weight: 600;",
  "chai-border-none": "border: none;",
  "chai-transition": "transition: all 0.2s ease;",
  "chai-uppercase": "text-transform: uppercase;",
  "chai-tracking-wide": "letter-spacing: 0.05em;",
  "chai-self-center": "align-self: center;",
  "chai-list-none": "list-style: none;",
  "chai-outline-none": "outline: none;",

  // Added for project UI
  "chai-min-h-screen": "min-height: 100vh;",
  "chai-bg-gray-950": "background-color: #0a0a0f;",
  "chai-bg-gray-900": "background-color: #111118;",
  "chai-bg-gray-800": "background-color: #1a1a24;",
  "chai-border-gray": "border: 1px solid #2a2a3a;",
  "chai-text-gray": "color: #9ca3af;",
  "chai-text-white": "color: #ffffff;",
  "chai-text-amber": "color: #f59e0b;",
  "chai-bg-amber": "background-color: #f59e0b;",
  "chai-text-black": "color: #000000;",
  "chai-w-full": "width: 100%;",
  "chai-max-w-4xl": "max-width: 56rem;",
  "chai-mx-auto": "margin-left: auto; margin-right: auto;",
  "chai-py-3": "padding-top: 12px; padding-bottom: 12px;",
  "chai-px-6": "padding-left: 24px; padding-right: 24px;",
  "chai-py-16": "padding-top: 64px; padding-bottom: 64px;",
  "chai-py-12": "padding-top: 48px; padding-bottom: 48px;",
  "chai-py-8": "padding-top: 32px; padding-bottom: 32px;",
  "chai-px-4": "padding-left: 16px; padding-right: 16px;",
  "chai-mb-2": "margin-bottom: 8px;",
  "chai-mb-4": "margin-bottom: 16px;",
  "chai-mb-6": "margin-bottom: 24px;",
  "chai-mb-8": "margin-bottom: 32px;",
  "chai-mb-12": "margin-bottom: 48px;",
  "chai-mt-2": "margin-top: 8px;",
  "chai-line-relaxed": "line-height: 1.625;"
};

const elements = document.querySelectorAll("[class]");

elements.forEach((elem) => {
  // Looping through every class
  Array.from(elem.classList).forEach((className) => {
    // Only process our chai classes
    if (className.startsWith("chai-")) {
      if (chaiTailwind[className]) {
        elem.style.cssText += chaiTailwind[className];
        elem.classList.remove(className);
      } else {
        const parts = className.split("-");
        const type = parts[1]; // such as, "p", "bg", "text", "rounded"
        const value = parts[2]; // such as, "4", "red", "24"

        // Spacing (Multiplier: 4px)
        if (type === "p") elem.style.padding = value * 4 + "px";
        if (type === "m") elem.style.margin = value * 4 + "px";
        if (type === "gap") elem.style.gap = value * 4 + "px";

        // Dimensions (Percent or Pixels)
        if (type === "w") {
          elem.style.width = value === "full" ? "100%" : value + "%";
        }
        if (type === "h") {
          elem.style.height = value === "screen" ? "100vh" : value * 4 + "px";
        }

        // Colors
        if (type === "bg") elem.style.backgroundColor = value;
        if (type === "text" && !isNaN(value))
          elem.style.fontSize = value + "px"; // chai-text-24 -> 24px
        else if (type === "text") elem.style.color = value; // chai-text-blue -> blue

        // Borders and Visuals
        if (type === "rounded") {
          elem.style.borderRadius = value === "full" ? "9999px" : value + "px"; // chai-rounded-8 -> 8px
        }
        if (type === "opacity") {
          elem.style.opacity = value / 100; // chai-opacity-50 -> 0.5
        }
        if (type === "z") {
          elem.style.zIndex = value; // chai-z-10 -> z-index: 10
        }

        elem.classList.remove(className);
      }
    }
  });
});
