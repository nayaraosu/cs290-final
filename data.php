<?php
session_start();
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
	include 'dbinfo.php';
    



    // This file handles the majority of the database interaction             
        
    if (array_key_exists("action", $_GET))
    {
        if($_GET['action'] == 'logout')
        {

           
            $_SESSION = array();
            session_destroy();
            echo "Successfully logged out! Click for the <a href='main.php'>main page</a>";

        }
        
    }
    if (array_key_exists("action", $_POST)) 
    {

        
        // mysql handler
        $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
        
        // Handles logging out
        if( $_POST['action'] == 'logout')
        {   
            session_start();
            $_SESSION = array();
            session_destroy();
            echo "Successfully logged out!";

        }
        // Handles deleting a ride
        if($_POST['action'] == 'deleteRide')
        {
            $ride_id = $_POST['ride_id'];
            $del_stmnt = $mysqli->prepare("DELETE FROM ride WHERE id=?");
            $del_stmnt->bind_param("i", $ride_id);
            if ($del_stmnt->execute())
            {
                echo "Ride deleted!";
            }
            else
            {
                echo "Unable to delete ride!";
            }

                 
        }
        // Gets all rides
        if($_POST['action'] == 'allRides')
        {
            $query =   "SELECT ride.id as ride_id, users.id as user_id, first_name, last_name, ride.name AS title, ride_date, details, link, address, locations.name AS loc_name, ride.details as description FROM ride INNER JOIN users ON users.id = ride.uid INNER JOIN routes ON routes.id = ride.rid INNER JOIN locations ON locations.id = ride.lid";
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {

                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);


        }
        // Updates a ride
        if($_POST['action'] == 'updateRide')
        {
            $uid = $_POST['uid'];
            $rid = $_POST['rid'];
            $lid = $_POST['lid'];
            $day = $_POST['day'];
            $month = $_POST['month'];
            $year = $_POST['year'];
            $description = $_POST['description'];
            $title = $_POST['title'];
            $date = "$year-$month-$day";
                        //$q = "UPDATE routes SET name='$name', link='$link' WHERE id='$id'";

            $stmnt = $mysqli->prepare("UPDATE ride SET uid=?, rid=?, lid=?, details=?, ride_date=?, name=?");
            $stmnt->bind_param("iiisss",$uid, $rid, $lid, $description, $date, $title);
            if ($stmnt->execute())
            {
                echo "Ride has been updated!";
            }
            else
            {
                echo "Unable to update ride!";
            }

            
            //f$stmnt = $mysqli->prepare("INSERT INTO ride (uid, rid, lid, details, ride_date, name) VALUES (?,?,?,?,?,?)");

        }

        // Creates a ride
        if($_POST['action'] == 'createRide')
        {
            $uid = $_POST['uid'];
            $rid = $_POST['rid'];
            $lid = $_POST['lid'];
            $day = $_POST['day'];
            $month = $_POST['month'];
            $year = $_POST['year'];
            $description = $_POST['description'];
            $title = $_POST['title'];
            $date = "$year-$month-$day";
            $stmnt = $mysqli->prepare("INSERT INTO ride (uid, rid, lid, details, ride_date, name) VALUES (?,?,?,?,?,?)");
            echo $stmnt->bind_param("iiisss",$uid, $rid, $lid, $description, $date, $title);
            echo $stmnt->execute();
            echo $stmnt->affected_rows;
            //echo $date;svn_fs_txn_root(txn)
            //echo ",$uid, $rid, $lid, $day, $month, $year, $title, $description";
        }

        // Updates a route
        if ($_POST['action'] == 'updateRoute')
        {
            $id = $_POST['id'];   
            $name = $_POST['name'];   
            $link = $_POST['link'];   
            //$q = "UPDATE routes SET name='$name', link='$link' WHERE id='$id'";
            $stmnt = $mysqli->prepare("UPDATE routes SET name=?, link=? WHERE id=?");
            $stmnt->bind_param("ssi",$name, $link, $id);
            if ($stmnt->execute())
            {
            echo "Route updated!";
            }
            else
            {
                echo "A problem occurred! ";
            }


        }

        // deletes a route
        if ($_POST['action'] == 'deleteRoute')
        {
            $id = $_POST['id'];
            $q = "DELETE FROM routes WHERE id='$id'";
            $stmnt = $mysqli->prepare("DELETE FROM routes WHERE id=?");
            $stmnt->bind_param("i",$id);
            if ($stmnt->execute())
            {
            echo "Route deleted!";
            }
            else
            {
                echo "A problem occurred! ";
            }

        }

        // Gets routes for a specific user
        if ($_POST['action'] == 'myRoutes')
        {
            $uid = $_POST['uid'];
            $query =   "SELECT routes.id as id, name, link, first_name, last_name FROM routes INNER JOIN  users ON routes.uid = users.id WHERE users.id = '$uid'";
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);

        }

        // Gets all routes
        if ($_POST['action'] == 'allRoutes')
        {
            $query =   "SELECT  routes.id as id, name, link, first_name, last_name FROM routes INNER JOIN  users ON routes.uid = users.id";
            //echo $query;
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }

        // Updates a location
        if ($_POST['action'] == 'updateLoc')
        {
            $id = $_POST['id'];   
            $name = $_POST['name'];   
            $addr = $_POST['addr'];   
            $q = "UPDATE locations SET name='$name', address='$addr' WHERE id='$id'";
            $mysqli->query($q);
            echo "Location updated!";
        }

        // Deletes location
        if ($_POST['action'] == 'deleteLoc')
        {
            $id = $_POST['id'];
            $q = "DELETE FROM locations WHERE id='$id'";
            $mysqli->query($q);
            echo "Deleted location!";
        }
        
        //gets all locations for a given user
        if ($_POST['action'] == 'myLocations')
        {
            $uid = $_POST['uid'];
            $query =   "SELECT  locations.id as id, name, address, first_name, last_name FROM locations INNER JOIN  users ON locations.uid = users.id WHERE users.id = '$uid'";
            //echo $query;
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }

        // Gets all locations
        if ($_POST['action'] == 'allLocations')
        {
            //$uid = $_POST['uid'];
            $query =   "SELECT  locations.id as id, name, address, first_name, last_name FROM locations INNER JOIN  users ON locations.uid = users.id";
            //echo $query;
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }
        // Add a new routes
        if ($_POST['action'] == 'addRoute')
        {
            $name = $_POST['name'];
            $gps = $_POST['gps'];
            $uid = $_POST['uid'];
            $query = "SELECT id FROM routes where name='$name'";
            $result = $mysqli->query($query);
            $size = $result->num_rows;
            //echo $size;
            if($size >0)
            {
                 echo "Duplicate";
            }
            else
            {
                $q =  "INSERT INTO routes (name,link,uid) VALUES ('$name','$gps','$uid')";
                //echo $q;
                $insert = $mysqli->query($q);
                //echo $insert;
                if ($insert)
                {
                   echo "Success";    
                }
                else
                {
                    echo 'Errir: '.$mysqli->errno." ". $mysqli->error;
                }

            }

        }

        // Add a new location
        if ($_POST['action'] == 'addLocation')
        {
            $name = $_POST['name'];
            $address = $_POST['address'];
            $uid = $_POST['uid'];
            $query = "SELECT id FROM locations where name='$name'";
            //echo $query;
            $result = $mysqli->query($query);
            $size = $result->num_rows;
            //echo $size;
            if($size >0)
            {
                 echo "Duplicate";
            }
            else
            {
                $q =  "INSERT INTO locations (name,address,uid) VALUES ('$name','$address','$uid')";
                //echo $q;
                $insert = $mysqli->query($q);
                //echo $insert;
                if ($insert)
                {
                   echo "Success";    
                }
                else
                {
                    echo 'Errir: '.$mysqli->errno." ". $mysqli->error;
                }

            }


        }
        // Delete a roles
        if ($_POST['action'] == 'deleteRole')
        {
            $id = $_POST['id'];
            //$q = "DELETE FROM roles WHERE id='$id'";
            //$mysqli->query($q);
            $stmnt = $mysqli->prepare("DELETE FROM roles WHERE id=?");
            $stmnt->bind_param("i", $id);
            
            echo $stmnt->execute();            
            //echo "Deleted role!";
        }
        // Delete a user/role assignment
        if ($_POST['action'] == 'deleteAssignment')
        {
            $uid = $_POST['uid'];
            $role_id = $_POST['role_id'];
            //$q = "DELETE FROM user_roles WHERE uid='$uid' AND role_id='$role_id'";
            $stmnt = $mysqli->prepare("DELETE FROM user_roles WHERE uid=? and role_id=?");
            $stmnt->bind_param("ii", $uid, $role_id);
            echo $stmnt->execute();
            //echo $mysqli->query($q);
            //echo "Deleted Assignment!";
            //echo $q;
        }

        // Create a user/role assignment
        if ($_POST['action'] == 'setAssignment')
        {
            $uid = $_POST['uid'];
            $role_id = $_POST['role_id'];
            //$q = "INSERT INTO user_roles (uid, role_id ) VALUES ('$uid','$role_id')";
            $stmnt = $mysqli->prepare("INSERT INTO user_roles (uid, role_id) VALUES (?,?)");
            $stmnt->bind_param("ii", $uid, $role_id);
            echo "exec"+ $stmnt->execute();
            //if($stmnt->execute()){
              //  echo "Assignments have been set!";
            

            
        }
        // Get all assignments
        if ($_POST['action'] == 'getAssignments')
        {
           
            $q = "SELECT users.id AS uid, role_id, first_name, last_name, name FROM users INNER JOIN user_roles ON users.id = user_roles.uid INNER JOIN roles ON roles.id = user_roles.role_id";
            //$mysqli->query($q);
            $res = $mysqli->query($q);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }

        // Get all roles
        if ($_POST['action'] == 'allRoles')
        {
            //$uid = $_POST['uid'];
            $query =   "SELECT  id,  name  FROM roles";
            //echo $query;
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }        
        // Get all users
        if ($_POST['action'] == 'allUsers')
        {
            //$uid = $_POST['uid'];
            $query =   "SELECT  id, first_name, last_name  FROM users";
            //echo $query;
            $res = $mysqli->query($query);
            $j_array = array();

            if ($res->num_rows >0 )
            {
                //$rows =$res->fetch();
                while ($row = $res->fetch_assoc()) 
                {
                    $j_array[] = $row;

                }
                
            }
            echo json_encode($j_array);
        }       

        // Add a new role
        if($_POST['action'] == 'addRole')
        {
            //echo 'Duplicate';
            $role  = $_POST['role'];
            $query = "SELECT id FROM roles where name='$role'";
            //echo $query;
            $result = $mysqli->query($query);
            $size = $result->num_rows;
            //echo $size;
            if($size >0)
            {
                 echo "Duplicate";
            }
            else
            {
                //$insert = $mysqli->query("INSERT INTO roles (name) VALUES ('$role')";
                $q =  "INSERT INTO roles (name) VALUES ('$role')";
                //echo $q;
                $insert = $mysqli->query($q);
                //echo $insert;
                if ($insert)
                {
                   echo "Success";    
                }
                else
                {
                    echo 'Errir: '.$mysqli->errno." ". $mysqli->error;
                }

            }
        }
        // Handles logins
        if($_POST['action'] == 'login')
        {    
            $email = $_POST['email'];
            $pw = $_POST['pword'];
            $query = "SELECT hash FROM users where email='$email'";
            $result = $mysqli->query($query);
            $size = $result->num_rows;
            if($size == 1)
            {
                $row = $result->fetch_assoc();
                $hash = $row['hash'];

                if (password_verify($pw, $hash))
                {
                    echo "Verified";
                    //session_start();
                    $user_q = "SELECT id, first_name FROM users WHERE email='$email'";
                    //echo $user_q;
                    $r = $mysqli->query($user_q);
                    $user_row = $r->fetch_assoc();
                    $_SESSION['uid'] = $user_row['id'];
                    $_SESSION['uname'] = $user_row['first_name'];
                    $_SESSION['logged_in'] = true;
                }
                else
                {
                    echo "Password does not match!";
                }
            }
            else
            {
                echo "Email does not exist";   
            }

        }
        // Checks to see if email exists
        if ($_POST['action'] == 'checkEmail')
        {
         $email =  $mysqli->real_escape_string( $_POST['email']);
            //$pass = $_POST['pword'];
            //$chk = $mysqli->prepare("SELECT id FROM users WHERE email=?");
            //echo $chk;
            //$chk->bind_param("s", $email);
            //$chk->bind_result($chk_res);
            //$chk->store_result();
            //$chk->execute();
            $chk = $mysqli->query("SELECT id FROM users WHERE email='$email'");

            $num_of_rows = $chk->num_rows;  
            echo "$num_of_rows";
        }

        // Create new account
        if ($_POST['action'] == 'new')
        {   

            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $email = $_POST['email'];
            $pw = $_POST['pword'];

            $hash = password_hash($pw, PASSWORD_DEFAULT);
            $insert = $mysqli->prepare("INSERT INTO users (first_name,last_name,hash,email) VALUES (?,?,?,?)");
            $insert->bind_param("ssss",$fname,$lname,$hash,$email);
            $insert->store_result();
            echo $insert->execute();
            if ($insert)
            {
                echo "Success!";    
            }
            else
            {

            echo 'Errir: '.$mysqli->errno." ". $mysqli->error;
            }        
        }       
    }

	
?>