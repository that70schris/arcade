import { writeFileSync } from 'fs';

writeFileSync('./dist/css.json', JSON.stringify({
  injectionSelector: 'L:-comment',
  scopeName: 'injection.css',
  patterns: [
    {
      match: '(cursor|content)(?=:)',
      captures: {
        1: {
          name: 'meta.property-name'
        },
      },
    },
    {
      begin: '(/|::)((?:ng-)?deep)(/)?',
      end: '{',
      beginCaptures: {
        1: {
          name: 'punctuation',
        },
        2: {
          name: 'anchor',
        },
        3: {
          name: 'punctuation',
        },
      },
      patterns: [{
        include: 'source.css'
      }],
    },
  ],
}));
