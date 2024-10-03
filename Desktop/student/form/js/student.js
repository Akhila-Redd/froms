let students = [];
let isAscendingName = true; 
let isAscendingSerial = true; 
function fetchStudents() {
    fetch('../json/server.json')
        .then(response => response.json())
        .then(data => {
            students = data;
            const localStudents = JSON.parse(localStorage.getItem('students')) || [];
            students = [...students, ...localStudents]; 
            displayStudents(); 
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
function sortStudentsByName() {
    students.sort((a, b) => isAscendingName ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    isAscendingName = !isAscendingName; 
    displayStudents(); 
}
function sortStudentsBySerial() {
    students.sort((a, b) => isAscendingSerial ? a.serial - b.serial : b.serial - a.serial);
    isAscendingSerial = !isAscendingSerial; 
    displayStudents(); 
}
document.getElementById("name-header").addEventListener("click", sortStudentsByName);
document.getElementById("serial-header").addEventListener("click", sortStudentsBySerial);
fetchStudents();
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