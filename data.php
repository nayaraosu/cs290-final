<?php
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);
	include 'dbinfo.php';
    //var_dump($_POST);
    //echo password_hash('test', PASSWORD_DEFAULT);
    
   // $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
    //$result = $mysqli->query($query);
    //echo $result;                
        
    if (array_key_exists("action", $_POST)) 
    {

        
        $mysqli = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_NAME);
        if($_POST['action'] == 'logout')
        {   session_start();
            $_SESSION = array();
            session_destroy();
            echo "Successfully logged out!";

        }
        if ($_POST['action'] == 'updateLoc')
        {
            $id = $_POST['id'];   
            $name = $_POST['name'];   
            $addr = $_POST['addr'];   
            $q = "UPDATE locations SET name='$name', address='$addr' WHERE id='$id'";
            $mysqli->query($q);
            echo "Location updated!";
        }
        if ($_POST['action'] == 'deleteLoc')
        {
            $id = $_POST['id'];
            $q = "DELETE FROM locations WHERE id='$id'";
            $mysqli->query($q);
            echo "Deleted location!";
        }
    
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
                    session_start();
                    $user_q = "SELECT id, first_name FROM users WHERE email='$email'";
                    echo $user_q;
                    $r = $mysqli->query($user_q);
                    $user_row = $r->fetch_assoc();
                    $_SESSION['uid'] = $user_row['id'];
                    $_SESSION['uname'] = $user_row['first_name'];
                    $_SESSION['logged_in'] = true;
                }
                else
                {
                    echo "Does not match!";
                }
            }
            else
            {
                echo "Email does not exist";   
            }

        }

        else if ($_POST['action'] == 'new')
        {
            

            $fname = $_POST['fname'];    
            $lname = $_POST['lname'];
            $email =  $mysqli->real_escape_string( $_POST['email']);
            $pass = $_POST['pword'];
            $hash = password_hash($pass, PASSWORD_DEFAULT);
            $title = "Member";
            
            $insert = $mysqli->query("INSERT INTO users (first_name,last_name,display_name,custom_title,hash,email) VALUES ('$fname','$lname','$fname','$title','$hash','$email')");
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