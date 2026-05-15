export default {
  // 1. Where your feature files are located
  paths: ['features/**/*.feature'], 
  
  // 2. Where your step definitions and setup files are located
  import: [                        
    'utils/world.js',
    'utils/hooks.js',
    'step-definitions/**/*.js',
  ],
  
  // 3. All your reporters go here in ONE list
  format: [
    'progress',                             // Shows the dots in the terminal
    'summary',                              // Shows the final pass/fail text
    'json:reports/cucumber_report.json',    // REQUIRED for multiple-cucumber-html-reporter
    'html:reports/cucumber-report.html'     // The native basic HTML report (optional)
  ],
  
  // 4. Global timeout (60 seconds)
  timeout: 60000,
};