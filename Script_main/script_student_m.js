document.addEventListener('DOMContentLoaded', function () {
    // Sample student data
    let students = [
        {
            id: 1,
            name: "John Doe",
            joiningDate: "2024-01-15",
            dob: "2012-03-21",
            father: "Ram Rai",
            currentDate: new Date().toISOString().split('T')[0],
            level: "Level 2",
            phone: "123-456-7890",
            email: "johndoe@example.com",
            address: "123 Main St, City, Country",
        },
        {
            id: 2,
            name: "SAW Doe",
            joiningDate: "2024-02-15",
            dob: "2012-04-21",
            father: "King jo",
            currentDate: new Date().toISOString().split('T')[0],
            level: "Level 3",
            phone: "223-3434-7490",
            email: "j23233@example.com",
            address: "12323ain St, Ci34 Country",
        },
        {
            id: 3,
            name: "fsdf Doe",
            joiningDate: "2025-01-15",
            dob: "2022-03-21",
            father: "dsd",
            currentDate: new Date().toISOString().split('T')[0],
            level: "Level 8",
            phone: "123-456-7890",
            email: "johnaas@example.com",
            address: "123 sasa City, Country",
        },
    ];

    // DOM Elements
    const studentTableBody = document.getElementById('student-table-body');
    const addStudentForm = document.getElementById('add-student-form');
    const editStudentForm = document.getElementById('edit-student-form');
    const editForm = document.getElementById('edit-form');
    const studentDetailsCard = document.getElementById('student-details-card');
    const closeDetailsCardButton = document.getElementById('close-details-card');
    const cancelEditButton = document.getElementById('cancel-edit');

    let editingStudent = null;

    // Render students table
    function renderStudents() {
        studentTableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.className = 'student-row';
            row.innerHTML = `
                <td class="table-data">${student.name}</td>
                <td class="table-data">${student.father}</td>
                <td class="table-data">${student.dob}</td>
                <td class="table-data">${student.joiningDate}</td>
                <td class="table-data">${student.currentDate}</td>
                <td class="table-data">${student.level}</td>
                <td class="table-data">${student.phone}</td>
                <td class="table-data">${student.email}</td>
                <td class="table-data">${student.address}</td>
                <td class="table-data">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            // Add event listeners for edit and delete buttons
            row.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                startEditing(student);
            });
            row.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteStudent(student.id);
            });
            // Show details on row click
            row.addEventListener('click', () => showDetails(student));
            studentTableBody.appendChild(row);
        });
    }

    // Add student
    addStudentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newStudent = {
            id: students.length + 1,
            name: document.getElementById('name').value,
            father: document.getElementById('father').value,
            dob: document.getElementById('dob').value,
            joiningDate: document.getElementById('joiningDate').value,
            currentDate: new Date().toISOString().split('T')[0],
            level: document.getElementById('level').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
        };
        students.push(newStudent);
        renderStudents();
        addStudentForm.reset();
        alert('Student added successfully!');
    });

    // Delete student
    function deleteStudent(id) {
        students = students.filter(student => student.id !== id);
        renderStudents();
        alert('Student deleted successfully!');
    }

    // Start editing a student
    function startEditing(student) {
        editingStudent = student;
        document.getElementById('edit-name').value = student.name;
        document.getElementById('edit-father').value = student.father;
        document.getElementById('edit-dob').value = student.dob;
        document.getElementById('edit-joiningDate').value = student.joiningDate;
        document.getElementById('edit-level').value = student.level;
        document.getElementById('edit-phone').value = student.phone;
        document.getElementById('edit-email').value = student.email;
        document.getElementById('edit-address').value = student.address;
        editStudentForm.style.display = 'flex';
    }

    // Save edited student
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        editingStudent.name = document.getElementById('edit-name').value;
        editingStudent.father = document.getElementById('edit-father').value;
        editingStudent.dob = document.getElementById('edit-dob').value;
        editingStudent.joiningDate = document.getElementById('edit-joiningDate').value;
        editingStudent.level = document.getElementById('edit-level').value;
        editingStudent.phone = document.getElementById('edit-phone').value;
        editingStudent.email = document.getElementById('edit-email').value;
        editingStudent.address = document.getElementById('edit-address').value;
        renderStudents();
        editStudentForm.style.display = 'none';
        alert('Student updated successfully!');
    });

    // Cancel editing
    cancelEditButton.addEventListener('click', function () {
        editStudentForm.style.display = 'none';
    });

    // Show student details
    function showDetails(student) {
        document.getElementById('details-name').textContent = student.name;
        document.getElementById('details-father').textContent = student.father;
        document.getElementById('details-dob').textContent = student.dob;
        document.getElementById('details-joiningDate').textContent = student.joiningDate;
        document.getElementById('details-currentDate').textContent = student.currentDate;
        document.getElementById('details-level').textContent = student.level;
        document.getElementById('details-phone').textContent = student.phone;
        document.getElementById('details-email').textContent = student.email;
        document.getElementById('details-address').textContent = student.address;
        studentDetailsCard.style.display = 'flex';
    }

    // Close details card
    closeDetailsCardButton.addEventListener('click', function () {
        studentDetailsCard.style.display = 'none';
    });

    // Initial render
    renderStudents();
});