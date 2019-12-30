import { writeFileSync } from 'fs';

writeFileSync('./dist/html.json', JSON.stringify({
  injectionSelector: 'L:-comment',
  scopeName: 'injection.html',
  repository: {
    value: {
      begin: '=',
      end: '(?<=[^\\s=])(?!\\s*=)|(?=/?>)',
      beginCaptures: {
        0: {
          name: 'punctuation.separator.html',
        },
      },
      patterns: [
        {
          begin: '"',
          end: '"',
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
          patterns: [
            {
              match: '[^"]+',
              patterns: [{
                include: 'source.js',
              }],
            },
          ],
        },
      ],
    },
  },
  patterns: [
    {
      begin: '{{',
      end: '}}',
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
      begin: '\\[[\\w\\.]+\\](?==)',
      end: '(?=\\s*+[^=\\s])',
      name: 'meta.attribute.input.html',
      beginCaptures: {
        0: {
          name: 'entity.other.attribute-name.html',
        },
      },
      patterns: [
        {
          include: '#value',
        },
      ],
    },
    {
      begin: '\\[?\\(\\w+\\)\\]?(?==)',
      end: '(?=\\s*+[^=\\s])',
      name: 'meta.attribute.output.html',
      beginCaptures: {
        0: {
          name: 'entity.other.attribute-name.html',
        },
      },
      patterns: [
        {
          include: '#value',
        },
      ],
    },
    {
      begin: '\\*\\w+',
      end: '(?=\\s*+[^=\\s])',
      name: 'meta.attribute.control.html',
      beginCaptures: {
        0: {
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
