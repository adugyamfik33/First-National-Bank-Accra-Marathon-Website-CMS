const addAdmin = document.querySelector('#add-admin');

addAdmin.addEventListener('submit', e =>{
    e.preventDefault();
        let formData = new FormData(addAdmin);
        fetch('./endpoints/admin/superAddAdmin.php',{
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
                $('#add-admin').trigger('reset');
               });
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: `${data.message}`,
                  })
               .then(()=>{
                $('#add-admin').trigger('reset');
               });
            }
        })
        .catch(error=>{
            console.log(error);
        });


});
