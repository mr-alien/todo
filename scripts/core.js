//On press of enter prepends a new li element to the unsorted list with the value and also stores in the local storage
$('.add-task input[type=text]').keypress(function(e) {
	if(e.which == 13) { //13 for enter key press event check
		console.info('Key Triggered');
		var newTask = $(this).val();
		if(newTask == '') {
			$(this).parent().addClass('empty-input');
			setTimeout(function() {
				$('.add-task').removeClass('empty-input');
			}, 501);
		} else {
			//Prepends the element with the task
			$('#tasks').prepend($('<li><p>' + newTask + '</p><span class="icon-done" data-tooltip="Mark As Done"></span>').fadeIn('slow'));
			console.info(newTask + ' Added to the tasks');
			
			//Clear the input
			$(this).val('');

			//Store
			storeModule();
		}
	}
});


//Sorts the tasks and saves the tasks order on DOM update
$( "#tasks" ).sortable({
	'update' : function() {
		storeModule();
	}
});


//Prints the tasks fetching from local storage array
if(localStorage['tasks']) {
	var getTasks = JSON.parse(localStorage['tasks']);
	for(var printer = 0; printer < getTasks.length; printer++) {
		$('#tasks').append('<li><p>' + getTasks[printer] + '</p><span class="icon-done" data-tooltip="Mark As Done"></span>')
	}
}

//Removes the tasks.... Also had made a delete button but didn't made sense so reverted back to only done option
$('body').on('click', '.icon-done', function() { //Attaching event handler on dynamic created elements
	if(confirm('Are you sure you want to mark the task as done?')) {
		$(this).parent().fadeOut('slow', function() {
			$(this).remove();
			storeModule();
		});
	}
});

//Storage module
var storeModule = function() {
	var disk = [];
	$('#tasks li').each(function() {
	    disk.push($(this).text().trim()); //Reorders by pushing them using foreach loop with new order
	});
	localStorage['tasks'] = JSON.stringify(disk);
	console.info('Shuffled, new order is ' + JSON.parse(localStorage['tasks']));
}

//Showing how much max characters one can type, currently limiting to 64
$('.add-task input[type=text]').keyup(function() {
	$('.add-task p').text((64 - $(this).val().length));
});