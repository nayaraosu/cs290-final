var turl = "http://web.engr.oregonstate.edu/~nayara/cs290/final/data.php";
//var turl = "http://localhost/final/data.php";

window.onload = function()
{

	myLocations();
	allLocations()
	myRoutes();	
	allRoutes();
	allRoles();
	listAssignments();
	prepAssignments();
	routeSelects();
	locationSelects();
	allRides();
}

function updateRide(ride_id)
{
	var uid = document.getElementById("uid").value;
	var day = document.getElementById("day").value;	
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var description = document.getElementById("detail").value;
	var title = document.getElementById("name").value;
	var loc = document.getElementById("loc").value;
	var route = document.getElementById("route").value;
	var status	= document.getElementById("status");
	var valid = true;

	if (title == "" || day == "" || month =="" || year == "" || description == "")
	{
			
			status.innerHTML = "You must enter a title, description, a day, a month, and a year!";
			valid = false;
	}
	if (day <0 || day>31 || month<0 || month>12 || year<2014)
	{
			status.innerHTML = "Date is invalid.";
			valid = false;
	}

	if(valid)
	{
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=updateRide&ride_id="+ride_id+"&lid="+loc+"&uid="+uid+"&rid="+route+"&day="+day+"&month="+month+"&year="+year+"&description="+description+"&title="+title;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log(httpRequest.responseText);
				}
				else
				{
					console.log("All bad!");
				}
			}
		};

	}
}
function deleteRide(ride_id)
{
	var httpRequest = new XMLHttpRequest();
	// var turl = "http://localhost/final/data.php";
	httpRequest.open('POST', turl, true);
	var params = "action=deleteRide&ride_id="+ride_id;
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(params);	
	httpRequest.onreadystatechange = function()
	{
		if(httpRequest.readyState == 4)
		{
			if(httpRequest.status == 200)
			{
				console.log(httpRequest.responseText);
				//console.log("All good!");
				
				allRides();
			}
			else
			{
				console.log("All bad!");
			}
		}
	};

}

function allRides()
{
		var tbl = document.getElementById("all-rides");

		if (tbl != null)
		{
			tbl.innerHTML = "";
			var user_id = document.getElementById("ride-user").value;
			var httpRequest = new XMLHttpRequest();
			//var turl = "http://localhost/final/data.php";
			httpRequest.open('POST', turl, true);
			var params = "action=allRides";
			httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpRequest.send(params);	
			httpRequest.onreadystatechange = function()
			{
				if(httpRequest.readyState == 4)
				{
					if(httpRequest.status == 200)
					{

						var json_obj = JSON.parse(httpRequest.responseText);
					    var newTHead = tbl.createTHead();  
					    var rowh1 = newTHead.insertRow(0); 
					    var Th1 = document.createElement("TH");
						var Th2 = document.createElement("TH");
						var Th3 = document.createElement("TH");
						var Th4 = document.createElement("TH");
						var Th5 = document.createElement("TH");
						var Th6 = document.createElement("TH");
						var Th7 = document.createElement("TH");
						Th1.innerHTML = "Ride Title";
						Th2.innerHTML = "Created by";
						Th3.innerHTML = "Meeting Location Address";
						Th4.innerHTML = "GPS/Map Link";
						Th5.innerHTML = "Meeting Date";
						Th6.innerHTML = "Description";
						rowh1.appendChild(Th1);
						rowh1.appendChild(Th2);
						rowh1.appendChild(Th3);
						rowh1.appendChild(Th4);
						rowh1.appendChild(Th5);
						rowh1.appendChild(Th6);
					    rowh1.appendChild(Th7);
						for(var i =0; i<json_obj.length; i++)
						{
							var obj = json_obj[i];
							var row = tbl.insertRow(tbl.rows.length);
							var cell1 = row.insertCell(0); 
							cell1.innerHTML = '<a href=rideinfo.php?id='+obj['ride_id']+'>' +obj['title'] +'</a>';

							var cell2 = row.insertCell(1);
							cell2.innerHTML = obj['first_name'] + " " +obj['last_name'];

							var cell3 = row.insertCell(2);
							cell3.innerHTML = obj['address'];

							var cell4 = row.insertCell(3);
							cell4.innerHTML = obj['link'];

							var cell5 = row.insertCell(4);
							cell5.innerHTML = obj['ride_date'];

							var cell6 = row.insertCell(5);
							cell6.innerHTML = obj['description'];
							if(user_id == obj['user_id'])
							{
							var ride_id = obj['ride_id'];
							var cell7 = row.insertCell(6);
							cell7.innerHTML = "<button class='small-btn' onClick='deleteRide("+ride_id+")'>Delete</button>";

							}

						}
						console.log(httpRequest.responseText);
					}
				}
			};	
		}
}
function submitRide()
{
	var title = document.getElementById("ride-title").value;
	var day = document.getElementById("ride-day").value;
	var month = document.getElementById("ride-month").value;
	var year = document.getElementById("ride-year").value;
	var description = document.getElementById("ride-detail").value;
	var error_area = document.getElementById("errors");
	var valid = true;
	error_area.innerHTML = "";
	if (title == "" || day == "" || month =="" || year == "" || description == "")
	{
			
			error_area.innerHTML = "You must enter a title, description, a day, a month, and a year!";
			valid = false;
	}
	if (day <0 || day>31 || month<0 || month>12 || year<2014)
	{
			error_area.innerHTML = "Date is invalid.";
			valid = false;
	}
	if(valid)
	{
		var httpRequest = new XMLHttpRequest();
		var uid = document.getElementById("ride-user").value;
		var route_id = document.getElementById("select-route").value;
		var lid = document.getElementById("select-location").value;

		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=createRide&uid="+uid+"&rid="+route_id+"&lid="+lid+"&description="+description+"&day="+day+"&month="+month+"&year="+year+"&title="+title;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{


					console.log(httpRequest.responseText);
						allRides();

				}
			}
		};	
	}
}

