import { writeFileSync } from 'fs';

writeFileSync('./dist/css.json', JSON.stringify({
  scopeName: 'injection.css',
  injectionSelector: 'L:-comment',
  patterns: [
    {
      match: '(/|::)((?:ng-)?deep)(/?)',
      // name: 'entity.other.attribute-name',
      captures: {
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
    },
  ],
}));
