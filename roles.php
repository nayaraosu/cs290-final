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

<title>Roles</title>
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
                echo "<a href='main.php'>Main Page</a>";           

            }
        }
        else
        {
          echo "You are not logged in! Please login <a href='login.php'>here</a>";
        }

        if ($logged_in)
        {
          echo '<h1>Roles</h1><br>';
          echo '<h2>Add a new Role</h2><br>';
          echo '<label>Role: <input type="text" id="role" name="role"></label><br>';
 		      echo '<button onclick="addRole()"> Add Role</button><br>';    
          echo '<div id="status"></div><br><br>';
          echo '<h1>Existing Roles</h1><br>';
          echo '<div id="roles"></div><br>';
          echo '<h1>Role Assignments</h1><br>';
  	      echo '<div id="role-assignments"></div><br>';
  	      echo '<div id="assignment-area"></div>';
  	      echo '<div id="assignment-btn"></div>';
        }
        else
        {
          echo "You are not logged in! Please login <a href='login.php'>here</a>";
        }
  	?>


</body>
</html>


