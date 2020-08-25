//* Global variables
const shoppingCart          = document.querySelector('#carrito');
const shoppingCartContainer = document.querySelector('#lista-carrito tbody');
const shoppingCarCleaner    = document.querySelector('#vaciar-carrito');
const coursesList           = document.querySelector('#lista-cursos');
let   shoppingCartProducts  = [];

//* Event listeners
loadEventListeners();
function loadEventListeners(){
    // When user click "Agregar al Carrito"
    coursesList.addEventListener('click', addCourse);
}

//* Functions

// Add new course in the Shopping Cart
function addCourse(e){
    e.preventDefault(); // Prevent default action

    // Execute action only when the correct item is clicked
    if(e.target.classList.contains('agregar-carrito')){
        readCourseData(e.target.parentElement.parentElement); // Selected course
        
    }

}

// Read the parent element of the clicked element
function readCourseData(course){

    // Object with the course info
    const courseInfo = {
        id: course.querySelector('a').getAttribute('data-id'),
        imagen: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        quantity: 1
    };

    // Add product to the Shopping Cart Products Array
    shoppingCartProducts = [...shoppingCartProducts, courseInfo];
    shoppingCartHTML();
}

// Show shopping cart in HTML
function shoppingCartHTML(){

    // Clear HTML
    clearHTML();

    // Generate the HTML for each Course
    shoppingCartProducts.forEach(course => {
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
}

// Prevent duplicates courses
function clearHTML(){
    while(shoppingCartContainer.firstChild){
        shoppingCartContainer.removeChild(shoppingCartContainer.firstChild);
    }
}