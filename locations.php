<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="final.css">
<script src="final.js"></script>
<title>Locations</title>
    <!-- Custom styles for this template -->
</head>

<body>
  	<?php

  		$logged_in = false;
  	    if(session_status() == PHP_SESSION_ACTIVE)
        {
            if($_SESSION['logged_in'])
            {
                $uname=$_SESSION['uname'];
                $uid=$_SESSION['uid'];
                $logged_in = true;
                echo "Logged in as: $uname  <a href='data.php?action=logout'>Logout</a><br>";
                echo "<a href='main.php'>Main Page</a>";
            }
        }
        else
        {
        	echo "You are not logged in!";
        }

        echo '<h1>Locations</h1>';
        echo '<h2>Add a new Location</h2>';
        echo '<label>Location name: <input type="text" id="name" name="location"></label><br>';
        echo '<label>Location address: <textarea id="address" name="loc_address"></textarea></label><br>';
        if ($logged_in)
        {
        echo  "<label>Created by: $uname </label><br>";
        echo "<input type='hidden' id='loc-uid' name='id' value='$uid'>";
 		echo '<button onclick="addLocation()"> Add Location</button><br><br>';    
        echo '<h2>My locations</h2>';
        echo '<div id="my-locations"> </div>';
        echo "<br><br>";
        echo '<h2>All locations</h2>';
        echo '<div id="all-locations"> </div>';
        //my rdies 		

        }
        else
        {
        	echo "You must be logged in to add a new location! <br>";
        }

        echo '<div id="status"></div><br><br>';
  	?>
</body>
</html>

