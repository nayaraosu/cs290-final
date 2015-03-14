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

                    $ride_id = $_GET['id'];
                    $ride_stmnt = $mysqli->prepare("SELECT rid, uid, lid, name, details, ride_date FROM ride WHERE id=?");
                    $ride_stmnt->bind_param("i", $ride_id);
                    $ride_stmnt->execute();
                    $ride_stmnt->store_result();
                    $ride_stmnt->bind_result($rid,$uid,$lid,$name, $detail, $rdate);

                    $loc_stmnt
                    
                }
            }
        }
    ?>