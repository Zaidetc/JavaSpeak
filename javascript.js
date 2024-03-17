// Prevent direct relode
window.addEventListener("beforeunload", function (event) {
  // Cancel the event
  event.preventDefault();
  // Chrome requires returnValue to be set
  event.returnValue = "";

  // Prompt the user
  const message = "Are you sure you want to leave?";
  event.returnValue = message; // For Chrome
  return message; // For other browsers
});

// Text TO Speech (start ↓)
textToSpeech();
function textToSpeech(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = synth.getVoices();
  const chosenVoice = voices.find(
    (voice) => voice.name === "Microsoft Ravi - English (India)"
  );

  if (chosenVoice) {
    utterance.voice = chosenVoice;
    synth.speak(utterance);
  } else {
    synth.onvoiceschanged = function () {
      const voices = synth.getVoices();
      const chosenVoice = voices.find(
        (voice) => voice.name === "Microsoft Ravi - English (India)"
      );

      if (chosenVoice) {
        utterance.voice = chosenVoice;
        synth.speak(utterance);
      }
    };
  }
}

// different voices - Microsoft Heera - English (India) //  Microsoft Ravi - English (India) // Google हिन्दी

// Text TO Speech (End ↑)

// Floting logo  (Start ↓)

let name;
function createFlyingLogos(numLogos, logoData) {
  const container = document.querySelector(".container_logo");

  // Loop to create logos
  for (let i = 0; i < numLogos; i++) {
    const logo = document.createElement("img");
    logo.src = logoData[i % logoData.length].url;
    logo.classList.add("logo");
    logo.alt = "Logo";
    logo.dataset.name = logoData[i % logoData.length].name; // Assigning name to the logo
    container.appendChild(logo);

    // Starting position for each logo
    let posX, posY;

    // Assigning different starting positions based on logo index
    if (i === 0) {
      posX = 0; // Adjust as needed
      posY = 0; // Adjust as needed
    } else if (i === 1) {
      posX = 1000; // Adjust as needed
      posY = 0; // Adjust as needed
    } else if (i === 2) {
      posX = 1400; // Adjust as needed
      posY = 700; // Adjust as needed
    }

    logo.style.left = posX + "px";
    logo.style.top = posY + "px";

    let isDragging = false;
    let offsetX, offsetY;
    let velX = 0.45;
    let velY = 0.45;

    // Event listener for when mouse is pressed or touch is started on a logo
    logo.addEventListener("mousedown", startDragging);
    logo.addEventListener("touchstart", startDragging);

    // Function to start dragging the logo
    function startDragging(event) {
      event.preventDefault(); // Prevent default mouse or touch event behavior
      isDragging = true;
      const boundingRect = logo.getBoundingClientRect();
      if (event.type === "mousedown") {
        offsetX = event.clientX - boundingRect.left;
        offsetY = event.clientY - boundingRect.top;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      } else if (event.type === "touchstart") {
        offsetX = event.touches[0].clientX - boundingRect.left;
        offsetY = event.touches[0].clientY - boundingRect.top;
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);
      }
    }

    // Function to handle mouse movement while dragging
    function onMouseMove(event) {
      if (isDragging) {
        posX = event.clientX - offsetX;
        posY = event.clientY - offsetY;
        moveLogo();
      }
    }

    // Function to handle touch movement while dragging
    function onTouchMove(event) {
      if (isDragging) {
        posX = event.touches[0].clientX - offsetX;
        posY = event.touches[0].clientY - offsetY;
        moveLogo();
      }
    }

    // Function to move the logo to the new position
    function moveLogo() {
      logo.style.left = posX + "px";
      logo.style.top = posY + "px";
    }

    // Function to handle mouse release or touch end after dragging
    function onMouseUp(event) {
      finishDragging();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    // Function to handle touch end after dragging
    function onTouchEnd(event) {
      finishDragging();
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    }

    // Function to finish dragging the logo
    function finishDragging() {
      isDragging = false;
      // Check if logo is dropped onto the particular div
      const targetDiv = document.querySelector(".robot_mouth");
      const targetRect = targetDiv.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();

      if (
        logoRect.left >= targetRect.left - 50 &&
        logoRect.right <= targetRect.right + 50 &&
        logoRect.top >= targetRect.top - 50 &&
        logoRect.bottom <= targetRect.bottom + 50
      ) {
        // Remove all logos from the container
        container.innerHTML = "";
        // Call the function to handle the selected logo
        handleSelectedLogo(logo.dataset.name);
        document.querySelector("#scrollingtxt").style.display = "none";
        document.querySelector("#chat_container").style.display = "none";
        startCountdown();
      }
    }

    // Function to update logo position
    function update() {
      if (!isDragging) {
        posX += velX;
        posY += velY;

        if (posX <= 0 || posX + logo.clientWidth >= window.innerWidth) {
          velX *= -1;
          posX = Math.min(
            Math.max(posX, 0),
            window.innerWidth - logo.clientWidth
          );
        }
        if (posY <= 0 || posY + logo.clientHeight >= window.innerHeight) {
          velY *= -1;
          posY = Math.min(
            Math.max(posY, 0),
            window.innerHeight - logo.clientHeight
          );
        }

        moveLogo(); // Move logo to the new position
      }

      requestAnimationFrame(update);
    }

    update(); // Initial call to start updating logo position
  }
}

