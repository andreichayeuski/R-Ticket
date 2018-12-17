$(document).ready(() => {
	document.getElementById("date").addEventListener('change', () => {
		$('#sheduleRoutes').val('');
		$('form').submit();
	}, false);

	document.getElementById("sheduleRoutes").addEventListener('change', () => {
		$('form').submit();
	}, false);

	document.getElementById("carShedule").addEventListener('change', () => {
		loadData($('#carShedule').val());
	}, false);
});


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
                <tr>
                    <td>${ticket.Price}</td>
					<td>${ticket.Number}</td>
                </tr>`;
			});
			$("#tickets").empty().append(spaceHTML + '<a href="#0" class="cd-popup-close img-replace">Close</a>');
		}
	};
	xhr.send(JSON.stringify({"carSheduleId": data}));
}