import { parse } from 'css';
import { readFileSync, writeFileSync } from 'fs';
import { build } from 'plist';

let input = process.argv[2];
if (!input) {
  console.log('No Input!');
  process.exit;
}

writeFileSync(input.split('.').slice(0, -1).concat('tokens').join('.'),
build({ settings: parse(readFileSync(input).toString())
  .stylesheet.rules.map((rule) => {
    return {
      scope: rule.selectors.join(', ').replace(/(^|\s)\./g, '$1'),
      settings: rule.declarations.reduce((result, declaration) => {
        return Object.assign(result, {
          [declaration.property]: declaration.value,
        });
      }, {}),
    };
  }) }),
);
