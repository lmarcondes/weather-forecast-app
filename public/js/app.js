console.log("the script is running on the client side");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = searchElement.value;
  messageOne.textContent = 'Loading...'

  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error.toString()
        } else {
          messageOne.textContent = null
          messageTwo.textContent = `Forecast for ${data.location}: ${data.forecast}`
        }
      });
    }
  );
});
