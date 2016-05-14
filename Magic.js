var request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  linereader=require('line-reader');
var writemagictrollcard=fs.createWriteStream("MagicTrollandToadOutput.csv");
//var writemagicchannelfireballcard=fs.createWriteStream("MagicChannelFireballCardOutput.csv");
writemagictrollcard.write("Name");
writemagictrollcard.write(", Troll and Toad card price");
writemagictrollcard.write(", Total Magic card price");
//writemagicchannelfireballcard.write("Name")
//writemagicchannelfireballcard.write(", Channel Fireball");
//writemagicchannelfireballcard.write(", Total Magic card price");
var lineNum = 0;
var TrollandToadPrice=0;
//var ChannelFireballPrice=0;
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
      
    
	if(price != null){
		console.log("The Card "+Card.CardName+" price is "+ price +" at Troll and Toad");
		writemagictrollcard.write("\n" + Card.CardName);
		writemagictrollcard.write("," + price);
		TrollandToadPrice=TrollandToadPrice+(parseFloat(price.substr(1)));
		writemagictrollcard.write("," + TrollandToadPrice);
	}
	
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
  /*Channel Fireball working implementation, But website is not happy with rapid requests. Makes me sad. Use with Caution and have queries be limited, I have a feeling they like to 
  * timeout requests.
  */
  /*
  url = "http://store.channelfireball.com/products/search?query="+Card.CardName;
  
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      price = $(".grid-item-price").html();
      
	console.log("The Card "+Card.CardName+" price is "+ price +" at Channel Fireball");
	writemagicchannelfireballcard.write("\n" + Card.CardName);
	if(price != null){
		writemagicchannelfireballcard.write("," + price);
		ChannelFireballPrice= ChannelFireballPrice+(parseFloat(price.substr(1)));
		writemagicchannelfireballcard.write("," + ChannelFireballPrice);
	}
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
*/	
}


