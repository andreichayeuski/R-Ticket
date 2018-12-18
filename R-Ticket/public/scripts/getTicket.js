$(document).ready(() => {
	document.getElementById("date").addEventListener('change', () => {
		$('#sheduleRoutes').val('');
		$('#dateForm').submit();
	}, false);

	document.getElementById("sheduleRoutes").addEventListener('change', () => {
		$('#dateForm').submit();
	}, false);

	document.getElementById("carShedule").addEventListener('change', () => {
		loadData($('#carShedule').val());
	}, false);

	$(document).on('click', '.space', (event) =>
	{
		let number = -1, price = -1, spaceId = -1;
		event.preventDefault();
		if ($(event.target).attr('id') === 'price')
		{
			number = $(event.target).parent().find('#number').text();
			price = $(event.target).text();
		}
		if ($(event.target).attr('id') === 'number')
		{
			number = $(event.target).text();
			price = $(event.target).parent().find('#price').text();
		}
		spaceId = $(event.target).parent().attr('id');
		$('.cd-popup').addClass('is-visible');
		let spaceHTML = `<h4>Оформление билета</h4>
			<p>Цена ${price} 		Номер места ${number}</p>
            <label>Логин пользователя
                <input maxlength="50" type="text" class="login" name="login">
            </label>
            <input type="button" id="btn_submit" value="Получить">`;
		$(".cd-popup-container").empty().append(spaceHTML + '<a href="#0" class="cd-popup-close img-replace">Close</a>');

		$(document).on('click', '#btn_submit', () => {
			takeTicket(
				{
					spaceId: spaceId,
					login: $('.login').val()
				})
		});
	});

	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
});

function takeTicket(data)
{
	var url = "http://r-ticket.chav:6608/ticket/take";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	/*xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			let spaceHTML = `<tr>
					<td>Цена</td>
					<td>Номер места</td>
				</tr>`;
			json.tickets.forEach((ticket) =>
			{
				spaceHTML += `
                <tr class="space" id="${ticket.Id}">
                    <td id="price">${ticket.Price}</td>
					<td id="number">${ticket.Number}</td>
                </tr>`;
			});
			$(".cd-popup-container").empty().append(spaceHTML + '<a href="#0" class="cd-popup-close img-replace">Close</a>');
		}
	};*/
	xhr.send(JSON.stringify(data));
}

function loadData(data)
{
	var url = "http://r-ticket.chav:6608/ticket/get";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {

			var json = JSON.parse(xhr.responseText);
			let spaceHTML = `<tr>
					<td>Цена</td>
					<td>Номер места</td>
				</tr>`;
			json.tickets.forEach((ticket) =>
			{
				spaceHTML += `
                <tr class="space" id="${ticket.Id}">
                    <td id="price">${ticket.Price}</td>
					<td id="number">${ticket.Number}</td>
                </tr>`;
			});
			$("#tickets").empty().append(spaceHTML + '<a href="#0" class="cd-popup-close img-replace">Close</a>');
		}
	};
	xhr.send(JSON.stringify({"carSheduleId": data}));
}