

//login page

//Clears any text within these fields.
function clearFields() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const email    = document.getElementById("email");

  if (username) username.value = "";
  if (password) password.value = "";
  if (email)    email.value = "";
}


//Checks if something has been entered in both feilds this logs you in with a message of "Welcome (Somename)"
function login() {
    const form = document.querySelector(".login-form");
    if (!form.reportValidity()) {
        return;
    }

    const userName = document.getElementById("username").value;
    document.getElementById("login-panel").innerHTML = `<h3>Welcome, ${userName}</h3>`;
//You will be booted to the home page.
    setTimeout(() => {
     window.location.href = "index.html";
}, 1500);
}

//Below are menu changes for password and new account, creating an account will actomatically log you in (pretend too).
function forgotPassword() {
    document.getElementById("login-panel").innerHTML = `
 <h2>Password Recovery</h2>

 <div class="container center column">
  <form class="login-form center column" action="#" method="post">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" required>

   <div>
    <button type="submit" id="login-submit" onclick="sentMessage()">Submit</button>
    <button type="button" id="clear" onclick="clearFields()">Clear</button>
   </div>
  </form>
  <p id="back-to-login" onclick="backToLogin()">Back to login</p>
  <p id="create-new-account" onclick="creatNewAccount()">Create new account</p>
</div>
    `;
}

function backToLogin() {
    document.getElementById("login-panel").innerHTML = `
 <h2>Login</h2>

 <div class="container center column">
  <form class="login-form center column" action="#" method="post">

    <label for="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter your username" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" required>
   <div>
    <button type="submit" id="login-submit" onclick="login()">Login</button>
    <button type="button" id="clear" onclick="clearFields()">Clear</button>
   </div>
  </form>
  <p id="forgot-password" onclick="forgotPassword()">I forgot password</p>
  <p id="create-new-account" onclick="creatNewAccount()">Create new account</p>
</div>
    `;
}

function sentMessage() {
     const email = document.getElementById("email").value;
     document.getElementById("login-panel").innerHTML = `
 <h2>Password Recovery</h2>

 <div class="container center column">
  <form class="login-form center column" action="#" method="post">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Enter your email" required>
    <h3>Recovery email has just been sent to <br>${email}</h3>
   <div>
   </div>
  </form>
  <p id="back-to-login" onclick="backToLogin()">Back to login</p>
  <p id="create-new-account" onclick="creatNewAccount()">Create new account</p>
</div>
    `;
}

function creatNewAccount() {
    document.getElementById("login-panel").innerHTML = `
 <h2>Create new account</h2>

 <div class="container center column">
  <form class="login-form center column" action="#" method="post">

    <label for="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Enter your username" required>

    <label for="email">Email:</label>
    <input type="text" id="email" name="email" placeholder="Enter your Email" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Enter your password" required>
   <div>
    <button type="submit" id="login-submit" onclick="login()">Login</button>
    <button type="button" id="clear" onclick="clearFields()">Clear</button>
   </div>
  </form>
  <p id="back-to-login" onclick="backToLogin()">Back to login</p>
</div>
    `;
}

//lesson page

function runCode(c, s) {
    const userCode = document.getElementById(c).value;
    const iframe = document.getElementById(s);

    iframe.srcdoc = `
<html>
<head>
<style>
    body {
        background: rgb(44, 44, 44);
        color: white;
        font-family: monospace;
    }
</style>
</head>
<body>
    <pre id="output"></pre>

    <script>
        const out = document.getElementById("output");
        const log = (...msg) => out.innerText += msg.join(" ") + "\\n";
        console.log = log;

        try {
            ${userCode}
        } catch (err) {
            log("ERROR:", err);
        }
    <\/script>
</body>
</html>
`;
}

//This toggles the drop down for our menues, they are hidden by defualt so click on the name.
function toggleView(id) {
    const el = document.getElementById(id);
  
    el.style.display = 
        el.style.display === "none" ? "block" : "none";
}

//Practice page
const result1 = document.getElementById("q1-result");
const result2 = document.getElementById("q2-result");
const result3 = document.getElementById("q3-result");

let q1 = 0;
let q2 = 0;
let q3 = 0;
//This will keep track of the score above ie 0/3 Correct.
let totalCorrect = q1 + q2 + q3;

//This will update the score everytime an answer is wrong or right
function updateScore() {
  totalCorrect = q1 + q2 + q3;

  document.getElementById("total-score").innerHTML = `${totalCorrect}/3 Correct`;
}
//Below functions check if your selected answer is correct or not and prints the appropriate message as well as updates the score.
function checkAnswer1() {
    const selected = document.querySelector('input[name="q1"]:checked');
    

    if (!selected) {
        result1.textContent = "Please select an answer.";
        result1.style.color = "orange";
        return;
    }

    if (selected.value === "3") {
        result1.textContent = "Correct!";
      result1.style.color = "lightgreen";
      //Sets q1 to 1 to indicate its correct
      q1 = 1;
    } else {
        result1.textContent = "Try again";
      result1.style.color = "red";
      q1 = 0;
  }
  updateScore();
}

function checkAnswer2() {
    const selected = document.querySelector('input[name="q2"]:checked');
    

    if (!selected) {
        result2.textContent = "Please select an answer.";
        result2.style.color = "orange";
        return;
    }

    if (selected.value === "1") {
        result2.textContent = "Correct!";
      result2.style.color = "lightgreen";
      q2 = 1;
    } else {
        result2.textContent = "Try again";
      result2.style.color = "red";
      q2 = 0;
  }
  updateScore();
}

function checkAnswer3() {
    const selected = document.querySelector('input[name="q3"]:checked');
    

    if (!selected) {
        result3.textContent = "Please select an answer.";
        result3.style.color = "orange";
        return;
    }

    if (selected.value === "2") {
        result3.textContent = "Correct!";
      result3.style.color = "lightgreen";
      q3 = 1;
    } else {
        result3.textContent = "Try again";
      result3.style.color = "red";
      q3 = 0;
  }
  updateScore();
}

function contactClear(){
    document.getElementById("email-body").value = "";
    document.getElementById("email-address").value = "";
}

function contactSubmit() {
    

    document.getElementById("contact-form").innerHTML = `<h3>Thank you, we will get back too you shortly</h3>`;
//You will be booted to the home page.
    setTimeout(() => {
     window.location.href = "index.html";
}, 1500);
}