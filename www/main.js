var $ = require("./lib/jquery.min");
var apputils=require("./app_utils");
var IMAGE_SIZE = 120;
var THUMB_SIZE = 48;
var MARGIN_SMALL = 4;
var MARGIN = 12;
var MARGIN_LARGE = 24;
var conn_establish=false;
//var url='http://ghanafeeds.com/rss/json';
var apputils

var TITLE="Ghanafeeds";
var page = tabris.create("Page", {
  title: TITLE,
  //style: ["FULLSCREEN"],
  topLevel: true
});

/*var sidemenu=tabris.create("Drawer");

var input = tabris.create("TextInput", {
    text: "5",
    layoutData: {left: 10, top: 10, right: 10}
  }).appendTo(sidemenu);
var badgebtn=tabris.create("Button", {
    layoutData: {left: 10, top: [input, 10], right: 10},
    text: "Set Badge"
  }).appendTo(sidemenu).on("select", function() {
    var badge = input.get("text");
   cordova.plugins.notification.badge.configure({ title: '%d new feeds available' });
   cordova.plugins.notification.badge.set(badge);
   cordova.plugins.notification.badge.configure({ autoClear: true });
   
  });

  var removeappid=tabris.create("Button", {
    layoutData: {left: 10, top: [badgebtn, 10], right: 10},
    text: "Remove Appid"
  }).appendTo(sidemenu).on("select", function() {
  localStorage.removeItem('appid');
   
  });*/
/* tabris.create("Action", {
  title: "Check Update",
  image: "images/sinchronize-64.png"
}).on("select", function() {
 getupdate();
   
});*/

setInterval(getupdate, 3000);
function getupdate()
{
  var $ = require("./lib/jquery.min");
  var  url='http://ghanafeeds.com/app/getupdate';
  var appid='';
  var update_count=0;
  updatedata=localStorage.getItem('news_update');
  updatedata=$.parseJSON(localStorage.getItem('news_update'))
  conn_establish=true;
    $.ajax({
                url: url,
                dataType: 'json',
                //timeout: 5000,
                success:  function (data) {
                  conn_establish=false;
                  if(data.update_id!='')
                  {
                    localStorage.setItem('news_update', JSON.stringify(data));
                    //console.log('Update SET:'+data.update_id);
                  }
                    //console.log(data.update_id+' : '+updatedata.update_id);
                    if(updatedata.update_id!=data.update_id)
                    {
                      update_count=data.update_count;
                      if(update_count>0)
                      {
                        cordova.plugins.notification.badge.configure({ title: '%d news feeds available' });
                        cordova.plugins.notification.badge.configure({ smallIcon: 'ic_action_star' });
                        cordova.plugins.notification.badge.configure({ autoClear: true });
                        cordova.plugins.notification.badge.set(update_count);
                        navigator.notification.beep(1);
                         getfeed();
                      }
                    }
                        
                        
                      },error: function(data, errorThrown)
                      {
                        console.log('Update not fetched'+errorThrown);
                      }
              });


  
}















var tabFolder = tabris.create("TabFolder", {
  layoutData: {left: 0, top: 0, right: 0, bottom: 0},
  paging: true, // enables swiping. To still be able to open the developer console in iOS, swipe from the bottom right.
 
}).appendTo(page);

//Tabs for the pages
 var Newstab = tabris.create("Tab", {
    title: 'News', // converted to upper-case on Android
  }).appendTo(tabFolder);

  var Videostab = tabris.create("Tab", {
    title: 'Videos', // converted to upper-case on Android
  }).appendTo(tabFolder);
//End Tabs


var Newsview = tabris.create("CollectionView", {
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
      layoutData: {top: [titleView, 5],left: [imageView, MARGIN], right: 5},
      markupEnabled: true,
      Font:"9px"
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
  loadItems(Newsview,'news');
}).appendTo(Newstab);

