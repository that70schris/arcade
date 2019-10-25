import { Declaration, parse, Rule } from 'css';
import { readFileSync, writeFileSync } from 'fs';
import { build } from 'plist';

writeFileSync('./dist/Arcade.tokens', build({
  settings: parse(readFileSync('./dist/Arcade.css').toString())
  .stylesheet.rules.map((rule: Rule) => {
    return {
      scope: rule.selectors.join(', ').replace(/(^|\s)\./g, '$1'),
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
