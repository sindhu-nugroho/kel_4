const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        profileImage.src = reader.result;
    }

    reader.readAsDataURL(file);
});