var Videosview = tabris.create("CollectionView", {
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
    cell.on("change:item", function(widget,item) {
      titleView.set("text", '<b>'+item.ftitle+'</b>'+' - '+'<small>'+item.period+'</small>');
      //periodView.set("text", item.period);
      imageView.set("image", {src: item.image});
    });
  }
}).on("refresh", function() {
  loadItems(Videosview,'videos');
}).appendTo(Videostab);


Videosview.on("select", function(target, value) {

    //createBookPage(value).open();
    //navigator.notification.alert(value.ftitle);
    var videoDetailpage = tabris.create("Page", {
      topLevel: false
    });
      videoDetailpage.set('title',value.ftitle+' - Video');
     /*var videoPanel= tabris.create("Composite", {
       layoutData: {left: 0, top: 0, bottom: 0, right: 0,},
        background: "green"
      }).appendTo(videoDetailpage);*/

     var webview = tabris.create("WebView", {
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
         url: "https://www.youtube.com/watch?v="+value.video_id
    }).appendTo(videoDetailpage);

      videoDetailpage.open();
   
     
    
  });

Newsview.on("select", function(target, value) {

    //createBookPage(value).open();
    //navigator.notification.alert(value.ftitle);
      page.set("text","");
     var readfeed=tabris.create("Page", {
        title: TITLE+" - "+value.ftitle,
        topLevel: false
      });

    var webview = tabris.create("WebView", {
        layoutData: {left: 0, top: 0, right: 0, bottom: 0}
    }).appendTo(readfeed);

    webview.set("url", value.link);
    
    readfeed.open();

 
  });





function loadItems(view,key) {
  load_news_cache(view,key);
  view.set({
    refreshIndicator: true,
    refreshMessage: "loading..."
  });

  setTimeout(function() {
        if(conn_establish==true)
        {
           getfeed();
        }
      
      getVideos();
  }, 1000*5);
}
function gfeed(feeds)
{
    Newsview.set({
            items: feeds,
            refreshIndicator: false,
            refreshMessage: ""
          });
}

function getfeed() {
      var items = [];
        var url='http://ghanafeeds.com/rss/json';
        conn_establish=true;
        $.ajax({
                url: url,
                dataType: 'json',
                
                success:  function (data) {
                  conn_establish=false;
                  //console.log(JSON.stringify(data));
                        $.each(data.news, function(key, val) {
                                items.push({
                                      ftitle: val.title,
                                      description: val.description,
                                      image: val.image,
                                      period: val.period,
                                      link: val.link
                                  });
                      });
                        localStorage.setItem('news', JSON.stringify(items));
                        gfeed(items);
                      },error: function(data, errorThrown)
                      {
                         //console.log(JSON.stringify(data) +'request failed :'+errorThrown);
                          //alert('request failed :'+errorThrown);
                      }
              });

/*  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(JSON.stringify(json));
  });*/
}

function getVideos() {
      var items = [];
      $.ajaxSetup({ cache:false });

        var url='http://ghanafeeds.com/rssvideos/json';
        $.getJSON(url, function (data) {
           //navigator.notification.alert(JSON.stringify(object.channel);
            //console.log(JSON.stringify(data));
              $.each( data.videos, function( key, val ) {

                  items.push({
                        ftitle: val.title,
                        image: val.image,
                        period: val.period,
                        video_id:val.video_id
                    });
        });

      localStorage.setItem('videos', JSON.stringify(items));
     // console.log(JSON.stringify(localStorage.getItem('videos')));
        Videosview.set({
            items: items,
            refreshIndicator: false,
            refreshMessage: ""
          });
      });
}

function load_news_cache(view,key)
{
  view.set({
      items: $.parseJSON(localStorage.getItem(key)),
      refreshIndicator: false,
      refreshMessage: ""
  });
}

loadItems(Newsview,'news');
loadItems(Videosview,'videos');
page.open();

