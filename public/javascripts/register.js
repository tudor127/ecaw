var registerPanel=document.getElementById('registerPanel');
var closeRegister=document.getElementById('registerClose');
var registerBtn=document.getElementById('signUp');
var registerSubmit=document.getElementById('registerSubmit');
var registerForm=document.getElementById('register_form');
var loginPanel=document.getElementById('loginPanel');

registerBtn.addEventListener("click", function(){
  registerPanel.style.display="block";
	loginPanel.style.display="none";
  document.getElementById("result").innerHTML="";
  document.getElementById("result").style.background="transparent";
});
closeRegister.addEventListener("click", function(){
	registerPanel.style.display="none";
});  
registerForm.addEventListener("submit", function(){
  register();
});  

function register() {
  let username=document.getElementById('register_username').value;
  let password=document.getElementById('register_password').value;
  let confirm_password=document.getElementById('register_password_confirm').value;
  let email=document.getElementById('register_email').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
    	if(parseInt(this.responseText)==1) {
        document.getElementById("register_result").innerHTML = "Succes!";
        document.getElementById("register_result").style.background = "green";
        setTimeout(function(){  registerPanel.style.display="none"; }, 1000);
        logoutBtn.style.display="block";
        signupBtn.style.display="none";
        loginBtn.style.display="none";
        document.getElementById("user_name").style.display = 'block';
        document.getElementById("user_name").childNodes[1].innerHTML = username;
        // logoutBtn.style.display="block";
        // signupBtn.style.display="none";
        // loginBtn.style.display="none";
	     // loginBtn.innerHTML='Log out';
    }
    else if(parseInt(this.responseText)==-1){
        document.getElementById("register_result").innerHTML = "Connection error!";
        document.getElementById("register_result").style.background = "#b0b00d";
    }
    else if(parseInt(this.responseText)==-2){
    	   document.getElementById("register_result").innerHTML = "Username already exists";
        document.getElementById("register_result").style.background = "red";
    }
      else if(parseInt(this.responseText)==-3){
         document.getElementById("register_result").innerHTML = "Passwords need to match";
        document.getElementById("register_result").style.background = "red";
    }
    }
  };
  xhttp.open("GET", "/register?username=" +username+"&password="+password+"&confirm_password="+confirm_password+"&email="+email, true);
  xhttp.send();
}

// function logout(){
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange=function() {
//     if (this.readyState == 4 && this.status == 200) {
//       logoutBtn.style.display ="none";
//       signupBtn.style.display="block";
//         loginBtn.style.display="block";
//     }
//   };
//   xhttp.open("GET", "/logout", true);
//   xhttp.send();
// }

// loginSubmit.addEventListener("click", function(){
// 	login();
// });

// logoutBtn.addEventListener("click", function(){
//   // console.log('logout clicked');
// 	logout();
// });