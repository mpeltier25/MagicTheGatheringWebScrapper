var request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  linereader=require('line-reader');
var writemagictrollcard=fs.createWriteStream("MagicTrollandToadOutput.csv");
var writemagicchannelfireballcard=fs.createWriteStream("MagicChannelFireballCardOutput.csv");
writemagictrollcard.write("Name");
writemagictrollcard.write(", Troll and Toad");
writemagicchannelfireballcard.write("Name")
writemagicchannelfireballcard.write(", Channel Fireball");
var lineNum = 0;
var columns = [];
var card = [];

linereader.eachLine('MagicCardsInput.csv', function(line, last){
			// Get the column names
			if (lineNum == 0) {
				columns = line.toString().split(",");
			} else {
				var temp = {};
				var splitter = line.toString().split(",");
				// Create an object in the form of attributes
				for (var i = 0; i < splitter.length; i++)
					temp[columns[i]] = splitter[i];
				card.push(temp);
	 		}
	 		lineNum++;
	 		if (last) {
	 			for (var i = 0; i < card.length; i++) {
	 			    processCard(card[i]);
	 			}
	 		}
	});
	
function processCard(Card){
	//Troll and Toad working implementation
  url = "http://www.trollandtoad.com/products/search.php?search_category=&search_words="+Card.CardName;
  
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      price = $(".price_text").html();
      
    console.log("The Card "+Card.CardName+" price is "+ price +" at Troll and Toad");
	writemagictrollcard.write("\n" + Card.CardName);
	writemagictrollcard.write("," + price);
	
	 url = "http://store.channelfireball.com/products/search?query="+Card.CardName;
	
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
  //Channel Fireball working implementation
  
  url = "http://store.channelfireball.com/products/search?query="+Card.CardName;
  
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      price = $(".grid-item-price").html();
      
	console.log("The Card "+Card.CardName+" price is "+ price +" at Channel Fireball");
	writemagicchannelfireballcard.write("\n" + Card.CardName);
	writemagicchannelfireballcard.write("," + price);
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
	
}