// Example function to handle the selected logo

// Example data for logos (name and URL)
const logoData = [
  { name: "javascript", url: "/Images/js.png" },
  { name: "css", url: "/Images/css.png" },
  { name: "html", url: "/Images/html.png" },
];
// Example usage with logo data

createFlyingLogos(3, logoData);

// Typing Effect (Start ↓)

// function typeMessage(message, divId) {
//   var notification = document.getElementById(divId);
//   var index = 0;
//   notification.textContent = "";

//   function type() {
//     if (index < message.length) {

//       notification.textContent += message.charAt(index);
//       index++;
//       setTimeout(type, 100);
//     }
//   }

//   notification.style.display = "block";
//   type();

//   return false;
// }

// Typing Effect (End ↑)

//------------------------------------------------------------------------------------------------------------------------------------

// Title Case (Start ↓)

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Title Case (End ↑)

//------------------------------------------------------------------------------------------------------------------------------------

// ZoomOut Effect of Robot  (Start ↓)

let nameInputValue;
function ZoomOut(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const myDiv = document.getElementById("robot_container");
  const myName = document.getElementById("form_container");
  nameInputValue = document.getElementById("name").value;

  myDiv.style.transform = "scale(1)";

  myName.style.display = "none";

  setTimeout(() => {
    const cloudSmall1 = document.querySelector("#cloud_small1");
    cloudSmall1.style.zIndex = "3";
    const cloudSmall2 = document.querySelector("#cloud_small2");
    cloudSmall2.style.zIndex = "3";
    const logo_container = document.querySelector(".container_logo");
    logo_container.style.zIndex = "5";
  }, 900);

  nameInputValue = titleCase(nameInputValue);

  setTimeout(function () {
    textToSpeech(`Welcome ..To JavaSpeak ${nameInputValue}`);
  }, 700);

  typeMessage(`Welcome To JavaSpeak ${nameInputValue}`, "welcomeMessage");

  return false;
}

// ZoomOut Effect of Robot (End ↑)

//------------------------------------------------------------------------------------------------------------------------------------

//Question & Answer(start ↓)

