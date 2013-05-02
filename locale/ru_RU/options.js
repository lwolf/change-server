RegisterLang();

lang_ru_RU = {
    lngLanguage: "Язык",
    lngDomain: "Домен",
    lngAlias: "Алиас",
    lngAdd: "Добавить",
    lngRemove: "Удалить",
    lngEdit: "Изменить",


    lngSave: "Сохранить",
    lngExit: "Выйти"
}

function RegisterLang()
{
	var ctrl = document.getElementById("language");

	if(ctrl != null)
	{
		ctrl.add(createOption("Russian", "ru_RU"));
	}
}