const { merge } = require('lodash');
const { simple } = require('quick-grunt');

const tasks = [
  {
    name: 'lint',
    description: 'Lint the source code.',
    exec: ['cspell', 'eslint', 'remark'],
  },
  {
    name: 'format',
    description: 'Format the source code.',
    exec: ['prettier', 'alphabetize'],
  },
  {
    name: 'test',
    description: 'Compile and run unit tests.',
    clean: ['build', 'tests'],
    copy: ['fixtures'],
    exec: ['compileTests', 'mocha', 'renameCoverage'],
  },
  {
    name: 'build',
    description: 'Compile the package for publishing.',
    clean: ['build'],
    exec: ['compile'],
  },
];

const clean = {
  build: ['dist'],
  tests: ['coverage', '.mocha', '.nyc_output'],
};

const copy = {
  fixtures: {
    files: [
      {
        expand: true,
        cwd: 'tests/fixtures',
        src: ['**', '**/.*'],
        dest: 'dist/tests/fixtures',
      },
    ],
  },
};

const linters = {
  cspell: 'npx cspell ".*" "*" "**/*"',
  eslint: 'npx esw "**/*.{js,jsx,ts,tsx}" --fix --ignore-path .gitignore',
  remark: 'npx remark -r .remarkrc --ignore-path .gitignore . .github',
  missing: 'conductor cspell words',
};

const formatters = {
  prettier: 'npx prettier . --write',
  alphabetize: 'conductor cspell format',
};

const tsc = {
  compile: 'npx tsc -p src',
  compileTests: 'npx tsc -p src/tsconfig.spec.json',
};

const tests = {
  mocha:
    "npx nyc mocha 'dist/**/*.js' " +
    '-R mochawesome --reporter-options reportDir=.mocha',
  renameCoverage: 'mv coverage/cobertura-coverage.xml coverage/cobertura.xml',
};

const docs = {
  quickdocs: 'quickdocs .quickdocs.yml',
};

const exec = merge(linters, formatters, tsc, tests, docs);

module.exports = simple({ clean, copy, exec }, tasks);
