export default {
  paths: ['features/*.feature'],
  import: [                        
    'utils/world.js',
    'utils/hooks.js',
    'step-definitions/*.js',
  ],
  format: [
    'progress',                        // terminal output
    'html:reports/cucumber-report.html' // ← generates local HTML report
  ],
  timeout: 60000,
};