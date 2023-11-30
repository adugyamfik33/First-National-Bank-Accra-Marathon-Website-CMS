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
    fetch("./endpoints/sponsors/getSponsors.php", {
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
                    <td class="text-sm font-weight-normal"><img src="${base_url}/${element.file}" style="height:50px;width:50px;object-fit:contain;" alt class="" /></td>
                    <td class="text-sm font-weight-normal">${element.tag}</td>
                    <td class="text-sm font-weight-normal">
                    <a href ="${element.href}" class="btn btn-primary" title="Visit Website" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world-www" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
                            <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
                            <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
                            <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
                            <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
                            <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
                            <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
                            <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
                            <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
                        </svg>
                    </a>
                    <button class="btn btn-primary" onclick="viewSponsor(${element.id})" >Update</button>
                    <button class="btn btn-danger" title="Delete" onclick="deleteSponsor(${element.id})" >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
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

const updateModal = document.getElementById('update-modal'),
update_sponsor_form = document.getElementById('update-sponsor-content'),
update_sponsor_button = document.getElementById('update-sponsor');

function viewSponsor(elem_id){
    fetch('./endpoints/sponsors/getSponsor.php?id='+elem_id,{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let sponsor = data.data;
            update_sponsor_form.innerHTML = `
            
            <div >
                <div class="mb-3">
                    <label class="form-label" style="display: block;" for="basic-default-company"> Sponsor logo</label>
                    <img style="height: 250px;width: 300px;object-fit: contain;"  src="${base_url}/${sponsor.file}" alt="">
                  </div>
            </div>
            <div >
                <div class="mb-3">
                    <label class="form-label" for="basic-default-company">Change Sponsor Logo</label>
                    <input type="file" class="form-control" name="file" id="" accept="image/*" placeholder="" />
                  </div>
                  <div class="mb-3">
                      <label class="form-label" for="basic-default-fullname">Sponsor Name</label>
                      <input type="text" class="form-control" name="tag" value="${sponsor.tag}" placeholder="" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="basic-default-fullname">Sponsor Website url</label>
                    <input type="text" class="form-control" name="href" value="${sponsor.href}" placeholder="" />
                </div>
            </div>
            `;
            update_sponsor_button.setAttribute('onclick',`updateSponsor(${sponsor.id})`);
            $('#update-modal').modal('show');
        }
    })
    .catch(error=>{
        console.log(error);
    });
}
function updateSponsor(elem_id){
    let formData = new FormData(update_sponsor_form);
    fetch('./endpoints/sponsors/updateSponsor.php?id='+elem_id,{
        method: 'POST',
        body: formData
    })
    .then(result => result.json())
    .then(data => {
        if(data.code == "200"){
            $('#update-modal').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Successful',
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
              });
        }
    })
    .catch(error =>{
        console.log(error);
    })
}

function deleteSponsor(elem_id){
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
          fetch(`${base_url}/manager/endpoints/sponsors/deleteSponsor.php?id=${elem_id}`, {
            method: 'POST'
          })
            .then(result => result.json())
            .then((data) => {
              if (data.code == "200") {
                Swal.fire(
                  'Deleted!',
                  `${data.message}`,
                  'success'
                )
                .then(() => {
                  getRegisteredAtheletes();
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Failed',
                  text: `${data.message}`,
                })
              }
            })
        }
      })
}