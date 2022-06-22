var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute('data-bs-itemId')
  var modalTitle = exampleModal.querySelector('.modal-title')

  modalTitle.innerHTML = 'Edit values of <br/>Item ID: ' + recipient
})
