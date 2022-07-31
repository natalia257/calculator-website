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

//class definitions

class density {
    constructor(name, value) {
        this.value = value;
        this.name = name;
    }

    getFullName()
    {
        name = this.name;
        if(name.length != 0)
        {
            name += " ";
        }

        name = this.value.toString(); //TODO: removed string addition due to lack of space in select. Consider how to do it.
        name += " kg/dm&sup3"; //TODO: make it upper index to mark it as cubic rather than number next to unit.
        return name;
    }
}

class material {
    constructor(name, densities, icon) {
        this.name = name;
        this.densities = densities;
        this.icon = icon;
    }
}

class profileValue {
    constructor(name, unit, value) {
        this.name = name;
        this.unit = unit;
        this.value = value;
    }
    get fullName() {
        return this.name + "[" + unit + "]";
    }
}

class profile {
    constructor(name, values, material, icon) {
        this.name = name;
        this.values = values;
        this.material = material;
        this.selectedDensityIndex = 0;
        this.weight = 0;
        this.pricePerKg = 0;
        this.icon = icon;
    }

    getCost(){
        return this.weight * this.pricePerKg;
    }

    setMaterial(newMaterial)
    {
        this.material = newMaterial;
        this.selectedDensityIndex = 0;
    }

    selectedDensityIndex(newSelectedDensityIndex)
    {
        this.selectedDensityIndex = newSelectedDensityIndex;
    }
}

const profileValues = [
    new profileValue("średnica zew. - h", "mm", 0),
    new profileValue("długość - l", "mm", 0),
    new profileValue("grubość ściany - b", "mm", 0),
    new profileValue("wysokość - h", "mm", 0),
    new profileValue("średnica wew. - b", "mm", 0),
    new profileValue("szerokość - w", "mm", 0),
    new profileValue("grubość - h", "mm", 0),
]

const materials = [
    new material("brąz", [
        new density("", 8.5),
        new density("B2, B4, B8, B443", 8.895),
        new density("BA5", 8.197), //TODO: fill with missing densities
    ], "Images/material_1.jpg"),
    new material("mosiądz", [
        new density("", 8.5)
    ], "Images/material_2.jpg"), //TODO: fill with correct material icons
    new material("miedź", [
        new density("", 8.5)
    ], "Images/material_1.jpg"),
    new material("aluminium", [
        new density("", 2.7),
        new density("EN AW-3103", 2.749)//TODO: fill with missing densities
    ], "Images/material_2.jpg")
    //TODO: add more material
];

let profiles = [
    new profile("pręt okrągły", [
        profileValues[0],
        profileValues[1]
    ], materials[0], "Images/circle.png"),
    new profile("rura okrągła", [
        profileValues[0],
        profileValues[2],
        profileValues[1],
    ], materials[0],"Images/square-green.png"),
    new profile("rura okrągła", [
        profileValues[0],
        profileValues[2],
        profileValues[1],
    ], materials[0],"Images/circle.png" ),
    new profile("rura sześciokątna", [
        profileValue[3],
        profileValue[1]
    ], materials[0], "Images/square.png")
]

function fillProfiles()
{

}

function fillMaterials()
{
    materialsDiv = document.querySelector('#materials');

    materialsDiv.innerHTML = "";
    for (let i = 0; i < materials.length; i++) {
        let materialElement = "";
        materialElement += "<div class=\"shape\">" +
         "<img alt=\"material\" class=\"shape-circle\" src=" + materials[i].icon + "/>" +
         "<div class=\"shape-line\"></div>" +
         "<div class=\"shape-material\">" + materials[i].name + "</div>" +
         "<div class=\"shape-chosen\">";
        for (let j = 0; j < materials[i].densities.length; j++) {
            let density = materials[i].densities[j];
            let spanClosing = j == 0 ? "<span class=\"shape-arrow\"></span>" : "";
            materialElement += "<span class=\"shape-desc\">" + density.getFullName() + spanClosing + "</span>";
        }
        materialElement += "</div>";
        materialElement += "</div>";

        materialsDiv.innerHTML += materialElement;

        let materialCircles = materialsDiv.querySelectorAll('.shape-circle');
        let materialDensities = materialsDiv.querySelectorAll('.shape-chosen');

        materialCircles.forEach(function(item, idx){
            item.addEventListener('click', () => ChangeMaterial(item.parentElement, idx));
        });

        materialDensities.forEach(function(item, idx){
            item.addEventListener('click', () => ShowList(item.parentElement, idx));

            let densityOptions = item.querySelectorAll('.shape-desc');
            densityOptions.forEach(function(item, idx){
                item.addEventListener('click', () => selectDensity(idx));
            });
        });
    }
}

function selectMaterial(index)
{
    console.log("selected material " + materials[index]);
}

function selectDensity(index)
{
    currentlySelectedDensity = currentlySelectedMaterial.densities[index];
    console.log('selected density: ' + currentlySelectedDensity.getFullName());
}

let currentlySelectedMaterial = materials[0];
let currentlySelectedDensity = materials[0].densities[0];

function Start() {
    fillMaterials();
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
    currentlySelectedMaterial = materials[chosenMaterialId];
    if(currentlySelectedMaterial == undefined)
        return;

    console.log('selected material : ' + currentlySelectedMaterial.getFullName());
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

