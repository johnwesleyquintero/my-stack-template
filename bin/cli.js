#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const command = process.argv[2];
const projectName = process.argv[3];

function runPowerShellScript(scriptName, args = []) {
  const scriptPath = path.join(__dirname, '..', 'scripts', scriptName);
  const pwshPath = process.platform === 'win32' 
    ? 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'
    : 'pwsh';

  const result = spawnSync(pwshPath, [
    '-ExecutionPolicy', 
    'Bypass', 
    '-File', 
    scriptPath,
    ...args
  ], { 
    stdio: 'inherit' 
  });

  return result.status === 0;
}

if (command === 'init') {
  if (!projectName) {
    console.error('Please specify a project name');
    process.exit(1);
  }
  runPowerShellScript('setup-dev-environment.ps1', [projectName]);
} else if (command === 'setup') {
  runPowerShellScript('setup-dev-environment.ps1');
} else {
  console.log(`
Usage:
  npx next-nebula-starter init <project-name>
  npx next-nebula-starter setup
  `);
}
