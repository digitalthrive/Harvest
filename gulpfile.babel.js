import gulp from 'gulp';
import fs from 'fs';
import prompt from 'gulp-prompt';
import childProcess from 'child_process';

const exec = childProcess.exec;

gulp.task('configure', (cb) => {
  const baseDevDependencies = {
    gulp: "^3.9.0",
    'gulp-prompt': '^0.1.2',
    'babel-core': '^6.4.5',
    'babel-preset-es2015': '^6.3.13'
  };

  gulp.src('package.json')
      .pipe(prompt.prompt([
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
      ],
      (config) => {
        config.devDependencies = baseDevDependencies;

        const {name, version, description, main, author, license, devDependencies} = config;
        const packageJsonData = {name, version, description, main, author, license, devDependencies};

        fs.writeFile('package.json', JSON.stringify(packageJsonData, null, 2), (err) => {
          if(err) console.log(err);
          console.log('Installing NPM modules');

          let sudo = '';
          if(config.sudo === 'Yes') sudo = 'sudo ';

          exec(sudo + 'npm install; npm prune;', (err, stdout, stderr) => {
            if(stdout) console.log(stdout);
            if(stderr) console.log(stderr);
            cb(err);
          });
        });
      }
    ))
});
