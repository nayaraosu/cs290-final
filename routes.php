<?php session_start();
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="final.css">
<script src="final.js"></script>
</head>
<title>Routes</title>

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
              echo "Logged in as: $uname  <a href='logout'>Logout</a><br>";        
                echo "<a href='main.php'>Main Page</a>";           

            }
        }
        else
        {
        	echo "You are not logged in!";
        }

        echo '<h1>Routes</h1>';
        echo '<h2>Add a new Route</h2>';
        echo '<label>Route name: <input type="text" id="name" name="route"></label><br>';
        echo '<label>Route GPS Link: <textarea id="gps" name="gps"></textarea></label><br>';
        if ($logged_in)
        {
        echo  "<label>Created by: $uname </label><br>";
        echo "<input type='hidden' id='route-uid' name='id' value='$uid'>";
 		echo '<button onclick="addRoute()"> Add Route</button><br>';  
        echo '<div id="status"> </div>';
        echo '<div id="my-routes"> </div>';
        echo "<br><br>";
        echo '<div id="all-routes"> </div>';          

        }
        else
        {
        	echo "You must be logged in to add and view routes! <br>";
        }

  	?>
</body>
</html>

