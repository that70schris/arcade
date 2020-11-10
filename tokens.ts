import { Declaration, parse, Rule } from 'css';
import { readFileSync, writeFileSync } from 'fs';
import { build } from 'plist';

[
  'Arcade',
  'Arcade Light',
].forEach((name) => {
  writeFileSync(`./dist/${name}.tokens`, build({
    settings: parse(readFileSync(`./dist/${name}.css`).toString())
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
            })()]: declaration.value,
          });
        }, {}),
      };
    }),
  } as any));
});