const questionAndAnswers = {
  javascript: [
    {
      // Question 1
      question: "What Is JavaScript?",
      questionSpeak: "What Is  JavaScript?",

      answer:
        "*JavaScript is a lightweight high-level interpreted programming language primarily utilized for scripting webpages. *It is widely used in both front-end and back-end web development to add interactivity and dynamic behavior to websites.",
      keywords:
        "JavaScript lightweight high level interpreted programming language scripting web pages interactivity and dynamic behaviour",
    },
    {
      // Question 2
      question: "What are the key features of JavaScript?",
      questionSpeak: "What are the key features of JavaScript",

      answer:
        "*Dynamic typing, prototype-based object-oriented programming, first-class functions, closures, and asynchronous programming with promises and async/await.",
      keywords:
        "Dynamic typing object-oriented programming first-class functions closures asynchronous programming",
    },
    {
      // Question 3
      question: "What are the different data types in JavaScript?",
      questionSpeak: "What are the different data types in JavaScript?",

      answer:
        "*Primitive data types: undefined, null, boolean, number, string, symbol. *Non-primitive data type: object.",
      keywords:
        "Primitive data types: undefined, null, boolean, number, string, symbol. Non-primitive data type: object.",
    },
    {
      // Question 4
      question: "What is the difference between null and undefined?",
      questionSpeak: "What is the difference between null and undefined",

      answer:
        "*Null represents the intentional absence of any value, explicitly indicating that a variable or object does not currently have a value or does not exist. *Undefined indicates that a variable has been declared but hasn't been assigned a value yet.",
      keywords:
        "absence of any value indicating that a variable or object does not currently have a value or does not exist undefined indicates that a variable has been declared assigned a value yet",
    },
    {
      // Question 5
      question: "What is the DOM?",
      questionSpeak: "What is the Doam ",

      answer:
        "*The Document Object Model is a programming interface for web documents that represents the structure of an HTML, XML, or SVG document as a tree of objects, allowing dynamic interaction with document content using scripting languages like JavaScript.",
      keywords:
        "Document Object Model programming interface web represents structure HTML tree of objects",
    },
    {
      // Question 6
      question: "What is the difference between == and ===?",
      questionSpeak:
        "What is the difference between double equalto and triple equalto?",

      answer:
        "*The double equalto (==) operator check equality only, whereas triple equalto (===) check equality and data type, meaning a value must be of the same type.",
      keywords:
        "double equalto triple equalto check checks equality only same data type",
    },
    {
      // Question 7
      question: "What is function in javascript?",
      questionSpeak: "What is function in javascript?",

      answer:
        "*Functions are one of the fundamental building blocks in JavaScript. It is a set of statements that perform a task or calculate a value. *We can call function many times to reuse the code with different arguments, to produce different results.",
      keywords:
        "fundamental building blocks set of statements perform task reuse the code function many times",
    },
    {
      // Question 8
      question:
        "What is the difference between parameters and arguments in JavaScript?",
      questionSpeak:
        "What is the difference between parameters and arguments in JavaScript?",

      answer:
        "*Parameters are variables declared in a function's declaration. *Arguments are the actual values passed to a function when it is called.",
      keywords:
        "Parameters variables declared function's declaration Arguments actual values passed function called",
    },
    {
      // Question 9
      question: "What is the difference between let, var, and const?",
      questionSpeak: "What is the difference between let, var, and const?",

      answer:
        "*Var has function scope and can be re-declared within the same scope. *let and const have block scope, and const additionally prevents re-assignment after initialization.",
      keywords:
        "function scope redeclared same scope var let and const have block scope reassignment",
    },
    {
      // Question 10
      question: "What are arrow functions in JavaScript?",
      questionSpeak: "What are arrow functions in JavaScript?",

      answer:
        "*Arrow functions are a shorthand syntax for writing function expressions in JavaScript. *They have a more concise syntax compared to traditional function expressions and lexically bind the this value.",
      keywords:
        "Arrow shorthand syntax for writing function expressions in JavaScript",
    },
    // Add more question-answer pairs as needed
  ],

  html: [
    {
      // Question 1
      question: "What is HTML?",
      questionSpeak: "What is HTML?",

      answer:
        " *HTML stands for HyperText Markup Language. *It is the standard markup language used to create and design web pages. *HTML describes the structure of a web page using various elements and tags.",
      keywords:
        "HTML HyperText Markup Language web pages structure elements tags",
    },
    {
      // Question 2
      question: "What are the main building blocks of HTML?",
      questionSpeak: "What are the main building blocks of HTML?",

      answer:
        " *The main building blocks of HTML are elements. *An HTML element is everything from the start tag to the end tag, including the tags themselves and the content between them.",
      keywords: "main building blocks elements start tag end tag content",
    },
    {
      // Question 3
      question: "What are the different types of headings in HTML?",
      questionSpeak: "What are the different types of headings in HTML?",

      answer:
        " *HTML provides six levels of headings, from <h1> to <h6>. *These headings represent hierarchical structure, with <h1> being the highest level and <h6> being the lowest level.",
      keywords: "six levels headings hierarchical structure",
    },
    {
      // Question 4
      question: "What is the purpose of HTML attributes?",
      questionSpeak: "What is the purpose of HTML attributes?",

      answer:
        " *HTML attributes provide additional information about HTML elements. *They are used to modify the behavior or appearance of an element and provide metadata about the element.",
      keywords:
        "purpose attributes additional information modify behavior appearance metadata",
    },
    {
      // Question 5
      question: "What is the difference between <div> and <span> elements?",
      questionSpeak: "What is the difference between div and span elements?",

      answer:
        " *<div> is a block-level element that represents a division or section in an HTML document. *<span> is an inline-level element used to group inline elements in a document.",
      keywords:
        "difference block-level element division section inline-level element group inline elements",
    },
    {
      // Question 6
      question: "What is the purpose of HTML forms?",
      questionSpeak: "What is the purpose of HTML forms?",

      answer:
        " *HTML forms are used to collect user input. *They allow users to input data that can be submitted to a server for processing.",
      keywords: "purpose forms collect user input submitted server processing",
    },
    {
      // Question 7
      question: "What is the role of the <a> tag in HTML?",
      questionSpeak: "What is the role of the a tag in HTML?",

      answer:
        " *The <a> tag is used to create hyperlinks in HTML documents. *It allows users to navigate between different web pages by clicking on the link.",
      keywords: "role hyperlink navigate web pages clicking",
    },
    {
      // Question 8
      question: "What are semantic HTML elements?",
      questionSpeak: "What are semantic HTML elements?",

      answer:
        " *Semantic HTML elements provide meaning to the content they surround. *They convey information about the structure of the document, making it more accessible to both users and search engines.",
      keywords:
        "semantic meaning content structure accessible users search engines",
    },
    {
      // Question 9
      question: "What is the purpose of the <img> tag?",
      questionSpeak: "What is the purpose of the img tag?",

      answer:
        " *The <img> tag is used to insert images into an HTML document. *It specifies the location of the image file using the src attribute and provides alternative text for accessibility using the alt attribute.",
      keywords:
        "purpose insert images location file src attribute alternative text accessibility alt attribute",
    },
    {
      // Question 10
      question: "What is the purpose of the <table> tag?",
      questionSpeak: "What is the purpose of the table tag?",

      answer:
        " *The <table> tag is used to create tables in HTML documents. *It allows for the display of tabular data, organized into rows and columns.",
      keywords:
        "purpose create tables display tabular data organized rows columns",
    },
    // Add more question-answer pairs as needed
  ],

  css: [
    {
      // Question 1
      question: "What is CSS?",
      questionSpeak: "What is CSS?",

      answer:
        " *CSS stands for Cascading Style Sheets. *It is a style sheet language used to describe the presentation of a document written in HTML or XML, including colors, layout, and fonts.",
      keywords: "CSS Cascading Style Sheets presentation colors layout fonts",
    },
    {
      // Question 2
      question: "What are the different ways to include CSS in a webpage?",
      questionSpeak: "What are the different ways to include CSS in a webpage?",

      answer:
        " *CSS can be included in a webpage using three methods: *External CSS: linking an external CSS file using the <link> element. *Internal CSS: embedding CSS rules within the <style> element in the <head> section of the HTML document. *Inline CSS: applying CSS styles directly to HTML elements using the style attribute.",
      keywords:
        "include CSS webpage External CSS linking <link> element Internal CSS embedding <style> element Inline CSS applying styles directly style attribute",
    },
    {
      // Question 3
      question: "What are the different types of CSS selectors?",
      questionSpeak: "What are the different types of CSS selectors?",

      answer:
        " *CSS selectors are patterns used to select and style HTML elements. *Some common types of CSS selectors include: *Element selectors, Class selectors, ID selectors, Universal selectors, Attribute selectors, and Pseudo-class selectors.",
      keywords:
        "types selectors patterns select style Element Class ID Universal Attribute Pseudo-class",
    },
    {
      // Question 4
      question: "What is the box model in CSS?",
      questionSpeak: "What is the box model in CSS?",

      answer:
        " *The CSS box model is a design concept used to describe the layout and design of elements in a webpage. *It consists of four main components: *Content: the actual content of the element. *Padding: the space between the content and the border. *Border: a visible boundary around the padding. *Margin: the space outside the border, creating space between elements.",
      keywords:
        "box model layout design elements Content Padding Border Margin space between",
    },
    {
      // Question 5
      question: "What is the difference between margin and padding?",
      questionSpeak: "What is the difference between margin and padding?",

      answer:
        " *Padding is the space between the content of an element and its border. *Margin is the space outside the border of an element, creating space between the element and other elements.",
      keywords: "difference space content border outside creating other",
    },
    {
      // Question 6
      question: "What is the purpose of media queries in CSS?",
      questionSpeak: "What is the purpose of media queries in CSS?",

      answer:
        " *Media queries in CSS allow for the implementation of responsive design. *They enable the styling of a webpage based on factors such as screen size, device orientation, and resolution.",
      keywords:
        "purpose implementation responsive design factors screen size device orientation resolution",
    },
    {
      // Question 7
      question: "What are pseudo-classes in CSS?",
      questionSpeak: "What are pseudo-classes in CSS?",

      answer:
        " *Pseudo-classes in CSS are keywords that specify a special state of an element. *They are used to define styles for elements in specific situations, such as when a link is hovered over or when an element is the first child of its parent.",
      keywords:
        "pseudo-classes keywords special state hovered first child parent",
    },
    {
      // Question 8
      question:
        "What is the difference between margin-collapse and margin-collapse: collapse?",
      questionSpeak:
        "What is the difference between margin-collapse and margin-collapse: collapse?",

      answer:
        " *margin-collapse is a CSS phenomenon where the top and bottom margins of adjacent elements collapse into a single margin. *margin-collapse: collapse is a CSS property value that explicitly collapses the margins of adjacent elements.",
      keywords:
        "difference phenomenon adjacent elements collapse property value explicitly",
    },
    {
      // Question 9
      question:
        "What is the difference between display: none and visibility: hidden?",
      questionSpeak:
        "What is the difference between display: none and visibility: hidden?",

      answer:
        " *display: none removes the element from the document flow, hiding it completely. *visibility: hidden hides the element, but it still occupies space in the document flow.",
      keywords: "difference removes flow completely occupies space",
    },
    {
      // Question 10
      question: "What is CSS specificity?",
      questionSpeak: "What is CSS specificity?",

      answer:
        " *CSS specificity is a set of rules used to determine which style rule should take precedence when multiple conflicting CSS rules target the same element. *Specificity is calculated based on the type of selector, ID selectors having the highest specificity, followed by class selectors, and then element selectors.",
      keywords:
        "specificity rules precedence conflicting target calculated highest followed",
    },
    // Add more question-answer pairs as needed
  ],
};

