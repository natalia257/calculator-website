
let modelValues = document.querySelectorAll('.model-label-value');
let modelShapes = document.querySelector('.shapes').querySelectorAll('.shape');
let modelMaterialImgs = document.querySelectorAll('.shapes')[1].querySelectorAll('.shape-circle');
let materialArrows = document.querySelectorAll('.shapes')[1].querySelectorAll('.shape-chosen');

let values = new Array(7);
let modelShape = modelShapes[0];
let modelMaterial = modelMaterialImgs[0];

let height = 13; 
let width = 27;
let length = 3000;
let thickness = 18;
let weight = 0.762;
let pricePerKg = 48;
let price = 22.86;

function Start() {
    values = [
        height = 13,
        width = 27,
        length = 3000,
        thickness = 18,
        weight = 0.762,
        pricePerKg = 48,
        price = 22.86
    ];
    for (let i = 0; i < values.length; i++) {
        modelValues[i].value = values[i];
    }
    modelShape = modelShapes[1];
    ChangeShape(modelShape);
    modelMaterial = modelMaterialImgs[1];
    ChangeMaterial(modelMaterial.parentElement);
}

function Update() {
    for (let i = 0; i < values.length; i++) {
        values[i] = parseFloat(modelValues[i].value);
    }
    console.log(values);
}

function ChangeShape(chosenShape){
    // unselect old
    let originalImg = modelShape.firstElementChild;
    let src = originalImg.getAttribute('src');
    let nameShape = src.substring(7, src.indexOf('-'));
    originalImg.setAttribute('src', 'Images/' + nameShape + '.png');
    modelShape.classList.remove('green');

    // select new
    chosenShape.classList.add('green');
    let newOriginalImg = chosenShape.firstElementChild;
    let newSrc = newOriginalImg.getAttribute('src');
    let newNameShape = newSrc.substring(7, newSrc.indexOf('.'));
    newOriginalImg.setAttribute('src', 'Images/' + newNameShape + '-green.png');

    modelShape = chosenShape;
}

function ChangeMaterial(chosenMaterial, chosenMaterialId){
    // unselect old
    modelMaterial.classList.remove('show');
    modelMaterial.classList.remove('green');

    // select new
    chosenMaterial.classList.add('green');
    modelMaterial = chosenMaterial;
}

function ShowList(chosenMaterial) {
    chosenMaterial.classList.add('show');
}

Start();
modelValues.forEach(function(item) {
    item.addEventListener('change', () => Update());
});
modelShapes.forEach(function(item) {
    item.addEventListener('click', () => ChangeShape(item));
});
modelMaterialImgs.forEach(function(item, idx) {
    item.addEventListener('click', () => ChangeMaterial(item.parentElement, idx));
});
materialArrows.forEach(function (item) {
    item.addEventListener('click', () => ShowList(item.parentElement));
});

