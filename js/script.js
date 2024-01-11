let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");
const modalContent = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close-btn");

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = "";

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;
        console.dir(employee);

        employeeHTML += `
        <div class="card" data-index="${index}">
            <div class="card-img-container">
                <img class="card-img" src="${picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
        `
    })

    gallery.innerHTML = employeeHTML;

}

function displayModal(index) {
    let {name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];

  let date = new Date(dob.date);

  let modalHTML = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
          <p class="modal-text">${email}</p>
          <p class="modal-text cap">${city}, ${state}</p>
          <hr>
          <p class="modal-text">${phone}</p>
          <p class="modal-text">${city}, ${state}, ${postcode}</p>
          <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDay()}/${date.getFullYear()}</p>
      </div>
  </div>
  `

  modalContainer.classList.add('hidden');
  modalContainer.style.display = 'none';

  modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  })


  gallery.addEventListener('click', (e) => {
    if (e.target.closest('.card')) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
  })
}
