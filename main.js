let modelValues = document.querySelectorAll('.model-label-value');

let values = new Array(7);
let modelProfile;
let modelMaterial;

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
    ], "./Images/material_1.jpg"),
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
    ], materials[0],"Images/square.png"),
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
    profilesDiv = document.querySelector('#profiles');

    profilesDiv.innerHTML = "";
    for(let i = 0; i < profiles.length; i++) {
        let profileElement = "";
        profileElement += "<div class=\"shape\">\n" +
            "<img alt=\"shape\" class=\"shape-img\" src=" + profiles[i].icon + "/>\n" +
            "<div class=\"shape-line\"></div>\n" +
            "<div class=\"shape-name\">" + profiles[i].name + "</div>\n" +
            "</div>";
        profilesDiv.innerHTML += profileElement;

        let originalImg = profilesDiv.lastChild.querySelector('.shape-img');
        originalImg.setAttribute('src', profiles[i].icon);
    }

    let profilesDivs = profilesDiv.querySelectorAll('.shape');

    profilesDivs.forEach(function (item) {
       item.addEventListener('click', () => ChangeProfile(item));
    });
}

function fillMaterials()
{
    materialsDiv = document.querySelector('#materials');

    materialsDiv.innerHTML = "";
    for (let i = 0; i < materials.length; i++) {
        let materialElement = "";
        materialElement += "<div class=\"shape\">" +
         "<div class=\"shape-clicked\">" +
            "<img alt=\"material\" class=\"shape-circle\" src=" + materials[i].icon + "/>" +
            "<div class=\"shape-line\"></div>" +
            "<div class=\"shape-material\">" + materials[i].name + "</div>" +
         "</div>";
        
        if(materials[i].densities.length > 1) {
            materialElement += "<div class=\"shape-box\">" + 
            "<div class=\"shape-container\">";
                for (let j = 0; j < materials[i].densities.length; j++) {
                    let density = materials[i].densities[j];
                    materialElement += "<div class=\"shape-option\">" + 
                        "<input class=\"shape-radio\" id=\"materialDensity" + j + "\" type=\"radio\" name=\"category\"/>" + 
                        "<label for=\"materialDensity" + j + "\">" + density.getFullName() + "</label>"
                        + "</div>";
                }
                materialElement += "</div>";
                materialElement += "<div class=\"shape-selected\">" +
                    materials[i].densities[0].getFullName() +
                "</div>";
            materialElement += "</div>";
        }
        else {
            materialElement += "<div class=\"shape-single-box\">" +
                materials[i].densities[0].getFullName() +
            "</div>";
        }
        materialElement += "</div>";

        materialsDiv.innerHTML += materialElement;
        
        const dropdown = materialsDiv.querySelectorAll('.shape-box');
        dropdown.forEach(function(item) {
            Dropdown(item);
        });

        let originalImg = materialsDiv.lastChild.querySelector('.shape-circle');
        originalImg.setAttribute('src', materials[i].icon);
    }

    let materialCircles = materialsDiv.querySelectorAll('.shape-clicked');

    materialCircles.forEach(function(item, idx){
        item.addEventListener('click', () => ChangeMaterial(item.parentElement, idx));
    });
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
    fillProfiles();
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
}

function Update() {
    for (let i = 0; i < values.length; i++) {
        values[i] = parseFloat(modelValues[i].value);
    }
}

function ChangeProfile(chosenShape){
    // unselect old
    if(modelProfile != null) {
        let originalImg = modelProfile.firstElementChild;
        let src = originalImg.getAttribute('src');
        let nameShape = src.substring(7, src.indexOf('-'));
        originalImg.setAttribute('src', 'Images/' + nameShape + '.png');
        modelProfile.classList.remove('green');
    }

    // select new
    chosenShape.classList.add('green');
    let newOriginalImg = chosenShape.firstElementChild;
    let newSrc = newOriginalImg.getAttribute('src');
    let newNameShape = newSrc.substring(7, newSrc.indexOf('.'));
    newOriginalImg.setAttribute('src', 'Images/' + newNameShape + '-green.png');

    modelProfile = chosenShape;
}

function ChangeMaterial(chosenMaterial, chosenMaterialId){
    // unselect old
    if(modelMaterial != null) {
        modelMaterial.classList.remove('show');
        modelMaterial.classList.remove('green');
    }

    // select new
    chosenMaterial.classList.add('green');
    modelMaterial = chosenMaterial;

    // select profile if only one
    if(chosenMaterial.querySelector('.shape-single-box')) {
        console.log('select chosen profile')
    } 

    currentlySelectedMaterial = materials[chosenMaterialId];
    if(currentlySelectedMaterial == undefined)
        return;
}

Start();
modelValues.forEach(function(item) {
    item.addEventListener('change', () => Update());
});

function Dropdown(elementDiv) {
    const selected = elementDiv.querySelector(".shape-selected");
    const optionsContainer = elementDiv.querySelector(".shape-container");

    const optionsList = optionsContainer.querySelectorAll(".shape-option");
    
    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("shape-active");
    });

    optionsList.forEach(itemOption => {
        itemOption.addEventListener("click", () => {
            selected.innerHTML = itemOption.querySelector("label").innerHTML;
            optionsContainer.classList.remove("shape-active")
        });
    });
}

