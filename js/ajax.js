var globalXHR = new XMLHttpRequest();

function ajax(data, func, xhr, typeOfRequest='POST', fileName='/php/controller.php') {
	if(xhr === undefined) xhr = globalXHR;

	xhr.open(typeOfRequest, fileName + (typeOfRequest.toUpperCase() === 'POST' && 'action' in data && fileName.match(/controller.php$/)
		? '?' + encodeURIComponent(data.action.replace(/ /g, '_'))
		: ''));

	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			func(xhr.responseText);
		}
	}
	if(typeOfRequest.toUpperCase() === 'POST') {
		if(typeof data === 'object') {
			var strData = '';
			for(var i in data) {
				strData += i + '=' + encodeURIComponent(data[i]) + '&';
			}
			xhr.send(strData.slice(0, strData.length - 1));
		} else {
			xhr.send("data="+data);
		}
	} else {
		xhr.send(null);
	}
}
