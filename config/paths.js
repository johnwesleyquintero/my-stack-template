const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const configDir = path.join(rootDir, 'config');
const docsDir = path.join(rootDir, 'docs');
const scriptsDir = path.join(rootDir, 'scripts');

module.exports = {
  rootDir,
  srcDir,
  configDir,
  docsDir,
  scriptsDir,
  
  // Config paths
  gitConfig: path.join(configDir, 'git'),
  editorConfig: path.join(configDir, 'editor'),
  envConfig: path.join(configDir, 'env'),
  
  // Source paths
  components: path.join(srcDir, 'components'),
  pages: path.join(srcDir, 'pages'),
  styles: path.join(srcDir, 'styles')
};
