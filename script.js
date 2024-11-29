// DOM Elements
const formSection = document.getElementById('form-section');
const recordsSection = document.getElementById('records-section');
const formNav = document.getElementById('nav-form');
const recordsNav = document.getElementById('nav-records');
const studentForm = document.getElementById('studentForm');
const studentsTableBody = document.querySelector('#studentsTable tbody');

// LocalStorage Key
const STORAGE_KEY = 'registeredStudents';

// Retrieve registered students from local storage
let registeredStudents = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Function to switch between sections
function showSection(section) {
  formSection.classList.add('hidden');
  recordsSection.classList.add('hidden');
  formNav.classList.remove('active');
  recordsNav.classList.remove('active');

  if (section === 'form') {
    formSection.classList.remove('hidden');
    formNav.classList.add('active');
  } else if (section === 'records') {
    recordsSection.classList.remove('hidden');
    recordsNav.classList.add('active');
  }
}

// Navigation bar click events
formNav.addEventListener('click', () => showSection('form'));
recordsNav.addEventListener('click', () => showSection('records'));

// Function to update the table of registered students
function updateStudentTable() {
  studentsTableBody.innerHTML = '';
  registeredStudents.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    studentsTableBody.appendChild(row);
  });

  // Save updated data to local storage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredStudents));
}

// Handle form submission
studentForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Retrieve form data
  const studentData = {
    name: document.getElementById('student-name').value.trim(),
    id: document.getElementById('student-id').value.trim(),
    email: document.getElementById('email-id').value.trim(),
    contact: document.getElementById('contact-no').value.trim()
  };

  // Validate input
  if (!validateInputs(studentData)) {
    alert('Please ensure all inputs are valid.');
    return;
  }

  // Add student to the registeredStudents array
  registeredStudents.push(studentData);

  // Update the registered students table
  updateStudentTable();

  // Clear form inputs
  studentForm.reset();

  // Switch to the registered students section
  showSection('records');
});

// Edit Student Record
function editStudent(index) {
  const student = registeredStudents[index];

  // Populate the form with the existing student data
  document.getElementById('student-name').value = student.name;
  document.getElementById('student-id').value = student.id;
  document.getElementById('email-id').value = student.email;
  document.getElementById('contact-no').value = student.contact;

  // Remove the record from the list to avoid duplication
  registeredStudents.splice(index, 1);
  updateStudentTable();

  // Switch to form section
  showSection('form');
}

// Delete Student Record
function deleteStudent(index) {
  registeredStudents.splice(index, 1);
  updateStudentTable();
}

// Validate Inputs
function validateInputs(data) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[0-9]{10}$/;

  return (
    nameRegex.test(data.name) &&
    idRegex.test(data.id) &&
    emailRegex.test(data.email) &&
    contactRegex.test(data.contact)
  );
}

// Load existing data on page load
updateStudentTable();
