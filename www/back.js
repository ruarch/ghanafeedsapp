var MARGIN = 12;
var $ = require("./lib/jquery.min");
var url='http://ghanafeeds.com/jfeed.php';
var page = tabris.create("Page", {
  title: "Ghanafeeds",
  topLevel: true
});

/*var tabFolder = tabris.create("TabFolder", {
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: true // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
}).appendTo(page);*/

//var createTab = function(title,fdata, image) {
/*  var tab = tabris.create("Tab", {
    title: title, // converted to upper-case on Android
    image: {src: image, scale: 2} // image only used by iOS
  }).appendTo(tabFolder);*/
 /* tabris.create("TextView", {
    layoutData: {centerX: 0, centerY: 0},
    text: "Content of Tab " + title
  }).appendTo(tab);*/
/* var feedview= tabris.create("TextView", {
    layoutData: {centerX: 0, centerY: 0},
    text:  'Loaded'
  }).appendTo(tab);





tabris.create("CollectionView", {
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  items: fdata,
  itemHeight: 256,
  initializeCell: function(cell) {
  
    cell.on("change:item", function(widget, fdata) {
     // imageView.set("image", {src: fdata.image});
      nameTextView.set("text", fdata.title);
    });
  }
}).on("select", function(target, value) {
  console.log("selected", fdata.title);
}).appendTo(tab);


*/




/*  var button = tabris.create("Button", {
  text: "OK",
}).appendTo(tab);
button.on("selection", getfeed());*/
//};

tabris.create("CollectionView", {
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  items: fdata,
  itemHeight: 256,
  initializeCell: function(cell) {
  
    cell.on("change:item", function(widget, fdata) {
     // imageView.set("image", {src: fdata.image});
      nameTextView.set("text", fdata.title);
    });
  }
}).on("select", function(target, value) {
  console.log("selected", fdata.title);
}).appendTo(tab);

var getfeed= function getfeed() {
var items = [];
  var url='http://ghanafeeds.com/jfeed.php';
  $.getJSON(url, function (data) {
     //navigator.notification.alert(JSON.stringify(object.channel);
        $.each( data, function( key, val ) {
        if(key=='channel')
          {
             $.each( val.item, function( index, obj ) {
              items.push({
                  title: obj.title
              });
             
      });
       //  console.log(JSON.stringify(items));
    }

  });
//console.log(JSON.stringify(items));


});

   return items;
}
fdata=getfeed();
/*createTab('News',fdata,'ghanafeeds.png');
createTab('Videos',fdata,'ghanafeeds.png');
createTab('Exchange Rates',fdata,'ghanafeeds.png');*/

page.open();