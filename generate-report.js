// 1. Use 'import' instead of 'require'
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const report = require('multiple-cucumber-html-reporter');

// 2. Call it directly (Node will handle the CommonJS interop)
report.generate({
  jsonDir: './reports/',
  reportPath: './reports/html-report/',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local Test Machine',
    platform: {
      name: 'Windows', 
      version: '11'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Playwright UI Automation Series' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() }
    ]
  }
});