

const API = "https://openapi.programming-hero.com/api/levels/all";
const data = async () => {
    const res = await fetch(API);
    const jsondata = await res.json();
    displaybutton(jsondata.data);


}

const data_from_synonyms=(data)=>{
const htmlElements=data.map((el)=> ` <div class="border bg-[#b6d7f3] flex items-center justify-center"><p class="px-3 py-1">${el}</p></div>`)
  return(htmlElements.join(" "));




};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const DisplayCardByWords=(data)=>{
console.log(data);

    const my_modal_5=document.getElementById("my_modal_5");
    my_modal_5.innerHTML="";
    const div= document.createElement("div");
    div.innerHTML=`
    
    <div class="modal-box">
    <h3 class="text-lg font-bold">${data.word}</h3>
     <h3 class="text-lg font-semibold mt-2">Meaning</h3>
      <p class="py-1">${data.meaning}</p>
    <h3 class="text-lg font-semibold mt-2">Example</h3>
      <p class="py-1">${data.sentence}</p>
    <h3 class="text-lg font-semibold mt-2">সমার্থক শব্দ গুলো</h3>
      <div class="mt-3 gap-2 flex flex-wrap mx-5">
     
        ${data_from_synonyms(data.synonyms)}
      </div>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn bg-[#422AD5] text-white">Complete Learning</button>
      </form>
    </div>
  </div>
    
    `
my_modal_5.appendChild(div);

my_modal_5.showModal();
}
const DataofWord= async(id)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    const data= await res.json();
DisplayCardByWords(data.data);



}



const btnCollorset=(id)=>{


     for (let i = 1; i <=7; i++) {
        if(id===i) {
const btn=document.getElementById(`btn-${i}`);
btn.classList.add("bg-[#a499e7]");

        }
        else{
 const btn=document.getElementById(`btn-${i}`);
      
btn.classList.remove("bg-[#a499e7]");

        }
     
        
    }



}
const buttonsInfoCard = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    const data = await res.json();
    displaybtncards(data.data);

    btnCollorset(id);


}

const displaybtncards = (data) => {
    const buttonInfo = document.getElementById("buttonInfo");
    buttonInfo.innerHTML = "";

    if (data.length === 0) {
        const infodiv = document.createElement("div");
        infodiv.innerHTML = `
   <div class="card rounded-3xl flex flex-col items-center justify-center bg-blue-300 w-96  h-40 mx-5">
    <h2 class=" text-2xl font-medium mt-2 ">নেক্সট Lesson এ যান</h2>
    <p class="mt-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
 

     </div>
  
  `
        buttonInfo.appendChild(infodiv);
    }


    else {
        data.forEach(element => {

            const infodiv = document.createElement("div");
            infodiv.innerHTML = `
   <div class="card rounded-3xl flex flex-col items-center justify-center bg-blue-300 w-65 sm:w-70  h-60 mx-5">
    <h2 class=" text-2xl font-medium mt-2 mx-4 ">${element.word ? element.word : " Word not found "}</h2>
    <p class="mt-2 mx-4 ">Meaning /Pronounciation</p>
    <p class="mt-2 mx-4 ">"${element.meaning} / ${element.pronunciation}"</p>
 <div class="flex flex-row items-center gap-14 mt-10">
     
 <button onclick="DataofWord(${element.id})"><i class="fa-solid fa-exclamation"  ></i></button>
 <button onclick="pronounceWord('${element.word}')"><i class="fa-solid fa-headphones"></i></button>

 


      </div>
     </div>
  
  `
            buttonInfo.appendChild(infodiv);

        });
    }
}

const displaybutton = (data) => {
    const buttonsDiv = document.getElementById("buttonsDiv");
    buttonsDiv.innerHTML = ("");

    data.forEach(element => {
        const btndiv = document.createElement("div");
        btndiv.innerHTML = ` 

  
  <button id="btn-${element.level_no}" class="border-[#422AD5] hover:bg-[#a499e7] border-2 px-3 px- py-1 rounded-md" onclick="buttonsInfoCard(${element.level_no})"> 
    <p class="text-sm font-semibold text-[#422AD5]">leason - ${element.level_no}</p>
</button>
  `
        buttonsDiv.appendChild(btndiv);
    });
}
data();

