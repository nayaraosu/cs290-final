<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="final.css">
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


        echo 'Add a new Route<br>';
        echo '<label>Route name: <input type="text" id="name" name="route"></label><br>';
        echo '<label>Route GPS Link: <textarea id="gps" name="gps"></textarea></label><br>';
        if ($logged_in)
        {
        echo  "<label>Created by: $uname </label><br>";
        echo "<input type='hidden' id='route-uid' name='id' value='$uid'>";
 		echo '<button onclick="addRoute()"> Add Route</button><br>';  
        echo '<div id="my-routes"> </div>';
        echo "<br><br>";
        echo '<table id="all-routes"> </table>';          

        }
        else
        {
        	echo "You must be logged in to add and view routes! <br>";
        }

  	?>
</body>
</html>

