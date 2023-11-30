const updateMission = document.getElementById('updateHero');
const title = document.getElementById('title'), description = document.getElementById('description'),
paragraph = document.getElementById('paragraph'), image = document.getElementById('image-1');

function getHero(){
    fetch('./endpoints/about_hero/getAboutHero.php?id=1',{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data => {
        if(data.code == "200"){
            let hero = data.data;
            title.value = hero.title;
            description.focus();
            
            description.value = hero.description;
            paragraph.focus();
            paragraph.value = hero.paragraph;
            image.setAttribute('src',`${base_url}/${hero.file}`);
        }
    })
    .catch(error =>{
        console.log(error);
    });
}
getHero();

updateMission.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(updateMission);
    fetch('./endpoints/about_hero/updateAboutHero.php?id=1',{
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
            $('#updateHero').trigger('reset');
            getHero();
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
    .catch(error => {
        console.log(error);
    });
});