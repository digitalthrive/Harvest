/*
 * Prompts
 * Configuration of the CLI prompts for the configuration system
 */

export default [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the project?',
    default: 'Harvest'
  },
  {
    type: 'input',
    name: 'version',
    message: 'What is the version number?',
    default: '1.0.0'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Write a brief description about the project',
    default: ''
  },
  {
    type: 'input',
    name: 'main',
    message: 'What is the main script?',
    default: 'index.js'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Who is the author?',
    default: ''
  },
  {
    type: 'input',
    name: 'license',
    message: 'What is the license?',
    default: 'ISC'
  },
  {
    type: 'list', //checkbox for multi
    name: 'css',
    message: 'What CSS Pre-processor do you want to use?',
    choices: ['None', 'SCSS', 'LESS', 'Stylus'],
    default: 'SCSS'
  },
  {
    type: 'list',
    name: 'js',
    message: 'What JS manager do you want to use?',
    choices: ['Browserify', 'Webpack', 'JS PM', 'RequireJS'],
    default: 'None'
  },
  {
    type: 'list',
    name: 'es2015',
    message: 'Do you want to use ES2015?',
    choices: ['Yes', 'No'],
    default: 'Yes'
  },
  {
    type: 'input',
    name: 'src',
    message: 'What do you want to name your development folder?',
    default: 'src'
  },
  {
    type: 'input',
    name: 'dist',
    message: 'What do you want to name your distribution folder?',
    default: 'dist'
  },
  {
    type: 'list',
    name: 'sudo',
    message: 'Do you need to install npm package using sudo?',
    choices: ['No', 'Yes'],
    default: 'No'
  }
];
