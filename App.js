//chat script
function chat() {//chat function
    let getChatDataFromLocalStorage = JSON.parse(localStorage.getItem("chatlist"));//get item from local storage
let usersChats = getChatDataFromLocalStorage ? getChatDataFromLocalStorage : [];


let logedInUser = JSON.parse(localStorage.getItem('currentUser'));//get the current user information form CurrentUser local storage

    debugger;
    let userMessage = document.getElementById("usermessage").value;//users input box
    let send = document.getElementById("submitmessage").value;//send button

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    if (userMessage == "") {
        alert("Empty message could not send");
        return false;
    }
    var dataObj1 = {
        id: Number(new Date()),
        date: dateTime,
        usermessage: userMessage,
        name: logedInUser.name,

    }

    usersChats.push(dataObj1);
    localStorage.setItem("chatlist", JSON.stringify(usersChats));

    return true;

}


/////////////////////////////////////////------------------------------///////////////////////////////////////


// Scripting for Userlist (Login and register)


//login Functionality

function login() {
    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("userslist"));
let users = getDataFromLocalStorage ? getDataFromLocalStorage : [];

let userName = document.getElementById("username").value;//get value from username box in login page
let password = document.getElementById("password").value;//get value from password box in login page
let apos = userName.indexOf('@');
let dotpos = userName.lastIndexOf('.');
let currentUser;
if (userName == " ") {
alert("Please enter username");
return false;
} else if (apos < 1 || dotpos - apos < 2) {
alert("Please enter a valid username");
return false;
} else if (password == "") {
alert("Please enter password");
return false;
} else if (userExist2()) {
return false;
}

function userExist2() {//this function varify that users email doesn't existed in application
for (var i = 0; i < users.length; i++) {
  if (userName == users[i].email) {
      if (password == users[i].password) {
          currentUser = users[i];
          return false;
      }
      else {
          alert("wrong password");
          return true;
      }
  }
}
alert("User does not exist");
return true;

}
localStorage.setItem("currentUser", JSON.stringify(currentUser)); //this method set the data in to currentUser in local storage
}




///--------------------------------------------------------------------------------------/////////////////

//registration functionality
function register(){
    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("userslist"));
    let users = getDataFromLocalStorage ? getDataFromLocalStorage : [];
    
    let fullName = document.getElementById("fullname").value;//get value from fullname box in registration page
    let email = document.getElementById("email").value;//get value from Email box in registration page
    let password = document.getElementById("password").value;//get value from password box in registration page
    let confirmpassword = document.getElementById("confirmpassword").value;//get value from confirm password box in registration page

    let apos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".");
    if (email == "") {
        alert("Please enter your email id");
        return false;
    }
    else if (apos < 1 || dotpos - apos < 2) {
        alert("Your email is not valid");
        return false;
    }
    else if (password == " ") {
        alert("please enter your password");
        return false;

    } else if (password.length < 6) {
        alert("Enter at least 6 character ");
        return false;

    } else if (password != confirmpassword) {
        alert("password didnt match");
        return false;
    }

    var exist = -1;
    for (var a = 0; a < users.length; a++) {
        if (users[a].email == email) {
            exist = 1;
            break;
        }
    }
    if (exist == 1) {//this condition varify that users email already existed in application
        alert("Email is Existed!!");
        return false;
    }

    var dataObj = {
        id: Number(new Date()),
        name: fullName,
        email: email,
        password: password,
    }
    users.push(dataObj);
    localStorage.setItem("userslist", JSON.stringify(users));
    return true;
}


//Scripting for Manage Users
selectData();
function selectData() {//this function works for display the HTML table dynamically from local storage userslist
	let users = getData();
	if (users != null) {
		let html ='';
		let sno = 1;
		for (let k in users) {
			html = html + `<tr class="table-row">
			<td class="table-cell2">${users[k].name}</td>
			<td class="table-cell2">${users[k].email}</td>
			<td class="table-cell2"><a href="edit_user.html?id=${users[k].id}">Edit</a> | 
			<a href="javascript:deleteData(${users[k].id})">Delete</a>
			</td>
			
			</tr>`;
			sno++;
		}
		document.getElementById('root').innerHTML = html;

	}
}


var getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
var id = "";
function deleteData(id) {//this function varify that Logged in user cann't delete ourself
	if (getCurrentUser.id == id) {
		alert("You can not delete yourself");
		return false;
	}
	else {
		var users = getData();
		if (confirm("Are you sure ?")) {

			for (var i = 0; i < users.length; i++) {
				if (id == users[i].id) {
					users.splice(i, 1);
				}
			}
		}
		localStorage.setItem("userslist", JSON.stringify(users));
		selectData();
	}
}

function getData() {

	let getUsersFromLocalStorage = JSON.parse(localStorage.getItem("userslist"));
	let users = getUsersFromLocalStorage ? getUsersFromLocalStorage : [];
	return users;
}






/////////------------------------------------------------------///////////////////////////////
//edit-users in manage users
function update() {
    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("userslist"));
    let users = getDataFromLocalStorage ? getDataFromLocalStorage : [];
   
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let apos = email.indexOf('@');
let dotpos = email.lastIndexOf('.');
    let url = window.location.href;
    let splitUrl = url.split("=");
    let id = splitUrl[1];
 

    if (name == " ") {
        alert("Please enter name");
        return false;
    } else if (email == " ") {
        alert("Please enter email");
        return false;
    } else if (apos < 1 || dotpos - apos < 2) {
        alert("Please enter valid email");
        return false;
    } else if (userExist()) {
        alert("email id already exist");
        return false;
    }

    for (var i = 0; i < users.length; i++) {
        if (id == users[i].id) {
            users[i].name = name;
            users[i].email = email;
        }
    }
    localStorage.setItem("userslist", JSON.stringify(users));


    function userExist() {
        for (var i = 0; i < users.length; i++) {
            if (email == users[i].email) {
                if (id == users[i].id) { return false; }
                else { return true; }
            }
            else { return false; }
        }
    }
}

    