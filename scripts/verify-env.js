const { execSync } = require('child_process');

try {
  console.log('Node version:', process.version);
  console.log('NPM version:', execSync('npm --version').toString().trim());
  console.log('Node path:', process.execPath);
  console.log('NPM prefix:', execSync('npm config get prefix').toString().trim());
  console.log('PATH:', process.env.PATH);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
