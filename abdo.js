let txtInput = document.getElementById('txt');
let btn = document.getElementById('btn');
let mean = document.getElementById('meaning');
let example = document.getElementById('example');
let aud = document.getElementById('aud');

let URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/hello';

async function fetchUrl(url){
    try{
        const promise = await fetch(url);
        let data = await promise.json();
        data = data[0];
        console.log(data.meanings);
        function getMeaning(){
            for(let i = 0 ; i<data.meanings.length  ; i++){
                for(let j = 0 ; i < data.meanings.length  ; j++){
                    if(data.meanings[i].definitions[j].definition){
                        return data.meanings[i].definitions[j].definition;
                    }
                }
            }
            return 'Not found';
        }
        function getExample(){
            for(let i = 0 ; i<data.meanings.length ; i++){
                if(data.meanings[i].definitions[0].example){
                    return data.meanings[i].definitions[0].example;
                }
            }
            return 'Not found';
        }
        mean.textContent = `Meaning : ${getMeaning()}`;
        example.textContent = `Example : ${getExample()}`;
        function findAudio(){
            for (let i = 0; i < data.phonetics.length ; i++) {
                if(data.phonetics[i].audio){
                    return data.phonetics[i].audio;
                }
            }
            return '';
    }
        aud.src = findAudio();
        aud.style.display = 'block';
    }
    catch(e){
        mean.textContent = 'Could not find this word';
        example.textContent = '';
        aud.style.display = 'none';
        console.error('error',e);
    }
}
function searchWord(){
    let word = txtInput.value;
    console.log(word);
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetchUrl(url);
}
btn.addEventListener('click',()=>{
    if(!txtInput.value){
        console.log(txtInput.value);
        mean.textContent = 'You must enter a word first';
        example.textContent = '';
        aud.style.display = 'none';
        return;
    }
    searchWord();
});