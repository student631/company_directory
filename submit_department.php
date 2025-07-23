
<?php
include 'db.php';

$dept_name = $_POST['deptName'];
$location = $_POST['location'];

$sql = "INSERT INTO departments (dept_name, location) VALUES ('$dept_name', '$location')";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "error";
}
?>
