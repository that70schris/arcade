import { Declaration, parse, Rule } from 'css';
import { readFileSync, writeFileSync } from 'fs';
const schema = require('./color-theme.json');
const name = process.argv[2];

writeFileSync(`./dist/${name}.color-theme.json`, (() => {
  let theme = require(`./${name}.color-theme.json`);
  let colors = Object.assign({}, schema.colors, theme.colors);
  let semanticTokenColors = Object.assign({}, schema.semanticTokenColors, theme.semanticTokenColors);
  let palette = theme._ || {};
  delete theme._;

  return JSON.stringify(Object.assign({
    type: /light/i.test(name) ? 'light' : 'dark',
    semanticHighlighting: true,
    name: name,
  }, theme, {
    colors: Object.keys(colors)
    .sort().reduce((result, key) => {
      return Object.assign(result, {
        [key]: palette[colors[key]] || colors[key],
      });
    }, {}),
    semanticTokenColors: Object.keys(semanticTokenColors)
    .sort().reduce((result, key) => {
      return Object.assign(result, {
        [key]: palette[semanticTokenColors[key]] || semanticTokenColors[key],
      });
    }, {}),
    tokenColors: theme.tokenColors || (() => {
      return parse(readFileSync('./dist/color-theme.css').toString())
      .stylesheet.rules.map((rule: Rule) => {
        return {
          scope: rule.selectors.join(', ').replace(/(^|\s)\./g, '$1').replace(/\\/g, ''),
          settings: rule.declarations.reduce((result, declaration: Declaration) => {
            return Object.assign(result, {
              [(() => {
                switch (declaration.property) {
                  case 'color': return 'foreground';
                  default: declaration.property;
                }
              })()]: palette[declaration.value],
            });
          }, {}),
        };
      });
    })(),
  }), null, '  ');
})());
