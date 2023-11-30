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
    fetch("./endpoints/atheletes/getAtheletes.php", {
        method: 'GET' 
    }) 
    .then(result => result.json())
    .then((data) => {
        if(data.code == "200"){
            let list = data.data.reverse();
            let tablebody ="";
            let n = 1;
            list.forEach(element => {  
                let registration_date = formatDate(element.date_of_birth.slice(0,10));
                if(element.racers_id != "N/A"){
                    if(element.chip_number == "N/A"){
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal">${element.firstname} ${element.lastname}</td>
                        <td class="text-sm font-weight-normal">${element.gender}</td> 
                        <td class="text-sm font-weight-normal">${element.racers_id}</td>
                        <td class="text-sm font-weight-normal">${element.race_category.name}</td> 
                        <td class="text-sm font-weight-normal">${registration_date}</td> 
                        <td class="text-sm font-weight-normal ">
                        <button class="btn btn-primary" title="Bib Number Assigned" onclick="already()" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shirt-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.243 4.252l.757 -.252c0 .43 .09 .837 .252 1.206m1.395 1.472a3 3 0 0 0 4.353 -2.678l6 2v5h-3v3m0 4v1a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l2.26 -.753" />
                        <path d="M3 3l18 18" />
                        </svg></button>
                        <button class="btn btn-primary" title="Assign Chip Number" onclick="showChipForm(${element.id})" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-sim" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 3h8.5l4.5 4.5v12.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z" />
                        <path d="M9 11h3v6" />
                        <path d="M15 17v.01" />
                        <path d="M15 14v.01" />
                        <path d="M15 11v.01" />
                        <path d="M9 14v.01" />
                        <path d="M9 17v.01" />
                        </svg></button>
                            </td>          
                            </tr>`;
                    }
                    else{
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal">${element.firstname} ${element.lastname}</td>
                        <td class="text-sm font-weight-normal">${element.gender}</td> 
                        <td class="text-sm font-weight-normal">${element.racers_id}</td>
                        <td class="text-sm font-weight-normal">${element.race_category.name}</td> 
                        <td class="text-sm font-weight-normal">${registration_date}</td> 
                        <td class="text-sm font-weight-normal">
                        <button class="btn btn-primary" title="Bib Number Assigned" onclick="already()" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shirt-off" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.243 4.252l.757 -.252c0 .43 .09 .837 .252 1.206m1.395 1.472a3 3 0 0 0 4.353 -2.678l6 2v5h-3v3m0 4v1a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l2.26 -.753" />
                        <path d="M3 3l18 18" />
                        </svg></button>
                        </td>          
                        </tr>`;
                    }
                }
                    else if(element.chip_number == "N/A" && element.racers_id == "N/A"){
                        tablebody = tablebody + `
                        <tr>
                        <td class="text-sm font-weight-normal">${n++}</td> 
                        <td class="text-sm font-weight-normal">${element.firstname} ${element.lastname}</td>
                        <td class="text-sm font-weight-normal">${element.gender}</td> 
                        <td class="text-sm font-weight-normal">${element.racers_id}</td>
                        <td class="text-sm font-weight-normal">${element.race_category.name}</td> 
                        <td class="text-sm font-weight-normal">${registration_date}</td> 
                        <td class="text-sm font-weight-normal ">
                        <button class="btn btn-primary" title="Assign Bib Number" onclick="viewSponsor(${element.id})" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shirt-sport" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                        <path d="M10.5 11h2.5l-1.5 5" />
                      </svg></button>
                      <button class="btn btn-primary" title="Assign Chip Number" onclick="showChipForm(${element.id})" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-sim" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M6 3h8.5l4.5 4.5v12.5a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-16a1 1 0 0 1 1 -1z" />
                      <path d="M9 11h3v6" />
                      <path d="M15 17v.01" />
                      <path d="M15 14v.01" />
                      <path d="M15 11v.01" />
                      <path d="M9 14v.01" />
                      <path d="M9 17v.01" />
                    </svg></button>
                        </td>          
                        </tr>`;
                    }



                else{
                    tablebody = tablebody + `
                    <tr>
                    <td class="text-sm font-weight-normal">${n++}</td> 
                    <td class="text-sm font-weight-normal">${element.firstname} ${element.lastname}</td>
                    <td class="text-sm font-weight-normal">${element.gender}</td> 
                    <td class="text-sm font-weight-normal">${element.racers_id}</td>
                    <td class="text-sm font-weight-normal">${element.race_category.name}</td> 
                    <td class="text-sm font-weight-normal">${registration_date}</td> 
                    <td class="text-sm font-weight-normal">
                    <button class="btn btn-primary" title="Assign Bib Number" onclick="viewSponsor(${element.id})" ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shirt-sport" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" />
                    <path d="M10.5 11h2.5l-1.5 5" />
                  </svg></button>
                    </td>          
                    </tr>`;
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
function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }

  const updateModal = document.getElementById('update-modal'),
update_sponsor_form = document.getElementById('update-sponsor-form'),
update_sponsor_content = document.getElementById('update-sponsor-content'),
modal_title = document.querySelector('#chip-title'),
update_sponsor_button = document.getElementById('update-sponsor');


function viewSponsor(elem_id){
    fetch('./endpoints/atheletes/getAthelete.php?id='+elem_id,{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let sponsor = data.data;
            update_sponsor_form.setAttribute('assignment',0);
            update_sponsor_content.innerHTML = `
            
            <div >
            <div class="mb-3" style="display:none;">
            <label class="form-label" for="basic-default-fullname">Bib Number</label>
            <input type="text" class="form-control" name="id"  placeholder="" value="${sponsor.id}" />
            </div>
                  <div class="mb-3">
                      <label class="form-label" for="basic-default-fullname">Bib Number</label>
                      <input type="text" class="form-control" name="racers_id"  placeholder="" required/>
                  </div>
            </div>
            `;
            // update_sponsor_button.setAttribute('onclick',`updateSponsor(${sponsor.id})`);
            $('#update-modal').modal('show');
        }
    })
    .catch(error=>{
        console.log(error);
    });
}

update_sponsor_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let assignment = e.target.getAttribute('assignment'); 
    let formData = new FormData(update_sponsor_form);
    if(assignment == '0'){
        fetch('./endpoints/atheletes/updateAthelete.php',{
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
                    title: 'Failed!',
                    text: `${data.message}`,
                  });
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }
    else{
        fetch('./endpoints/atheletes/assignChip.php',{
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
                    title: 'Failed!',
                    text: `${data.message}`,
                  });
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }


});

function already(){
    Swal.fire(
        'Assigned Already!',
        'This athelete Has Already been Assigned a bib number!',
        'warning'
      )
}
function showChipForm(elem_id){
    modal_title.innerHTML = 'Assign Chip Number'
    fetch('./endpoints/atheletes/getAthelete.php?id='+elem_id,{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let sponsor = data.data;
            update_sponsor_form.setAttribute('assignment',1);
            update_sponsor_content.innerHTML = `
            
            <div >
            <div class="mb-3" style="display:none;">
            <label class="form-label" for="basic-default-fullname">Bib Number</label>
            <input type="text" class="form-control" name="id"  placeholder="" value="${sponsor.id}" />
            </div>
                  <div class="mb-3">
                    <label class="form-label" for="basic-default-fullname">Chip Serial Number</label>
                    <input type="text" class="form-control" name="chip_number" id="chip_number" placeholder="" required/>
                </div>
            </div>
            `;
            // update_sponsor_button.setAttribute('onclick',`updateSponsor(${sponsor.id})`);
            $('#update-modal').modal('show');
        }
    })
    .catch(error=>{
        console.log(error);
    });
}