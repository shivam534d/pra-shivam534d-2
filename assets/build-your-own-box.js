const sizeChoiceNodes = document.querySelectorAll('[data-size-choice]');

let byob_data = {
  size: null,
  products: [],
  bags: null,
  grind_type: null,
  frequency: null,
};

function renderStep2() {
  console.log(`🚀 || build-your-own-box.js:11 || renderStep2 || byob_data:`, byob_data);
  // Remove active class from step 1 content
  const step1Content = document.querySelector('.step-1-content');
  step1Content.classList.remove('active');

  // Add active class to step 2 content
  const step2To4Content = document.querySelector('.step-2-4-content');
  step2To4Content.classList.add('active');
}

function handleSizeChoice(event) {
  const clickedElement = event.currentTarget;
  const sizeChoice = clickedElement.getAttribute('data-size-choice');

  // Remove active class from all nodes
  sizeChoiceNodes.forEach(element => {
    element.classList.remove('active');
  });

  // Add active class to clicked element
  clickedElement.classList.add('active');

  byob_data = {
    ...byob_data,
    size: sizeChoice,
    products: [],
    bags: null,
    grind_type: null,
    frequency: null,
  };
  renderStep2();
}

sizeChoiceNodes.forEach(element => {
  element.addEventListener('click', handleSizeChoice);
});