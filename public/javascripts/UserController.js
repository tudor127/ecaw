import {container_controller} from "./index.js";

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
            document.getElementById("user_name_icon").style.display = 'block';
            document.getElementById("user_name_icon").innerHTML = username.charAt(0).toUpperCase();
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
                document.getElementById("user_name_icon").style.display = 'none';
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
                    projectsPanelButton.style.display="block";
                    document.getElementById("user_name_icon").style.display = 'block';
                    document.getElementById("user_name_icon").innerHTML = username.charAt(0).toUpperCase();
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
        // let containerController = new ContainerController();
        let projectsPanel=document.getElementById('projectsPanelBox');
        projectsPanel.style.display="block";
        var xhttp = new XMLHttpRequest();
        let projectsBox=document.getElementById('projectsBox');
        xhttp.onreadystatechange=function() {
            if (this.readyState == 4 && this.status == 200) {
            // .project #{project.name}
            // projectsBox.innerHTML=this.responseText;

            let projectsJSON=JSON.parse(this.responseText);
            if(projectsJSON.length<1){
                projectsBox.innerHTML='<h1>You have no saved project!<h1>';
            }
            else{
                projectsBox.innerHTML='';
            }
            for(let i = 0; i < projectsJSON.length; i++) {
            let project = projectsJSON[i];
            // projectsBox.innerHTML+="<div class='project' id='project_"+project.project_name+"'>"+project.project_name+"</div>";
               let projectDiv=document.createElement('div');
               projectDiv.id='project_'+project.project_name;
               projectDiv.innerHTML='<h1>'+project.project_name+'</h1>';
               let editBtn=document.createElement('button');
               editBtn.classList.add('editBtn');
               editBtn.innerHTML='Edit';
               projectDiv.innerHTML+=`<div><a class="viewProjectLink" href='/user/`+project.username+`/project/`+project.project_name+`' target="_blank">
               <button>View</button></a></div>`;
               let url='http://localhost:3000/user/'+'test'+'/project/'+project.project_name;
               projectDiv.innerHTML+=`<div class="fb-share-button" style="margin-top:25px" data-href="`+url+`" data-layout="button" data-size="small"><a title="Share on facebook" class="shareLink" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=`+url+`;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>`;
               projectDiv.classList.add('project');
               editBtn.addEventListener("click", function(){console.log(project.project_name);container_controller.loadProject(JSON.stringify(project.content),project.project_name,container_controller);});
               projectDiv.appendChild(editBtn);
               projectsBox.appendChild(projectDiv);
            }
            }
        };
        xhttp.open("GET", "/projects", true);
        xhttp.send();    
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