function locationSelects()
{
	var favs_area = document.getElementById("ride-location");
	if(favs_area != null)
	{
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
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
					json_users = JSON.parse(httpRequest.responseText);
					var elem = document.createElement("select");
					elem.id = "select-location";
					for(var i = 0; i < json_users.length; i++) 
					{
					    var obj = json_users[i]; 
					    var opt = document.createElement("option");
					    opt.value = obj['id'];
					    opt.innerHTML = obj['name'];
					    elem.appendChild(opt);
					    favs_area.appendChild(elem);

					}

					console.log(json_users);

				}
			}
		};	
	}
}

function routeSelects()
{
			var favs_area = document.getElementById("ride-route");
			if(favs_area !=null)
			{
			var httpRequest = new XMLHttpRequest();
			//var turl = "http://localhost/final/data.php";
			httpRequest.open('POST', turl, true);
			var params = "action=allRoutes";
			httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpRequest.send(params);	
			httpRequest.onreadystatechange = function()
			{
				if(httpRequest.readyState == 4)
				{
					if(httpRequest.status == 200)
					{
						json_users = JSON.parse(httpRequest.responseText);
						var elem = document.createElement("select");
						elem.id = "select-route";
						for(var i = 0; i < json_users.length; i++) 
						{
						    var obj = json_users[i]; 
						    var opt = document.createElement("option");
						    opt.value = obj['id'];
						    opt.innerHTML = obj['name'];
						    elem.appendChild(opt);
						    favs_area.appendChild(elem);

						}

						console.log(json_users);

					}
				}
			};
		}
}


