var MARGIN = 12;
//var $ = require("./lib/jquery.min.js");

var page = tabris.create("Page", {
  title: "Ghanafeeds",
  topLevel: true
});

var tabFolder = tabris.create("TabFolder", {
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);

var createTab = function(title, image) {
  var tab = tabris.create("Tab", {
    title: title, // converted to upper-case on Android
    image: {src: image, scale: 2} // image only used by iOS
  }).appendTo(tabFolder);
  tabris.create("TextView", {
    layoutData: {centerX: 0, centerY: 0},
    text: "Content of Tab " + title
  }).appendTo(tab);
};


createTab('News','ghanafeeds.png');
createTab('Videos','ghanafeeds.png');
createTab('Exchange Rates','ghanafeeds.png');
page.open();