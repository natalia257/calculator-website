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

        //name += this.value.toString(); //TODO: removed string addition due to lack of space in select. Consider how to do it.
        name += " kg/dm&sup3"; //TODO: make it upper index to mark it as cubic rather than number next to unit.
        return name;
    }
}

class material {
    constructor(name, densities, icon) {
        this.name = name;
        this.densities = densities;
        this.icon = icon;
        this.selectedDensityIndex = 0;
    }
}

class profileValue {
    constructor(name, letter, letterColour, unit, value) {
        this.name = name;
        this.unit = unit;
        this.value = value;
        this.letter = letter;
        this.letterColor = letterColour;
    }

    getFullName()
    {
        return this.name + " - " + "<span style=\"color:" + this.letterColor + "\">" + this.letter + "</span>" + " [" + this.unit + "]";
    }
}

class profile {
    constructor(name, values, material, icon, image) {
        this.name = name;
        this.values = values;
        this.material = material;
        this.weight = 0;
        this.pricePerKg = 0;
        this.icon = icon;
        this.image = image;
    }

    getCost(){
        return this.weight * this.pricePerKg;
    }

    setMaterial(newMaterial)
    {
        this.material = newMaterial;
    }
}

const profileValues = [
    new profileValue("Średnica zew.", "h", "#00FF00","mm", 0),
    new profileValue("Długość", "l", "#FF0000", "mm", 0),
    new profileValue("Grubość ściany", "b", "#0000FF", "mm", 0),
    new profileValue("Wysokość", "h", "#00FF00", "mm", 0),
    new profileValue("Średnica wew.", "b", "#0000FF", "mm", 0),
    new profileValue("Szerokość", "w", "#0000FF", "mm", 0),
    new profileValue("Grubość", "h", "#00FF00", "mm", 0),
]

const materials = [
    new material("brąz", [
        new density("8,5", 8.5),
        new density("B2, B4, B8, B443 - 8,895", 8.895),
        new density("BA5 - 8,197", 8.197),
        new density("BA8 - 7,8", 7.8),
        new density("BA83 - 7,695", 7.695),
        new density("Bk1, Bk31 - 8,497", 8.497),
        new density("BB1,7 - 8,4", 8.4),
        new density("BB2 - 8,295", 8.295),
        new density("BB21, BC2 - 8,895", 8.895)
    ], "./Images/material_1.jpg"),
    new material("mosiądz", [
        new density("8,5", 8.5)
    ], "Images/material_2.jpg"),
    new material("miedź", [
        new density("8,9", 8.9)
    ], "Images/material_2.jpg"),
    new material("aluminium", [
        new density("2,7", 2.7),
        new density("EN AW-3103 2,749", 2.749),
        new density("EN AW-5251 2,678", 2.678),
        new density("EN AW-6101A 2,689", 2.689),
        new density("EN AW-6082 2,7", 2.7),
        new density("EN AW-5019 2,638", 2.638),
        new density("EN AW-6061 2,713", 2.713),
        new density("EN AW-2017A 2,799", 2.799),
        new density("EN AW-2024 2,767", 2.767),
        new density("EN AW-2014 2,799", 2.799),
        new density("EN AW-5754 2,659", 2.659),
        new density("EN AW-5005A 2,689", 2.689),
        new density("2,8", 2.8),
        new density("2,9", 2.9),
    ], "Images/material_2.jpg"),
    new material("stal", [
        new density("7,85", 7.85),
        new density("7,5", 7.5),
        new density("7,7", 7.7),
        new density("7,8", 7.8),
        new density("7,9", 7.9),
        new density("8,0", 8.0),
        new density("8,1", 8.1),
    ], "Images/material_2.jpg"),
    new material("stopy Cu-Ni", [
        new density("8,9", 8.9)
    ], "Images/material_2.jpg"),
    new material("CuA18/BA8", [
        new density("7,8", 7.8)
    ], "Images/material_2.jpg"),
    new material("ołów", [
        new density("11,68", 11.68)
    ], "Images/material_2.jpg"),
    new material("stopy ołowiu", [
        new density("9,9", 9.9)
    ], "Images/material_2.jpg"),
    new material("cynk", [
        new density("7,2", 7.2)
    ], "Images/material_2.jpg"),
    new material("stopy cynku", [
        new density("6,7", 6.7)
    ], "Images/material_2.jpg"),
    new material("złoto", [
        new density("19,3", 19.3)
    ], "Images/material_2.jpg"), //TODO: fill with correct material icons
];

