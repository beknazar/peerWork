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

	$('#addTaskForm').submit(function (event) {
		var taskName = $('#taskName').val();
		var root = location.protocol + '//' + location.host;
		if (taskName) {
			$.ajax({
				url: root + '/add',
				type: 'POST',
				data: {
					taskName: taskName
				},
				success: function (data) {
					$('<label/>', {
					    class: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
					}).appendTo('#myTasksList');

					var addingElement = $('#myTasksList label:last-child');
					
					$('<input/>', {
						type: 'checkbox',
						class: 'mdl-checkbox__input'
					}).appendTo(addingElement);

					$('<span/>', {
						text: taskName,
						class: 'mdl-checkbox__label'
					}).appendTo(addingElement);

					addingElement.fadeIn('slow').attr;
					addingElement.css('display', 'inline-block');
					$('#taskName').val('');
				}
			});
		}
		return false;
	});

	$('#task').click(function (event) {
		var request = 
		$.ajax({
			url: ''
		});
	});

});