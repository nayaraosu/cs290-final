window.onload = function()
{

	myLocations();
	allLocations();
}

function allLocations()
{
		var favs_area = document.getElementById("all-locations");
		favs_area.innerHTML ="";
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=allLocations";
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All locations!");
					var json = JSON.parse(httpRequest.responseText);
					//console.log(httpRequest.responseText);
					for(var i = 0; i < json.length; i++) {
					    var obj = json[i]; 
					    var full_name = "Created by: "+obj.first_name + " " + obj.last_name;
						var elem = document.createElement("div");
						var loc_name = "<textarea id='name-"+obj['id'] +"'>"+obj['name']+"</textarea>";
						var	loc_adr = "<textarea id='addr-"+obj['id'] +"'>"+obj['address']+"</textarea>";

						//var	update_btn = "<button onClick=updateLocation("+obj['id']+") id='lid-"+obj['id']+"'>Save Changes</button>";
						//var	del_btn = "<button onClick=deleteLocation("+obj['id']+")>Delete</button>"
						//var content_html = "<div class='error'>"+ loc_name + loc_adr+update_btn+ del_btn +"</div>";	
						var content_html = "<div class='all-locs'>"+ loc_name + loc_adr +" "+full_name+"</div>";	
						
						//elem.id = "errors";
						elem.innerHTML = content_html;
						favs_area.appendChild(elem);
					    //console.log(obj);
					}					
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
function deleteLocation(loc_id)
{
	var httpRequest = new XMLHttpRequest();
	var turl = "http://localhost/final/data.php";
	httpRequest.open('POST', turl, true);
	var params = "action=deleteLoc&id="+loc_id;
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(params);	
	httpRequest.onreadystatechange = function()
	{
		if(httpRequest.readyState == 4)
		{
			if(httpRequest.status == 200)
			{
				console.log(httpRequest.responseText);
				console.log("All good!");
				
				myLocations();
			}
			else
			{
				console.log("All bad!");
			}
		}
	};
}

function updateLocation(loc_id)
{
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		var loc_name = document.getElementById("name-"+loc_id).value;
		var loc_addr = document.getElementById("addr-"+loc_id).value;
		httpRequest.open('POST', turl, true);
		var params = "action=updateLoc&id="+loc_id+"&name="+loc_name+"&addr="+loc_addr;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log(httpRequest.responseText);
					console.log("All good!");
					
					myLocations();
				}
				else
				{
					console.log("All bad!");
				}
			}
		};	
}

function myLocations()
{
	var uid = document.getElementById("uid");
	if (uid != null)
	{
		var uid = document.getElementById("uid").value;
		var favs_area = document.getElementById("my-locations");
		favs_area.innerHTML ="";
		var httpRequest = new XMLHttpRequest();
		var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=myLocations&uid="+uid;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("All good!");
					var json = JSON.parse(httpRequest.responseText);
					//console.log(httpRequest.responseText);
					for(var i = 0; i < json.length; i++) {
					    var obj = json[i]; 
						var elem = document.createElement("div");
						var loc_name = "<textarea id='name-"+obj['id'] +"'>"+obj['name']+"</textarea>";
						var	loc_adr = "<textarea id='addr-"+obj['id'] +"'>"+obj['address']+"</textarea>";
						var	update_btn = "<button onClick=updateLocation("+obj['id']+") id='lid-"+obj['id']+"'>Save Changes</button>";
						var	del_btn = "<button onClick=deleteLocation("+obj['id']+")>Delete</button>";
						var content_html = "<div class='error'>"+ loc_name + loc_adr+update_btn+ del_btn +"</div>";	
						elem.id = "errors";
						elem.innerHTML = content_html;
						favs_area.appendChild(elem);
					    //console.log(obj);
					}					
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

function addRoute()
{
	var error_area = document.getElementById("status");
	error_area.innerHTML = "";
		var elem = document.createElement("div");
		var uid = document.getElementById("uid").value;
		var name = document.getElementById("name").value;
		var gps = document.getElementById("gps").value;
		var valid = true;
		if (name == "" || gps == "")
		{
		var elem = document.createElement("div");
		var content_html = "<div class='error'>You must enter a name AND GPS Link!</div>";	
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
			var params = "action=addRoute&name="+name+"&gps="+gps+"&uid="+uid;
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
							myLocations();

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