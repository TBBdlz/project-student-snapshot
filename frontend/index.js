console.log("Hello Client Script");

/**
 * Analyzes the sentiment of the provided text by sending a POST request to a Flask endpoint.
 *
 * @param {string} userText - The text to be analyzed.
 */
function analyzeText(userText) {
    // Define the URL of the Flask endpoint
    const url = 'http://backend:5000/api/sentiment';

    // Prepare the data to send in the request
    const data = { message: userText };

	console.log(`Serialized json: ${JSON.stringify(data)}`);

    // Use fetch API to send the POST request
    fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json', // Specify the content type
			'Access-Control-Allow-Origin': '*', // Allow CORS
			'Mode': 'cors'
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Update the response element with the sentiment
        const responseElement = document.querySelector("#response-text");
        if (responseElement) {
            responseElement.textContent = `${userText}. Sentiment ${data.sentiment}.`;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#user-form");
    // Check if form is actually selected and not null
    if (form) {
        console.log("User form founded!");
    } else {
        console.error("User form is not found :(");
    }

    form.addEventListener("submit", event => {
        event.preventDefault(); // Prevent default browser behavior
        const inputForm = document.querySelector("#user-input");
        // Check if input form is actually selected and not null
        if (inputForm) {
            console.log("Input form founded!");
            const userText = inputForm.value;
            // Call the analyzeText function with the user's text
            analyzeText(userText);
        } else {
            console.error("Input form is not found :(");
        }
    });
});