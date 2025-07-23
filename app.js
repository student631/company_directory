$(document).ready(function () {
  // Tabs and modal switching
  $('.tab-button').click(function () {
    var tab = $(this).data('tab');
    $('.tab-button').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#' + tab).addClass('active');

    // Load respective tab data
    if (tab === 'personnel') {
      loadPersonnel();
    } else if (tab === 'departments') {
      loadDepartments();
    } else if (tab === 'locations') {
      loadLocations();
    }
  });

  // Add button modal trigger
  $('#addBtn').click(function () {
    var activeTab = $('.tab-button.active').data('tab');
    $('.modal-overlay').addClass('hidden');
    if (activeTab === 'personnel') {
      $('#modalPersonnel').removeClass('hidden');
    } else if (activeTab === 'departments') {
      $('#modalDepartments').removeClass('hidden');
    } else if (activeTab === 'locations') {
      $('#modalLocations').removeClass('hidden');
    }
  });

  // Close modals
  $('.closeModal').click(function () {
    $('.modal-overlay').addClass('hidden');
  });

  // Initial load
  loadPersonnel();

  // Edit buttons for each section
  $(document).on('click', '.editPersonnelBtn', function () {
    var row = $(this).closest('tr');
    var fullName = row.find('td:eq(0)').text().split(' ');
    var firstName = fullName[0];
    var lastName = fullName[1];
    var location = row.find('td:eq(1)').text();
    var email = row.find('td:eq(2)').text();
    var department = row.find('td:eq(3)').text();

    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#email').val(email);
    $('#department').val(department);
    $('#location').val(location);

    $('#modalPersonnel').removeClass('hidden');
    $('#personnelForm').attr('data-editing', '1').attr('data-original-email', email);
  });

  $(document).on('click', '.editDeptBtn', function () {
    var row = $(this).closest('tr');
    var deptName = row.find('td:eq(0)').text();
    var location = row.find('td:eq(1)').text();

    $('#deptName').val(deptName);
    $('#deptLocation').val(location);

    $('#modalDepartments').removeClass('hidden');
    $('#departmentForm').attr('data-editing', '1').attr('data-original-dept', deptName);
  });

  $(document).on('click', '.editLocationBtn', function () {
    var row = $(this).closest('tr');
    var locName = row.find('td:eq(0)').text();

    $('#locName').val(locName);

    $('#modalLocations').removeClass('hidden');
    $('#locationForm').attr('data-editing', '1').attr('data-original-location', locName);
  });

  // Submit personnel form (Add/Edit)
  $('#personnelForm').submit(function (e) {
    e.preventDefault();
    var editing = $(this).attr('data-editing') === '1';
    var url = editing ? 'edit_personnel.php' : 'submit_personnel.php';
    var originalEmail = $(this).attr('data-original-email');

    $.ajax({
      url: url,
      type: 'POST',
      data: {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        department: $('#department').val(),
        location: $('#location').val(),
        originalEmail: originalEmail
      },
      success: function (response) {
        alert(editing ? 'Employee updated successfully!' : 'Employee added successfully!');
        $('#modalPersonnel').addClass('hidden');
        $('#personnelForm')[0].reset();
        $('#personnelForm').removeAttr('data-editing data-original-email');
        loadPersonnel();
      }
    });
  });

  // Submit department form (Add/Edit)
  $('#departmentForm').submit(function (e) {
    e.preventDefault();
    var editing = $(this).attr('data-editing') === '1';
    var url = editing ? 'edit_department.php' : 'submit_department.php';
    var originalDept = $(this).attr('data-original-dept');

    $.ajax({
      url: url,
      type: 'POST',
      data: {
        deptName: $('#deptName').val(),
        location: $('#deptLocation').val(),
        originalDept: originalDept
      },
      success: function (response) {
        alert(editing ? 'Department updated successfully!' : 'Department added successfully!');
        $('#modalDepartments').addClass('hidden');
        $('#departmentForm')[0].reset();
        $('#departmentForm').removeAttr('data-editing data-original-dept');
        loadDepartments();
      }
    });
  });

  // Submit location form (Add/Edit)
  $('#locationForm').submit(function (e) {
    e.preventDefault();
    var editing = $(this).attr('data-editing') === '1';
    var url = editing ? 'edit_location.php' : 'submit_location.php';
    var originalLocation = $(this).attr('data-original-location');

    $.ajax({
      url: url,
      type: 'POST',
      data: {
        locName: $('#locName').val(),
        originalLocation: originalLocation
      },
      success: function (response) {
        alert(editing ? 'Location updated successfully!' : 'Location added successfully!');
        $('#modalLocations').addClass('hidden');
        $('#locationForm')[0].reset();
        $('#locationForm').removeAttr('data-editing data-original-location');
        loadLocations();
      }
    });
  });
});