// Questions List

function qList() {
  let lengthQ = questionAndAnswers[selectName].length;

  for (let i = 0; i < lengthQ; i++) {
    // Create a new button element
    const newBtn = document.createElement("button");

    newBtn.classList.add("qBtn", "QBtn" + i);

    // Append the button to the questionsList
    questionsList.appendChild(newBtn);

    newBtn.textContent = i + 1;

    let nameBtn = (newBtn.name = i);

    newBtn.onclick = () => {
      // if (isTyping) {
      //     return;
      // }
      // stopSpeechToText();
      // isTyping = true; // Set the flag to true to indicate that typing is in progress
      // index = nameBtn;
      // clearWelcomeMessage();
      // correctAnsDiv.textContent = '';
      // document.querySelector('#span_container').style.display = 'none';
      // specificQuestion = questionAndAnswersJS[index].question;
      // textToSpeech(`${specificQuestion}`);
      // // Clear the content of the welcomeMessage div
      // // clearWelcomeMessage();
      // // Display the next question
      // typeMessage(specificQuestion, "welcomeMessage", () => {
      //     // After typing completes or is canceled, call the textToSpeech function
      //     // textToSpeech(`${specificQuestion}`);
      //     startSpeechToText();
      // });
      // console.log(index);
      // indexChangeHandler();
      // return index;
    };
  }
}

