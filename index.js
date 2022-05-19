/** @format */
const container = document.querySelector(".container");
const refresh = document.querySelector(".refresh");

// Get the status data from the API
const fetchData = async () => {
	try {
		const response = await axios.get(
			"https://www.githubstatus.com/api/v2/summary.json"
		);
		createTemplate(response.data.components);
	} catch (error) {
		createError(error.message);
	}
};

// Create template for the recieved statuses
const createTemplate = statusArr => {
	for (let stat of statusArr) {
		// remove this status info because it's irrelevant
		if (stat.name === "Visit www.githubstatus.com for more information") {
			container.innerHTML += ``;
		} else {
			// Check if the the status is OK
			if (stat.status === "operational") {
				container.innerHTML += `
                    <article class="stats">
                        <h2>${stat.name}</h2>
                        <h5 class="status">${stat.status}</h5>
                    </article>
                `;
			} else {
				container.innerHTML += `
                    <article class="stats">
                        <h2>${stat.name}</h2>
                        <h5 class="status error">${stat.status}</h5>
                    </article>
                `;
			}
		}
	}
};

// Create the error message template, in case something is wrong with the API
const createError = message => {
	container.innerHTML += `
        <h2 class="error">${message}<br/>
            For further information visit <a href="https://www.githubstatus.com">www.githubstatus.com</a>
        </h2>`;
};

// Refresh page on button press and rotate image
refresh.addEventListener("click", () => {
	location.reload();
	refresh.style.cssText += `
		transform: rotate(180deg);
		transition: transform 250ms ease;`;
});

fetchData();
