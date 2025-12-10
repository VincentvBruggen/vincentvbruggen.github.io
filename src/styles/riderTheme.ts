// Custom syntax highlighting theme inspired by JetBrains Rider's default C# theme
export const riderTheme = {
  'code[class*="language-"]': {
    color: '#A9B7C6',
    fontFamily: 'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: 4,
    hyphens: 'none' as const,
  },
  'pre[class*="language-"]': {
    color: '#A9B7C6',
    fontFamily: 'JetBrains Mono, Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9rem',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: 4,
    hyphens: 'none' as const,
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
    background: '#2B2B2B',
  },
  // Comments
  'comment': {
    color: '#808080',
    fontStyle: 'italic',
  },
  'prolog': {
    color: '#808080',
  },
  'doctype': {
    color: '#808080',
  },
  'cdata': {
    color: '#808080',
  },
  // Keywords (e.g., if, else, return, public, private, void, class)
  'keyword': {
    color: '#CC7832',
    fontWeight: 'bold',
  },
  // Types and Classes
  'class-name': {
    color: '#A9B7C6',
  },
  'namespace': {
    color: '#A9B7C6',
  },
  // Strings
  'string': {
    color: '#6A8759',
  },
  'char': {
    color: '#6A8759',
  },
  // Numbers
  'number': {
    color: '#6897BB',
  },
  // Boolean values
  'boolean': {
    color: '#CC7832',
    fontWeight: 'bold',
  },
  // Variables and parameters
  'variable': {
    color: '#A9B7C6',
  },
  'parameter': {
    color: '#A9B7C6',
  },
  // Functions and methods
  'function': {
    color: '#FFC66D',
  },
  'method': {
    color: '#FFC66D',
  },
  // Properties and fields
  'property': {
    color: '#9876AA',
  },
  'field': {
    color: '#9876AA',
  },
  // Operators
  'operator': {
    color: '#A9B7C6',
  },
  // Punctuation
  'punctuation': {
    color: '#A9B7C6',
  },
  // Attributes/Annotations
  'annotation': {
    color: '#BBB529',
  },
  'attribute': {
    color: '#BBB529',
  },
  'attr-name': {
    color: '#BBB529',
  },
  // Tag names (for XML/HTML)
  'tag': {
    color: '#E8BF6A',
  },
  // Builtin types and constants
  'builtin': {
    color: '#A9B7C6',
  },
  'constant': {
    color: '#9876AA',
  },
  // Deleted/Inserted (for diffs)
  'deleted': {
    color: '#FF0000',
  },
  'inserted': {
    color: '#00FF00',
  },
  // Regex
  'regex': {
    color: '#6A8759',
  },
  // Important
  'important': {
    color: '#CC7832',
    fontWeight: 'bold',
  },
  'bold': {
    fontWeight: 'bold',
  },
  'italic': {
    fontStyle: 'italic',
  },
  // Entity
  'entity': {
    cursor: 'help',
  },
  // URL
  'url': {
    color: '#287BDE',
  },
  // Selector (CSS)
  'selector': {
    color: '#E8BF6A',
  },
};
