<?php session_start();
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="nayara-final.css">
<script src="final.js"></script>

    <!-- Custom styles for this template -->
</head>

<body>
  	<?php
        include 'dbinfo.php';
        if(session_status() == PHP_SESSION_ACTIVE)
        {
            if(array_key_exists('logged_in', $_SESSION))
            {
                $uname=$_SESSION['uname'];
                echo "Logged in as: $uname<br><br>";
            }
        }
        
        echo 'Log In<br>';
        echo '<label>Email: <input type="text" id="email" name="email"></label><br>';
        echo '<label>Password: <input type="password" id="password" name="password"></label>';
 		echo '<button onclick="login()"> Log In</button><br>';    
        echo '<div id="status"></div>';

        
  	?>
</body>
</html>

