<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $newDept = $_POST['deptName'];
  $location = $_POST['location'];
  $originalDept = $_POST['originalDept'];

  // Update query
  $stmt = $conn->prepare("UPDATE departments SET dept_name = ?, location = ? WHERE dept_name = ?");
  $stmt->bind_param("sss", $newDept, $location, $originalDept);

  if ($stmt->execute()) {
    echo "success";
  } else {
    echo "error";
  }

  $stmt->close();
}
?>
