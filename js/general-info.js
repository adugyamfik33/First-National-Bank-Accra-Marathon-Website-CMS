const form_phone = document.getElementById('phone'),
form_email = document.getElementById('email'),
form_location = document.getElementById('location'),
youtube = document.getElementById('youtube'),
twitter = document.getElementById('twitter'),
instagram = document.getElementById('instagram'),
facebook = document.getElementById('facebook');
const updateForm = document.getElementById('updateInfo');

function getInfo(){
    fetch('endpoints/info/getInfo.php?id=1',{
        method:'GET'
    })
    .then(result => result.json())
    .then(data =>{
        if(data.code == "200"){
            let info = data.data;
            form_email.value = info.email;
            form_location.value = info.location;
            form_phone.value = info.phone;
            youtube.value = info.youtube_url;
            facebook.value = info.facebook_url;
            twitter.value = info.twitter_url;
            instagram.value = info.instagram_url;
        }
    })
    .catch(error =>{
        console.log(error);
    });
}
getInfo();

updateForm.addEventListener('submit',e=>{
    e.preventDefault();
    let formData = new FormData(updateForm);
    fetch('./endpoints/info/updateInfo.php?id=1',{
        method:'POST',
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
            getInfo();
           });
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: `${data.message}`,
              })
        }
    })
    .catch(error =>{
        console.log(error);
    })
});