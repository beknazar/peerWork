$(document).ready(function(){
	$('#url').mouseup(function (event) {
		$(this).select();
		$('#startButton').fadeIn('slow');
	})

	$('#startButton').click(function (event) {
		window.location.href = $('#url').val();
	});

});