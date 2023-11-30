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
    fetch("./endpoints/admin/getAdmins.php", {
        method: 'GET' 
    }) 
    .then(result => result.json())
    .then((data) => {
        if(data.code == "200"){
            let list = data.data;
            let tablebody ="";
            let n = 1;
            list.forEach(element => {  
                if(element.main != '1'){
                    if(element.id != current_user.id){
                      if(element.access_granted != '1' && element.super_admin != '1'){
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal"><img src="${base_url}/${element.profile}" style="height:40px;width:40px;object-fit:cover;border-radius:50%;" alt class="" /></td>
                        <td class="text-sm font-weight-normal">${element.fullname}</td>
                        <td class="text-sm font-weight-normal">${element.email}</td>
                        <td class="text-sm font-weight-normal">${element.username}</td> 
                        <td class="text-sm font-weight-normal" style="display:flex; width: 300px; gap:10px;">
                        <button onclick ="grantAccess(${element.id},1)" title="Grant Access" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-access" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                        <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                        <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                        </svg>
                        </button>
                        <button onclick ="grantpermission(${element.id},1)" class="btn btn-success" title="Make SuperAdmin">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" />
                        <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
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
    
                    }
                    else  if(element.access_granted != '1' && element.super_admin == '1'){
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal"><img src="${base_url}/${element.profile}" style="height:40px;width:40px;object-fit:cover;border-radius:50%;" alt class="" /></td>
                        <td class="text-sm font-weight-normal">${element.fullname}</td>
                        <td class="text-sm font-weight-normal">${element.email}</td>
                        <td class="text-sm font-weight-normal">${element.username}</td> 
                        <td class="text-sm font-weight-normal">
                        <button onclick ="grantAccess(${element.id},1)" title="Grant Access" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-access" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                        <path d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                        <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                        </svg>
                        </button>
                        <button onclick ="grantpermission(${element.id},0)" class="btn btn-danger" title="Remove SuperAdmin">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 16.5l2 -3l2 3m-2 -3v-1.5m2.627 -1.376l.373 -.124m-6 0l2.231 .744" />
                        <path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" />
                        <path d="M12 8a.5 .5 0 1 0 -.5 -.5" />
                        <path d="M3 3l18 18" />
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
    
                    }
                    else  if(element.access_granted == '1' && element.super_admin == '1'){
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal"><img src="${base_url}/${element.profile}" style="height:40px;width:40px;object-fit:cover;border-radius:50%;" alt class="" /></td>
                        <td class="text-sm font-weight-normal">${element.fullname}</td>
                        <td class="text-sm font-weight-normal">${element.email}</td>
                        <td class="text-sm font-weight-normal">${element.username}</td> 
                        <td class="text-sm font-weight-normal">
                        <button onclick ="grantAccess(${element.id},0)" class="btn btn-danger" title="Deny Access">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-access-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 8v-2c0 -.554 .225 -1.055 .588 -1.417" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2c.55 0 1.05 -.222 1.41 -.582" />
                        <path d="M15 11a1 1 0 0 1 1 1m-.29 3.704a1 1 0 0 1 -.71 .296h-6a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h2" />
                        <path d="M10 11v-1m1.182 -2.826a2 2 0 0 1 2.818 1.826v1" />
                        <path d="M3 3l18 18" />
                      </svg>
                        </button>
                        <button onclick ="grantpermission(${element.id},0)" class="btn btn-danger" title ="Remove SuperAdmin">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 16.5l2 -3l2 3m-2 -3v-1.5m2.627 -1.376l.373 -.124m-6 0l2.231 .744" />
                        <path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" />
                        <path d="M12 8a.5 .5 0 1 0 -.5 -.5" />
                        <path d="M3 3l18 18" />
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
    
                    }
                    else{
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal"><img src="${base_url}/${element.profile}" style="height:40px;width:40px;object-fit:cover;border-radius:50%;" alt class="" /></td>
                        <td class="text-sm font-weight-normal">${element.fullname}</td>
                        <td class="text-sm font-weight-normal">${element.email}</td>
                        <td class="text-sm font-weight-normal">${element.username}</td> 
                        <td class="text-sm font-weight-normal" style="display:flex;width: 300px;gap:10px;">
                        <button onclick ="grantAccess(${element.id},0)" class="btn btn-danger" title="Deny Access">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock-access-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M4 8v-2c0 -.554 .225 -1.055 .588 -1.417" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2c.55 0 1.05 -.222 1.41 -.582" />
                        <path d="M15 11a1 1 0 0 1 1 1m-.29 3.704a1 1 0 0 1 -.71 .296h-6a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h2" />
                        <path d="M10 11v-1m1.182 -2.826a2 2 0 0 1 2.818 1.826v1" />
                        <path d="M3 3l18 18" />
                      </svg>
                        </button>
                        <button onclick ="grantpermission(${element.id},1)" class="btn btn-success" title="Make SuperAdmin">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" />
                        <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
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
                    }
                    }
                }

                
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

function grantpermission(elem_id,status){
    fetch('./endpoints/admin/permissions.php?id='+elem_id+'&status='+status,{
        method: 'GET'
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
            getRegisteredAtheletes();
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `${data.message}`,
          })
        }
    })
    .catch(error =>{
        console.log(error);
    })
}
function view(elem_id){
    fetch('./endpoints/admin/getAdmin.php?id='+elem_id,{
      method:'GET'
    })
    .then(result => result.json())
    .then(data =>{
      if(data.code == "200"){
        let admin = data.data;
        reset_password_content.innerHTML = `
        <div >
        <div class="mb-3">
        <label class="form-label" style="display: block;" for="basic-default-company"> Profile Image</label>
        <img style="height: 250px;width: 300px;object-fit: contain;"  src="${base_url}/${admin.profile}" alt="">
      </div>
        <div class="mb-3" style="display:none;">
        <label class="form-label" for="basic-default-fullname">Bib Number</label>
        <input type="text" class="form-control" name="id"  placeholder="" value="${admin.id}" />
        </div>
        <div class="mb-3">
                  <label class="form-label" for="basic-default-fullname">Fullname</label>
                  <input type="text" class="form-control" name="" value="${admin.fullname}" disabled/>
        </div>
        <div class="mb-3">
        <label class="form-label" for="basic-default-fullname">Username</label>
        <input type="text" class="form-control" name="" value="${admin.username}" disabled/>
      </div>
      <div class="mb-3">
      <label class="form-label" for="basic-default-fullname">Email</label>
      <input type="text" class="form-control" name="" value="${admin.email}" disabled/>
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
  fetch('./endpoints/admin/resetPassword.php',{
    method:'POST',
    body: resetForm
  })
  .then(result => result.json())
  .then(data=>{
    if(data.code == "200"){
      Swal.fire({
        icon: 'success',
        title: 'Sucessful',
        text: `${data.message}`,
      })
      .then(()=>{
        $('#view-modal').modal('hide');
      });
    }
    else{
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