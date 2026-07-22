
const fs = require('fs');
const cssPath = 'c:/Users/DELL/Documents/golden_petal/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.flex-stack-mobile')) {
  css += '\n\n/* Global Responsive Fixes */\n@media (max-width: 768px) {\n  .flex-stack-mobile {\n    flex-direction: column !important;\n    gap: 2rem !important;\n  }\n  .mobile-padding {\n    padding: 3rem 1.5rem !important;\n  }\n  .mobile-text-clamp {\n    font-size: clamp(2.5rem, 8vw, 4rem) !important;\n  }\n  .mobile-w-full {\n    width: 100% !important;\n    flex: 1 1 100% !important;\n  }\n  .momo-panel, .momo-panel-dark {\n    padding: 1.5rem !important;\n  }\n  .title-display {\n    word-break: break-word;\n  }\n}\n';
  fs.writeFileSync(cssPath, css);
}