function allRoutes()
{
		var favs_area = document.getElementById("all-routes");
		if (favs_area !=null) {


			favs_area.innerHTML ="";
			var httpRequest = new XMLHttpRequest();
			//var turl = "http://localhost/final/data.php";
			httpRequest.open('POST', turl, true);
			var params = "action=allRoutes";
			httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			httpRequest.send(params);	
			httpRequest.onreadystatechange = function()
			{
				if(httpRequest.readyState == 4)
				{
					if(httpRequest.status == 200)
					{
						console.log("All routes!");
						var json = JSON.parse(httpRequest.responseText);
						//console.log(httpRequest.responseText);
						for(var i = 0; i < json.length; i++) {
						    var obj = json[i]; 
						    var full_name = "Created by: "+obj.first_name + " " + obj.last_name;
							var elem = document.createElement("div");
							var loc_name = "<textarea id='name-"+obj['id'] +"'>"+obj['name']+"</textarea>";
							var	loc_adr = "<textarea id='link-"+obj['id'] +"'>"+obj['link']+"</textarea>";

							//var	update_btn = "<button onClick=updateLocation("+obj['id']+") id='lid-"+obj['id']+"'>Save Changes</button>";
							//var	del_btn = "<button onClick=deleteLocation("+obj['id']+")>Delete</button>"
							//var content_html = "<div class='error'>"+ loc_name + loc_adr+update_btn+ del_btn +"</div>";	
							var content_html = loc_name + loc_adr +" "+full_name;	
							
							//elem.id = "errors";
							elem.innerHTML = content_html;
							favs_area.appendChild(elem);
						    //console.log(obj);
						}					
						var response = httpRequest.responseText;
					}
					else
					{
						console.log("All bad!");
					}
				}
			};
		}
}
function allLocations()
{
	var favs_area = document.getElementById("all-locations");
	if (favs_area !=null) 
	{


		favs_area.innerHTML ="";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
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
}
function deleteLocation(loc_id)
{
	var httpRequest = new XMLHttpRequest();
	//var turl = "http://localhost/final/data.php";
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
function deleteRoute(route_id)
{
	var httpRequest = new XMLHttpRequest();
	//var turl = "http://localhost/final/data.php";
	httpRequest.open('POST', turl, true);
	var params = "action=deleteRoute&id="+route_id;
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
				myRoutes();
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
		//var turl = "http://localhost/final/data.php";
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
function updateRoute(route_id)
{
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		var loc_name = document.getElementById("name-"+route_id).value;
		var loc_addr = document.getElementById("link-"+route_id).value;
		httpRequest.open('POST', turl, true);
		var params = "action=updateRoute&id="+route_id+"&name="+loc_name+"&link="+loc_addr;
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
					
					myRoutes();
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
	var uid = document.getElementById("loc-uid");
	//console.log(uid);
	if (uid != null)
	{
		var uid = document.getElementById("loc-uid").value;
		var favs_area = document.getElementById("my-locations");
		favs_area.innerHTML ="";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
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
function myRoutes()
{
	var uid = document.getElementById("route-uid");
	if (uid != null)
	{
		var uid = document.getElementById("route-uid").value;
		console.log(uid);
		var favs_area = document.getElementById("my-routes");
		favs_area.innerHTML ="";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=myRoutes&uid="+uid;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("my routes good!");
					var json = JSON.parse(httpRequest.responseText);
					console.log("ROUTE");	
					console.log(json);
					//console.log(httpRequest.responseText);
					for(var i = 0; i < json.length; i++) {
					    var obj = json[i]; 
						var elem = document.createElement("div");
						var loc_name = "<textarea id='name-"+obj['id'] +"'>"+obj['name']+"</textarea>";
						var	loc_adr = "<textarea id='link-"+obj['id'] +"'>"+obj['link']+"</textarea>";
						var	update_btn = "<button onClick=updateRoute("+obj['id']+") id='lid-"+obj['id']+"'>Save Changes</button>";
						var	del_btn = "<button onClick=deleteRoute("+obj['id']+")>Delete</button>";
						var content_html = "<div class='error'>"+ loc_name + loc_adr+update_btn+ del_btn +"</div>";	
						elem.id = "errors";
						elem.innerHTML = content_html;
						favs_area.appendChild(elem);
					    //console.log(obj);
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
		var uid = document.getElementById("route-uid").value;
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
			//var turl = "http://localhost/final/data.php";
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
						myRoutes();
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
		var uid = document.getElementById("loc-uid").value;
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
			//var turl = "http://localhost/final/data.php";
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
							allLocations();

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
function setAssignments()
{	
	var uid = document.getElementById("select-user").value;
	var role_id = document.getElementById("select-role").value;
	var httpRequest = new XMLHttpRequest();
	console.log(uid);
	console.log(role_id);

	//var turl = "http://localhost/final/data.php";
	httpRequest.open('POST', turl, true);
	var params = "action=setAssignment&uid="+uid+"&role_id="+role_id;
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(params);	
	httpRequest.onreadystatechange = function()
	{
		if(httpRequest.readyState == 4)
		{
			if(httpRequest.status == 200)
			{
				//listAssignments();
				console.log(httpRequest.responseText);
				//console.log("Roles set!");
				listAssignments();
			}
			else
			{
				console.log("Sets failed!");
			}

		}
	};

}
function prepAssignments()
{
	var role_area = document.getElementById("assignment-area");
	if (role_area != null) 
	{
		var json_users = {};
		var json_roles = {};
		role_area.innerHTML = "";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=allUsers";
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					json_users = JSON.parse(httpRequest.responseText);
					var elem = document.createElement("select");
					elem.id = "select-user";
					for(var i = 0; i < json_users.length; i++) 
					{
					    var obj = json_users[i]; 
					    var opt = document.createElement("option");
					    opt.value = obj['id'];
					    opt.innerHTML = obj['first_name'] +" "+ obj['last_name'];
					    elem.appendChild(opt);
					    role_area.appendChild(elem);

					}

					console.log(json_users);

				}
			}
		};
		var httpRequest2 = new XMLHttpRequest();
		httpRequest2.open('POST', turl, true);
		var params2 = "action=allRoles";
		httpRequest2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest2.send(params2);	
		httpRequest2.onreadystatechange = function()
		{
			if(httpRequest2.readyState == 4)
			{
				if(httpRequest2.status == 200)
				{
					json_roles = JSON.parse(httpRequest2.responseText);
					var elem = document.createElement("select");
					elem.id = "select-role";
					for(var i = 0; i < json_roles.length; i++) 
					{
					    var obj = json_roles  [i]; 
					    var opt = document.createElement("option");
					    opt.value = obj['id'];
					    opt.innerHTML = obj['name'];
					    elem.appendChild(opt);
					    role_area.appendChild(elem);

					}

				}
			}
		};
		//var btn = "<button id='assign_btn' onClick=setAssignments()>Assign Role</button>";
		//role_area.appendChild(btn);
		var btn_div = document.getElementById("assignment-btn");
		var btn_elem = document.createElement("button")
		btn_elem.id = "assign_btn";
		btn_elem.setAttribute('onclick','setAssignments()');
		btn_elem.innerHTML = "Asssign Role";
		btn_div.appendChild(btn_elem);
		var br = document.createElement("br");
		btn_div.appendChild(br);
		//role_area.appendChild(btn_div);
		//var btn = "<button id='assign_btn' onClick=setAssignments()>Assign Role</button>";

		//console.log("a-start");
		//console.log(json_roles);
		//console.log(json_users);
		//console.log("a-end"	);
	}

}


function deleteAssignment(user_id, role_id)
{
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=deleteAssignment&uid="+user_id+"&role_id="+role_id;
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{

					
					console.log(httpRequest.responseText);
					listAssignments();
				}
				else
				{
					console.log("All bad!");
				}
			}
		};	
}

function listAssignments()
{
	var role_area = document.getElementById("role-assignments");
	if (role_area != null) 
	{	
		role_area.innerHTML = "";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=getAssignments";
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("all assignments good!");
					var json = JSON.parse(httpRequest.responseText);
					console.log(httpRequest.responseText);
					for(var i = 0; i < json.length; i++) 
					{
					    var obj = json[i]; 
						var elem = document.createElement("div");
						var username = "<div>"+obj['first_name']+" "+obj['last_name'];
						var user_role = "   " +obj['name']+"</div>";
						var	del_btn = "<button onClick=deleteAssignment("+obj['uid']+","+obj['role_id']+")>Remove Assignment</button>";
						var content_html = "<div class='error'>"+ username+user_role + del_btn +"</div>";	
						elem.id = "errors";
						elem.innerHTML = content_html;
						role_area.appendChild(elem);
					    //console.log(obj);
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
function allRoles()
{
	var role_area = document.getElementById("roles");
	if (role_area != null) 
	{	
		role_area.innerHTML = "";
		var httpRequest = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest.open('POST', turl, true);
		var params = "action=allRoles";
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		httpRequest.send(params);	
		httpRequest.onreadystatechange = function()
		{
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200)
				{
					console.log("all roles good!");
					var json = JSON.parse(httpRequest.responseText);
					//console.log(httpRequest.responseText);
					for(var i = 0; i < json.length; i++) 
					{
					    var obj = json[i]; 
						var elem = document.createElement("div");
						var loc_name = "<textarea id='name-"+obj['id'] +"'>"+obj['name']+"</textarea>";
						var	del_btn = "<button onClick=deleteRole("+obj['id']+")>Delete</button>";
						var content_html = "<div class='error'>"+ loc_name + del_btn +"</div>";	
						elem.id = "errors";
						elem.innerHTML = content_html;
						role_area.appendChild(elem);
					    //console.log(obj);
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

function deleteRole(role_id)
{
	var httpRequest = new XMLHttpRequest();
	//var turl = "http://localhost/final/data.php";
	httpRequest.open('POST', turl, true);
	var params = "action=deleteRole&id="+role_id;
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
				allRoles();
			}
			else
			{
				console.log("All bad!");
			}
		}
	};
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
		//var turl = "http://localhost/final/data.php";
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
						document.getElementById("status").innerHTML = role+ " role been added!";
						allRoles();

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
	

	if(create_acct)
	{
		var valid_email = true
		var httpRequest3 = new XMLHttpRequest();
		//var turl = "http://localhost/final/data.php";
		httpRequest3.open('POST', turl, true);
		var params = "action=checkEmail&&email="+email;
		console.log(params);
		httpRequest3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//httpRequest.setRequestHeader("Content-length", params.length);
		//httpRequest.setRequestHeader("Connection", "close");	
		httpRequest3.send(params);	
		httpRequest3.onreadystatechange = function()
		{
			if(httpRequest3.readyState == 4)
			{
				if(httpRequest3.status == 200)
				{
					
					console.log("REQ: "+httpRequest3.responseText);
					if (httpRequest3.responseText >0)
					{
						valid_email = false;
						console.log("REQ: "+httpRequest3.responseText);
						document.getElementById("status").innerHTML = "This email address already exists. Please enter another";
					}
					else
					{

					var httpRequest = new XMLHttpRequest();
					//var turl = "http://localhost/final/data.php";
					httpRequest.open('POST', turl, true);
					var params = "action=new&fname="+fname+"&lname="+lname+"&email="+email+"&pword="+pword;
					console.log(params);
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
								if (httpRequest.responseText == "Duplicate")
								{
									console.log(httpRequest.responseText);
									document.getElementById("status").innerHTML = "This email address already exists. Please enter another";
								}
								else
								{
									console.log(httpRequest.responseText);
									document.getElementById("status").innerHTML = "Account has been created! <a href='login.php'>Please click here to log in</a>";
								}
							}
							else
							{
								console.log(httpRequest.status);
								console.log(httpRequest.responseText);
							}
						}
					};

					}	
				}
				else
				{

				}
			}
		};
		
	}
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
		//var turl = "http://localhost/final/data.php";
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
					if(httpRequest.responseText== "Verified")
					{
						document.getElementById("status").innerHTML = "Login succesful! Click for the <a href='main.php'>main page</a>";
					}
					else
					{
						document.getElementById("status").innerHTML = httpRequest.responseText;
					}
					//setTimeout(function() {window.location.replace("rides.php");}, 3000);
				}
				else
				{
					console.log("All bad!");
				}
			}
		};

	}

}