let correctAnsDiv = document.querySelector("#span_container");
let correctAnsDiv2 = document.querySelector("#span_container2");

let allAns;
function correctAns() {
  stopSpeechToText();
  // Check if the answer is already displayed
  if (correctAnsDiv.textContent.trim() !== "") {
    // If it is, clear the content and exit the function
    correctAnsDiv.textContent = "";
    document.querySelector("#span_container").style.display = "none";
    correctAnsDiv2.style.display = "none";

    return;
  }
  document.querySelector("#span_container").style.display = "block";
  document.querySelector("#span_container2").style.display = "none";

  // Set the text content of the <span> element
  const inputString = questionAndAnswers[selectName][index].answer;
  const substrings = inputString.split(/\.(?=\s)/);
  allAns = correctAnsDiv.textContent = substrings.join(".\n\n");

  // Append the <span> element to the correctAnsDiv
  // correctAnsDiv.appendChild(spantxt);

  // Add a class to the <span> element
}

function yourAns() {
  stopSpeechToText();
  // Get the element to toggle

  // Toggle display property
  if (correctAnsDiv2.style.display === "block") {
    correctAnsDiv2.style.display = "none";
  } else {
    document.querySelector("#span_container").style.display = "none";

    correctAnsDiv2.style.display = "block";
  }

  // // If text is already recognized, update the content
  // if (recognizedText.trim() !== '') {
  //     correctAnsDiv2.textContent = recognizedText;
  // }
}

