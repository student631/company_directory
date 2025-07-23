
<?php
include 'db.php';

$loc_name = $_POST['locName'];

$sql = "INSERT INTO locations (loc_name) VALUES ('$loc_name')";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "error";
}
?>
