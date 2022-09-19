let modelProfileDiv = undefined;
let modelMaterialDiv = undefined;
let currentlySelectedProfile = undefined;
let currentlySelectedMaterial = undefined;
let currentlySelectedDensity = undefined;
let createdProfiles = [];


function Start() {
    fillProfiles();
    fillMaterials();
    Carousel();
}

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

    clone()
    {
        let cloned = Object.create(this);
        cloned.value = this.value;
        cloned.name = this.name;
        return cloned;
    }
}

class material {
    constructor(name, densities, icon) {
        this.name = name;
        this.densities = densities;
        this.icon = icon;
        this.selectedDensityIndex = 0;
        this.id;
    }

    clone()
    {
        let cloned = Object.create(this);
        cloned.name = this.name;
        cloned.densities = this.densities;
        cloned.icon = this.icon;
        cloned.selectedDensityIndex = this.selectedDensityIndex;
        cloned.id = this.id;
        return cloned;
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

function roundNumber(l,n) {
    r = Math.pow(10,n);
    return Math.round(l*r)/r;
}

function pretokragly() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let r = parseFloat(currentlySelectedProfile.values[0].value) /2 /100;
    let l = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let p = Math.PI * Math.pow(r,2);
    let weight = roundNumber(p*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function ruraokragla() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let r = parseFloat(currentlySelectedProfile.values[0].value) /2 /100;
    let r2 = r - (parseFloat(currentlySelectedProfile.values[1].value) /100);
    let l = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let p1 = Math.PI * Math.pow(r,2);
    let p2 = Math.PI * Math.pow(r2,2);
    let weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function pretszesciokatny() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /2 /100;
    let l = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let p = 2 * Math.pow(h,2)* Math.sqrt(3);
    let weight = roundNumber(p*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function ruraszesciotna() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /2 /100;
    let b = parseFloat(currentlySelectedProfile.values[1].value) /2 /100;
    let l = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let p1 = 2 * Math.pow(h,2)* Math.sqrt(3);
    let p2 = Math.PI * Math.pow(b,2);
    let weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function kwadrat() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let weight = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let p = weight * weight;
    weight = roundNumber(p*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function blacha() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let p = h * weight;
    weight = roundNumber(p*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function profilzamkniety() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let b = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[3].value) /100;
    let p1 = h * weight;
    let p2 = (h-2*b)*(weight-2*b);
    weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function katownik() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let b = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[3].value) /100;
    let p1 = h * weight;
    let p2 = (h-b)*(weight-b);
    weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function ceownik() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let b = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[3].value) /100;
    let p1 = h * weight;
    let p2 = (h-2*b)*(weight-b);
    weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function teownik() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let b = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[3].value) /100;
    let p1 = h * weight;
    let p2 = (h-b)*(weight-b);
    weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

function dwuteownik() {
    let density = currentlySelectedDensity.value;
    currentlySelectedProfile.pricePerKg = parseFloat(document.querySelector('#pricePerKg').value);
    let pricePerKg = currentlySelectedProfile.pricePerKg;
    let h = parseFloat(currentlySelectedProfile.values[0].value) /100;
    let weight = parseFloat(currentlySelectedProfile.values[1].value) /100;
    let b = parseFloat(currentlySelectedProfile.values[2].value) /100;
    let l = parseFloat(currentlySelectedProfile.values[3].value) /100;
    let p1 = h * weight;
    let p2 = (h-2*b)*(weight-b);
    weight = roundNumber((p1-p2)*l*density,3);
    let price = roundNumber(weight * pricePerKg,2);
    weight = roundNumber(weight,3);
    document.querySelector('#weight').value = weight;
    document.querySelector('#setPrice').value = price;
}

class profile {
    constructor(name, values, material, icon, image, calc) {
        this.name = name;
        this.values = values;
        this.material = material;
        this.weight = 0;
        this.pricePerKg = 0;
        this.icon = icon;
        this.image = image;
        this.calc = calc;
        this.id;
    }

    getCost(){
        return roundNumber(this.weight * this.pricePerKg, 2);
    }

    setMaterial(newMaterial)
    {
        this.material = newMaterial;
    }

    clone() 
    {
        let cloned = Object.create(this);
        cloned.name = this.name;
        cloned.values = this.values;
        cloned.material = this.material;
        cloned.weight = this.weight;
        cloned.pricePerKg = this.pricePerKg;
        cloned.icon = this.icon;
        cloned.image = this.image;
        cloned.calc = this.calc;
        cloned.id = this.id;
        return cloned;
    }

    calculate() {
        this.calc();
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
    new material("Brąz", [
        new density("8,5", 8.5),
        new density("B2, B4, B8, B443 - 8,895", 8.895),
        new density("BA5 - 8,197", 8.197),
        new density("BA8 - 7,8", 7.8),
        new density("BA83 - 7,695", 7.695),
        new density("Bk1, Bk31 - 8,497", 8.497),
        new density("BB1,7 - 8,4", 8.4),
        new density("BB2 - 8,295", 8.295),
        new density("BB21, BC2 - 8,895", 8.895)
    ], "Images/materials_icons/material_braz.png"),
    new material("Mosiądz", [
        new density("8,5", 8.5)
    ], "Images/materials_icons/material_mosiadz.png"),
    new material("Miedź", [
        new density("8,9", 8.9)
    ], "Images/materials_icons/material_miedz.png"),
    new material("Aluminium", [
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
    ], "Images/materials_icons/material_aluminium.png"),
    new material("Stal", [
        new density("7,85", 7.85),
        new density("7,5", 7.5),
        new density("7,7", 7.7),
        new density("7,8", 7.8),
        new density("7,9", 7.9),
        new density("8,0", 8.0),
        new density("8,1", 8.1),
    ], "Images/materials_icons/material_stal.png"),
    new material("Stopy Cu-Ni", [
        new density("8,9", 8.9)
    ], "Images/materials_icons/material_miedzionikiel.png"),
    new material("CuA18/BA8", [
        new density("7,8", 7.8)
    ], "Images/materials_icons/material_miedzionikiel.png"),
    new material("Ołów", [
        new density("11,68", 11.68)
    ], "Images/materials_icons/material_olow.png"),
    new material("Stopy ołowiu", [
        new density("9,9", 9.9)
    ], "Images/materials_icons/material_stopy_olowiu.png"),
    new material("Cynk", [
        new density("7,2", 7.2)
    ], "Images/materials_icons/material_cynk.png"),
    new material("Stopy cynku", [
        new density("6,7", 6.7)
    ], "Images/materials_icons/material_stopy_cynku.png"),
    new material("Złoto", [
        new density("19,3", 19.3)
    ], "Images/materials_icons/material_zloto.png"), //TODO: fill with correct material icons
];

let profiles = [
    new profile("Pręt okrągły", [
        profileValues[0],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_pret_okragly.png",
        "Images/models/pret_okragly.png", pretokragly),
    new profile("Rura okrągła", [
        profileValues[0],
        profileValues[2],
        profileValues[1],
    ], materials[0], "Images/profiles_icons/profile_rura_okragla.png",
        "Images/models/rura_okragla.png", ruraokragla),
    new profile("Pręt sześciokątny", [
        profileValues[3],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_pret_szesciokatny.png",
        "Images/models/pret_szesciokatny.png", pretszesciokatny),
    new profile("Rura sześciokątna", [
        profileValues[3],
        profileValues[4],
        profileValues[1],
    ], materials[0], "Images/profiles_icons/profile_rura_szesciokatna.png",
        "Images/models/rura_szesciokatna.png", ruraszesciotna),
    new profile("Kwadrat", [
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_kwadrat.png",
        "Images/models/kwadrat.png", kwadrat),
    new profile("Blacha / płaskownik", [
        profileValues[6],
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_blacha-plaskownik.png",
        "Images/models/blacha-plaskownik.png", blacha),
    new profile("Profil zamknięty", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_profil_zamkniety.png",
        "Images/models/profil_zamkniety.png", profilzamkniety),
    new profile("Kątownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_katownik.png",
        "Images/models/katownik.png", katownik),
    new profile("Ceownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_ceownik.png",
        "Images/models/ceownik.png", ceownik),
    new profile("Teownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_teownik.png",
        "Images/models/teownik.png", teownik),
    new profile("Dwuteownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_dwuteownik.png",
        "Images/models/dwuteownik.png", dwuteownik)
]

function fillProfiles() {
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

function fillMaterials() {
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

function selectProfile(index) {
    currentlySelectedProfile = profiles[index];
    currentlySelectedProfile.id = index;
    console.log("selected profile: " + profiles[index].name);
    hoverModel("Wybierz materiał");
    AddFieldsToModel(currentlySelectedProfile);
}

function selectMaterial(index) {
    currentlySelectedMaterial = materials[index];
    currentlySelectedMaterial.id = index;
    if(!currentlySelectedDensity) {
        currentlySelectedMaterial.selectedDensityIndex = 0;
        selectDensity(0);
        console.log("selected density: " + currentlySelectedMaterial.densities[currentlySelectedMaterial.selectedDensityIndex].name);
    }
    console.log("selected material: " + materials[index].name);
    hoverModel("Wybierz profil");
}

function selectDensity(index) {
    currentlySelectedDensity = currentlySelectedMaterial.densities[index];
    currentlySelectedMaterial.selectedDensityIndex = index;
    console.log("selected density: " + currentlySelectedMaterial.densities[index].name);
}

function unselectImage(model, folderName, firstnameId, lastnameName) {
    let originalImg = model.querySelector('img');
    let src = originalImg.getAttribute('src');
    let nameShape = src.substring(firstnameId, src.indexOf(lastnameName));
    originalImg.setAttribute('src', folderName + nameShape + '.png');
    model.classList.remove('green');
}

function selectImage(model, folderName, firstnameId, lastnameName) {
    model.classList.add('green');
    let newOriginalImg = model.querySelector('img');
    let newSrc = newOriginalImg.getAttribute('src');
    let newNameShape = newSrc.substring(firstnameId, newSrc.indexOf(lastnameName));
    newOriginalImg.setAttribute('src', folderName + newNameShape + '_selected.png');
}

function ChangeProfile(chosenShape, chosenProfileId) {
    if(modelProfileDiv != null) {
        unselectImage(modelProfileDiv,  'Images/profiles_icons/', 23, '_selected')
    }
    selectImage(chosenShape, 'Images/profiles_select/', 22, '.');
    modelProfileDiv = chosenShape;

    selectProfile(chosenProfileId);
}

function ChangeMaterial(chosenMaterial, chosenMaterialId){
    if(modelMaterialDiv != null) {
        unselectImage(modelMaterialDiv,  'Images/materials_icons/', 24, '_selected');
    }
    selectImage(chosenMaterial, 'Images/materials_select/', 23, '.png');
    modelMaterialDiv = chosenMaterial;

    selectMaterial(chosenMaterialId);
    if(currentlySelectedMaterial == undefined)
        return;
}

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

//TODO: nazwa funkcji do poprawy
function ifBoxesNumberIsChanging() {
    const next = document.querySelector('.next.boxes-arrow');
    let carouselWidth = document.querySelector('.boxes-container').offsetWidth;
    let boxesDivNumber = document.querySelectorAll('.box').length;
    if(document.querySelector('.box-container')) {
        let boxDivWidth = document.querySelector('.box-container').offsetWidth;
    
        if(boxesDivNumber * boxDivWidth > carouselWidth) {
            next.classList.remove('hide');
        } else {
            next.classList.add('hide');
        }
    }
}

//TODO: co to jest?
window.addEventListener('resize', () => {
    ifBoxesNumberIsChanging();
})

function Carousel() {
    const prev  = document.querySelector('.prev.boxes-arrow');
    const next = document.querySelector('.next.boxes-arrow');

    const track = document.querySelector('.boxes-track');

    let carouselWidth = document.querySelector('.boxes-container').offsetWidth;

    ifBoxesNumberIsChanging();

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

function AddFieldsToModel(clickedProfile) {

    modelDiv = document.querySelector('#modelContent');

    modelDiv.innerHTML = "";
    let profileElement = "";
    //creating profile div
    profileElement = "<div class=\"row model-img\">\n" +
        "<img alt=\"Model\" class=\"model-photo\" src=" + clickedProfile.image + "/>" +
        "</div>\n" +
        "<div class=\"row model-labels\">\n";

    //filling profile with dynamic values
    for (let i = 0; i < clickedProfile.values.length; i++) {
        profileElement += "<label class=\"model-label green\">\n" +
        "<span class=\"model-label-name\">" + clickedProfile.values[i].getFullName() + "</span>\n" +
        "<input class=\"model-label-value\"/>\n" + //TODO: add event that tells that this particular field has changed and with what value
        "</label>\n";
    }

    //filling profile with static values
    profileElement += 
        "<label class=\"model-label\">\n" +
            "<span class=\"model-label-name\">Waga [kg]</span>\n" +
            "<input id=\"weight\" class=\"model-label-value set-price\" disabled/>\n" +
        "</label>\n" +
        "<label class=\"model-label green\">\n" +
            "<span class=\"model-label-name\">Cena/kg [zł]</span>\n" +
            "<input id=\"pricePerKg\" class=\"model-label-value set-price\"/>\n" +
        "</label>\n" +
        "<label class=\"model-label\">\n" +
            "<span class=\"model-label-name\">Wartość [zł]</span>\n" +
            "<input id=\"setPrice\" class=\"model-label-value set-price\" disabled/>\n" +
        "</label>\n" +
        "<div class=\"model-label model-button\">\n" +
            "<button id=\"addBtn\"><span class=\"button-plus\">&#43;</span> &nbsp DODAJ</button>\n" +
        "</div>\n" +
    "</div>\n";
    modelDiv.innerHTML += profileElement;

    let originalImg = modelDiv.querySelector('.model-photo');
    originalImg.setAttribute('src', clickedProfile.image);

    AddProfileToList();

    modelDiv.querySelectorAll('.model-label-value:not(.set-price)').forEach((item, idx) => {
        item.addEventListener('change', e => {
            SetData(e.target.value, idx);
            calculateProfile();
        })
    })

    modelDiv.querySelectorAll('#pricePerKg').forEach((item, idx) => {
        item.addEventListener('change', e => {
            currentlySelectedProfile.weight = e.target.value;
            calculateProfile();
        })
    })
}

function SetData(value, idx) {
    currentlySelectedProfile.values[idx].value = value;
}

function ResetCurrentlySelectedProfile() {
    currentlySelectedProfile = undefined;
    currentlySelectedMaterial = undefined;
    currentlySelectedDensity = undefined;
    modelProfileDiv = undefined;
    modelMaterialDiv = undefined;

    hoverModel("Wybierz profil");

    let profileDiv = document.querySelector('#profiles .green');
    let materialDiv = document.querySelector('#materials .green');

    unselectImage(profileDiv, 'Images/profiles_icons/', 23, '_selected')
    unselectImage(materialDiv, 'Images/materials_icons/', 24, '_selected')
}

function GetCurrentValues(createdProfile) {
    let valuesInput = document.querySelectorAll('.model-label-value');
    for (let i = 0; i < createdProfile.values.length; i++) {
        createdProfile.values[i].value = valuesInput[i].value;
    }
    createdProfile.pricePerKg = document.querySelector('#pricePerKg').value;
    createdProfile.weight = document.querySelector('#weight').value;
}

function ifValuesHigherThanZero(profile) {
    for (let i = 0; i < profile.values.length; i++) {
        if(profile.values[i].value <= 0) {
            return false;
        }
    }
    if(profile.pricePerKg <= 0) {
        return false;
    }
    return true;
}

function addProfile() {
    if(!currentlySelectedProfile || !currentlySelectedMaterial || !currentlySelectedDensity) {
        return;
    }

    let createdProfile = currentlySelectedProfile.clone();
    createdProfile.material = currentlySelectedMaterial.clone();
    createdProfile.material.selectedDensityIndex = currentlySelectedMaterial.selectedDensityIndex;
    GetCurrentValues(createdProfile);

    if (!ifValuesHigherThanZero(createdProfile)) {
        return;
    }

    createdProfiles.push(createdProfile);
    let index = createdProfiles.length - 1;
    let boxesContainer = document.querySelector("#boxesContainer");
    let profileElement = "";
    profileElement = "<div class=\"box-container\" data-value=" + index + ">" +
        "<div class=\"box\">" +
        "<div class=\"row left-box\">" +
        "<div class=\"row box-shape\">" +
        "<img alt=\"shape\" class=\"box-img\" src=" + createdProfile.icon + " />" +
        "<div class=\"box-name\">" + createdProfile.name + "</div>" +
        "</div>" +
        "<div class=\"row box-shape\">" +
        "<img alt=\"material\" class=\"box-circle\" src=" + createdProfile.material.icon + " />" +
        "<div class=\"box-material\">" + createdProfile.material.name + "</div>" +
        "<div class=\"box-desc\">" + createdProfile.material.densities[createdProfile.material.selectedDensityIndex].getFullName() + "</div>" +
        "</div>" +
        "</div>" +
        "<div class=\"row right-box\">" +
        "<div class=\"box-labels\">";
    for (let i = 0; i < createdProfile.values.length; i++) {
        profileElement += "<div class=\"box-label\">" +
            createdProfile.values[i].name + " - " + createdProfile.values[i].letter + " = <span class=\"box-label-value\">" + createdProfile.values[i].value + "</span> " + createdProfile.values[i].unit +
            "</div>";
    }
    profileElement += "<div class=\"box-label\">" +
        "Waga = " + createdProfile.weight + " kg" +
        "</div>" +
        "<div class=\"box-label\">" +
        "Cena/kg = " + createdProfile.pricePerKg + " zł" +
        "</div><br />" +
        "<div class=\"box-label\">" +
        "Wartość " + createdProfile.getCost() + " zł" +
        "</div>" +
        "</div>" +
        "<div class=\"box-buttons\">" +
        "<button class=\"button-edit\">EDYTUJ</button>" +
        "<button class=\"button-duplicate\">DUPLIKUJ</button>" +
        "<button class=\"button-delete\">USUŃ</button>" +
        "</div>" +
        "</div>" +
        "<div class=\"box-hover hover\">" +
        "<div class=\"box-hover-content\">" +
        "<div>Czy napewno chcesz usunąć element?</div>" +
        "<button id=\"deleteButton\">Usuń</button>" +
        "<button id=\"skipButton\">Anuluj</button>" +
        "</div>" +
        "</div>" +
        "<div class=\"box-hover hover box-hover-edit\">" +
        "<div class=\"box-hover-content\">" +
        "<div>Czy zapisać dotychczasowy profil?</div>" +
        "<button id=\"addButton\">Zapisz</button>" +
        "<button id=\"editButton\">Edytuj</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

    boxesContainer.insertAdjacentHTML('afterbegin', profileElement);

    ifBoxesNumberIsChanging();

    DeleteButtonHover(index);

    EditButtonHover(index);

    DuplicateButton(index);
}

function AddProfileToList() {
    document.querySelector("#addBtn").addEventListener('click', () => {
        addProfile();
        ResetCurrentlySelectedProfile();
    })
}

function DeleteButtonHover(index) {
    let deleteBtn = document.querySelector(".button-delete");
    deleteBtn.addEventListener('click', e => {
        let boxHoverDiv = deleteBtn.closest(".box").querySelector('.box-hover');
        boxHoverDiv.classList.remove('hover');

        boxHoverDiv.querySelector('#deleteButton').addEventListener('click', () => {
            boxHoverDiv.classList.add('hover');
            delete createdProfiles[index];
            boxHoverDiv.closest(".box-container").remove();
        });

        boxHoverDiv.querySelector('#skipButton').addEventListener('click', () => {
            boxHoverDiv.classList.add('hover');
        });
    })
}

function EditButtonHover(index) {
    let editBtn = document.querySelector(".button-edit");
    let boxDiv = editBtn.closest(".box");
    editBtn.addEventListener('click', e => {
        let boxHoverDiv = editBtn.closest(".box").querySelector('.box-hover-edit');
        boxHoverDiv.classList.remove('hover');

        boxHoverDiv.querySelector('#addButton').addEventListener('click', () => {
            console.log('zapisz', createdProfiles,currentlySelectedDensity, currentlySelectedProfile, currentlySelectedProfile);
            boxHoverDiv.classList.add('hover');
            document.querySelectorAll(".box").forEach(item => item.classList.remove('chosen'));
            boxDiv.classList.add('chosen');
            addProfile();
            showProfile(createdProfiles[index]);
            addEditButtonToModel(index);
        });

        boxHoverDiv.querySelector('#editButton').addEventListener('click', () => {
            console.log('edytuj')
            boxHoverDiv.classList.add('hover');
            document.querySelectorAll(".box").forEach(item => item.classList.remove('chosen'));
            boxDiv.classList.add('chosen');
            showProfile(createdProfiles[index]);
            addEditButtonToModel(index);
        });
    })
}

function DuplicateButton(index) {
    let duplicateBtn = document.querySelector(".button-duplicate");
    duplicateBtn.addEventListener('click', e => {
        currentlySelectedProfile = createdProfiles[index].clone();
        currentlySelectedMaterial = createdProfiles[index].material.clone();
        currentlySelectedDensity = createdProfiles[index].material.densities[createdProfiles[index].material.selectedDensityIndex];
        addProfile();
    })
}

function addEditButtonToModel(index) {
    document.querySelector('.model-button').innerHTML = "<button id=\"addBtn\"><span class=\"button-plus\">&#43;</span> DODAJ</button>\n" +
        "<button id=\"editBtn\"><span class=\"button-plus\"></span>EDYTUJ</button>\n";
    document.querySelector("#addBtn").addEventListener('click', () => {
        addProfile();
        ResetCurrentlySelectedProfile();
        document.querySelector(".box-container[data-value=\"" + index + "\"] .box").classList.remove('chosen');
    })
    document.querySelector('#editBtn').addEventListener('click', () => {
        let createdProfile = currentlySelectedProfile.clone();
        createdProfile.material = currentlySelectedMaterial.clone();
        createdProfile.material.selectedDensityIndex = currentlySelectedMaterial.selectedDensityIndex;
        GetCurrentValues(createdProfile);

        if (!ifValuesHigherThanZero(createdProfile)) {
            return;
        }

        let leftBoxDiv = document.querySelector(".box-container[data-value=\"" + index + "\"] .left-box");
        let labelsDiv = document.querySelector(".box-container[data-value=\"" + index + "\"] .box-labels");
        let profileElement = "<div class=\"row box-shape\">" +
            "<img alt=\"shape\" class=\"box-img\" src=" + createdProfile.icon + " />" +
            "<div class=\"box-name\">" + createdProfile.name + "</div>" +
            "</div>" +
            "<div class=\"row box-shape\">" +
            "<img alt=\"material\" class=\"box-circle\" src=" + createdProfile.material.icon + " />" +
            "<div class=\"box-material\">" + createdProfile.material.name + "</div>" +
            "<div class=\"box-desc\">" + createdProfile.material.densities[createdProfile.material.selectedDensityIndex].getFullName() + "</div>" +
            "</div>" +
            "</div>";
        leftBoxDiv.innerHTML = profileElement;

        profileElement = "";
        for (let i = 0; i < createdProfile.values.length; i++) {
            profileElement += "<div class=\"box-label\">" +
                createdProfile.values[i].name + " - " + createdProfile.values[i].letter + " = <span class=\"box-label-value\">" + createdProfile.values[i].value + "</span> " + createdProfile.values[i].unit +
                "</div>";
        }
        profileElement += "<div class=\"box-label\">" +
            "Waga = " + createdProfile.weight + " kg" +
            "</div>" +
            "<div class=\"box-label\">" +
            "Cena/kg = " + createdProfile.pricePerKg + " zł" +
            "</div><br />" +
            "<div class=\"box-label\">" +
            "Wartość " + createdProfile.getCost() + " zł" +
            "</div>";
        labelsDiv.innerHTML = profileElement;

        createdProfiles[index] = createdProfile;

        ResetCurrentlySelectedProfile();
    })
}

function showProfile(profile) {
    console.log(profile)
    currentlySelectedProfile = profile.clone();
    currentlySelectedMaterial = profile.material.clone();
    currentlySelectedDensity = profile.material.densities[profile.material.selectedDensityIndex];

    let profilesDiv = document.querySelector('#profiles');
    let profilesDivs = profilesDiv.querySelectorAll('.shape')[profile.id];
    ChangeProfile(profilesDivs, profile.id);
    let materialsDiv = document.querySelector('#materials');
    let materialCircles = materialsDiv.querySelectorAll('.shape-clicked')[profile.material.id]
    ChangeMaterial(materialCircles.parentElement, profile.material.id);
    selectDensity(profile.material.selectedDensityIndex)
    SetCurrentValues(profile);
    calculateProfile();
}

function SetCurrentValues(createdProfile) {
    let valuesInput = document.querySelectorAll('.model-label-value');
    for (let i = 0; i < createdProfile.values.length; i++) {
        valuesInput[i].value = createdProfile.values[i].value;
    }
    document.querySelector('#pricePerKg').value = createdProfile.pricePerKg;
    document.querySelector('#weight').value = createdProfile.weight;
}

function calculateProfile() {
    GetCurrentValues(currentlySelectedProfile);

    if(!ifValuesHigherThanZero(currentlySelectedProfile)) {
        return;
    }
    currentlySelectedProfile.calculate();
}

Start();