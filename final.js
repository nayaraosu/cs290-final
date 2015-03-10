window.onload = function()
{


}

function addLocation()
{
	var error_area = document.getElementById("status");
	error_area.innerHTML = "";
		var elem = document.createElement("div");
		var uid = document.getElementById("uid").value;
		var name = document.getElementById("name").value;
		var address = document.getElementById("address").value;
		var valid = true;
		if (name == "" || address == "")
		{
		var elem = document.createElement("div");
		var content_html = "<div class='error'>You must enter a name AND address!</div>";	
		elem.id = "errors";
		elem.innerHTML = content_html;
		error_area.appendChild(elem);
		valid = false;
		}
		
		if (valid)
		{
			var httpRequest = new XMLHttpRequest();
			var turl = "http://localhost/final/data.php";
			httpRequest.open('POST', turl, true);
			var params = "action=addLocation&name="+name+"&address="+address+"&uid="+uid;
			httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpRequest.send(params);	
			httpRequest.onreadystatechange = function()
			{
				if(httpRequest.readyState == 4)
				{
					if(httpRequest.status == 200)
					{
						console.log("All good!");
						console.log(httpRequest.responseText);
						var response = httpRequest.responseText;
						if(response == "Duplicate")
						{
							document.getElementById("status").innerHTML = name+" already exists!";
						}
						else if (response == "Success")
						{
							document.getElementById("status").innerHTML = name+ " has been added!";

						}
					}
					else
					{
						console.log("All bad!");
					}
				}
			};

		}

}
function showRoles()
{
	var role_area = document.getElementById("roles");


}
function addRole()
{
	var role = document.getElementById("role").value;
	var error_area = document.getElementById("status");
	var valid = true;

	error_area.innerHTML = "";
	if (role == "")
	{
		var elem = document.createElement("div");
		var content_html = "<div class='error'>You must enter a role!</div>";	
		elem.id = "errors";
		elem.innerHTML = content_html;
		error_area.appendChild(elem);
		valid = false;
	}
	else
	{
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=addRole&role="+role;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					console.log(httpRequest.responseText);
					var response = httpRequest.responseText;
					if(response == "Duplicate")
					{
						document.getElementById("status").innerHTML = role+" already exists!";
					}
					else if (response == "Success")
					{
						document.getElementById("status").innerHTML = has+ " role been added!";

					}
				}
				else
				{
					console.log("All bad!");
				}
			}
		};

	}



}
function signup()
{

	var valid = true;
	var create_acct = true;
	var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
	var email = document.getElementById("email").value;
	var pword = document.getElementById("password").value;
	var pword_confirm = document.getElementById("password_confirm").value;
	var error_area = document.getElementById("status");
	error_area.innerHTML = "";
	if (fname == "") 
	{
			var elem = document.createElement("div");
			var content_html = "<div class='error'>You must include a first name</div>";	
			elem.id = "errors";
			elem.innerHTML = content_html;
			error_area.appendChild(elem);
			valid = false;
	}
	if (lname == "") 
	{
			var elem = document.createElement("div");
			var content_html = "<div class='error'>You must include a last name</div>";	
			elem.id = "errors";
			elem.innerHTML = content_html;
			error_area.appendChild(elem);
			valid = false;
	}
	if (email == "") 
	{
			var elem = document.createElement("div");
			var content_html = "<div class='error'>You must include an email address</div>";	
			elem.id = "errors";
			elem.innerHTML = content_html;
			error_area.appendChild(elem);
			valid = false;
	}
	if (pword == "" || pword_confirm == "") 
	{
			var elem = document.createElement("div");
			var content_html = "<div class='error'>You must enter a password </div>";	
			elem.id = "errors";
			elem.innerHTML = content_html;
			error_area.appendChild(elem);
			valid = false;
	}
	if(valid)
	{

		if (pword != pword_confirm)
		{
			var elem = document.createElement("div");
			var content_html = "<div class='error'>Passwords do not match!</div>";	
			elem.id = "errors";
			elem.innerHTML = content_html;
			error_area.appendChild(elem);
			create_acct = false;
		}
	}

	if(create_acct)
	{
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=new&fname="+fname+"&lname="+lname+"&email="+email+"&pword="+pword;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//httpRequest.setRequestHeader("Content-length", params.length);
		//httpRequest.setRequestHeader("Connection", "close");	
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					//var response = JSON.parse(httpRequest.responseText);
					console.log(httpRequest.responseText);
					//console.log(JSON.parse(httpRequest.responseText));
					//console.log(response);
					document.getElementById("status").innerHTML = httpRequest.responseText;
				
					//insertFavorite(response);
					//return response;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};
	}
}
function login()
{
	var valid = true;
	var error_area = document.getElementById("status");
	error_area.innerHTML = "";
	var email = document.getElementById("email").value;
	var pw = document.getElementById("password").value;

	if (email == "" || pw == "")
	{
		var elem = document.createElement("div");
		var content_html = "<div class='error'>You must enter an email and a password!</div>";	
		elem.id = "errors";
		elem.innerHTML = content_html;
		error_area.appendChild(elem);
		valid = false;
	}

	if(valid)
	{
		var verified = true;
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=login&email="+email+"&pword="+pw;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//httpRequest.setRequestHeader("Content-length", params.length);
		//httpRequest.setRequestHeader("Connection", "close");	
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					console.log(httpRequest.responseText);
					document.getElementById("status").innerHTML = httpRequest.responseText;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};

	}

}