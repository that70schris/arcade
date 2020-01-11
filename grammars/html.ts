import { writeFileSync } from 'fs';
import './sugar';

writeFileSync('./dist/html.json', JSON.stringify({
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
    {
      begin: /{{/,
      end: /}}/,
      name: 'meta.embedded.js',
      beginCaptures: {
        0: {
          name: 'punctuation.definition.template-expression.begin.html',
        },
      },
      endCaptures: {
        0: {
          name: 'punctuation.definition.template-expression.end.html',
        },
      },
      patterns: [
        {
          include: 'source.js',
        },
      ],
    },
    {
      begin: /(\[)([\w\.]+)(\])(?==)/,
      end: /(?=\s*[^=\s])/,
      name: 'meta.attribute.input.html',
      beginCaptures: {
        1: {
          name: 'meta.brace.square',
        },
        2: {
          name: 'entity.other.attribute-name.html',
        },
        3: {
          name: 'meta.brace.square',
        },
      },
      patterns: [
        {
          include: '#value',
        },
      ],
    },
    {
      begin: /(\[?)(\()(\w+)(\))(\]?)(?==)/,
      end: /(?=\s*[^=\s])/,
      name: 'meta.attribute.output.html',
      beginCaptures: {
        1: {
          name: 'meta.brace.square',
        },
        2: {
          name: 'meta.brace.round',
        },
        3: {
          name: 'entity.other.attribute-name.html',
        },
        4: {
          name: 'meta.brace.round',
        },
        5: {
          name: 'meta.brace.square',
        },
      },
      patterns: [
        {
          include: '#value',
        },
      ],
    },
    {
      begin: /(\*)(\w+)(?==)/,
      end: /(?=\s*[^=\s])/,
      name: 'meta.attribute.control.html',
      beginCaptures: {
        1: {
          name: 'puncuation',
        },
        2: {
          name: 'entity.other.attribute-name.html',
        },
      },
      patterns: [
        {
          include: '#value',
        },
      ],
    },
  ],
}));
