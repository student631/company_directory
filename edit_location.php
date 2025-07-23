<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $locName = mysqli_real_escape_string($conn, $_POST['locName']);
    $originalLocation = mysqli_real_escape_string($conn, $_POST['originalLocation']);

    $sql = "UPDATE locations 
            SET loc_name='$locName'
            WHERE loc_name='$originalLocation'";

    if (mysqli_query($conn, $sql)) {
        echo "success";
    } else {
        echo "error: " . mysqli_error($conn);
    }
}
?>
