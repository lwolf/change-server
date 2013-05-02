function init(){
    chrome.tabs.getSelected(null, function(tab){
       LoadItems(tab.url);
    });
}

function LoadItems(current_url){
    document.getElementById('domainsList').innerHTML = '';
    var stored_items = JSON.parse(readProperty('items', '[]'));
    for (var i = 0; i < stored_items.length; i++){
        var parts = stored_items[i].split(',');
        renderItem(parts[0], parts[1], current_url);
    }
}
function renderItem(domain, alias, current_url){
    var domain_list = document.getElementById('domainsList');
    var new_item = document.createElement('li');
    new_item.innerHTML = "<a target='_blank' href='" + getNewUrl(domain, current_url) + "'>" + alias + "</a>";
    domain_list.appendChild(new_item);
}

function getNewUrl(newDomain, current_url){
    var protocol = current_url.split('//')[0];
    var url = current_url.split('//')[1].split('/')[0];
    var params = current_url.split('//')[1].split('/')[1];
    var parts = url.split('.');
    var subdomain = '';
    if (url.split('.').length > 2){
        subdomain = parts.shift() + '.';
    }

    return protocol + '//' + subdomain + newDomain + '/' + params
}

function showOptions(){
	chrome.tabs.create({url:'options.html'});
}

function closePopup(){
	window.close();
}

function menuItem(domain, title){
    var item = document.createElement('<li></li>');
    var anchor = document.createElement('<a></a>');

    anchor.href = domain; // get original url, change domain
    anchor.text = title;

    return anchor;
}

document.addEventListener("DOMContentLoaded", function(){
    init();
});