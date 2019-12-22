
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('firstInput');
const messageTwo = document.getElementById('secondInput');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading, please wait.';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (!data.location) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    });

});
