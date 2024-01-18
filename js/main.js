const fromText = document.querySelector(".from-text"),
 toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector(".exchange"),
selectTags = document.querySelectorAll("select"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTags.forEach((selectTag, id) => {
   for(const country_code in countries) {
    //selecting English by default as FROM language and hiundi as TO language
        let selected;
        if(id == 0 &&  country_code == "en-GB"){
            selected = "selected";
        } else if(id == 1 &&  country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        selectTag.insertAdjacentHTML("beforeend", option);
     }
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTags[0].value;
    fromText.value = toText.value;
    selectTags[0].value = selectTags[1].value;
    toText.value = toText.value;
    selectTags[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom  = selectTags[0].value,
    translateTo = selectTags[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating....")
     let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
     fetch(apiUrl).then(res => res.json()).then(data =>{
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translating");
     });
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                   navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTags[0].value; // setting utterance language to fromSelect tag value
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTags[1].value; //setting utterance language toSelect tag value
            }
            speechSynthesis.speak(utterance); // speak the passed utterance
        }
    })
})
