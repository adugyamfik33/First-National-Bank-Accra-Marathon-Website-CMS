// Initialize faqData as an empty array
let faqData = [];
let itemsPerPage = 5; // Set the number of FAQs per page
let currentPage = 1;
// Example data (you should fetch this data from your PHP API)
// const base_url = 'your_base_url_here';

function fetchFAQs() {
  fetch(`${base_url}/manager/endpoints/faq/getFaqs.php`, {
    method: 'POST',
  })
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(data => {
      // Process the fetched FAQ data
      faqData = data.data; // Assuming the data is an array of FAQ objects
      updateFAQ();
      updatePagination();
    })
    .catch(error => {
      console.error('Error fetching FAQs:', error);
    });
}

const updateModal = document.getElementById('update-modal');
const updateSponsorForm = document.getElementById('update-sponsor-form');
const updateSponsorContent = document.getElementById('update-sponsor-content');
const updateSponsorButton = document.getElementById('update-sponsor');

function updateFAQ() {
  const faq = document.getElementById('faq');
  faq.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < faqData.length; i++) {
    const faqItem = faqData[i];
    const faqItemElement = document.createElement('div');
    faqItemElement.innerHTML = `
      <h3>${faqItem.question}</h3>
      <p>${faqItem.answer}</p>
      <button class="btn-primary btn" onclick="openUpdateModal(${faqItem.id})">Update</button>
      <button class="btn-danger btn" onclick="deleteFaq(${faqItem.id})">Delete</button>
    `;
    faq.appendChild(faqItemElement);
  }
}

function updatePagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const pageCount = Math.ceil(faqData.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      updateFAQ();
      updatePagination();
    });

    // Add the .active class to the current page button
    if (i === currentPage) {
      button.classList.add('active');
    }

    pagination.appendChild(button);
  }
}


// Initial setup
fetchFAQs();
function openUpdateModal(elem_id) {
  fetch(`${base_url}/manager/endpoints/faq/getFaq.php?id=${elem_id}`, {
    method: 'GET',
  })
    .then(result => result.json())
    .then(data => {
      if (data.code == "200") {
        let faq = data.data;
        updateSponsorContent.innerHTML = `
          <div class="mb-3" style="display: none;">
            <label class="form-label" for="basic-default-fullname"></label>
            <input type="text" class="form-control" name="id" placeholder="" value="${faq.id}" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="basic-default-fullname">Question</label>
            <textarea class="form-control" name="question" style="height: 60px" placeholder="">${faq.question}</textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="basic-default-fullname">Answer</label>
            <textarea class="form-control" name="answer" style="height: 120px" placeholder="">${faq.answer}</textarea>
          </div>
        `;

        $('#update-modal').modal('show');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

updateSponsorForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(updateSponsorForm);
        fetch(`${base_url}/manager/endpoints/faq/updateFaq.php`,{
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
                fetchFAQs();
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

function deleteFaq(elem_id){
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
          fetch(`${base_url}/manager/endpoints/faq/deleteFaq.php?id=${elem_id}`, {
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
                  fetchFAQs();
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