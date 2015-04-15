var $ = require("./lib/jquery.min");
var IMAGE_SIZE = 120;
var THUMB_SIZE = 48;
var MARGIN_SMALL = 4;
var MARGIN = 12;
var MARGIN_LARGE = 24;
var url='http://ghanafeeds.com/rss/json';
var TITLE="Ghanafeeds";
var page = tabris.create("Page", {
  title: "Ghanafeeds",
  topLevel: true
});



var view = tabris.create("CollectionView", {
  layoutData: {left:0, right: 0, bottom: 0},
  itemHeight: 120,
  refreshEnabled: true,
  initializeCell: function(cell) {
    var imageView = tabris.create("ImageView", {
      layoutData: {width: IMAGE_SIZE, height: 74,left:5,bottom:10,top:5},
      scaleMode:"fill",
    }).appendTo(cell);
    var titleView = tabris.create("TextView", {
      layoutData: {top: 0, left: [imageView, MARGIN], right: 5,top:5},
      markupEnabled: true
    }).appendTo(cell);
     var descView = tabris.create("TextView", {
      layoutData: {top: [titleView, 5],left: [imageView, MARGIN], right: 5}
    }).appendTo(cell);
     var periodView = tabris.create("TextView", {
      layoutData: {top: [descView, 2],left: [imageView, MARGIN], right: 5}
    }).appendTo(cell);
    cell.on("change:item", function(widget,item) {
      titleView.set("text", '<b>'+item.ftitle+'</b>'+' - '+'<small>'+item.period+'</small>');
      descView.set("text", item.description);
      //periodView.set("text", item.period);
      imageView.set("image", {src: item.image});
    });
  }
}).on("refresh", function() {
  loadItems();
}).appendTo(page);
view.on("select", function(target, value) {
  var readfeed=tabris.create("Page", {
  title: TITLE+" - "+value.ftitle,
  topLevel: true
});

    //createBookPage(value).open();
    //navigator.notification.alert(value.ftitle);
    
   
    var webview = tabris.create("WebView", {
        layoutData: {left: 0, top: 0, right: 0, bottom: 0}
    }).appendTo(readfeed);

    webview.set("url", value.link);
    readfeed.open();
  });
loadItems();

page.open();

function loadItems() {
  view.set({
    refreshIndicator: true,
    refreshMessage: "loading..."
  });
  setTimeout(function() {
      getfeed();
  }, 1000*5);
}

function getfeed() {
var items = [];
$.ajaxSetup({ cache:false });

  var url='http://ghanafeeds.com/rss/json';
  $.getJSON(url, function (data) {
     //navigator.notification.alert(JSON.stringify(object.channel);
      //console.log(JSON.stringify(data));
        $.each( data.news, function( key, val ) {

      /*items.push(
              ftitle:[obj.title]

              );*/
            items.push({
                  ftitle: val.title,
                  description: val.description,
                  image: val.image,
                  period: val.period,
                  link: val.link
              });
  });
console.log(JSON.stringify(items));

  view.set({
      items: items,
      refreshIndicator: false,
      refreshMessage: ""
    });
});

 
}
function passfeed(feeds)
{
  return feeds;
}