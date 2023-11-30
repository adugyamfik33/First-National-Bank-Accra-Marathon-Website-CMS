const base_url = 'http://localhost';
let current_user = JSON.parse(localStorage.getItem('fnbam-current-user'));
const s_admin_permissions = document.querySelectorAll('.s-admin');
const user_name = document.querySelector('#user-name'),
user_profile = document.querySelector('#user-profile'),
user_profile1 = document.querySelector('#user-profile1');
let login_status = localStorage.getItem('fnbam-login-status');
if(login_status != '1'){
    location.replace('./restricted-acces-page-login.html');
}
if(current_user.super_admin == '1'){
    s_admin_permissions.forEach(element => {
        element.classList.remove('s-admin');
    });
}


function getCurrentUser(){
    fetch('./endpoints/admin/getAdmin.php?id='+current_user.id,{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let fnbam_user = data.data;
            user_name.innerHTML = fnbam_user.fullname;
            user_profile.setAttribute('src',`${base_url}/${fnbam_user.profile}`);
            user_profile1.setAttribute('src',`${base_url}/${fnbam_user.profile}`);
        }
    })
    .catch(error=>{
        console.log(error);
    });
}
getCurrentUser();

function logout(){
    localStorage.removeItem('fnbam-current-user');
    localStorage.removeItem('fnbam-login-status');
    location.replace('./index.html');
}
