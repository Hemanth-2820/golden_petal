
const fs = require('fs');
const file = 'c:/Users/DELL/Documents/golden_petal/src/components/Footer.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/backgroundColor: '#000'/g, 'backgroundColor: \'#FFFFFF\', borderTop: \'4px solid #000\'');
content = content.replace(/color: '#FFFFFF'/g, 'color: \'#000\'');
content = content.replace(/border: '2px solid #FFFFFF'/g, 'border: \'2px solid #000\'');
fs.writeFileSync(file, content, 'utf8');
