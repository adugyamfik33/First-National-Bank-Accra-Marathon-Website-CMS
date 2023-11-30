const race_date = document.querySelector('#race-date');
const update_race_date = document.querySelector('#add-admin');

function getRaceDetails(){
    fetch('./endpoints/race_date/upcomingRace.php',{
        method:'POST'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let race = data.data;
            const currentDate = new Date().toISOString().split('T')[0];
            update_race_date.innerHTML = `
            <h5 class="mb-0 pt-2 pb-4">Registered Atheletes: ${race.atheletes.length}</h5>
            <!--<h5 class="mb-0 pt-1 pb-4">Date: ${race.date.slice(0,11)}</h5>-->
            <div class="row">
                <div class="col-md-12">
                <div class="mb-3" style="display:none;"> 
                <input type="number" min="1" class="form-control" id="race-date"  value="${race.id}" name="id" id="slide1_text_left" placeholder="" required/>
            </div>
                      <div class="mb-3">
                        <label class="form-label" for="basic-default-fullname">Race Date</label>
                        <input type="date" class="form-control" id="race-date" min ="${currentDate}" value="${convertDateFormat(race.date)}" name="date" id="slide1_text_left" placeholder="" required/>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Update Race Date</button>
            `;
        }
        else{
            update_race_date.innerHTML = ` <h5 class="mb-0 pt-2 pb-4">No upcoming race...</h5>`;
        }
    })
}
getRaceDetails();
function convertDateFormat(inputDate) {
    const months = {
        "Jan": '01', "Feb": '02', "Mar": '03', "Apr": '04', "May": '05', "Jun": '06',
        "Jul": '07', "Aug": '08', "Sep": '09', "Oct": '10', "Nov": '11', "Dec": '12'
    };

    let month = months[inputDate.slice(0,3)];
    let day = inputDate.slice(4,6)
    let year = inputDate.slice(7,11);
      return `${year}-${month}-${day}`;
  }

  update_race_date.addEventListener('submit',(e)=>{
      e.preventDefault();
      let formData = new FormData(update_race_date);
      fetch('./endpoints/race_date/updateRaceDate.php',{
          method: 'POST',
          body: formData
      })
      .then(result => result.json())
      .then(data =>{
          if(data.code == "200"){
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: `${data.message}`,
              })
           .then(()=>{
            getRaceDetails();
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


  });