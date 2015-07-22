$(document).ready(function(){
	$('#url').mouseup(function (event) {
		$(this).select();
		$('#startButton').fadeIn('slow');
	})

	$('#startButton').click(function (event) {
		var url = $('#url').val();
		window.location.href=url;
		// var request = $.ajax({
		// 	url: url,
		// 	type: 'GET',
		// 	beforeSend: function () {
		// 		$('#callFriend').hide();
		// 		$('#spinnerCallFriend').show();
		// 	},
		// 	complete: function () {
		// 		$('#spinnerCallFriend').hide();
		// 	}
		// });
		// request.done(function (data) {
		// 	$('#controlArea').fadeIn('slow').css('display', 'flex');
		// });
		// request.fail(function (jqXHR, textStatus) {
		// 	alert('Request failed: ' + textStatus);
		// });

	});

});