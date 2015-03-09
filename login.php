<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="nayara-final.css">
<script src="final.js"></script>

    <!-- Custom styles for this template -->
</head>

<body>
  	<?php
        echo 'Log In<br>';
        echo '<label>Email: <input type="text" id="email" name="email"></label><br>';
        echo '<label>Password: <input type="password" id="password" name="password"></label>';
 		echo '<button onclick="attempt_login()"> Log In</button><br>';    
        echo '<div id="status"></div>';
        if(isset($_POST['email']))
        {

        	echo "truth";
        }
        
  	?>
</body>
</html>

