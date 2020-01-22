import { writeFileSync } from 'fs';
import './sugar';

writeFileSync(
  './dist/html.json',
  JSON.stringify({
    injectionSelector: 'L:-comment',
    scopeName: 'injection.html',
    repository: {
      value: {
        begin: '=',
        end: /(?<=[^\s=])(?!\s*=)|(?=\/?>)/,
        beginCaptures: {
          0: {
            name: 'punctuation.separator.html',
          },
        },
        patterns: [
          {
            begin: /"/,
            end: /"/,
            name: 'string',
            beginCaptures: {
              0: {
                name: 'punctuation.definition.string.begin.html',
              },
            },
            endCaptures: {
              0: {
                name: 'punctuation.definition.string.end.html',
              },
            },
          },
        ],
      },
    },
    patterns: [

    ],
  }),
);
