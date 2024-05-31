const puppeteer = require('puppeteer');

async function searchAndLogResults(searchTerm) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set a higher timeout for navigation
  await page.goto('https://www.google.com', { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for the search input field to be available and increase the timeout
  await page.waitForSelector('input[name="q"]', { visible: true, timeout: 60000 });

  await page.type('input[name="code"]', searchTerm);
  await page.keyboard.press('Enter');

  // Wait for the results page to load and display the results.
  await page.waitForSelector('div#search', { visible: true, timeout: 60000 });

  const results = await page.evaluate(() => {
    const items = document.querySelectorAll('div#search .g');
    return Array.from(items).map(item => item.innerText);
  });

  console.log(results);

  await browser.close();
}

const searchTerm = 'Code'; // Set search term to 'Code'
searchAndLogResults(searchTerm);
