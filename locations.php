<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="nayara-final.css">
<script src="final.js"></script>

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
                echo "Logged in as: $uname<br><br>";
            }
        }
        else
        {
        	echo "You are not logged in!";
        }


        echo 'Add a new Location<br>';
        echo '<label>Location name: <input type="text" id="name" name="location"></label><br>';
        echo '<label>Location address: <textarea id="address" name="loc_address"></textarea></label><br>';
        if ($logged_in)
        {
        echo  "<label>Created by: $uname </label><br>";
        echo "<input type='hidden' id='uid' name='id' value='$uid'>";
 		echo '<button onclick="addLocation()"> Add Location</button><br>';    

        }
        else
        {
        	echo "You must be logged in to add a new location! <br>";
        }

        echo '<div id="status"></div><br><br>';
        echo '<div id="roles"></div>';
  	?>
</body>
</html>

