export class UserController {
    constructor() {
    }

    login() {
        let loginPanel=document.getElementById('loginPanel');
        let signupBtn=document.getElementById('signUp');
        let logoutBtn=document.getElementById('logOut');
        let loginBtn=document.getElementById('logIn');
        let loginSubmit=document.getElementById('loginSubmit');
        let projectsPanelButton=document.getElementById('projectsPanelButton');
        let username=document.getElementById('username').value;
        let password=document.getElementById('password').value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            if(parseInt(this.responseText)==1) {
                document.getElementById("result").innerHTML = "Succes";
                document.getElementById("result").style.background = "#009f5496";
            setTimeout(function(){  loginPanel.style.display="none"; }, 1000);
            logoutBtn.style.display="block";
            projectsPanelButton.style.display="block";
            signupBtn.style.display="none";
            loginBtn.style.display="none";
            document.getElementById("user_name").style.display = 'block';
            document.getElementById("user_name").childNodes[1].innerHTML = username;
            // loginBtn.innerHTML='Log out';

            } 
            else if(parseInt(this.responseText)==-1) {
                document.getElementById("result").innerHTML = "Connection error";
                document.getElementById("result").style.background = "#b0b00d";
            }
            else if(parseInt(this.responseText)==-2){
              document.getElementById("result").innerHTML = "Username is incorrect";
              document.getElementById("result").style.background = "#e5000096";
            }
            else if(parseInt(this.responseText)==-3){
              document.getElementById("result").innerHTML = "Password is incorrect";
              document.getElementById("result").style.background = "#e5000096";
            }
        }
        };
        xhttp.open("POST", "/login", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("username=" +username+"&password="+password);
    }

    logout(){
        let signupBtn=document.getElementById('signUp');
        let logoutBtn=document.getElementById('logOut');
        let loginBtn=document.getElementById('logIn');
        let projectsPanelButton=document.getElementById('projectsPanelButton');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                logoutBtn.style.display ="none";
                signupBtn.style.display="block";
                loginBtn.style.display="block";
                projectsPanelButton.style.display="none";
                document.getElementById("user_name").style.display = 'none';
            }
        };
        xhttp.open("GET", "/logout", true);
        xhttp.send();
    }

    register() {
        let registerPanel=document.getElementById('registerPanel');
        let closeRegister=document.getElementById('registerClose');
        let registerBtn=document.getElementById('signUp');
        let loginBtn=document.getElementById('logIn');
        let registerSubmit=document.getElementById('registerSubmit');
        let registerForm=document.getElementById('register_form');
        let loginPanel=document.getElementById('loginPanel');
        let logoutBtn=document.getElementById('logOut');
        let username=document.getElementById('register_username').value;
        let password=document.getElementById('register_password').value;
        let confirm_password=document.getElementById('register_password_confirm').value;
        let email=document.getElementById('register_email').value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
                if(parseInt(this.responseText)==1) {
                    document.getElementById("register_result").innerHTML = "Succes!";
                    document.getElementById("register_result").style.background = "#009f5496";
                    setTimeout(function(){  registerPanel.style.display="none"; }, 1000);
                    logoutBtn.style.display="block";
                    registerBtn.style.display="none";
                    loginBtn.style.display="none";
                    document.getElementById("user_name").style.display = 'block';
                    document.getElementById("user_name").childNodes[1].innerHTML = username;
                }
            else if(parseInt(this.responseText)==-1){
                document.getElementById("register_result").innerHTML = "Connection error";
                document.getElementById("register_result").style.background = "#b0b00d";
            }
            else if(parseInt(this.responseText)==-2){
                document.getElementById("register_result").innerHTML = "Username already exists";
                document.getElementById("register_result").style.background = "#e5000096";
            }
            else if(parseInt(this.responseText)==-3){
                document.getElementById("register_result").innerHTML = "Passwords need to match";
                document.getElementById("register_result").style.background = "#e5000096";
            }
          }
        };
        xhttp.open("POST", "/register", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("username=" +username+"&password="+password+"&confirm_password="+confirm_password+"&email="+email);
    }

    showLoginForm(){
        let loginPanel=document.getElementById('loginPanel');
        let registerPanel=document.getElementById('registerPanel');
        loginPanel.style.display="block";
        registerPanel.style.display="none";
        document.getElementById("result").innerHTML="";
        document.getElementById("result").style.background="transparent";
    }

    showRegisterForm(){
       let registerPanel=document.getElementById('registerPanel');
       let loginPanel=document.getElementById('loginPanel');
       registerPanel.style.display="block";
       loginPanel.style.display="none";
       document.getElementById("register_result").innerHTML="";
       document.getElementById("register_result").style.background="transparent";
    }

    showProjectsPanel(){
    let projectsPanel=document.getElementById('projectsPanelBox');
       projectsPanel.style.display="block";
    }

    hideLoginForm(){
        let loginPanel=document.getElementById('loginPanel');
        loginPanel.style.display="none";
    }

    hideRegisterForm(){
        let registerPanel=document.getElementById('registerPanel');
        registerPanel.style.display="none";
    }

    hideProjectsPanel(){
    let projectsPanel=document.getElementById('projectsPanelBox');
       projectsPanel.style.display="none";
    }
}