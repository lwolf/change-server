
function init(){
    setSelectedValue("language", readProperty("language", "en_US"));
    localize();
    renderItems();
    doDataExchange(false);
}

function getSelectedLanguage(){
    var lang = getSelectedValue("language");
    return "lang_" + lang;
}

function onLanguageSelected(){
    doDataExchange(true);
    init();
}

function localize(){
    var lang = getSelectedLanguage();

    for (var ctrlId in lang){
        var value = lang[ctrlId];

        var ctrl = document.getElementById(ctrlId);

        if (ctrl == null) {
            continue;
        }

        if (ctrl.tagName == "SPAN"){
            ctrl.innerText = value;
        }else if (ctrl.tagName == "INPUT"){
            ctrl.value = value;
        }
    }
}


function createOption(text, value){
	var opt = document.createElement('option');

	opt.text = text;
	opt.value = value;

	return opt;
}

function getSelectedValue(selectId){
	var ctrl = document.getElementById(selectId);
	return ctrl.options[ctrl.selectedIndex].value;
}

function setSelectedValue(selectId, value){
	var ctrl = document.getElementById(selectId);

	for (var i = 0; i < ctrl.options.length; ++i)
	{
		if (ctrl.options[i].value == value)
		{
			ctrl.options[i].selected = true;
			break;
		}
	}
}



function doDataExchange(save){
    if (save){
        localStorage["language"] = getSelectedValue["language"];
    }else{
        setSelectedValue("language", readProperty("language", "en_US"))
    }
}

function AddItem(){
    var domain = document.getElementById('domain').value;
    var alias = document.getElementById('alias').value;

    var stored_items = JSON.parse(readProperty('items', '[]'));

    stored_items.push([domain, alias].toString());
    localStorage['items'] = JSON.stringify(stored_items);
    renderItem(domain, alias);
}

function RemoveItem(item_id){
    var stored_items = JSON.parse(readProperty('items', '[]'));
    // remove
}

function EditItem(item_id){
}

function renderItems(){
    document.getElementById('items').innerHTML = '';
    var stored_items = JSON.parse(readProperty('items', '[]'));
    for (var i = 0; i < stored_items.length; i++){
        var parts = stored_items[i].split(',');
        renderItem(parts[0], parts[1]);
    }

}

function renderItem(domain, alias){
    var list_of_items = document.getElementById("items");
    var new_item = document.createElement('li');
    var editButton = document.createElement('button');
    var removeButton = document.createElement('button');
    new_item.innerHTML = domain + " [" + alias + "]";
    editButton.innerHTML = 'Edit';
    removeButton.innerHTML = 'Remove';
    new_item.appendChild(editButton);
    new_item.appendChild(removeButton);
    list_of_items.appendChild(new_item);
}

function onClear(){
    localStorage.clear();
    init();
}

function onSave(){
    doDataExchange(true);
    window.close()
}

function onExit(){
    window.close()
}

document.addEventListener( "DOMContentLoaded" , function () {
    init();
    document.getElementById("language").addEventListener( "change" , onLanguageSelected);
    document.getElementById("lngAdd").addEventListener( "click" , AddItem);
    document.getElementById("lngSave").addEventListener( "click" , onSave);
    document.getElementById("lngClear").addEventListener( "click" , onClear);
    document.getElementById("lngExit").addEventListener( "click" , onExit);
});

