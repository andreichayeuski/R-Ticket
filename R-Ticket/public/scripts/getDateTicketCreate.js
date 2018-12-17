$(document).ready(() => {
	document.getElementById("date").addEventListener('change', () => {
		$('#sheduleRoutes').val('');
		$('form').submit();
	}, false);

	document.getElementById("sheduleRoutes").addEventListener('change', () => {
		$('form:nth-child(1)').submit();
	}, false);
});