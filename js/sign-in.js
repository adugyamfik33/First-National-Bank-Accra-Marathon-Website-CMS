const form = document.querySelector('#sign-in'),
password = document.querySelector('#password'),
err_message = document.querySelector('#err-message');

form.addEventListener('submit',e =>{
    e.preventDefault();
    let formData = new FormData(form);
        fetch('./endpoints/admin/signIn.php',{
            method: 'POST',
            body: formData
        })
        .then(result => result.json())
        .then(data =>{
            if(data.code == "200"){
                err_message.innerHTML = '';
                Swal.fire({
                    icon: 'success',
                    title: 'Sucessful',
                    text: `${data.message}`,
                  })
                  .then(()=>{
                    localStorage.setItem('fnbam-current-user',JSON.stringify(data.data));
                    localStorage.setItem('fnbam-login-status','1');
                    location.href = "./dashboards-analytics.html"; 
                  })
            }
            else if(data.code == "404"){
                err_message.innerHTML = data.message;
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