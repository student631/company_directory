<?php
include 'db.php';

$first = $_POST['firstName'];
$last = $_POST['lastName'];
$email = $_POST['email'];
$dept = $_POST['department'];
$location = $_POST['location'];

$sql = "INSERT INTO personnel (first_name, last_name, email, department, location) 
        VALUES ('$first', '$last', '$email', '$dept', '$location')";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "error";
}
?>
