const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.innerHTML = "<p>There was a problem loading the business directory.</p>";
        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const heading = document.createElement("div");
        heading.classList.add("member-heading");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.textContent = member.tagline;

        heading.appendChild(name);
        heading.appendChild(tagline);

        const body = document.createElement("div");
        body.classList.add("member-body");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.width = 120;
        image.height = 120;
        image.loading = "lazy";

        const info = document.createElement("div");
        info.classList.add("member-info");

        const email = document.createElement("p");
        email.innerHTML = `<strong>Email:</strong> ${member.email}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const website = document.createElement("p");
        website.innerHTML = `<strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>`;

        const level = document.createElement("p");
        level.innerHTML = `<strong>Level:</strong> ${getMembershipLevel(member.membership)}`;

        info.appendChild(email);
        info.appendChild(phone);
        info.appendChild(website);
        info.appendChild(level);

        body.appendChild(image);
        body.appendChild(info);

        card.appendChild(heading);
        card.appendChild(body);

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    } else if (level === 2) {
        return "Silver";
    } else {
        return "Member";
    }
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("member-grid");
    membersContainer.classList.remove("member-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("member-list");
    membersContainer.classList.remove("member-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

getMembers();