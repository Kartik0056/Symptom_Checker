document.addEventListener("DOMContentLoaded", function () {
  const agreeCheckbox = document.getElementById("agreeCheckbox");
  const agreeBtn = document.getElementById("agreeBtn");
  const symptomRange = document.getElementById("symptomRange");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById('backBtn')
  const sections = document.querySelectorAll(".disease-section");
  const tabs = document.querySelectorAll(".options-li")
  const tagsContainer = document.getElementById("tag-add");
  const resetBtn = document.getElementById('resetBtn')

  const selectedDiagnoses = []; // Initialize the array 
  agreeCheckbox.addEventListener("change", () => {

    if (agreeBtn.disabled = !agreeCheckbox.checked) {
      // console.log(agreeBtn)
      agreeBtn.style.background = "rgb(174, 177, 177)"
      agreeBtn.style.color = "#fff"

    }
    else {
      agreeBtn.style.background = "#0c5f96"
      agreeBtn.style.color = "#fff"


    }
  });


  symptomRange.addEventListener("input", () => {
    const value = symptomRange.value;
    symptomRange.setAttribute("value", value); // Corrected this line
    nextBtn.textContent = value;
  });


  let currentSectionIndex = 0;
  let currentIndex = 0;
  function showSection(index) {
    sections.forEach((section, idx) => {
      if (idx === index) {

        section.style.display = "block";
      } else {

        section.style.display = "none";
      }
    });
  }


  const radioDiv = document.querySelectorAll('.use_radio_div')
  const answers = {};

  function updateButtonStates() {
    if (currentSectionIndex === 0) {
      backBtn.disabled = true;
      backBtn.style.border = "2px solid #ccc";
      backBtn.style.color = "#ccc";

    } else {
      backBtn.disabled = false;
      backBtn.style.border = "2px solid #0c5f96";
      backBtn.style.color = "#0c5f96";
    }

    if (currentSectionIndex === sections.length - 2) {
      agreeBtn.setAttribute("value", "Finish");
      agreeBtn.setAttribute("class", "finishBtn")
      agreeBtn.type = "submit";

      // console.log("this is finish button",agreeBtn.value)
      // Use setTimeout to ensure that the DOM is updated before querying for '.finishBtn'

      const finishBtn = document.querySelector('.finishBtn')
      const patientGenrder = document.getElementById('patient-gender')
      const patientAge = document.getElementById('patient-age')
      const maleInput = document.getElementById('male-input')
      const femaleInput = document.getElementById('female-input')

      finishBtn.addEventListener('click', function () {
        backBtn.style.display = "none"
        //Finish Page
        const diseaseSymptomPercentage = {};

        // Function to calculate the percentage for a disease
        function calculatePercentage(disease, newli) {
          const totalSymptoms = diseases[disease].length;
          const matchingSymptoms = Array.from(newli).filter(newlis =>
            diseases[disease].includes(newlis.innerText)
          ).length;
          return (matchingSymptoms / totalSymptoms) * 100;
        }

        // Check if it's the last section
        // Check if it's the last section
        if (currentSectionIndex === sections.length - 1) {
          const newli = document.querySelectorAll('.new-list');
          const li = document.querySelectorAll('.tag-list-li');

          for (const disease in diseases) {
            diseaseSymptomPercentage[disease] = calculatePercentage(disease, newli);
          }

          // Display symptom percentages for each disease
          const diseasePercentageContainer = document.querySelectorAll('.disease_name_n');

          for (const disease in diseaseSymptomPercentage) {
            const percentage = diseaseSymptomPercentage[disease];

            // Create a container for each disease's percentage
            const diseasePercentageDiv = document.createElement('div');
            diseasePercentageDiv.className = 'disease-percentage';

            // Create elements to display disease name and percentage
            const diseaseName = document.createElement('span');

            // diseaseName.textContent = `${disease}:`;
            const diseasePercentageValue = document.createElement('span');
            diseasePercentageValue.className = 'spanPer';
            diseasePercentageValue.textContent = `Possibilities : ${percentage.toFixed(2)}%`;

            // Append elements to the container
            diseasePercentageDiv.appendChild(diseaseName);
            diseasePercentageDiv.appendChild(diseasePercentageValue);

            // Append the container to the corresponding disease_name_n element
            const correspondingContainer = Array.from(diseasePercentageContainer).find(container =>
              container.querySelector('.allDisease').textContent === disease
            );
            if (correspondingContainer) {
              correspondingContainer.appendChild(diseasePercentageDiv);
            }
          }
        }


        //End


        const selectedValue = getSelectedValue();
        if (selectedValue) {
          displayValue(selectedValue);
        }

        // Retrieve symptomRange value
        const symptomRange = document.getElementById('symptomRange');
        const selectedAge = symptomRange.value;

        // Append age to patient age
        patientAge.textContent = `Patient Age: ${selectedAge}`;

        // Append gender to patient gender
        const selectedGender = getSelectedValue();
        patientGenrder.textContent = `Patient Gender: ${selectedGender}`;



        // Append questions and answers
        const finalPage = document.querySelector('.details');
        const questionContainers = document.querySelectorAll('.radioButtonDiv');
        const answers = {};

        questionContainers.forEach((container) => {
          const question = container.querySelector('h3').textContent;
          const radioInputs = container.querySelectorAll('input[type="radio"]');
          radioInputs.forEach((radioInput) => {
            if (radioInput.checked) {
              answers[question] = radioInput.value;
            }
          });
        });

        for (const question in answers) {
          const answer = answers[question];
          const newDiv = document.createElement('div');
          newDiv.classList.add('quetion-display');
          newDiv.innerHTML = `<p>${question}</p>`;
          var p = document.createElement('p');
          p.className = 'newP';
          p.innerText = `${answer}`;
          newDiv.appendChild(p);
          finalPage.appendChild(newDiv);
        }
        // Finsh 



        function getSelectedValue() {
          if (maleInput.checked) {
            return "Male";
          } else if (femaleInput.checked) {
            return "Female";
          }
          return null;
        }

        function displayValue(category, value) {
          patientGenrder.textContent = `Patient Gender: ${category}`;

        }
      });

      //End here






    }


    else if (currentSectionIndex === 0) {
      agreeBtn.setAttribute("value", "Next");
      agreeBtn.removeAttribute("class");
      agreeCheckbox.checked = false
      agreeBtn.disabled = true;
      agreeBtn.style.background = "rgb(174, 177, 177)"
      agreeBtn.style.color = "#fff"
      agreeBtn.addEventListener("click", () => {

        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          showSection(currentSectionIndex);
          updateButtonStates();

          agreeBtn.disabled = false;
          agreeBtn.style.backgroundColor = "#0c5f96"
          agreeBtn.style.color = "#fff";
          console.log(currentSectionIndex)

        }

        currentIndex = (currentIndex + 1) % tabs.length;

        // Add the border to the next tab
        tabs[currentIndex].classList.add("selected");

      });

    }


    else if (currentSectionIndex === sections.length - 1) {
      agreeBtn.setAttribute("value", "Retry");
      agreeBtn.classList.add('reset')
      agreeBtn.type = "reset";

      const rstBtn = document.querySelector('.reset')
      rstBtn.addEventListener('click', resetFunction)
      // console.log(rstBtn)
      function resetFunction() {
        currentSectionIndex = 0;
        showSection(currentSectionIndex);

        updateButtonStates();

        tabs.forEach(tab => tab.classList.remove("selected"));
        tabs[0].classList.add("selected");

        currentIndex = 0;
        // Remove the following line to prevent page refresh
        location.reload();
      }

    }

    if (currentSectionIndex == 4) {

      // Highlight elements with class 'new-List'
      const newli = document.querySelectorAll('.disease-li');
      const li = document.querySelectorAll('.tag-list-li');

      for (let i of li) {
        const liText = i.innerText;
        for (let j of newli) {
          const newliText = j.innerText;
          if (newliText === liText) {
            j.classList.add('new-List');


          }
        }
      }


    }

    else {
      // agreeBtn.setAttribute('value','Next');
      agreeBtn.setAttribute('type', 'button')
    }

    agreeBtn.addEventListener('click', function () {
      agreeBtn.disabled = true;
      agreeBtn.style.background = "rgb(174, 177, 177)"
      agreeBtn.style.color = "#fff"
      if (currentSectionIndex === sections.length - 1) {
        agreeBtn.disabled = false;
        agreeBtn.style.background = "#0c5f96"
        agreeBtn.style.color = "#fff"
      }
    })


  }

  showSection(currentSectionIndex);
  updateButtonStates();

  backBtn.addEventListener("click", (event) => {

    currentSectionIndex--;
    showSection(currentSectionIndex);
    updateButtonStates();
    tabs[currentIndex].classList.remove("selected");

    // Decrement the index for the previous tab
    currentIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    // console.log(currentIndex)
    // Prevent the default behavior of the back button (e.g., page refresh)
    event.preventDefault();

    // Restore the button style
    agreeBtn.disabled = true;
    agreeBtn.style.background = "rgb(174, 177, 177)";
    agreeBtn.style.color = "#fff";

    //For Gender Radio 

    var genderRadio = document.querySelector('.gender-sec')
    const radioButtons1 = genderRadio.querySelectorAll('input[type="radio"]');
    let checkedCount1 = 0;

    radioButtons1.forEach((radioInput) => {
      radioInput.addEventListener('change', () => {

        // console.log(radioButtons1.length)
        if (radioInput.checked) {
          // console.log("checked",radioInput)
          checkedCount1++;
        } else {
          checkedCount1--;
        }
        // Enable the "Next" button when all radio buttons are checked
        if (checkedCount1 === radioButtons1.length - 1) {
          agreeBtn.disabled = false;
          agreeBtn.style.background = "#0c5f96"
          agreeBtn.style.color = "#fff"
        }
      });
    });

  });



  const questions = [
    {
      question: "I am overweight",
      name: "overweight",
      options: [" Yes", " No", " I don't know "]
    },
    {
      question: "I smoke cigarettes",
      name: "cigarettes",
      options: [" Yes ", " No ", " I don't know "]
    },
    {
      question: "I have been recently injured",
      name: "injured",
      options: [" Yes", " No ", " I don't know "]
    },
    {
      question: "I have high cholesterol",
      name: "cholesterol",
      options: [" Yes ", " No ", " I don't know "]
    },
    {
      question: "I have hypertension",
      name: "hypertension",
      options: [" Yes ", " No ", " I don't know "]
    },
    {
      question: "I have diabetes",
      name: "diabetes",
      options: [" Yes ", " No ", " I don't know "]
    }
  ];

  // Get the questionnaire container
  var questionnaireContainer = document.getElementById('questionnaire');


  // Function to load questions from local storage
  function loadQuestions() {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || questions;
    return storedQuestions;
  }

  // Function to save questions to local storage
  function saveQuestions(questions) {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  // Function to generate questions and update local storage

  function generateQuestions() {
    const storedQuestions = loadQuestions();

    storedQuestions.forEach((questionObject, index) => {

      const questionDiv = document.createElement("div");
      questionDiv.className = "radioButtonDiv";

      const questionHeader = document.createElement("h3");
      questionHeader.setAttribute('class', 'questions');
      questionHeader.textContent = `${index + 1}. ${questionObject.question}`;
      // console.log(questionObject);
      const form = document.createElement("form");
      form.className = "form-element";

      questionObject.options.forEach((option) => {
        const radioDiv = document.createElement("div");
        radioDiv.className = "use_radio_div";

        const radioInput = document.createElement("input");
        radioInput.className = "usa-radio__input";
        radioInput.type = "radio";
        radioInput.name = questionObject.name;
        radioInput.value = option;
        radioInput.required = true;

        const radioLabel = document.createElement("label");
        radioLabel.className = "usa-radio__label";
        radioLabel.textContent = option;

        radioDiv.appendChild(radioInput);
        radioDiv.appendChild(radioLabel);
        form.appendChild(radioDiv);
      });

      questionDiv.appendChild(questionHeader);
      questionDiv.appendChild(form);

      questionnaireContainer.appendChild(questionDiv);
    });
  }

  // Call the function to generate and display all questions
  generateQuestions();

  // To update and save the questions to local storage
  saveQuestions(questions);


  var formRadio = document.querySelectorAll('.form-element');
  const groupCheckedStatus = Array(formRadio.length).fill(false);

  formRadio.forEach((g, groupIndex) => {
    const radioButtons = g.querySelectorAll('input[type="radio"]');

    radioButtons.forEach((radioInput) => {
      radioInput.addEventListener('change', () => {
        // Check if at least one radio button in the current group is checked
        const atLeastOneChecked = Array.from(radioButtons).some((input) => input.checked);

        // Update the checked status for the current group
        groupCheckedStatus[groupIndex] = atLeastOneChecked;

        // Enable the "Next" button when at least one radio button is checked in each group
        if (groupCheckedStatus.every((status) => status)) {
          agreeBtn.style.background = "#0c5f96";
          agreeBtn.style.color = "#fff";
          agreeBtn.disabled = false;
        } else {
          agreeBtn.style.background = "";
          agreeBtn.style.color = "";
          agreeBtn.disabled = true;
        }
      });
    });
  });
  var genderRadio = document.querySelector('.gender-sec')
  const radioButtons1 = genderRadio.querySelectorAll('input[type="radio"]');
  let checkedCount1 = 0;

  radioButtons1.forEach((radioInput) => {
    radioInput.addEventListener('change', () => {
      // console.log(radioButtons1.length)
      if (radioInput.checked) {
        // console.log("checked",radioInput)
        checkedCount1++;
      } else {
        checkedCount1--;
      }
      // Enable the "Next" button when all radio buttons are checked
      if (checkedCount1 === radioButtons1.length - 1) {
        agreeBtn.disabled = false;
        agreeBtn.style.background = "#0c5f96"
        agreeBtn.style.color = "#fff"
      }
    });
  });

  //   Add Disease By tag

  optionsData.forEach(optionText => {
    const option = document.createElement("li");
    option.classList.add("options-li-new");
    option.textContent = optionText;
    optionsContainer.querySelector(".options-ul").appendChild(option);
  });

  const options = document.querySelectorAll(".options-li-new");

  searchBar.addEventListener("input", () => {
    const searchValue = searchBar.value.toLowerCase();
    options.forEach((option) => {
      const optionText = option.textContent.toLowerCase();
      if (optionText.includes(searchValue)) {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    });
  });

  let setags = document.getElementById('tagsContainer')
  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (!option.classList.contains("selected")) {
        // console.log('this options',option);
        option.classList.add("selected");
        const tag = document.createElement("div");
        tag.classList.add("selected-tag");
        const closebtn = document.createElement('button');
        const ul = document.createElement('ul');
        ul.className = "tag-list-ul";
        const li = document.createElement('li');
        li.className = "tag-list-li new-list";
        closebtn.className = "closebtn";
        closebtn.innerHTML = "&times;";
        agreeBtn.disabled = false;
        agreeBtn.style.background = "#0c5f96"
        agreeBtn.style.color = "#fff"
        tag.appendChild(ul);
        ul.appendChild(li);
        li.textContent = option.textContent;
        tag.appendChild(closebtn);
        closebtn.addEventListener("click", () => {
          setags.removeChild(tag);
          option.classList.remove("selected");
        });
        setags.appendChild(tag);

        // tagsContainer.appendChild(tag);
        resetBtn.addEventListener('click', function () {
          setags.removeChild(tag);
          option.classList.remove("selected");
        });
      }
    });

  });
  //Data Symptom Disease
  //New
  const diseaseContainer = document.getElementById('diseaseContainer');

  // Loop through diseases and their symptoms

  for (const disease in diseases) {
    const diseaseDiv = document.createElement('div');
    diseaseDiv.className = 'disease-box';

    const symptomsList = document.createElement('ul');
    symptomsList.className = 'disease-names';

    // Initialize counters for symptom occurrences
    const symptomOccurrences = {};

    for (const symptom of diseases[disease]) {
      // Count the occurrences of each symptom for the current disease
      if (symptom in symptomOccurrences) {
        symptomOccurrences[symptom]++;
      } else {
        symptomOccurrences[symptom] = 1;
      }
      const symptomItem = document.createElement('li');
      symptomItem.className = 'disease-li';
      symptomItem.textContent = symptom;
      symptomsList.appendChild(symptomItem);
      // console.log("Symptom length==",symptom)

      // return symptom

    }


    // Calculate the total number of symptoms for the disease
    const totalSymptoms = Object.values(symptomOccurrences).reduce((acc, count) => acc + count, 0);

    // Calculate the percentage for the disease
    const diseasePercentage = (totalSymptoms / Object.keys(diseases).length) * 100;
    // console.log("Disease = =", symptomOccurrences);
    diseaseDiv.innerHTML = `<div class="disease_name_n"><h2 class="allDisease">${disease}</h2> <a class="diseaseLink" href='https://en.wikipedia.org/wiki/${disease}'>ⓘ</a> </div>`;

    diseaseDiv.appendChild(symptomsList);
    diseaseContainer.appendChild(diseaseDiv);
  }


  //End

});