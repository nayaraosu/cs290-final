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
                    $ride_res = $ride_stmnt->fetch();

                    $loc_stmnt = $mysqli->prepare("SELECT id, name FROM locations");
                    $loc_stmnt->execute();
                    $loc_stmnt->store_result();
                    $loc_stmnt->bind_result($loc_id, $loc_name);
                    //$loc_res = $loc_stmnt->fetch();

                    $route_stmnt = $mysqli->prepare("SELECT id, name FROM routes");
                    $route_stmnt->execute();
                    $route_stmnt->store_result();
                    $route_stmnt->bind_result($route_id, $route_name);

                    $date_tokens = explode("-", $rdate);
                    $year = $date_tokens[0];
                    $month  = $date_tokens[1];
                    $day = $date_tokens[2];
                    
                    // Location selection list
                    $loc_opts ="";
                    while ($loc_stmnt->fetch())
                    {

                        if($loc_id == $lid)
                        {
                    
                            $loc_default = " selected='selected'";
                        }
                        else
                        {
                            $loc_default="";
                        }
                        
                        
                        $loc_opts = $loc_opts." <option  value='$loc_id' $loc_default>$loc_name</option>";

                    } 
                    $loc_select = "<select id='loc'>$loc_opts</select>";
                    
                    $route_opts ="";
                    while ($route_stmnt->fetch())
                    {

                        if($route_id == $rid)
                        {
                    
                            $route_default = " selected='selected'";
                        }
                        else
                        {
                            $route_default="";
                        }
                            
                        
                        $route_opts = $route_opts." <option  value='$route_id' $route_default>$route_name</option>";

                    } 
                    $route_select = "<select id='route'>$route_opts</select>";
                    $name_cell = "<textarea id='name'>$name</textarea>";
                    $detail_cell  =  "<textarea id='detail'>$detail</textarea>";
                    $date_cell = "<input type='number' id='day' value=$day></input><input type='number' id='month' value=$month></input><input type='number' id=year value=$year></input>";
                     echo "<table><th>Ride Name</th><th>Ride Details</th><th>Ride Date</th><th>Location</th><th>Route</th>";    
                    echo "<tr><td>$name_cell</td><td>$detail_cell</td><td><div>$date_cell</div></td><td>$loc_select</td><td>$route_select</td></tr>";
                    echo "</table>";
                    echo "<input type='hidden' id='uid' name='id' value='$uid'>";

                    echo "<button onClick='updateRide($ride_id)'>Update Ride</button>";
                    echo "<div id='status'></div>";
                }
            }
        }
    ?>