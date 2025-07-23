<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $firstName = mysqli_real_escape_string($conn, $_POST['firstName']);
    $lastName = mysqli_real_escape_string($conn, $_POST['lastName']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $department = mysqli_real_escape_string($conn, $_POST['department']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $originalEmail = mysqli_real_escape_string($conn, $_POST['originalEmail']);

    $sql = "UPDATE personnel 
            SET first_name='$firstName', last_name='$lastName', email='$email', department='$department', location='$location'
            WHERE email='$originalEmail'";

    if (mysqli_query($conn, $sql)) {
        echo "success";
    } else {
        echo "error: " . mysqli_error($conn);
    }
}
?>
