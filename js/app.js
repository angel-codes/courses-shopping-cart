//* Global variables
const shoppingCart = document.querySelector('#carrito');
const shoppingCartContainer = document.querySelector('#lista-carrito tbody');
const shoppingCarCleaner = document.querySelector('#vaciar-carrito');
const coursesList = document.querySelector('#lista-cursos');
let shoppingCartProducts = [];

//* Event listeners
loadEventListeners();
function loadEventListeners() {
    // Show courses from LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        shoppingCartProducts = JSON.parse(localStorage.getItem('courses')) || [];
        shoppingCartHTML(); // Show all of the courses from LS
    });

    // When user click "Agregar al Carrito"
    coursesList.addEventListener('click', addCourse);

    // Delete courses of the Shopping Cart
    shoppingCart.addEventListener('click', removeCourse);
    
    // Clear the shopping cart
    shoppingCarCleaner.addEventListener('click', () => {
        shoppingCartProducts = []; // Clear the Array
        clearHTML(); // Remove items from the shopping cart
    });
}

//* Functions

// Add new course in the Shopping Cart
function addCourse(e) {
    e.preventDefault(); // Prevent default action

    // Execute action only when the correct item is clicked
    if (e.target.classList.contains('agregar-carrito')) {
        readCourseData(e.target.parentElement.parentElement); // Selected course
    }
}

// Remove course from the shopping cart
function removeCourse(e) {
    // Execute action only when the correct item is clicked
    if (e.target.classList.contains('borrar-curso')) {
        // ID of the selected course
        const idCourse = e.target.getAttribute('data-id');

        // Remove from Array
        shoppingCartProducts = shoppingCartProducts.filter(
            course => course.id !== idCourse
        );

        // Update the HTML
        shoppingCartHTML();
    }
}

// Read the parent element of the clicked element
function readCourseData(course) {
    // Object with the course info
    const courseInfo = {
        id: course.querySelector('a').getAttribute('data-id'),
        imagen: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        quantity: 1,
    };

    // Check if a course already exists in the shopping cart
    const exists = shoppingCartProducts.some(
        course => course.id === courseInfo.id
    );
    if (exists) {
        // Update the quantity of the product
        const courses = shoppingCartProducts.map((course) => {
            if (course.id === courseInfo.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });
        shoppingCartProducts = [...courses];
    } else {
        // Add product to the Shopping Cart Products Array
        shoppingCartProducts = [...shoppingCartProducts, courseInfo];
    }

    shoppingCartHTML();
}

// Show shopping cart in HTML
function shoppingCartHTML() {
    // Clear HTML
    clearHTML();

    // Generate the HTML for each Course
    shoppingCartProducts.forEach((course) => {
        // Extract values
        const { id, imagen, title, price, quantity } = course;

        // Create HTML template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Add HTML template in the tbody
        shoppingCartContainer.appendChild(row);
    });

    // Shopping cart to the Local Storage
    syncStorage();
}

function syncStorage(){
    localStorage.setItem('courses', JSON.stringify(shoppingCartProducts));
}

// Prevent duplicates courses
function clearHTML() {
    while (shoppingCartContainer.firstChild) {
        shoppingCartContainer.removeChild(shoppingCartContainer.firstChild);
    }
}
