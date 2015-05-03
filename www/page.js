

var pageCount = 0;

var page=createPage("Initial Page", true);
tabris.create("Drawer");
function createPage(title, topLevel) 
{
    var page = tabris.create("Page", {
    title: title,
    topLevel: topLevel
  }).open();
    return page;
}
tabris.create("Button", {
    layoutData: {left: 10, top: 10, right: 10},
    text: "Create another page"
}).on("select", function() {
      createPage("Page " + (++pageCount), false);
}).appendTo(page);