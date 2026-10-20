// JavaScript for touchtone 4
var roleList = [
  { id: "foster", name: "Foster Care" },
  { id: "walking", name: "Walking Animals" },
  { id: "transport", name: "Transportation" }
];
// Twin cities voulenteer picker
function showRoles()
 {
  var container = document.getElementById("role-box");
  if (!container) return;
  // Now we load some choices
  var previous = localStorage.getItem("chosenRole");
  if (previous == null) previous = "";
  var markup = "<h3>Want to be a Volunteer??</h3>";
  for (var x = 0; x < roleList.length; x++) 
{
    var item = roleList[x];
    var extra = "";
    if (item.id == previous) extra = " (selected)";
    markup += "<button data-id='" + item.id + "'>" + item.name + extra + "</button> ";
  }
  markup += "<p id='result'></p>";
  container.innerHTML = markup;
  // Once loaded saved choices
  if (previous.length > 0) 
{
    var resultBox = document.getElementById("result");
    resultBox.textContent = "This is your choice: " + previous;
  }
  // this is a handle
  var allButtons = container.querySelectorAll("button");
  for (var y = 0; y < allButtons.length; y++) 
{
    allButtons[y].onclick = function() 
{
      var picked = this.getAttribute("data-id");
      localStorage.setItem("chosenRole", picked); // remember me
      document.getElementById("result").textContent = "This is your choice: " + picked;
    };
  }
}
// Form checks
function checkForm() 
{
  var signupForm = document.querySelector("form");
  if (!signupForm) return;
  signupForm.onsubmit = function(event) 
{
    var isOk = true;
    // Simple remove the errors
    var errorSpans = document.getElementsByClassName("error");
    while (errorSpans.length > 0) 
{
      errorSpans[0].remove();
    }
    // email part
    var emailField = signupForm.querySelector("#email");
    var emailText = emailField.value;
    if (emailText.length < 1 || emailText.indexOf("@") == -1) 
{
      addError(emailField, "Enter a valid email.");
      isOk = false;
    }
    // A simple check
    var msgField = signupForm.querySelector("textarea[name='message']");
    if (msgField && msgField.value.length < 5) 
{
      addError(msgField, "Message must be at least 5 characters.");
      isOk = false;
    }
    if (isOk == false) 
{
      event.preventDefault();
      return false;
    }
  };
}
function addError(input, message) {
  var note = document.createElement("span");
  note.className = "error";
  note.style.color = "red";
  note.style.display = "block";
  note.textContent = message;
  input.insertAdjacentElement("afterend", note);
}
// this should run it on load
document.addEventListener("DOMContentLoaded", function() 
{
  showRoles();
  checkForm();
});