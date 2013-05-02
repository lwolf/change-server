RegisterLang();

lang_en_US = {
    lngLanguage: "Language",
    lngDomain: "Domain",
    lngAlias: "Alias",
    lngAdd: "Add",
    lngRemove: "Remove",
    lngEdit: "Edit",

    lngSave: "Save",
    lngExit: "Exit"
}

function RegisterLang()
{
	var ctrl = document.getElementById("language");

	if(ctrl != null)
	{
		ctrl.add(createOption("English", "en_US"));
	}
}