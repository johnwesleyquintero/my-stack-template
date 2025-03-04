#!/usr/bin/env node
import { execSync } from 'child_process';

const checks = [
  { cmd: 'npm run clean', name: 'Clean' },
  { cmd: 'npm run lint:fix', name: 'Lint' },
  { cmd: 'npm run type-check', name: 'TypeScript' },
  { cmd: 'npm run test', name: 'Tests' },
  { cmd: 'npm run build', name: 'Build' }
];

function runCheck(check) {
  try {
    console.log(`\n📝 Running ${check.name} check...`);
    execSync(check.cmd, { stdio: 'inherit' });
    console.log(`✅ ${check.name} check passed\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${check.name} check failed\n`);
    return false;
  }
}

function runChecks() {
  console.log('🚀 Starting pre-deployment checks...\n');
  const results = checks.map(runCheck);
  
  if (results.every(Boolean)) {
    console.log('✨ All checks passed! Ready to deploy.\n');
    return 0;
  }
  
  console.error('🛑 Some checks failed. Please fix the issues and try again.\n');
  return 1;
}

process.exit(runChecks());
