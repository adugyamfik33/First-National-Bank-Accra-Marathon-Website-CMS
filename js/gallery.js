// Initialize imageData as an empty array
let imageData = [];
// Example data (you should fetch this data from your PHP API)
// const base_url = 'your_base_url_here';
const itemsPerPage = 9;
let currentPage = 1;

function fetchImages() {
  fetch(`${base_url}/manager/endpoints/gallery/getGallerys.php`, {
    method: 'POST',
  })
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(data => {
      // Process the fetched data
      imageData = data.data; // Assuming the data is an array of image objects
      updateGallery();
      updatePagination();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

function updateGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < imageData.length; i++) {
    const image = imageData[i];
    const imageElement = document.createElement('div');
    imageElement.innerHTML = `
      <img src="${base_url}/${image.file}" alt="${image.caption}">
      <p>${image.caption}</p>
      <button class="delete-button btn-danger" onclick="deleteImage(${image.id})">Delete</button>
    `;
    gallery.appendChild(imageElement);
  }
}

function updatePagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const pageCount = Math.ceil(imageData.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      updateGallery();
      updatePagination();
    });

    // Check if the button should have the .active class
    if (i === currentPage) {
      button.classList.add('active');
    }

    pagination.appendChild(button);
  }
}

// Initial setup
fetchImages();

function deleteImage(elem_id) {
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
      fetch(`${base_url}/manager/endpoints/gallery/deleteGallery.php?id=${elem_id}`, {
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
              fetchImages();
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
