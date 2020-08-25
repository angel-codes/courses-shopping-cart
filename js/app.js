// Global variables
const shoppingCart          = document.querySelector('#carrito');
const shoppingCartContainer = document.querySelector('#lista-carrito tbody');
const shoppingCarCleaner    = document.querySelector('#vaciar-carrito');
const coursesList           = document.querySelector('#lista-cursos');

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

}