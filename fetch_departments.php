<?php
include 'db.php';
header('Content-Type: application/json');
$result = $conn->query("SELECT * FROM departments ORDER BY id DESC");
$data = [];
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}
echo json_encode($data);
?>