const UpdateHero = document.getElementById('updateHero');
const slide1_image = document.getElementById('slide-image-1'),
slide2_image = document.getElementById('slide-image-2'), slide3_image = document.getElementById('slide-image-3'),
slide1_text_right = document.getElementById('slide1_text_right'),slide1_text_left = document.getElementById('slide1_text_left'),
slide2_text_right = document.getElementById('slide2_text_right'),slide2_text_left = document.getElementById('slide2_text_left'),
slide3_text_right = document.getElementById('slide3_text_right'),slide3_text_left = document.getElementById('slide3_text_left'),
background_color = document.getElementById('background-color');

function getHero(){
    fetch('./endpoints/home_hero/getHomeHero.php?id=1',{
        method: 'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let hero = data.data;
            background_color.value = hero.background_color;
            slide1_image.setAttribute('src',`${base_url}/${hero.slide1_image}`);
            slide2_image.setAttribute('src',`${base_url}/${hero.slide2_image}`);
            slide3_image.setAttribute('src',`${base_url}/${hero.slide3_image}`);
            slide1_text_left.value = hero.slide1_text_left;
            slide1_text_right.value = hero.slide1_text_right;
            slide2_text_left.value = hero.slide2_text_left;
            slide2_text_right.value = hero.slide2_text_right;
            slide3_text_left.value = hero.slide3_text_left;
            slide3_text_right.value = hero.slide3_text_right;
        }
    })
    .catch(error=>{
        console.log(error);
    })
}
getHero();

UpdateHero.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(UpdateHero);
    formData.append('id',1);

    fetch('./endpoints/home_hero/updateHomeHero.php',{
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
            location.reload();
            getHero();
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
});