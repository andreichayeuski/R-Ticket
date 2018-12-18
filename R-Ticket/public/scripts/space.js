$(document).ready(() => {
	$('.free-spaces').on('click', (event) => {
		$('.cd-popup').addClass('is-visible');
		loadData($(event.target).attr('id'));
	});

	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
});

function d2(n) {
	if(n<9) return "0"+n;
	return n;
}

function loadData(data)
{
	var url = "http://r-ticket.chav:6608/space";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);

			var depDate = json.train.Date + json.train.DepartureTime;
			var departureDate = depDate.slice(0, 10) + ' ' + depDate.slice(24, 29);
			var arrDate = json.train.Date + json.train.ArrivalTime;
			var arrivalDate = arrDate.slice(0, 10) + ' ' + arrDate.slice(24, 29);

			let spaceHTML = '<h1>СВОБОДНЫЕ МЕСТА</h1>'
								+ `<p>${json.train.Number} `
								+ `${json.train.DepartureStation} - ${json.train.ArrivalStation}</p>`
								+ `<p>Маршрут ${json.train.DepStation} - ${json.train.ArrStation}</p>`
								+ `<span>${json.train.Type}</span>`
								+ `<table>
										<tr>
											<td>Отправление</td>
											<td>Прибытие</td>
										</tr>
										<tr>
											<td>${departureDate}</td>
											<td>${arrivalDate}</td>
										</tr>
									</table>`
								+ `<p>${json.train.PlaceType} ${json.train.CarType}</p>`
								+ `<p>Свободных мест ${json.spaces.length}</p>`
								+ `<p>Номер вагона ${json.train.OrderNumber}</p>`
								+ '<br>';
			json.spaces.forEach((space) =>
			{
				spaceHTML += `${space.Number} `;
			});
			$(".cd-popup-container").empty().append(spaceHTML + '<a href="#0" class="cd-popup-close img-replace">Close</a>');
		}
	};
	xhr.send(JSON.stringify({"carSheduleId": data}));
}