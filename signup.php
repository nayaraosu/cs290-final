
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <script src="final.js"></script>
    <link rel="stylesheet" type="text/css" href="nayara-final.css">

    <!-- Custom styles for this template -->
  </head>

  <body>
  	<?php
        //echo "<form action='login.php' method='POST'>";
        echo 'Sign Up<br>';
        echo '<label>First Name: <input type="text" id="fname" name="fname"></label><br>';
        echo '<label>Last Name: <input type="text" id="lname" name="lname"></label><br>';
        echo '<label>Email: <input type="text" id="email" name="email"></label><br>';
        echo '<label>Password: <input type="password" id="password" name="password"></label><br>';
        echo '<label>Confirm Password: <input type="password" id="password_confirm" name="password_confirm"></label><br>';
        echo '<button onclick="signup()"> Sign up</button><br>';    
        echo '<div id="status"></div>';

        //echo '<input type="submit" name="login" value="Log In">';
        //echo '</form>';

        echo $_POST['email'];
       
        if(isset($_POST['email']))
        {

        	echo "truth";
        }
        
  	?>

  </body>
  </html>
