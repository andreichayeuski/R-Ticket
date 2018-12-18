$(document).ready(() => {
	$('.backup').click(() =>
	{
		backup();
	});
	$('.recovery').click(() =>
	{
		recovery();
	});
});

function backup()
{
	var url = "http://r-ticket.chav:6608/backup/backup";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			if (json.result === 1)
			{
				alert("Сделано");
			}
			else
			{
				alert("Неудача");
			}
		}
	};
	xhr.send(JSON.stringify({data:1}));
}

function recovery()
{
	var url = "http://r-ticket.chav:6608/backup/recovery";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			if (json.result === 1)
			{
				alert("Сделано");
			}
			else
			{
				alert("Неудача");
			}
		}
	};
	xhr.send(JSON.stringify({data:1}));
}