function loadPersonnel() {
  $.getJSON('fetch_personnel.php', function (data) {
    var rows = '';
    $.each(data, function (index, item) {
      rows += '<tr>';
      rows += '<td>' + item.first_name + ' ' + item.last_name + '</td>';
      rows += '<td>' + item.location + '</td>';
      rows += '<td>' + item.email + '</td>';
      rows += '<td>' + item.department + '</td>';
      rows += '<td><button class="editPersonnelBtn">Edit</button> <button class="deleteBtn">Delete</button></td>';
      rows += '</tr>';
    });
    $('#personnel tbody').html(rows);
  });
}

function loadDepartments() {
  $.getJSON('fetch_departments.php', function (data) {
    var rows = '';
    $.each(data, function (index, item) {
      rows += '<tr>';
      rows += '<td>' + item.dept_name + '</td>';
      rows += '<td>' + item.location + '</td>';
      rows += '<td><button class="editDeptBtn">Edit</button> <button class="deleteBtn">Delete</button></td>';
      rows += '</tr>';
    });
    $('#departments tbody').html(rows);
  });
}

function loadLocations() {
  $.getJSON('fetch_locations.php', function (data) {
    var rows = '';
    $.each(data, function (index, item) {
      rows += '<tr>';
      rows += '<td>' + item.loc_name + '</td>';
      rows += '<td><button class="editLocationBtn">Edit</button> <button class="deleteBtn">Delete</button></td>';
      rows += '</tr>';
    });
    $('#locations tbody').html(rows);
  });
}


  // 🔍 Search functionality
  $('#search').on('keyup', function () {
    const query = $(this).val();
    const activeTab = $('.tab-button.active').data('tab');

    $.ajax({
      url: 'search.php',
      method: 'POST',
      data: { query: query, tab: activeTab },
      success: function (data) {
        $('#' + activeTab + ' tbody').html(data);
      }
    });
  });


var deleteContext = {}; // Store info about what's being deleted

// Handle delete button clicks
$(document).on('click', '.deleteBtn', function () {
  var row = $(this).closest('tr');
  var activeTab = $('.tab-button.active').data('tab');

  if (activeTab === 'personnel') {
    var name = row.find('td:eq(0)').text();
    var email = row.find('td:eq(2)').text();
    deleteContext = { type: 'personnel', id: email, label: name };
    if (confirm(`Are you sure that you want to remove the entry for ${name}?`)) {
      attemptDelete();
    }
  } else if (activeTab === 'departments') {
    var deptName = row.find('td:eq(0)').text();
    deleteContext = { type: 'department', id: deptName, label: deptName };
    attemptDelete();
  } else if (activeTab === 'locations') {
    var locName = row.find('td:eq(0)').text();
    deleteContext = { type: 'location', id: locName, label: locName };
    attemptDelete();
  }
});

// Function to send delete request
function attemptDelete() {
  var url = '';
  if (deleteContext.type === 'personnel') {
    url = 'delete_personnel.php';
  } else if (deleteContext.type === 'department') {
    url = 'delete_department.php';
  } else if (deleteContext.type === 'location') {
    url = 'delete_location.php';
  }

  $.ajax({
    type: 'POST',
    url: url,
    data: { id: deleteContext.id },
    dataType: 'json',
    success: function (response) {
      if (response.success) {
        if (deleteContext.type === 'personnel') loadPersonnel();
        else if (deleteContext.type === 'department') loadDepartments();
        else if (deleteContext.type === 'location') loadLocations();
      } else {
        alert(response.message || 'Unable to delete this item.');
      }
    },
    error: function () {
      alert('Something went wrong while deleting.');
    }
  });
}

