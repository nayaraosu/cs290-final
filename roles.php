<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="nayara-final.css">
<script src="final.js"></script>

    <!-- Custom styles for this template -->
</head>

<body>
  	<?php
        echo 'Add a new Role<br>';
        echo '<label>Role: <input type="text" id="role" name="role"></label><br>';
 		echo '<button onclick="addRole()"> Add Role</button><br>';    
        echo '<div id="status"></div><br><br>';
        echo '<div id="roles"></div><br>';
  	    echo '<div id="role-assignments"></div><br>';
  	    echo '<div id="assignment-area"></div>';
  	    echo '<div id="assignment-btn"></div>';
  	?>


</body>
</html>

