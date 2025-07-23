<?php
include 'db.php';

$query = $_POST['query'] ?? '';
$tab = $_POST['tab'] ?? '';
$search = "%$query%";

if ($tab === 'personnel') {
    $stmt = $conn->prepare("SELECT * FROM personnel WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR department LIKE ? OR location LIKE ?");
    $stmt->bind_param("sssss", $search, $search, $search, $search, $search);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['first_name']} {$row['last_name']}</td>
                <td>{$row['location']}</td>
                <td>{$row['email']}</td>
                <td>{$row['department']}</td>
                <td><button class='editPersonnelBtn'>Edit</button> <button class='deleteBtn'>Delete</button></td>
              </tr>";
    }

} elseif ($tab === 'departments') {
    $stmt = $conn->prepare("SELECT * FROM departments WHERE dept_name LIKE ? OR location LIKE ?");
    $stmt->bind_param("ss", $search, $search);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['dept_name']}</td>
                <td>{$row['location']}</td>
                <td><button class='editDeptBtn'>Edit</button> <button class='deleteBtn'>Delete</button></td>
              </tr>";
    }

} elseif ($tab === 'locations') {
    $stmt = $conn->prepare("SELECT * FROM locations WHERE loc_name LIKE ?");
    $stmt->bind_param("s", $search);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['loc_name']}</td>
                <td><button class='editLocationBtn'>Edit</button> <button class='deleteBtn'>Delete</button></td>
              </tr>";
    }
}
?>
