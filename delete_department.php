<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $deptName = $_POST['id'];

  // Check personnel in department
  $check = $conn->prepare("SELECT COUNT(*) FROM personnel WHERE department = ?");
  $check->bind_param("s", $deptName);
  $check->execute();
  $check->bind_result($count);
  $check->fetch();
  $check->close();

  if ($count > 0) {
    echo json_encode([
      'success' => false,
      'message' => "You cannot remove the entry for $deptName because it has $count employees assigned to it."
    ]);
    exit;
  }

  $stmt = $conn->prepare("DELETE FROM departments WHERE name = ?");
  $stmt->bind_param("s", $deptName);

  if ($stmt->execute()) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete department.']);
  }
}
?>
