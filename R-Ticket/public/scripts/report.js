$(document).ready(() => {
	$('.btn-reportDay').click(() =>
	{
		$(".resultDay").text('');
		reportDay({date:$('.reportDay').find('.date').val()})
	});
	$('.btn-reportInterval').click(() =>
	{
		reportInterval({
			dateStart: $('.reportInterval').find('.dateStart').val(),
			dateEnd: $('.reportInterval').find('.dateEnd').val()
		});
	});
	$('.btn-reportTrain').click(() =>
	{
		reportTrain({
			train: $('.reportTrain').find('.train').val()
		});
	});
});

function reportDay(data)
{
	var url = "http://r-ticket.chav:6608/report/day";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			let innerHTML = `Результат ${json.price.result}`;
			$(".resultDay").text(innerHTML);
		}
	};
	xhr.send(JSON.stringify(data));
}

function reportInterval(data)
{
	var url = "http://r-ticket.chav:6608/report/interval";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			let innerHTML = `Результат ${json.price.result}`;
			$(".resultInterval").text(innerHTML);
		}
	};
	xhr.send(JSON.stringify(data));
}

function reportTrain(data)
{
	var url = "http://r-ticket.chav:6608/report/train";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			let innerHTML = `Результат ${json.price.result}`;
			$(".resultTrain").text(innerHTML);
		}
	};
	xhr.send(JSON.stringify(data));
}