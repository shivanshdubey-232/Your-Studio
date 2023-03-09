let hh, clap, kick;
let hPat, cpat, kpat;
let hPhrase, cPhrase, kPhrase;
let drums;
let cnt = 0;
let spat = [], sPhrase;
// spat.from({length: 5}, (v, i) => i + 1);
let patGrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ],[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]]
let instruments = ["Kick", "Clap", "Hats"]
let progressBar = document.querySelector(".progress-bar")
  
for(let i = 0; i < 3; i++){
  const instrumentPattern = document.createElement("div")
  const instrumentName= document.createElement("span")
  instrumentName.innerText=instruments[i];
  instrumentPattern.append(instrumentName);
  instrumentPattern.classList.add("instrumentPattern", "my-2" )
  instrumentName.classList.add("btn", "btn-success", "mx-5", "instrumentName",);
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group")   

  for(let j = 0; j < 32; j ++){
    const newButton = document.createElement("button");
    newButton.innerText= 0;
    spat[j] = j + 1;
    newButton.addEventListener("click", () => {
      if(patGrid[i][j] === 0){
        newButton.innerText= 1;
        newButton.classList.add("btn-success");
        patGrid[i][j] = 1;
      } else{
        newButton.innerText= 0;
        patGrid[i][j] = 0;
        newButton.classList.remove("btn-success");        
      }
    })
    newButton.classList.add("btn", "btn-outline-secondary");
    if((j + 1) % 4 == 1){
      newButton.classList.add("btn", "border-right", "border-warning");      
    }
    buttonGroup.append(newButton);
  }
  instrumentPattern.append(buttonGroup);
  document.querySelector('.instruments').append(instrumentPattern);
}
const tempo = document.querySelector("#tempo");
function setup() {
  hh = loadSound('assets/hat.ogg', () => {drums.loop()})
  clap = loadSound('assets/clap.ogg', () => {drums.loop()})
  kick = loadSound('assets/kick.ogg', () => {drums.loop()})
  hPat = patGrid[2];
  cPat = patGrid[1];
  kPat = patGrid[0];
  hPhrase = new p5.Phrase('hh', (time) => {hh.play(time)}, hPat);
  cPhrase = new p5.Phrase('clap', (time) => {clap.play(time)}, cPat);
  kPhrase = new p5.Phrase('kick', (time) => {kick.play(time)}, kPat);
  sPhrase = new p5.Phrase('seq', (time, beatIndex) => {
    // cnt = (cnt + 1) % 35;
    // let val = parseInt((cnt / 34) * 100);
    // progressBar.style.width=`${val}%`;
    // console.log(val);
  }, spat);
  drums = new p5.Part();
  drums.addPhrase(hPhrase)
  drums.addPhrase(cPhrase)
  drums.addPhrase(kPhrase)
  drums.addPhrase(sPhrase)
  drums.stop();
  tempo.addEventListener("input", () => {
    drums.setBPM(tempo.value);
    tempoNum.value = tempo.value;  
  })
  const tempoNum = document.querySelector("#tempoNum");
  tempoNum.addEventListener("change", () =>{
    drums.setBPM(tempoNum.value);  
    tempo.value = tempoNum.value;  
  })
}

function draw() {
  // background(220);
}

function touchStarted(){
  if(getAudioContext().state !== 'running'){
    getAudioContext().resume();
    drums.stop();
  }
}
// function keyPressed(){
//   if(key == " " ){
//     if(hh.isLoaded() && clap.isLoaded() && kick.isLoaded() ){
//       if(!drums.isPlaying){
//         drums.loop();
//         playButton.innerText = "Pause";
//         playButton.classList.toggle("pause");
//       }else{
//         drums.stop(); 
//         playButton.innerText = "Play";
//         playButton.classList.toggle("play");        
//       }
//     } 
//   }
// }
const playButton = document.querySelector(".play");
playButton.addEventListener("click", () =>{
  if(hh.isLoaded() && clap.isLoaded() && kick.isLoaded() ){
    if(!drums.isPlaying){
      drums.loop();
          playButton.innerText = "Pause";
          playButton.classList.toggle("pause");
        }else{
          drums.stop(); 
          playButton.innerText = "Play";
          playButton.classList.toggle("play");
        }
      }
    })
    