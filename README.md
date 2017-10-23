# MagicTheGatheringWebScrapper
Magic the gathering webscrapper for getting the prices of various cards - I originally created this for a Gameshop Owner that wanted to see the prices of various Magic cards on various sites, and instead of having him manually search, I decided to create a webscrapper in Node.js instead. 

You need three packages:

```npm install request ```
```npm install cheerio ```
```npm install line-reader ```

Keep in mind that for the original intent, the Magic the gathering card sites change frequently (Probably to discourage webscrapping), so some adjustment based on the jQuery elements may be needed. If you choose another site, you will need to observe the element you wish to scrape within the DOM (Document Object Model) Happy Scrapping!

This falls under the GNU General Public License
