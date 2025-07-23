<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $location = $_POST['id'];

  // Check personnel in this location
  $check = $conn->prepare("SELECT COUNT(*) FROM personnel WHERE location = ?");
  $check->bind_param("s", $location);
  $check->execute();
  $check->bind_result($count);
  $check->fetch();
  $check->close();

  if ($count > 0) {
    echo json_encode([
      'success' => false,
      'message' => "You cannot remove the entry for $location because it has $count employees assigned to it."
    ]);
    exit;
  }

  $stmt = $conn->prepare("DELETE FROM locations WHERE name = ?");
  $stmt->bind_param("s", $location);

  if ($stmt->execute()) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete location.']);
  }
}
?>
