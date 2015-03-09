window.onload = function()
{


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
		
	}
}
function attempt_login()
{
	
	var email = document.getElementById("email").value;
	var pw = document.getElementById("password").value;

	var httpRequest = new XMLHttpRequest();
	var turl = "http://localhost/a4/loopback.php?pee=whoa";

	httpRequest.open('GET', turl);
	httpRequest.send(null);
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					var response = JSON.parse(httpRequest.responseText);
					console.log(httpRequest.responseText);
					console.log(JSON.parse(httpRequest.responseText));
					console.log(response);
					document.getElementById("status").innerHTML = "lolpoop";
					
					//insertFavorite(response);
					return response;
				}
				else
				{
					console.log("All bad!");
				}
			}
		};	

	if(email=="" || pw=="")
	{
		//document.getElementById("status").innerHTML = "You must provide an email address and password";
	}
	else
	{
		//document.getElementById("status").innerHTML = "";	
	}
	

}