let byob_data = {
  size: null,
  products: [],
  bags: null,
  grind_type: null,
  frequency: null,
};

function renderStep2() {
  console.log(`🚀 || build-your-own-box.js:11 || renderStep2 || byob_data:`, byob_data);
  const step1Content = document.querySelector('.step-1-content');
  step1Content.classList.remove('active');

  const step2To4Content = document.querySelector('.step-2-4-content');
  step2To4Content.classList.add('active');
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Handle Bag Size Click                                                   │
  └─────────────────────────────────────────────────────────────────────────┘
*/

const sizeChoiceNodes = document.querySelectorAll('[data-size-choice]');

function handleSizeChoice(event) {
  const clickedElement = event.currentTarget;
  const sizeChoice = clickedElement.getAttribute('data-size-choice');

  // Remove active class from all nodes
  sizeChoiceNodes.forEach((element) => {
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

sizeChoiceNodes.forEach((element) => {
  element.addEventListener('click', handleSizeChoice);
});

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Handle Number of Bags Click                                             │
  └─────────────────────────────────────────────────────────────────────────┘
*/

const bagSizeNodes = document.querySelectorAll('[data-bag-size]');

bagSizeNodes.forEach((element) => {
  element.addEventListener('click', handleBagSize);
});

function handleBagSize(event) {
  const clickedElement = event.currentTarget;
  const bagSize = parseInt(clickedElement.getAttribute('data-bag-size'));
  console.log(`🚀 || build-your-own-box.js:70 || handleBagSize || bagSize:`, bagSize);

  // Remove active class from all nodes
  bagSizeNodes.forEach((element) => {
    element.classList.remove('active');
  });

  // Add active class to clicked element
  clickedElement.classList.add('active');

  byob_data = {
    ...byob_data,
    bags: bagSize,
    products: [],
    grind_type: null,
    frequency: null,
  };
  console.log(`🚀 || build-your-own-box.js:87 || handleBagSize || byob_data:`, byob_data);
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Handle Grind Type Click                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
*/

const grindTypeNodes = document.querySelectorAll('[data-grind-type]');

grindTypeNodes.forEach((element) => {
  element.addEventListener('click', handleGrindType);
});

function handleGrindType(event) {
  const clickedElement = event.currentTarget;
  const grindType = clickedElement.getAttribute('data-grind-type');
  console.log(`🚀 || build-your-own-box.js || handleGrindType || grindType:`, grindType);

  // Remove active class from all nodes
  grindTypeNodes.forEach((element) => {
    element.classList.remove('active');
  });

  // Add active class to clicked element
  clickedElement.classList.add('active');

  byob_data = {
    ...byob_data,
    grind_type: grindType,
    products: [],
    frequency: null,
  };
  console.log(`🚀 || build-your-own-box.js || handleGrindType || byob_data:`, byob_data);
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Handle Frequency Click                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
*/
const frequencyNodes = document.querySelectorAll('[data-frequency]');

frequencyNodes.forEach((element) => {
  element.addEventListener('click', handleFrequency);
});

function handleFrequency(event) {
  const clickedElement = event.currentTarget;
  const frequency = clickedElement.getAttribute('data-frequency');
  console.log(`🚀 || build-your-own-box.js || handleFrequency || frequency:`, frequency);

  // Remove active class from all nodes
  frequencyNodes.forEach((element) => {
    element.classList.remove('active');
  });

  // Add active class to clicked element
  clickedElement.classList.add('active');

  byob_data = {
    ...byob_data,
    frequency: frequency,
    products: [],
  };
  console.log(`🚀 || build-your-own-box.js || handleFrequency || byob_data:`, byob_data);
}


/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Handle Next Step Click                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
*/

const nextStepButton = document.querySelector('[data-next-step]');

nextStepButton.addEventListener('click', handleNextStep);

function handleNextStep(event) {
  // Get active step
  const activeTab = document.querySelector('.navigation_row_tab.active');
  const currentStep = activeTab.getAttribute('data-tab');
  console.log(`🚀 || build-your-own-box.js || handleNextStep || currentStep:`, currentStep);

  // Validate BYOB data based on current step
  const isValid = validateBYOBData(currentStep);
  console.log(`🚀 || build-your-own-box.js:173 || handleNextStep || isValid:`, isValid);
  if (!isValid) {
    return;
  }


}

function validateBYOBData(step) {
  console.log(`🚀 || build-your-own-box.js || validateBYOBData || step:`, step);
  console.log(`🚀 || build-your-own-box.js || validateBYOBData || byob_data:`, byob_data);

  switch(step) {
    case 'step_2':
      if (!byob_data.bags || !byob_data.grind_type || !byob_data.frequency) {
        console.log('Please complete all selections in Step 2');
        return false;
      }
      return true;

    case 'step_3':
      if (!byob_data.products || byob_data.products.length === 0) {
        console.log('Please select products in Step 3');
        return false;
      }
      return true;
    default:
      console.log('Unknown step');
      return false;
  }
}