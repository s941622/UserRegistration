// Form Submit Listener
document.getElementById('userForm').addEventListener('submit', saveUser);

function saveUser(e){
	
	// Fetch user input values
	var userId = document.getElementById('userId').value;
	var userPass = document.getElementById('userPass').value;
	var userConfPass = document.getElementById('userConfPass').value;
	var userEmail = document.getElementById('userEmail').value;

	var user = {
		id: userId,
		pass: userPass,
		confPass: userConfPass,
		email: userEmail
	};

	if(validateForm(userId, userPass, userConfPass, userEmail)){
		// LocalStorage to store user information
		if(localStorage.getItem('users') === null){
			// Init array
			var users = [];
			// Add to array
			users.push(user);
			// Save to LocalStorage
			localStorage.setItem('users', JSON.stringify(users));
		}else{
			// Fetch users from localStorage
			var users = JSON.parse(localStorage.getItem('users'));
			// Add to array
			users.push(user);
			// Reset users information in localStorage
			localStorage.setItem('users', JSON.stringify(users));
		}
		// Reset form
		document.getElementById('userForm').reset();
		// Updated new user for display
		displayUsers();

	}else{
		return false;
	}

	// Prevent form from submitting
	e.preventDefault();
}

// Remove user
function removeUser(userId){
	// Fetch users from localStorage
	var users = JSON.parse(localStorage.getItem('users'));
	// Iterate users array
	for(var i = 0; i < users.length; i++){
		if(users[i].id == userId){
			users.splice(i, 1);
		}
	}
	// Reset users information in localStorage
	localStorage.setItem('users', JSON.stringify(users));
	// Updated deleted user for display
	displayUsers();
}

// Users display
function displayUsers(){
	// Only display users information if users exists in localStorage
	if(localStorage.getItem('users') !== null){
		// Fetch users from localStorage
		var users = JSON.parse(localStorage.getItem('users'));
		// Get users output div
		var usersResults = document.getElementById('usersResults');
		while (usersResults.firstChild) {
		    usersResults.removeChild(usersResults.firstChild);
		}
		// Iterate users array
		for(var i = 0; i < users.length; i++){
			var userId = users[i].id;
			var userEmail = users[i].email;

			// Init display elements
			var well = document.createElement('div');
			well.className = 'well';
			// User Info
			var h_Id = document.createElement('h4');
			var icon_Id = document.createElement('i');
			icon_Id.className = 'glyphicon glyphicon-user';
			h_Id.appendChild(icon_Id);
			h_Id.innerHTML += ' ' + userId;
			var h_Email = document.createElement('h4');
			var icon_Email = document.createElement('i');
			icon_Email.className = 'glyphicon glyphicon-envelope';
			h_Email.appendChild(icon_Email);
			h_Email.innerHTML += ' ' + userEmail;			
			// Remove button
			var btnRemove = document.createElement('button');			
			btnRemove.className = 'btn btn-danger';
			btnRemove.innerHTML = 'Remove';
			btnRemove.value = userId;
			btnRemove.addEventListener('click', function(){
				removeUser(this.value);
			}, false);

			//Append to parent node
			well.appendChild(h_Id);
			well.appendChild(h_Email);
			well.appendChild(btnRemove);
			usersResults.appendChild(well);
		}
	}	
}

// Form validation
function validateForm(userId, userPass, userConfPass, userEmail){
	// All fields are required
	if(!userId || !userPass || !userConfPass || !userEmail){
		alert('Please fill in the form');
		return false;
	}
	if(userPass !== userConfPass){
		alert('Password and confirm password should be the same');
		return false;	
	}

	var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var regex = new RegExp(expression);

	if(!userEmail.match(regex)){
		alert('Please enter a valid Email');
		return false;	
	}
	return true;
}