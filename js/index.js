// autoComplete.js on type event emitter
document.querySelector("#autoComplete").addEventListener("autoComplete", function (event) {
  if(event.detail.results != null && event.detail.results.length > 0)
  {
    var htmlString = "--------------------------------";
    event.detail.results.forEach(function(element) {
      Object.keys(element.value).forEach(function(key) {
        if (key == "Name") {
          htmlString += "<br>" + key + " : <a href=https://skies-of-glass.obsidianportal.com/wikis/"+element.value[key].replace(" ", "-")+"target=_blank>" + element.value[key] + "</a>";
        }
        else {
          htmlString += "<br>" + key + " : " + element.value[key];
        }
      });

      htmlString += "<br> -------------------------------------- <br>";
    });
    document.querySelector(".selection").innerHTML = htmlString;
  }
  else {
    document.querySelector(".selection").innerHTML = "";
  }
});

//var test = '[{"Level":0,"Name":"Read Magic","Action":"Standard","School":"Divination","Range":"Personal","Targets":"You","Function":"Know Things"},{"Level":0,"Name":"Ray of Frost","Action":"Standard","School":"Evocation [Cold]","Range":"Close","Targets":1,"Function":"Do Damage"},{"Level":0,"Name":"Drench","Action":"Standard","School":"Conjuration (Creation) [Water]","Range":"Close","Targets":1,"Function":"Utility"},{"Level":0,"Name":"Light","Action":"Standard","School":"Evocation [Light]","Range":"Touch","Targets":1,"Function":"Environment"},{"Level":0,"Name":"Detect Magic","Action":"Standard","School":"Divination","Range":"Emanation","Targets":"AoE","Function":"Know Things"},{"Level":0,"Name":"Mending","Action":"Standard","School":"Transmutation","Range":"Other","Targets":1,"Function":"Utility"},{"Level":0,"Name":"Message","Action":"Standard","School":"Transmutation [Language-Dependent]","Range":"Medium","Targets":1,"Function":"Utility"},{"Level":1,"Name":"Endure Cold","Action":"Standard","School":"Abjuaration","Range":"Touch","Targets":1,"Function":"Environment"},{"Level":1,"Name":"Frostbite","Action":"Standard","School":"Transmutation [Cold]","Range":"Touch","Targets":"1/level","Function":"Do Damage"},{"Level":1,"Name":"Benign Transposition","Action":"Standard","School":"Conjuration (Teleportation)","Range":"Medium","Targets":2,"Function":"Move Things"},{"Level":1,"Name":"Freezing Hands","Action":"Standard","School":"Evocation [Cold]","Range":"Emanation","Targets":"AoE","Function":"Do Damage"},{"Level":1,"Name":"Windy Escape","Action":"Immediate","School":"Transmutation [Air]","Range":"Personal","Targets":"You","Function":"Defensive"},{"Level":1,"Name":"Hydraulic Push","Action":"Standard","School":"Evocation [Water]","Range":"Close","Targets":1,"Function":"Move Things"},{"Level":1,"Name":"Identify","Action":"Standard","School":"Divination","Range":"Emanation","Targets":"AoE","Function":"Know Things"},{"Level":1,"Name":"Silent Image","Action":"Standard","School":"Illusion (Figment)","Range":"Long","Targets":"AoE","Function":"Manipulate Enemies"},{"Level":1,"Name":"Command","Action":"Standard","School":"Enchantment (compulsion) [Language-Dependent, Mind-Affecting]","Range":"Close","Targets":1,"Function":"Manipulate Enemies"},{"Level":1,"Name":"Forced Quiet","Action":"Standard","School":"Transmutation","Range":"Medium","Targets":1,"Function":"Utility"},{"Level":1,"Name":"Dispelling Touch","Action":"Standard","School":"Abjuaration","Range":"Touch","Targets":1,"Function":"Manipulate Magic"},{"Level":1,"Name":"Mage Armor","Action":"Standard","School":"Conjuration (Creation) [Force]","Range":"Touch","Targets":1,"Function":"Defensive"},{"Level":1,"Name":"Scatterspray","Action":"Standard","School":"Transmutation","Range":"Close","Targets":"AoE","Function":"Do Damage"},{"Level":1,"Name":"Unprepared Combatant","Action":"Standard","School":"Enchantment (compulsion) [Language-Dependent, Mind-Affecting]","Range":"Close","Targets":1,"Function":"Manipulate Enemies"},{"Level":1,"Name":"Magic Missile","Action":"Standard","School":"Evocation [Force]","Range":"Medium","Targets":"Unique","Function":"Do Damage"},{"Level":2,"Name":"Frostburn","Action":"Standard","School":"Evocation [Cold]","Range":"Close","Targets":1,"Function":"Do Damage"},{"Level":2,"Name":"Find Traps","Action":"Standard","School":"Divination","Range":"Personal","Targets":"You","Function":"Know Things"},{"Level":2,"Name":"Whelming Blast","Action":"Standard","School":"Enchantment [Mind-Affecting]","Range":"Emanation","Targets":"AoE","Function":"Do Damage"},{"Level":2,"Name":"Gusting Sphere","Action":"Standard","School":"Evocation [Air]","Range":"Medium","Targets":"Unique","Function":"Move Things"},{"Level":2,"Name":"Winter’s Grasp","Action":"Standard","School":"Conjuration (Creation) [Cold]","Range":"Medium","Targets":"AoE","Function":"Manipulate Enemies"},{"Level":2,"Name":"Summon Monster 2","Action":"1 round","School":"Conjuration (Summoning) [See Text]","Range":"Close","Targets":"Unique","Function":"Unique"}]';
// The autoComplete.js Engine instance creator
const autoCompletejs = new autoComplete({
  data: {
    src: async function () {
      // Loading placeholder text
      document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
      // Fetch External Data Source
      const source = await fetch("./db/generic.json");
      const data = await source.json();

      //const data = JSON.parse(test);
      // Returns Fetched data
      return data;
    },
    key: ["Function", "Action", "Name"],
  },
  sort: function (a, b) {
    if (a.match < b.match) {
      return -1;
    }
    if (a.match > b.match) {
      return 1;
    }
    return 0;
  },
  query: {
  },
  placeHolder: "Checks",
  selector: "#autoComplete",
  threshold: 0,
  debounce: 0,
  searchEngine: "strict",
  highlight: true,
  maxResults: 100,
  resultsList: {
    render: false,
    container: function (source) {
      source.setAttribute("id", "autoComplete_results_list");
    },
    element: "ul",
    destination: document.querySelector("#autoComplete"),
    position: "afterend",
  },
  resultItem: {
    content: function (data, source) {
      source.innerHTML = data.match;
    },
    element: "li",
  },
  noResults: function () {
    const result = document.createElement("li");
    result.setAttribute("class", "no_result");
    result.setAttribute("tabindex", "1");
    result.innerHTML = "No Results";
    document.querySelector("#autoComplete_results_list").appendChild(result);
  },
  onSelection: function (feedback) {
    // Clear Input
    document.querySelector("#autoComplete").value = "";
    // Change placeholder with the selected value
  },
});

// On page load add class to input field
window.addEventListener("load", function () {
  document.querySelector("#autoComplete").classList.add("out");
  // document.querySelector("#autoComplete_results_list").style.display = "none";
});

// Toggle results list and other elements
const action = function (action) {
  const github = document.querySelector(".github-corner");
  const title = document.querySelector("h1");
  const mode = document.querySelector(".mode");
  const selection = document.querySelector(".selection");
  const footer = document.querySelector(".footer");

  if (action === "dim") {
    github.style.opacity = 1;
    title.style.opacity = 1;
    mode.style.opacity = 1;
    selection.style.opacity = 1;
    footer.style.opacity = 1;
  } else if ("light") {
    github.style.opacity = 0.1;
    title.style.opacity = 0.3;
    mode.style.opacity = 0.2;
    selection.style.opacity = 0.1;
    footer.style.opacity = 0.1;
  }
};

function generateAbilityDiv(object) {
  console.log(test);
}