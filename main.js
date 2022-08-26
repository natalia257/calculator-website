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

    clone() 
    {
        let prototype = Object.getPrototypeOf(this);
        let cloned = Object.create(prototype);
        console.log(cloned)

        cloned.name = this.name;
        cloned.values = this.values;
        cloned.material = this.material;
        cloned.weight = this.weight;
        cloned.pricePerKg = this.pricePerKg;
        cloned.icon = this.icon;
        cloned.image = this.image;

        return cloned;
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
    ], materials[0], "Images/profiles_icons/profile_pret_okragly.png", "Images/models/pret_okragly.png"),
    new profile("Rura okrągła", [
        profileValues[0],
        profileValues[2],
        profileValues[1],
    ], materials[0], "Images/profiles_icons/profile_rura_okragla.png", "Images/models/rura_okragla.png"),
    new profile("Pręt sześciokątny", [
        profileValues[3],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_pret_szesciokatny.png", "Images/models/pret_szesciokatny.png"),
    new profile("Rura sześciokątna", [
        profileValues[3],
        profileValues[4],
        profileValues[1],
    ], materials[0], "Images/profiles_icons/profile_rura_szesciokatna.png", "Images/models/rura_szesciokatna.png"),
    new profile("Kwadrat", [
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_kwadrat.png", "Images/models/kwadrat.png"),
    new profile("Blacha / płaskownik", [
        profileValues[6],
        profileValues[5],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_blacha-plaskownik.png", "Images/models/blacha-plaskownik.png"),
    new profile("Profil zamknięty", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_profil_zamkniety.png", "Images/models/profil_zamkniety.png"),
    new profile("Kątownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_katownik.png", "Images/models/katownik.png"),
    new profile("Ceownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_ceownik.png", "Images/models/ceownik.png"),
    new profile("Teownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_teownik.png", "Images/models/teownik.png"),
    new profile("Dwuteownik", [
        profileValues[3],
        profileValues[5],
        profileValues[2],
        profileValues[1]
    ], materials[0], "Images/profiles_icons/profile_dwuteownik.png", "Images/models/dwuteownik.png")
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
    console.log("selected profile: " + profiles[index].name);
    hoverModel("Wybierz materiał");
    AddFieldsToModel(currentlySelectedProfile);
}

function selectMaterial(index) {
    currentlySelectedMaterial = materials[index];
    console.log("selected material " + materials[index].name);

    selectDensity(currentlySelectedMaterial.selectedDensityIndex);
    hoverModel("Wybierz profil");
}

function selectDensity(index) {
    currentlySelectedDensity = currentlySelectedMaterial.densities[index];
    currentlySelectedMaterial.selectedDensityIndex = index;
    console.log('selected density: ' + currentlySelectedDensity.getFullName());
}

let currentlySelectedProfile = undefined;
let currentlySelectedMaterial = undefined;
let currentlySelectedDensity = undefined;
let createdProfiles = [];

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
    DeleteButtonHover();
    document.querySelector("#boxesContainer").innerHTML = "";
}

function ChangeProfile(chosenShape, chosenProfileId) {
    // unselect old
    if(modelProfile != null) {
        let originalImg = modelProfile.querySelector('img');
        let src = originalImg.getAttribute('src');
        let nameShape = src.substring(23, src.indexOf('_selected'));
        originalImg.setAttribute('src', 'Images/profiles_icons/' + nameShape + '.png');
        modelProfile.classList.remove('green');
    }

    // select new
    chosenShape.classList.add('green');
    let newOriginalImg = chosenShape.querySelector('img');
    let newSrc = newOriginalImg.getAttribute('src');
    let newNameShape = newSrc.substring(22, newSrc.indexOf('.'));
    newOriginalImg.setAttribute('src', 'Images/profiles_select/' + newNameShape + '_selected.png');

    modelProfile = chosenShape;
    selectProfile(chosenProfileId);
}

function ChangeMaterial(chosenMaterial, chosenMaterialId){
    // unselect old
    if(modelMaterial != null) {
        let originalImg = modelMaterial.querySelector('img');
        let src = originalImg.getAttribute('src');
        let nameShape = src.substring(24, src.indexOf('_selected'));
        originalImg.setAttribute('src', 'Images/materials_icons/' + nameShape + '.png');
        modelMaterial.classList.remove('show');
        modelMaterial.classList.remove('green');
    }

    // select new
    chosenMaterial.classList.add('green');
    let newOriginalImg = chosenMaterial.querySelector('img');
    let newSrc = newOriginalImg.getAttribute('src');
    let newNameShape = newSrc.substring(23, newSrc.indexOf('.png'));
    newOriginalImg.setAttribute('src', 'Images/materials_select/' + newNameShape + '_selected.png');

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

function setProfileValue(idx, value)
{

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
            "<input id=\"weight\" class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<label class=\"model-label green\">\n" +
            "<span class=\"model-label-name\">Cena/kg [zł]</span>\n" +
            "<input id=\"pricePerKg\" class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<label class=\"model-label\">\n" +
            "<span class=\"model-label-name\">Wartość [zł]</span>\n" +
            "<input class=\"model-label-value\"/>\n" +
        "</label>\n" +
        "<div class=\"model-label model-button\">\n" +
            "<button id=\"addBtn\"><span class=\"button-plus\">&#43;</span> &nbsp DODAJ</button>\n" +
        "</div>\n" +
    "</div>\n";
    modelDiv.innerHTML += profileElement;

    let originalImg = modelDiv.querySelector('.model-photo');
    originalImg.setAttribute('src', clickedProfile.image);

    AddProfileToList();
}

function DeleteButtonHover() {
    document.querySelectorAll(".button-delete").forEach((item, idx) => {
        item.addEventListener('click', () => {
            let boxHoverDiv = item.closest(".box").querySelector('.box-hover');
            boxHoverDiv.classList.remove('hover');

            boxHoverDiv.querySelector('#deleteButton').addEventListener('click', () => {
                // to do: delete element from List
                console.log("usuń element")
                boxHoverDiv.classList.add('hover');
            });

            boxHoverDiv.querySelector('#skipButton').addEventListener('click', () => {
                boxHoverDiv.classList.add('hover');
            });
        })
    });
}

function GetCurrentValues(createdProfile) {
    let valuesInput = document.querySelectorAll('.model-label-value');
    for (let i = 0; i < createdProfile.values.length; i++) {
        createdProfile.values[i].value = valuesInput[i].value;
    }
    createdProfile.pricePerKg = document.querySelector('#pricePerKg').value;
    createdProfile.weight = document.querySelector('#weight').value;
}

function AddProfileToList() {
    document.querySelector("#addBtn").addEventListener('click', () => {
        GetCurrentValues(currentlySelectedProfile);
        let createdProfile = currentlySelectedProfile.clone();
        createdProfiles.push(createdProfile);


        //osobna funkcja czytajaca profile.
        console.log(currentlySelectedProfile, createdProfile)

        let boxesContainer = document.querySelector("#boxesContainer");
        let profileElement = "";
        profileElement = "<div class=\"box-container\">" + 
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
                                createdProfile.values[i].name + " - " + createdProfile.values[i].letter + " = " + createdProfile.values[i].value + " " + createdProfile.values[i].unit +
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
                    "<div class=\"box-button\">" +
                        "<button class=\"button-edit\">EDYTUJ</button>" +
                    "</div>" +
                    "<div class=\"box-button\">" +
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
            "</div>" +
        "</div>";
        
        boxesContainer.innerHTML += profileElement;

        let originalImg = boxesContainer.querySelector('.box-img');
        originalImg.setAttribute('src', createdProfile.icon);

        originalImg = boxesContainer.querySelector('.box-circle');
        originalImg.setAttribute('src', createdProfile.material.icon);

        ifBoxesNumberIsChanging();
    })
}