let profiles = [
    new profile("pręt okrągły", [
        profileValues[0],
        profileValues[1]
    ], materials[0], "Images/circle.png", "Images/model.jpg"),
    new profile("rura okrągła", [
        profileValues[0],
        profileValues[2],
        profileValues[1],
    ], materials[0],"Images/square.png", "Images/model.jpg"),
    new profile("pręt sześciokątny", [
        profileValues[3],
        profileValues[1]
    ], materials[0],"Images/circle.png", "Images/model.jpg"),
    new profile("rura sześciokątna", [
        profileValues[3],
        profileValues[4],
        profileValues[1],
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("kwadrat", [
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("blacha / płaskownik", [
        profileValues[6],
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("profil zamknięty", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("kątownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("ceownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("teownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg"),
    new profile("dwuteownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/square.png", "Images/model.jpg")
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

    profilesDivs.forEach(function (item, idx) {
       item.addEventListener('click', () => ChangeProfile(item, idx));
    });
}

function fillMaterials()
{
    materialsDiv = document.querySelector('#materials');

    materialsDiv.innerHTML = "";
    for (let i = 0; i < materials.length; i++) {
        let materialElement = "";
        materialElement += "<div class=\"shape material-shape\">" +
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

function hoverModel(chosenText) {
    let hoverModelElement = document.querySelector('#modelHovered');

    if(currentlySelectedMaterial != undefined && currentlySelectedProfile != undefined) {
        hoverModelElement.classList.remove('hover');
    }
    else {
        hoverModelElement.classList.add('hover');
        hoverModelElement.querySelector('.hover-text').textContent = chosenText;
    }
}

function selectProfile(index)
{
    currentlySelectedProfile = profiles[index];
    console.log("selected profile: " + profiles[index].name);
    hoverModel("Wybierz materiał");
    AddCorrectFields(currentlySelectedProfile);
}

function selectMaterial(index)
{
    currentlySelectedMaterial = materials[index];
    console.log("selected material " + materials[index].name);

    selectDensity(currentlySelectedMaterial.selectedDensityIndex);
    hoverModel("Wybierz profil");
}

function selectDensity(index)
{
    currentlySelectedDensity = currentlySelectedMaterial.densities[index];
    currentlySelectedMaterial.selectedDensityIndex = index;
    console.log('selected density: ' + currentlySelectedDensity.getFullName());
}

let currentlySelectedProfile = undefined;
let currentlySelectedMaterial = undefined;
let currentlySelectedDensity = undefined;

function Start() {
    fillProfiles();
    fillMaterials();
    values = [
        height = 17,
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
    Carousel();
}

function Update() {
    for (let i = 0; i < values.length; i++) {
        values[i] = parseFloat(modelValues[i].value);
    }
}

function ChangeProfile(chosenShape, chosenProfileId){
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
    selectProfile(chosenProfileId);
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
        //console.log('select chosen profile')
    }

    selectMaterial(chosenMaterialId);
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

    optionsList.forEach(function(itemOption, idx) {
        itemOption.addEventListener("click", () => {
            selectDensity(idx);
            selected.innerHTML = currentlySelectedMaterial.densities[idx].value + " kg/dm&sup3";
            optionsContainer.classList.remove("shape-active")
        });
    });
}

function ifBoxesNumberIsChanging() {
    const next = document.querySelector('.next.boxes-arrow');
    let carouselWidth = document.querySelector('.boxes-container').offsetWidth;
    let boxesDivNumber = document.querySelectorAll('.box').length;
    let boxDivWidth = document.querySelector('.box-container').offsetWidth;

    console.log(boxesDivNumber * boxDivWidth, carouselWidth)

    if(boxesDivNumber * boxDivWidth > carouselWidth) {
        next.classList.remove('hide');
    } else {
        next.classList.add('hide');
    }
}

function Carousel() {
    const prev  = document.querySelector('.prev.boxes-arrow');
    const next = document.querySelector('.next.boxes-arrow');

    const track = document.querySelector('.boxes-track');

    let carouselWidth = document.querySelector('.boxes-container').offsetWidth;

    ifBoxesNumberIsChanging();

    window.addEventListener('resize', () => {
        ifBoxesNumberIsChanging();
    })

    let index = 0;

    next.addEventListener('click', () => {
        index++;
        prev.classList.add('show');
        track.style.transform = `translateX(-${index * carouselWidth}px)`;
        if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
            next.classList.add('hide');
            prev.classList.add('show');
        }
    })

    prev.addEventListener('click', () => {
        index--;
        next.classList.remove('hide');
        if (index === 0) {
            prev.classList.remove('show');
        }
        track.style.transform = `translateX(-${index * carouselWidth}px)`;
    })
}

function AddCorrectFields(clickedProfile) {

    modelDiv = document.querySelector('#modelContent');

    modelDiv.innerHTML = "";
    let profileElement = "";
    profileElement = "<div class=\"row model-img\">\n" +
            "<img alt=\"Model\" class=\"model-photo\" src=" + clickedProfile.image + "/>" +
        "</div>\n" +
        "<div class=\"row model-labels\">\n";
        console.log(clickedProfile.values)
        for (let i = 0; i < clickedProfile.values.length; i++) {
            profileElement += "<label class=\"model-label green\">\n" +
                "<span class=\"model-label-name\">" + clickedProfile.values[i].getFullName() + "</span>\n" +
                "<input class=\"model-label-value\"/>\n" +
            "</label>\n";
        }
    profileElement += 
        "<label class=\"model-label\">\n" +
            "<span class=\"model-label-name\">Waga [kg]</span>\n" +
            "<input class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<label class=\"model-label green\">\n" +
            "<span class=\"model-label-name\">Cena/kg [zł]</span>\n" +
            "<input class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<label class=\"model-label\">\n" +
            "<span class=\"model-label-name\">Wartość [zł]</span>\n" +
            "<input class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<div class=\"model-label model-button\">\n" +
            "<button><span class=\"button-plus\">&#43;</span> &nbsp DODAJ</button>\n" +
        "</div>\n" +
    "</div>\n";
    modelDiv.innerHTML += profileElement;

    let originalImg = modelDiv.querySelector('.model-photo');
    originalImg.setAttribute('src', clickedProfile.image);
}

