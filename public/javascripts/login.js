var loginPanel=document.getElementById('loginPanel');
var closeLogin=document.getElementById('loginClose');
var loginBtn=document.getElementById('logIn');
var signupBtn=document.getElementById('signUp');
var logoutBtn=document.getElementById('logOut');
var loginSubmit=document.getElementById('loginSubmit');

loginBtn.addEventListener("click", function(){
	loginPanel.style.display="block";
  document.getElementById("result").innerHTML="";
  document.getElementById("result").style.background="transparent";
});
closeLogin.addEventListener("click", function(){
	loginPanel.style.display="none";
});  

function login() {
  let username=document.getElementById('username').value;
  let password=document.getElementById('password').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
    	if(parseInt(this.responseText)==1) {
        document.getElementById("result").innerHTML = "Succes!";
        document.getElementById("result").style.background = "green";
        // setTimeout(function(){  document.getElementById("result").style.display="none"; }, 1000);
        setTimeout(function(){  loginPanel.style.display="none"; }, 1000);
        logoutBtn.style.display="block";
        signupBtn.style.display="none";
        loginBtn.style.display="none";
	     // loginBtn.innerHTML='Log out';

    }
    else if(parseInt(this.responseText)==-1){
        document.getElementById("result").innerHTML = "Connection error!";
        document.getElementById("result").style.background = "#b0b00d";
    }
    else{
    	   document.getElementById("result").innerHTML = "Username or password is incorrect!";
        document.getElementById("result").style.background = "red";
    }
    }
  };
  xhttp.open("GET", "/login?username=" +username+"&password="+password, true);
  xhttp.send();
}

function logout(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      logoutBtn.style.display ="none";
      signupBtn.style.display="block";
        loginBtn.style.display="block";
    }
  };
  xhttp.open("GET", "/logout", true);
  xhttp.send();
}

loginSubmit.addEventListener("click", function(){
	login();
});

logoutBtn.addEventListener("click", function(){
  // console.log('logout clicked');
	logout();
});