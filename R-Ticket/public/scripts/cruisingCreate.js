$(document).ready(() => {
	$('.isDaily').click(() => {
		if ($('#isDaily').is(':checked'))
		{
			$('.even').addClass('hidden');
		}
		else
		{
			$('.even').removeClass('hidden');
		}
	});
});