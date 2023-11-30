const addAtheleteForm = document.querySelector('#add-athelete');

addAtheleteForm.addEventListener('submit',e =>{
    e.preventDefault();
    let formData = new FormData(addAtheleteForm);

    fetch('./endpoints/atheletes/addAthelete.php',{
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
                  $('#add-athelete').trigger('reset');
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
    .catch(error=>{
        console.log(error);
    });
});