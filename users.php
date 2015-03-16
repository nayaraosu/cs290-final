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

<title>User Info</title>
</head>

<body>
  	<?php
        include 'dbinfo.php';

                $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);

                $uname=$_SESSION['uname'];
                $current_uid = $_SESSION['uid'];
                echo "Logged in as: $uname  <a href='logout'>Logout</a><br>";        
                echo "<a href='main.php'>Main Page</a><br><br>";
                $user_stmnt = $mysqli->prepare("SELECT id,first_name,last_name, email FROM users");
                //$user_stmnt->bind_param("i", $user_id);
                $user_stmnt->execute();
                $user_stmnt->store_result();
                $user_stmnt->bind_result($id,$fname,$lname,$email);   
                echo "<h1>All Users</h1>";
                echo '<table>';
                echo "<th>First Name</th><th>Last Name</th><th>Email</th>";
                while ($user_stmnt->fetch()) 
                {
                    echo "<tr><td>$fname</td><td>$lname</td><td>$email</td><td><a href='userinfo.php?id=$id'>More Info</a></td></tr>";    
                } 
                echo "</table>";
    ?>
</body>
</html>   