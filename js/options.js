
function init(){
    renderItems();
    localize();
}

function localize(){

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

function AddItem(){
    var item_id = document.getElementById('item_id');
    var domain = document.getElementById('domain');
    var alias = document.getElementById('alias');

    var stored_items = JSON.parse(readProperty('items', '[]'));
    if (!domain.value || !alias.value){
        return
    }else if (!item_id.value){
        stored_items.push([domain.value, alias.value].toString());
        localStorage['items'] = JSON.stringify(stored_items);
        renderItem(domain.value, alias.value);
    }else if (domain.value && alias.value){
        for (var i = 0; i < stored_items.length; i++){
            if (i == parseInt(item_id.value)){
                stored_items[i] = [domain.value, alias.value].join(',');
                renderItem(domain.value, alias.value, i);
            }
        }

    }
    localStorage['items'] = JSON.stringify(stored_items);
    domain.value = "";
    alias.value = "";
    item_id.value = "";

}

function onRemove(){
    var stored_items = JSON.parse(readProperty('items', '[]'));
    var item_id = parseInt(this.getAttribute('id').split('_')[1]);
    var new_items_list = [];
    for (var i = 0; i < stored_items.length; i++){
        if (i != item_id){
            new_items_list.push(stored_items[i]);
        }
    }
    localStorage['items'] = JSON.stringify(new_items_list);
    renderItems();
}

function onEdit(){
    var stored_items = JSON.parse(readProperty('items', '[]'));
    var item_id = parseInt(this.getAttribute('id').split('_')[1]);
    for (var i = 0; i < stored_items.length; i++){
        if (i == item_id){
            var data = stored_items[i].split(',');
            document.getElementById('item_id').value = i;
            document.getElementById('domain').value = data[0];
            document.getElementById('alias').value = data[1];
        }
    }
}

function renderItems(){
    document.getElementById('items').innerHTML = '';
    var stored_items = JSON.parse(readProperty('items', '[]'));
    for (var i = 0; i < stored_items.length; i++){
        var parts = stored_items[i].split(',');
        renderItem(parts[0], parts[1], i);
    }

}

function renderItem(domain, alias, item_id){

    var list_of_items = document.getElementById("items");
    var old_item = document.getElementById("item_" + item_id);
    if (old_item){
        list_of_items.removeChild(old_item);
    }


    var new_item = document.createElement('li');
    var editButton = document.createElement('button');
    var removeButton = document.createElement('button');

    new_item.setAttribute('id', "item_" + item_id);
    new_item.innerHTML = domain + " [" + alias + "]";

    editButton.setAttribute('id', 'edit_' + item_id);
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', onEdit);

    removeButton.setAttribute('id', 'remove_' + item_id);
    removeButton.innerHTML = 'Remove';
    removeButton.addEventListener('click', onRemove);

    new_item.appendChild(editButton);
    new_item.appendChild(removeButton);

    list_of_items.appendChild(new_item);
}

function onClear(){
    localStorage.clear();
    init();
}

function onExit(){
    window.close()
}

document.addEventListener( "DOMContentLoaded" , function () {
    init();
    document.getElementById("AddBtn").addEventListener("click", AddItem);
    //document.getElementById("EditBtn").addEventListener("click", onEdit);
    //document.getElementById("RemoveBtn").addEventListener("click", onRemove);
    document.getElementById("ClearBtn").addEventListener("click", onClear);
    document.getElementById("ExitBtn").addEventListener("click", onExit);
});

