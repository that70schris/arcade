import { Declaration, parse, Rule } from 'css';
import { readFileSync, writeFileSync } from 'fs';
import { build } from 'plist';

const input = process.argv[2];

writeFileSync(
  input.split('.').slice(0, -1).concat('tokens').join('.'),
  build({
    settings: parse(readFileSync(input).toString())
    .stylesheet.rules.map((rule: Rule) => {
      return {
        scope: rule.selectors.join(', ').replace(/(^|\s)\./g, '$1'),
        settings: rule.declarations.reduce((result, declaration: Declaration) => {
          return Object.assign(result, {
            [declaration.property]: declaration.value,
          });
        }, {}),
      };
    }),
  } as any),
);
