let students = JSON.parse(localStorage.getItem('students')) || [];

function fetchStudents() {
    fetch('../json/server.json') // Adjust the path to your JSON file
        .then(response => response.json())
        .then(data => {
            students = [...data, ...students]; // Merge JSON data with localStorage data
            displayStudents(); // Display all students
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
}

function displayStudents() {
    const studentBody = document.getElementById("student-body");
    studentBody.innerHTML = students.map(student => `
        <tr>
            <td>${student.name}</td>
            <td>${student.serial}</td>
            <td>${student.mobile}</td>
            <td>${student.address}</td>
            <td>${student.date}</td>
            <td>${student.department}</td>
            <td>${student.email}</td>
            <td>${student.father}</td>
            <td>${student.mother}</td>
        </tr>
    `).join('');
}

document.getElementById("data-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const serial = document.getElementById("serial").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    const date = document.getElementById("date").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;
    const father = document.getElementById("father").value;
    const mother = document.getElementById("mother").value;

    const student = {
        name,
        serial: parseInt(serial, 10),
        mobile,
        address,
        date,
        department,
        email,
        father,
        mother
    };

    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    document.getElementById("data-form").reset();
    displayStudents();
});

// Fetch students from JSON file when the page loads
fetchStudents();
 // Fetch students from JSON file when the page loads
 fetchStudents();

 // Overall search function
 function overallSearch() {
     const searchValue = document.getElementById('overallSearch').value.toLowerCase();
     const rows = document.querySelectorAll('#student-body tr');

     rows.forEach(row => {
         const cells = row.getElementsByTagName('td');
         const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchValue));
         row.style.display = match ? '' : 'none';
     });
 }

// Add event listener for individual column search inputs
const searchInputs = document.querySelectorAll('.search-input');
searchInputs.forEach((input, index) => {
    input.addEventListener('keyup', function() {
        filterTable();
    });
});

// Add event listener for department dropdown
const departmentDropdown = document.getElementById('departmentSearch');

function filterTable() {
    const filters = Array.from(searchInputs).map(input => input.value.toLowerCase());
    const departmentFilter = departmentDropdown.value;

    const rows = document.querySelectorAll('#student-body tr');

    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const matches = filters.every((filter, index) => {
            if (index === 5) { // Department column
                return departmentFilter ? cells[index].textContent === departmentFilter : true;
            }
            return cells[index].textContent.toLowerCase().includes(filter);
        });
        row.style.display = matches ? '' : 'none';
    });
}

// Sorting function
function sortTable(columnIndex) {
    const rows = Array.from(document.querySelectorAll('#student-body tr'));
    const isAscending = rows[0].cells[columnIndex].getAttribute('data-order') === 'asc';

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        if (!isNaN(cellA) && !isNaN(cellB)) {
            return isAscending ? cellA - cellB : cellB - cellA; // For numeric columns
        } else {
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA); // For string columns
        }
    });

    rows.forEach(row => {
        document.getElementById('student-body').appendChild(row);
    });

    // Toggle the sort order for next click
    rows[0].cells[columnIndex].setAttribute('data-order', isAscending ? 'desc' : 'asc');
}