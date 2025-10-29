const formElement = document.getElementById("intro-form");

document.getElementById("clear").addEventListener("click", () => {
    formElement.querySelectorAll("input, textarea").forEach((el) => el.value = "");
});

function loadImage() {
    const image = document.getElementById('introImage').files[0];
    if (!image) return;
    const imageUrl = URL.createObjectURL(image);
    document.getElementById('loadImage').innerHTML = `<img src="${imageUrl}" >`;
}



//Course Add/Delete and whatever
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("add-course");
    const coursesFieldset = document.getElementById("courses");

    // Keep a template copy
    const templateCourse = document.querySelector(".course-entries").cloneNode(true);

    function attachDelete(button, block) {
        button.addEventListener("click", () => block.remove());
    }

    // Attach delete to initial blocks
    document.querySelectorAll(".course-entries").forEach((block) => {
        attachDelete(block.querySelector(".delete-course"), block);
    });

    addBtn.addEventListener("click", () => {
        // Clone from the template, not from the DOM
        const newCourse = templateCourse.cloneNode(true);

        // Clear input values
        newCourse.querySelectorAll("input").forEach((input) => input.value = "");

        // Attach delete button
        attachDelete(newCourse.querySelector(".delete-course"), newCourse);

        // Insert before the Add button
        coursesFieldset.insertBefore(newCourse, addBtn);
    });
});







//Submission
formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const main = document.querySelector("main");

    // --- Personal Info ---
    let firstName = formElement.firstName.value;
    const middleName = formElement.middleName.value;
    const lastName = formElement.lastName.value;
    const nickName = formElement.nickname.value;

    if (nickName.trim() !== "") {
    firstName = nickName.trim();
}

    const mascotAdj = formElement["mascot-adj"].value;
    const mascot = formElement["mascot-animal"].value;
    const divider = formElement["divider"].value;

    const quote = formElement["quote"].value;
    const quoteAuthor = formElement["quote-author"].value;

    const imageInput = formElement.introImage.files[0];
    const imageUrl = imageInput ? URL.createObjectURL(imageInput) : "images/IMG_1511_fixed.jpg";
    const caption = formElement.caption.value;

    const statement = formElement["statement"].value;

  
    const bullets = [];
    for (let i = 1; i <= 5; i++) {
        bullets.push(formElement[`bullet${i}`].value);
    }

   
    const courses = [];
    document.querySelectorAll(".course-entries").forEach((block) => {
        const dept = block.querySelector('input[name="dept"]').value;
        const num = block.querySelector('input[name="num"]').value;
        const name = block.querySelector('input[name="name"]').value;
        const reason = block.querySelector('input[name="reason"]').value;
        courses.push({ dept, num, name, reason });
    });

    // --- Optional fields ---
    const funny = formElement.funny.value;
    const share = formElement.share.value;




    main.innerHTML = ""; // clear the form

    // --- Build HTML template ---
    const html = `
<h2>Introduction Form<h2>
<h2>${firstName} ${middleName} ${lastName} ${divider} ${mascotAdj} ${mascot}</h2>
<figure>
    <img class='my-portrait' src='${imageUrl}' alt="A picture of me">
    <figcaption><em>${caption}</em></figcaption>
</figure>
    <p>${statement}<p>

<div class="about-me">
    <ul>
        <li><strong>Personal Background: </strong> ${bullets[0]}</li>
        <li><strong>Academic Background: </strong> ${bullets[1]}</li>
        <li><strong>Professional Background:</strong> ${bullets[2]}</li>
        <li><strong>Background in this subject:</strong> ${bullets[3]}</li>
        <li><strong>Primary Computer Platform:</strong> ${bullets[4]}</li>
        <li>
            <strong>Courses that I'm taking:</strong><br>
            <ul>
                ${courses.map((c) => `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`).join('')}
            </ul>
        </li>
        ${funny ? `<li><strong>Funny/Interesting Item to Remember me by: </strong> ${funny}</li>` : ""}
        ${share ? `<li><strong>Something I'd like to share: </strong> ${share}</li>` : ""}
    </ul>
</div>
        <p>"${quote}"</p>
        <p><em>${quoteAuthor}</em></p>


<button id="reset-page">Reset Form</button>
`;

    main.innerHTML = html;

    // --- Reset button reloads the page ---
    document.getElementById("reset-page").addEventListener("click", () => window.location.reload());

    // Scroll to top so user sees the new page
    window.scrollTo({ top: 0, behavior: "smooth" });
});