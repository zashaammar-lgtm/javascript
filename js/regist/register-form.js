console.log('=== Register Form ===');
const nameInput = document.getElementById('nameInput');
const nameInfo = document.getElementById('nameInfo');
const previewName = document.getElementById('previewName');
console.log(nameInput);
nameInput.addEventListener('input', function () {
    const nameVal = nameInput.value;
    // console.log('User sedang mengetik nama:', nameVal);
    nameInfo.textContent = `Hi, ${nameVal}`;
    previewName.textContent = nameVal;
   });

const classSelect = document.getElementById('classSelect');
console.log(classSelect);
classSelect.addEventListener('change', function () {
    const classVal = classSelect.value;
    // console.log('User memilih kelas:', classVal);
    previewClass.textContent = `Kelas ${classVal}`;
});

const agreementCheckbox = document.getElementById('agreement');
const previewStatus = document.getElementById('previewStatus');
console.log(agreementCheckbox);
agreementCheckbox.addEventListener('change', function () {
    const agreementVal = agreementCheckbox.checked; // nilainya boolean
    previewStatus.textContent = agreementVal ? 'Sudah Siap' : 'Belum Siap';
    // if (agreementVal) {
    //     previewStatus.textContent = 'Sudah Siap';
    // } else {
    //     previewStatus.textContent = 'Belum Siap';
    // }
});