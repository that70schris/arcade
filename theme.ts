import { parse } from 'css';
import { readFile, writeFileSync } from 'fs';

let input = process.argv[2];
if (!input) {
  console.log('No Input!');
  process.exit;
}

readFile(input, (error, css) => {
  writeFileSync(
    input.split('.').slice(0, -1).concat('tmTheme').join('.'), (() => {
      return `${
parse(css.toString())
.stylesheet.rules.map((rule) => {
  return `
<dict>
  <key>scope</key>
  <string>${rule.selectors.join(', ').replace(/(^|\s)\./g, '$1')}</string>
  <key>settings</key>
  <dict>${
  rule.declarations.map(declaration => {
    return `
    <key>${declaration.property}</key>
    <string>${declaration.value}</string>`;
  }).join('\n')}
  </dict>
</dict>`;
}).join('\n')}`;
    })()
  );
})
