import { Status } from '@cucumber/cucumber';
import { logger } from './logger.js';

// We pass exactly two things: the scenario, and the 'world' (which is 'this')
export async function captureScreenshotOnFailure(stepInfo, world) {
  if (
    stepInfo.result?.status === Status.FAILED || 
    stepInfo.result?.status === 'FAILED' || 
    stepInfo.result?.status === 'failed'
  ) {
    
    const page = world.page;

    if (!page) {
      logger.error('Cannot take screenshot: page is undefined.');
      return; 
    }

    try {
      logger.info('Test failed! Capturing screenshot...');
      
      const screenshotBuffer = await page.screenshot({ 
        fullPage: true 
      });

      world.attach(screenshotBuffer, 'image/png');
      
      logger.info('Screenshot successfully attached!');
    } catch (error) {
      logger.error('Failed to capture screenshot:', error);
    }
  }
}