// next and previuos function

let index = 0; // Example index
let isTyping = false; // Flag to track whether typing is in progress

let specificQuestionSpeak;
let specificQuestion;

let typingTimeout;

const nextQ = () => {
  if (isTyping) {
    return;
  }

  if (
    correctAnsDiv2.textContent == "" ||
    correctAnsDiv2.textContent == "Answer the question"
  ) {
    correctAnsDiv2.style.display = "block";
    correctAnsDiv2.textContent = "Answer the question";

    return;
  }

  if (index + 1 == questionAndAnswers[selectName].length) {
    document.querySelector(".saveBtn").style.display = "none";
    document.querySelector(".tryAgainBtn").style.display = "none";

    let submitBtn = document.createElement("button");
    submitBtn.classList.add("btn");
    submitBtn.textContent = "Submit";
    submitBtn.onclick = onSubmit; // No parentheses here, to assign the function reference, not the result of the function
    let btnContainer = document.querySelector("#btn_container");
    btnContainer.appendChild(submitBtn);
    welcomeMessage.textContent = "";
  }

  // If it is, clear the content and exit the function
  correctAnsDiv2.textContent = "";
  document.querySelector("#span_container").style.display = "none";
  correctAnsDiv2.style.display = "none";

  isTyping = true; // Set the flag to true to indicate that typing is in progress

  index++;
  correctAnsDiv.textContent = "";
  document.querySelector("#span_container").style.display = "none";

  specificQuestionSpeak = questionAndAnswers[selectName][index].questionSpeak;
  specificQuestion = questionAndAnswers[selectName][index].question;

  textToSpeech(`${specificQuestionSpeak}`);

  // Clear the content of the welcomeMessage div
  clearWelcomeMessage();

  // Display the next question
  typeMessage(specificQuestion, "welcomeMessage", () => {
    // After typing completes or is canceled, call the textToSpeech function
    startSpeechToText();
  });

  // typeMessage(specificQuestion, "welcomeMessage");
  // startSpeechToText();
  indexChangeHandler();

  return index;
};

