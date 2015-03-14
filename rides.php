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
                echo "Logged in as: $uname  <a href='logout'>Logout</a><br>";
            }
        }
        else
        {
        	echo "You are not logged in! Please login <a href='login.php'>here</a>";
        }
        if ($logged_in)
        {
        
            echo "<input type='hidden' id='ride-user' name='id' value='$uid'>";
            echo '<span>Select a location: <span display="inline" id="ride-location"> </span> or add a new one here.</span><br>';                    
            echo '<span>Select a ride: <span display="inline" id="ride-route"> </span> or add a new one here.</span><br>';                    
            echo '<span>Enter a title: <input type="text" id="ride-title"></input><br>';            
            echo '<span>Enter a day: <input type="number" min=1 max=31 display="inline" id="ride-day">Enter a month: <input type="number" display="inline" min=1 max=12 id="ride-month">Enter a year: <input type="number" min=2015 sdisplay="inline" id="ride-year"></span><br>';            
            echo '<span>Enter a ride description: <textarea id="ride-detail"> </textarea><br>';          
            echo '<div><button onClick="submitRide()">Submit Ride</button></div>';
            echo '<div id="errors"> </div>';
            echo '<div id="all-rides"></div>';
        }
        else
        {
        	echo "You must be <a href='login.php'>logged in</a> to add and view routes! <br>";
        }

  	?>
</body>
</html>

