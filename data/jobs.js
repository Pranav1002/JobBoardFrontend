// Import necessary modules and dependencies
const { api } = require("./api");

// Define a function to fetch jobs
async function fetchJobs() {
    let jobs = [];

    try {
        // Construct the API URL
        const apiUrl = api + 'get/jobs';

        // Fetch data from the API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jw}`,
            },
        });

        // Check if the response is ok
        if (response.ok) {
            // Parse the response data
            const data = await response.json();
            jobs = data;
        } else {
            // Log an error message if data saving failed
            console.error('Data saving failed');
        }
    } catch (error) {
        // Log any errors that occur during the process
        console.error('Error:', error);
    }

    // Return the fetched jobs
    return jobs;
}

// Export the fetchJobs function
module.exports = { fetchJobs };
