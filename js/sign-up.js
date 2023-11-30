const form = document.querySelector('#sign-up'),
password = document.querySelector('#password'),
err_message = document.querySelector('#err-message'),
confirm_password = document.querySelector('#confirm-password');

form.addEventListener('submit',e =>{
    e.preventDefault();
    let formData = new FormData(form);

    if(password.value == confirm_password.value){
        err_message.innerHTML = '';
        fetch('./endpoints/admin/addAdmin.php',{
            method: 'POST',
            body: formData
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
                    $('#sign-up').trigger('reset');
                    location.href = "./index.html";
                  });
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: `${data.message}`,
                  })
            }
        })
    }
    else{
        err_message.innerHTML = 'Make Sure Passwords Match';
    }

});