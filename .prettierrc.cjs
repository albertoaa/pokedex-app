module.exports = {
  semi: true, // Add semicolons at the end of statements
  singleQuote: true, // Use single quotes instead of double quotes for strings
  trailingComma: 'all', // Add trailing commas wherever possible (ESLint's comma-dangle rule must also be configured accordingly)
  printWidth: 100, // Specify the line length where Prettier will try to wrap
  tabWidth: 2, // Specify the number of spaces per indentation-level
  plugins: ['prettier-plugin-tailwindcss'],
};
