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
<title>Main Page</title>
<body>
	<?php
	include 'dbinfo.php';
	$logged_in = false;
     echo "<div align='center'><h1>";

        if(session_status() == PHP_SESSION_ACTIVE)
        {
            if(array_key_exists('logged_in',$_SESSION))
            {
                $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);

                $uname=$_SESSION['uname'];
                $current_uid = $_SESSION['uid'];
                echo "<a href=userinfo.php?id=$current_uid>My Info</a><br>"; 
            }
        }
	echo "<a href='login.php'>Login</a><br>";
	echo "<a href='locations.php'>Locations</a><br>";
	echo "<a href='roles.php'>Roles</a><br>";
	echo "<a href='routes.php'>Routes</a><br>";
	echo "<a href='rides.php'>Rides</a><br>";
	echo "<a href='users.php'>Users</a><br>";
	echo "<a href='data.php?action=logout'>Logout</a><br>";
	?>
</body>
</html>