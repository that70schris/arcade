import { writeFileSync } from 'fs';

writeFileSync('./dist/nginx.json', JSON.stringify({
  scopeName: 'injection.nginx',
  injectionSelector: 'L:-comment',
  patterns: [{
    match: '(@)\\w+',
    name: 'anchor',
    captures: {
      1: {
        name: 'punctuation',
      },
    },
  }],
}));
