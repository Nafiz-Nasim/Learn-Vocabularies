

const API = "https://openapi.programming-hero.com/api/levels/all";
const data = async () => {
    const res = await fetch(API);
    const jsondata = await res.json();
    displaybutton(jsondata.data);


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
   <div class="card rounded-3xl flex flex-col items-center justify-center bg-amber-200 w-96  h-40 mx-5">
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
   <div class="card rounded-3xl flex flex-col items-center justify-center bg-amber-200 w-65 sm:w-70  h-60 mx-5">
    <h2 class=" text-2xl font-medium mt-2 mx-4 ">${element.word ? element.word : " Word not found "}</h2>
    <p class="mt-2 mx-4 ">Meaning /Pronounciation</p>
    <p class="mt-2 mx-4 ">"${element.meaning} / ${element.pronunciation}"</p>
 <div class="flex flex-row items-center gap-14 mt-10">
     
 <button onclick="my_modal_5.showModal()"><i class="fa-solid fa-exclamation"  ></i></button>
 <button><i class="fa-solid fa-headphones"></i></button>

 


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

