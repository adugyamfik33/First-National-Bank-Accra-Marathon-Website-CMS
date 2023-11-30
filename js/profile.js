const profile_avatar = document.querySelector('#profile-avatar'),
fullname_1 = document.querySelector('#fullname-1'),
contact = document.querySelector('#contact-1'),
changePassword = document.querySelector('#passowordChange'),
error_message = document.querySelector('#err-message'),
updateAdminForm = document.querySelector('#update-admin'),
changePasswordForm = document.querySelector('#changePassword');
error_message.innerHTML = '';

function getprofile(){
    fetch('./endpoints/admin/getAdmin.php?id='+current_user.id,{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data => {
        if(data.code == "200"){
            let user = data.data;
            profile_avatar.setAttribute('src',`${base_url}/${user.profile}`);
            fullname_1.innerHTML = user.fullname;
            contact.innerHTML = user.email;
            document.querySelector('#update-fullname').value = user.fullname;
            document.querySelector('#update-email').value = user.email;
            document.querySelector('#update-username').value = user.username;
        }
    })
    .catch(error=>{
        console.log(error);
    }); 
}
getprofile();
function showChange(){
    changePassword.classList.remove('d-none');
}

changePasswordForm.addEventListener('submit',e=>{
    e.preventDefault();
    let formData = new FormData(changePasswordForm);
    formData.append('id',current_user.id);
    fetch('./endpoints/admin/updatePassword.php',{
        method: 'POST',
        body:formData
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            error_message.innerHTML = '';
            Swal.fire({
                icon: 'success',
                title: 'Sucessful',
                text: `${data.message}`,
              })
              .then(()=>{
                localStorage.setItem('fnbam-current-user',JSON.stringify(data.data));
                changePassword.classList.add('d-none');
                getprofile();
              });
        }
        else if(data.code == "404"){
            error_message.innerHTML = data.message;
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: `${data.message}`,
              })
        }
    })
});

updateAdminForm.addEventListener('submit',e=>{
    e.preventDefault();
    let update_form = new FormData(updateAdminForm);
    fetch('./endpoints/admin/updateAdmin.php?id='+current_user.id,{
        method:'POST',
        body: update_form
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            Swal.fire({
                icon: 'success',
                title: 'Sucessful',
                text: `${data.message}`,
              })
              .then(()=>{
                localStorage.setItem('fnbam-current-user',JSON.stringify(data.data));
                getprofile();
                location.reload();
              })

        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: `${data.message}`,
              })
        }
    })
    .catch(error => {
        console.log(error);
    });
});