const tryAgain = () => {
  if (isTyping === true) {
    return;
  }

  correctAnsDiv2.textContent = "";
  correctAnsDiv2.style.display = "none";
  // Clear the content of the welcomeMessage div
  clearWelcomeMessage();

  // Display the next question
  typeMessage(specificQuestion, "welcomeMessage", () => {
    // After typing completes or is canceled, call the textToSpeech function
    //
    startSpeechToText();
  });
  textToSpeech(`${specificQuestion}`);
};

// Function to clear the content of the welcomeMessage div
const clearWelcomeMessage = () => {
  const welcomeMessageDiv = document.getElementById("welcomeMessage");
  welcomeMessageDiv.textContent = "";
};

// // Function to display the message
function typeMessage(message, divId, callback) {
  var notification = document.getElementById(divId);
  var indext = 0;
  notification.textContent = "";
  isTyping = true;

  function type() {
    if (indext < message.length) {
      notification.textContent += message.charAt(indext);
      indext++;
      typingTimeout = setTimeout(type, 100);
    } else {
      isTyping = false; // Reset the flag when typing is completed
      if (callback) callback(); // Call the callback function if provided
    }
  }

  notification.style.display = "block";
  type();

  return false;
}

// Example usage: Start a countdown timer for 3 seconds and display it in the element with id "timer" with font size 24px

let selectName;
function handleSelectedLogo(name) {
  const select_logo = (url) => {
    const slct_logo_contnr = document.querySelector("#robot_container");
    const newLogo = document.createElement("img");
    newLogo.src = url;
    newLogo.classList.add("select_logo");
    slct_logo_contnr.appendChild(newLogo);
  };

  if (name === "javascript") {
    select_logo("/images/js_select.png");
    selectName = "javascript";

    //     setTimeout(function() {

    //       document.querySelector("#chat_container").style.display = "block";

    //       indexChangeHandler();
    //       specificQuestion = questionAndAnswers[selectName][index].question;
    //       specificQuestionSpeak = questionAndAnswers[selectName][index].questionSpeak;
    //       textToSpeech(`${specificQuestionSpeak}`);

    //     typeMessage(specificQuestion, "welcomeMessage", () => {
    //         // After typing completes or is canceled, call the textToSpeech function
    //         startSpeechToText();
    //     });
    //     qList();
    //   }, 5000);
  } else if (name === "css") {
    select_logo("/images/css_select.png");
    selectName = "css";
  } else if (name === "html") {
    select_logo("/images/html_select.png");
    selectName = "html";
  }
}

function changeButtonColor(index) {
  // Reset all buttons to default color
  document.querySelectorAll(".qBtn").forEach((button) => {
    button.style.backgroundColor = "white";
  });
  document.querySelector(`.QBtn${index}`).style.backgroundColor =
    "rgb(109, 226, 255)";

  // Set the background color of the button with the given index to red
}

// Event listener for index changes
function indexChangeHandler() {
  // When the index changes, call the function to change button color
  changeButtonColor(index);
}

// Count Down Start

function startCountdown() {
  let count = 3;
  const countdownInterval = setInterval(() => {
    if (count > 0) {
      document.getElementById("count").textContent = count;
      count--;
    } else {
      clearInterval(countdownInterval);
      document.getElementById("count").textContent = "Start";

      // Hide countdown element after displaying "Start"
      setTimeout(() => {
        document.querySelector(".countdown").style.display = "none";
        document.querySelector("#btn_container").style.display = "flex";
        document.querySelector("#ans_container").style.display = "block";

        document.querySelector("#chat_container").style.display = "block";

        //   isTyping=true;

        specificQuestion = questionAndAnswers[selectName][index].question;
        specificQuestionSpeak =
          questionAndAnswers[selectName][index].questionSpeak;

        typeMessage(specificQuestion, "welcomeMessage", () => {
          // After typing completes or is canceled, call the textToSpeech function
          //
          startSpeechToText();
          indexChangeHandler();
          correctAnsDiv2.textContent = "";
        });

        textToSpeech(`${specificQuestionSpeak}`);

        qList();
      }, 1000);
      // Hide after 1 second of displaying "Start"
    }
  }, 900);
}

