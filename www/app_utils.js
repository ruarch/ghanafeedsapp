function check_update()
{
	var $ = require("./lib/jquery.min");
	var url='http://ghanafeeds.com/rss/json';
	var items = [];
	var msg='';
	var chkfeed='';
	var oldfeed='';
      $.ajaxSetup({ cache:false });
	$.ajax({
            url: url,
            dataType: 'json',
            //timeout: 5000,
            success:  function (data) {
            	$.each(data.news, function(key, val) {
                            items.push({
                                  ftitle: val.title,
                                  description: val.description,
                                  image: val.image,
                                  period: val.period,
                                  link: val.link
                              });
                  });
            		chkfeed=JSON.stringify(items);
            		oldfeed=localStorage.getItem('news');
                   
                   
                  },error: function(data, errorThrown)
                  {
                     console.log('news not fetched'+errorThrown);
                  }
          });

 console.log('news fetched'+chkfeed);
	if(chkfeed!=oldfeed)
	{
		  msg='new updates available';
	}
	else
	{
		 msg='no updates yet';
	}
return msg;
}
function app_id()
{
	var $ = require("./lib/jquery.min");
	var  url='http://ghanafeeds.com/app/create_id';
	var appid='';

	appid=localStorage.getItem('appid');
	if(appid=='' || appid==null)
	{
		$.ajax({
                url: url,
                dataType: 'json',
                //timeout: 5000,
                success:  function (data) {
                	if(data.appid!='')
                	{
                		localStorage.setItem('appid', data.appid);
                		console.log('Appid SET:'+data.appid);
                	}
                	
                        return appid;
                        
                      },error: function(data, errorThrown)
                      {
                         console.log('appid not fetched'+errorThrown);
                      }
              });


	}
	else
	{
		console.log('Appid available:'+appid);
		return appid;
		
	}
}
function getupdate()
{
	var $ = require("./lib/jquery.min");
	var  url='http://ghanafeeds.com/app/getupdate';
	var appid='';
	var update_count=0;
	updatedata=localStorage.getItem('news_update');
	updatedata=$.parseJSON(localStorage.getItem('news_update'))
	
		$.ajax({
                url: url,
                dataType: 'json',
                //timeout: 5000,
                success:  function (data) {
                	if(data.update_id!='')
                	{
                		localStorage.setItem('news_update', JSON.stringify(data));
                		console.log('Update SET:'+data.update_id);
                	}
                		console.log(data.update_id+' : '+updatedata.update_id);
                		if(updatedata.update_id!=data.update_id)
                		{
                			update_count=data.update_count;
                			console.log(data.update_id+' : '+updatedata.update_id);
                			return update_count;
                		}
                        
                        
                      },error: function(data, errorThrown)
                      {
                        console.log('Update not fetched'+errorThrown);
                      }
              });


	
}
 var createapp_id=app_id();
//var newsupdate=getupdate();
var apputils={ app_id:createapp_id };

module.exports =apputils;