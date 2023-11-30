function initClientTable() {
    let ttable = $('#atheletes').DataTable({
        pageLength: 10,
        lengthMenu: [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
        autoWidth: false,
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>>" +
                "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
    });
    return ttable;
    }
    let registeredAtheletes = initClientTable();
    function getRegisteredAtheletes(){         

    var tableid = document.getElementById("tableid");
    fetch("./endpoints/race_category/getRaceCategories.php", {
        method: 'GET' 
    }) 
    .then(result => result.json())
    .then((data) => {
        if(data.code == "200"){
            let list = data.data;
            let tablebody ="";
            let n = 1;
            list.forEach(element => {  
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal">${element.name}</td>
                        <td class="text-sm font-weight-normal">${element.price}</td>
                        <td class="text-sm font-weight-normal" style="display:flex; width: 300px; gap:10px;">
                        <button onclick ="deleteCategory(${element.id})" class="btn btn-danger" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                        </button>
                        <button onclick ="view(${element.id})" class="btn btn-warning" title="view">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                      </svg>
                        </button>
                        </td>
                        
                        </tr>`;

                
                });
                
                registeredAtheletes.clear();
                registeredAtheletes.destroy();
                tableid.innerHTML = tablebody;
                registeredAtheletes = initClientTable();
                
                } 
                else{
                registeredAtheletes.clear();
                registeredAtheletes.destroy();
                registeredAtheletes = initClientTable();                     
                }
    })
    .catch((error) => {
        console.log(error);
    });
}
getRegisteredAtheletes();

const reset_password_form = document.querySelector('#admin-update-form'),
reset_password_content = document.querySelector('#admin-update');
function grantAccess(elem_id,state){
    fetch('./endpoints/admin/grantAccess.php?id='+elem_id+"&status="+state,{
        method:'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: `${data.message}`,
              })
           .then(()=>{
            getRegisteredAtheletes();
           });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Sorry',
                text: `${data.message}`,
              });
        }
    })
    .catch(error =>{
        console.log(error);
    });
}

function deleteCategory(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            fetch('./endpoints/race_category/deleteRaceCategory.php?id='+id,{
                method:'GET'
            })
            .then(result => result.json())
            .then(data=>{
                if(data.code == "200"){
                    Swal.fire(
                        'Deleted!',
                        `${data.message}`,
                        'success'
                      )
                      .then(()=>{
                        getRegisteredAtheletes();
                      })
                }
                else{
                    Swal.fire(
                        'Failed!',
                        `${data.message}`,
                        'error'
                      )
                }
            })

        }
      })
}
function view(elem_id){
    fetch('./endpoints/Race_Category/getRaceCategory.php?id='+elem_id,{
      method:'GET'
    })
    .then(result => result.json())
    .then(data =>{
      if(data.code == "200"){
        let category = data.data;
        reset_password_content.innerHTML = `
        <div >
        <div class="mb-3" style="display:none;>
        <label class="form-label" for="basic-default-fullname">Name</label>
        <input type="text" class="form-control" name="id"  placeholder="" value="${category.id}" />
    </div>
        <div class="mb-3" >
            <label class="form-label" for="basic-default-fullname">Name</label>
            <input type="text" class="form-control" name="name"  placeholder="" value="${category.name}" />
        </div>
        <div class="mb-3">
            <label class="form-label" for="basic-default-fullname">Price</label>
            <input type="number" min="0.00" step="0.00" class="form-control" name="price" value="${category.price}" placeholder="GH₵1,000,000.00" >
        </div>
        </div>
        `;
        $('#view-modal').modal('show');
      }
    })
    .catch(error=>{
      console.log(error);
    });
}

reset_password_form.addEventListener('submit',e=>{
  e.preventDefault();
  let resetForm = new FormData(reset_password_form);
  fetch('./endpoints/Race_Category/updateRaceCategory.php',{
    method:'POST',
    body: resetForm
  })
  .then(result => result.json())
  .then(data=>{
    if(data.code == "200"){
        $('#view-modal').modal('hide');
      Swal.fire({
        icon: 'success',
        title: 'Sucessful',
        text: `${data.message}`,
      })
      .then(()=>{
        getRegisteredAtheletes();
      });
    }
    else{
        $('#view-modal').modal('hide');
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: `${data.message}`,
      });
    }
  })
  .catch(error=>{
    console.log(error);
  });
});