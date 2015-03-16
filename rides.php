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
<title>Rides</title>

<body>
  	<?php

        $logged_in = false;
  		
  	    if(session_status() == PHP_SESSION_ACTIVE)
        {   
            if(array_key_exists('logged_in', $_SESSION))
            {
                $uname=$_SESSION['uname'];
                $uid=$_SESSION['uid'];
                $logged_in = true;
                echo "Logged in as: $uname  <a href='data.php?action=logout'>Logout</a><br>";        
                echo "<a href='main.php'>Main Page</a>";
            }
        }
        else
        {   var_dump($_SESSION);
        	echo "You are not logged in! Please login <a href='login.php'>here</a>";
            $logged_in = false;
        }
        if ($logged_in)
        {
            echo "<h1>Rides</h1><br>";
            echo "<h2>Add a new ride</h2><br>";
            echo "<input type='hidden' id='ride-user' name='id' value='$uid'>";
            echo '<span>Select a location: <span display="inline" id="ride-location"> </span> or add a new one <a href="locations.php">here.</a></span><br>';                    
            echo '<span>Select a ride: <span display="inline" id="ride-route"> </span> or add a new one <a href="rides.php">here.</a></span><br>';                    
            echo '<span>Enter a title: <input type="text" id="ride-title"></input><br>';            
            echo '<span>Enter a day: <input type="number" min=1 max=31 display="inline" id="ride-day">Enter a month: <input type="number" display="inline" min=1 max=12 id="ride-month">Enter a year: <input type="number" min=2015 sdisplay="inline" id="ride-year"></span><br>';            
            echo '<span>Enter a ride description: <textarea id="ride-detail"> </textarea><br>';          
            echo '<div><button onClick="submitRide()">Submit Ride</button></div>';
            echo '<div id="errors"> </div><br>';
            echo "<h2>All rides</h2><br>";
            echo '<table id="all-rides"></table>';
        }
        else
        {   
            var_dump($_SESSION);
            $logged_in = false;
        	echo "You must be <a href='login.php'>logged in</a> to add and view routes! <br>";
        }

  	?>
</body>
</html>

