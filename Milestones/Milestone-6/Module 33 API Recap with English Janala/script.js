const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) // 👈 এখানে () দিতে হবে
    .then((data) => {
      // console.log(data);
      displayLesson(data);
    });
};

const displayLesson = (lessons) => {
  const lessonBtnDiv = document.getElementById("lesson-container");
  lessonBtnDiv.innerHTML = "";

  for (let data of lessons.data) {
    const lessonBtn = document.createElement("button");

    lessonBtn.innerHTML = `
      <span><i class="fa-solid fa-book-open"></i></span>
      Lesson-${data.level_no}
    `;

    lessonBtn.classList.add(
      "btn",
      "border-2",
      "border-blue-700",
      "bg-sky-50",
      "text-black",
    );

    lessonBtn.addEventListener("click", () => {
      // 1. সব button reset
      const allButtons = document.querySelectorAll("#lesson-container button");
      allButtons.forEach((btn) => {
        btn.classList.remove("bg-green-600", "text-white");
        btn.classList.add("bg-sky-50", "text-black");
      });

      // 2. clicked button active
      lessonBtn.classList.remove("bg-sky-50", "text-black");
      lessonBtn.classList.add("bg-green-600", "text-white");

      // 3. load data
      loadLevelWords(data.level_no);
    });

    lessonBtnDiv.appendChild(lessonBtn);
  }
};

const loadLevelWords = (id) => {
  manageSpinner(true);
  const URL = `https://openapi.programming-hero.com/api/level/${id}`;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayWordCard(data.data);
      // এখানে .data দিলে আসল array পাওয়া যাবে,
      // না দিলে পুরো response object চলে যাবে
      // যেটা loop বা UI render করার জন্য directly ব্যবহার করা যায় না
    });
};

const displayWordCard = (words) => {
  const wordCardContainer = document.getElementById("word-card-container");
  wordCardContainer.innerHTML = "";

  if (words.length == 0) {
    // alert('No words found for this lesson');
    const wordCard = document.createElement("div");
    wordCard.classList.add("col-span-full", "p-5");
    wordCard.innerHTML = `
              <span><i class="fa-duotone fa-solid fa-triangle-exclamation fa-4x"></i></span>
              <p class="font-bangla py-4">এই Lesson এ কোন vocabulary যুক্ত করা হয়নি</p> 
              <h1 class="text-3xl font-semibold font-bangla">নেক্সট Lesson-এ যান</h1>

    `;

    wordCardContainer.appendChild(wordCard);
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.classList.add(
      "px-3",
      "py-5",
      "md:py-15",
      "bg-white",
      "rounded-lg",
    );
    console.log(words.length);
    wordCard.innerHTML = `
               <div class="flex flex-col justify-center items-center gap-2 mb-2">
                    <h2 class="text-lg font-bold ${word.word ? "text-black" : "text-red-500"}">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                    <p class="text-sm">Meaning/Pronounciation</p>
                    <h3 class="font-bold font-bangla">
              <span class="${word.meaning ? "text-black" : "text-red-500"}">
               ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}
                       </span>
                        /
                        <span class="${word.pronunciation ? "text-black" : "text-red-500"}">
                  ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}
               </span>
                  </h3>
                                    </div>
                <div class="flex justify-between px-5">
                    <span onclick="loadWordDetails('${word.id}')"  class="bg-sky-100 py-1 px-2 rounded-md hover:bg-red-200 "><i class="fa-solid fa-circle-info "></i></span>
                    <span onclick="pronounceWord('${word.word}')" class="bg-sky-200 py-1 px-2 rounded-md hover:bg-red-200"><i class="fa-solid fa-volume-high"></i></span>
                    
                </div>
    `;

    wordCardContainer.appendChild(wordCard);
  });
  manageSpinner(false);
};

const loadWordDetails = (id) => {
  const URL = `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(URL);
  fetch(URL)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    displayWordDetails(data.data);
  })
}

const displayWordDetails = (word) => {
  const wordDetailsContainer = document.getElementById('word-details-container');
  console.log(word);
  wordDetailsContainer.innerHTML = `
    <div class="border rounded-md border-blue-200 shadow-md p-4">
          <h1 class="text-3xl font-semibold font-bangla">${word.word} (<span><i class="fa-solid fa-microphone-lines"></i></span>${word.pronunciation})
          </h1>
          <h3 class="text-xl font-semibold font-bangla pt-4 pb-2">Meaning</h3>
          <h3 class="text-xl font-bangla py-3">${word.meaning}</h3>
          <h3 class="text-xl font-semibold font-bangla py-2">Example</h3>
          <h3 class="text-xl  font-bangla py-3">${word.sentence}</h3>
          <h3 class="text-2xl  font-bangla py-3">সমার্থক শব্দ গুলো</h3>
          <ul class="flex gap-2">
            ${word.synonyms.map((synonym) => `<li class="btn bg-sky-100">${synonym}</li>`).join("")}
          </ul>
        </div>
        <div class="modal-action  justify-start ">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn  btn-primary px-6 rounded-lg font-bangla text-xl">Complete Learning</button>
          </form>
        </div>
  `;
  my_modal_5.showModal();

}


const manageSpinner = (isLoading)=>{

  if(isLoading == true){
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('word-card-container').classList.add('hidden');
  }
  else{
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('word-card-container').classList.remove('hidden');
  }
}


document.getElementById('search-input')
  .addEventListener('keydown', (event) => {

    if (event.key === "Enter") {
      console.log("Enter pressed");
      const searchText = event.target.value.toLowerCase();
      console.log(searchText);

      fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          const allWords = data.data;
          const filteredWords = allWords.filter((word) =>
            word.word.toLowerCase().includes(searchText)
          );
          console.log(filteredWords);
          displayWordCard(filteredWords);
        });

        // 1. সব button reset
      const allButtons = document.querySelectorAll("#lesson-container button");
      allButtons.forEach((btn) => {
        btn.classList.remove("bg-green-600", "text-white");
        btn.classList.add("bg-sky-50", "text-black");
      });
    }

  });

  function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}




// QA
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const btn = item.querySelector(".toggle-btn");
  const answer = item.querySelector(".faq-answer");

  btn.addEventListener("click", () => {
  answer.classList.toggle("hidden");
  btn.textContent = answer.classList.contains("hidden") ? "+" : "-";
});
});


loadData();