// Count Down End

let usersAns = [];
let userWords;

let storingAns = () => {
  // Assuming index contains the correct index

  usersAns[index] = recognizedText;
  userWords = usersAns[index].toLowerCase().split(" ");

  compareAnswers();
};

let recognizedText = "";
let recognition;
// Speech to Text Recognition Start
// Call startSpeechToText() function when the page loads

function startSpeechToText() {
  correctAnsDiv.textContent = "";

  if (correctAnsDiv.textContent !== "") {
    return;
  }

  recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "en-IN"; // Set language to English (Indian)
  recognition.continuous = true;

  recognition.onstart = function () {
    // Loop through each element with class 'mainlistener' and set display to block
    document.querySelectorAll(".mainlistner").forEach(function (element) {
      element.style.display = "block";
      document.querySelector("#span_container").style.display = "none";
    });
  };

  recognition.onresult = function (event) {
    recognizedText = event.results[0][0].transcript;
    correctAnsDiv2.textContent = recognizedText;
    correctAnsDiv2.style.display = "block";
    recognition.stop();
  };

  recognition.onerror = function (event) {
    console.error("Error occurred in speech recognition:", event.error);
    document.querySelectorAll(".mainlistner").forEach(function (element) {
      element.style.display = "none";
    });
  };

  recognition.onend = function () {
    // Loop through each element with class 'mainlistener' and set display to none
    document.querySelectorAll(".mainlistner").forEach(function (element) {
      element.style.display = "none";
    });
  };

  recognition.start();

  recognition.onabort = function (event) {
    console.log(event.abort);
    document.querySelectorAll(".mainlistner").forEach(function (element) {
      element.style.display = "none";
    });
  };
}

function stopSpeechToText() {
  if (recognition) {
    recognition.abort(); // Abort the speech recognition
    document.querySelectorAll(".mainlistner").forEach(function (element) {
      element.style.display = "none";
    });
  }
}

// Speech to Text Recognition End

let percentage;
let percentages = [];
// Function to compare user answers with preloaded answers
let compareAnswers = () => {
  // Iterate over each user's answer

  for (let i = 0; i <= userWords.length; i++) {
    userWords[i];
    let correctWords = questionAndAnswers[selectName][index].keywords
      .toLowerCase()
      .split(" "); // Split correct answer into words

    let correctWordCount = 0;

    // Check if each word in the user's answer exists in the correct answer
    userWords.forEach((word) => {
      if (correctWords.includes(word)) {
        correctWordCount++;
      }
    });

    // Calculate the percentage of correct words
    percentage = Math.floor((correctWordCount / correctWords.length) * 100);

    // Output the percentage of correct words
    // console.log(percentage);
  }

  percentages[index] = percentage;

  console.log("final:" + percentages);

  return percentages;
};

let finalResult;
function onSubmit() {
  // Select all elements matching the specified CSS selectors
  const elementsToHide = document.querySelectorAll(
    "#questionsList, #btn_container, #ans_container, .select_logo"
  );

  // Iterate over the selected elements and hide each one
  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });

  finalResult = calculateAverage(percentages);
  console.log(finalResult);
  welcomeMessage.textContent = "";
  typeMessage(`Your Result  ${finalResult}%`, "welcomeMessage");
  textToSpeech(`Your Result is ${finalResult}%`);

  return finalResult;
}

// Call the function to compare answers

function calculateAverage(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  var average = total / numbers.length;
  return average;
}

// Function to change the color of the button with the same index

// Example of updating index (replace this with your actual logic)
// Call the handler to change button color
