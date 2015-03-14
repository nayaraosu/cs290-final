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

    <!-- Custom styles for this template -->
</head>

<body>
  	<?php
        include 'dbinfo.php';
        if(session_status() == PHP_SESSION_ACTIVE)
        {
            if($_SESSION['logged_in'])
            {
                $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);

                $uname=$_SESSION['uname'];
                $current_uid = $_SESSION['uid'];
                echo "Logged in as: $uname<br><br>";
                if (array_key_exists("id", $_GET))
                {   

                    $user_id = $_GET['id'];

                    $user_stmnt = $mysqli->prepare("SELECT first_name,last_name, email FROM users WHERE id=?");
                    $user_stmnt->bind_param("i", $user_id);
                    $user_stmnt->execute();
                    $user_stmnt->store_result();
                    $user_stmnt->bind_result($fname,$lname,$email);   

                    while ($user_stmnt->fetch()) {
                        echo $fname."<br>";
                        echo $lname."<br>";
                        echo $email."<br>";
                     } 

                    $role_stmnt = $mysqli->prepare("SELECT roles.name as name  FROM roles INNER JOIN user_roles ON  roles.id=user_roles.role_id INNER JOIN users on users.id = user_roles.uid WHERE users.id=?");
                    $role_stmnt->bind_param("i", $user_id);
                    $role_stmnt->execute();
                    $role_stmnt->store_result();
                    $role_stmnt->bind_result($role_name);   

                    while ($role_stmnt->fetch()) {
                        echo $role_name."<br>";
                     } 

                    $ride_stmnt = $mysqli->prepare("SELECT name,address FROM locations WHERE uid=?");
                    $ride_stmnt->bind_param("i", $user_id);
                    echo $ride_stmnt->execute();

                    $ride_stmnt->store_result();
                    $ride_stmnt->bind_result($name, $address);
                    while($ride_stmnt->fetch())
                    {
                        echo $name."<br>";
                        echo $address."<br>";
                    }
                    echo $ride_stmnt->num_rows;

                }


            }
            else
            {
                echo "You must be logged in to use this page!";
            }

        }
        
  	?>
</body>
</html>

