<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['id'];

  // Direct delete (assuming no dependency check for personnel)
  $stmt = $conn->prepare("DELETE FROM personnel WHERE email = ?");
  $stmt->bind_param("s", $email);
  
  if ($stmt->execute()) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete personnel.']);
  }
}
?>
