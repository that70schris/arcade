import { writeFileSync } from 'fs';
import './sugar';

writeFileSync('./dist/css.json', JSON.stringify({
  injectionSelector: 'L:-comment',
  scopeName: 'injection.css',
  patterns: [
    {
      match: /(cursor|content)(?=:)/,
      captures: {
        1: {
          name: 'meta.property-name',
        },
      },
    },
    {
      begin: /(?<=[/]|::)((?:ng-)?deep)[/]?/,
      end: /{/,
      beginCaptures: {
        1: {
          name: 'anchor',
        },
      },
      patterns: [{
        include: 'source.css',
      }],
    },
    {
      begin: /(?<=url)[(]/,
      end: /[)]/,
      beginCaptures: {
        1: {
          name: 'string',
        },
      },
    },
  ],
}));
