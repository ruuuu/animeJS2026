const modal = document.querySelector('.search-model')
const searchBtn = document.querySelector('.icon_search')
const closeModalBtn = modal.querySelector('.search-close-switch')
const input = modal.querySelector('#search-input')


searchBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});



closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});


input.addEventListener('input', (evt) => {
  console.log(evt.target.value)
});

