const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('c:/Users/DELL/Documents/golden_petal/src');

const badColors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'cyan', 'magenta', 'lime', 'teal', 'gray', 'grey', 'maroon', 'navy', 'olive', 'silver', 'crimson'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  badColors.forEach(color => {
    // Replace inline styles like color: 'red', color: "red"
    const regex1 = new RegExp(`(color|backgroundColor|background|fill|stroke|borderColor):\\s*['"]` + color + `['"]`, 'gi');
    content = content.replace(regex1, (match, prop) => {
      return prop + ": '#D4AF37'";
    });
    
    // Replace in CSS like color: red;
    const regex2 = new RegExp(`(color|background-color|background|fill|stroke|border-color):\\s*` + color + `\\b`, 'gi');
    content = content.replace(regex2, (match, prop) => {
      return prop + ": #D4AF37";
    });
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed string color in ' + file);
  }
});
