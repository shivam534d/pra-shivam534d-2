let byob_data = {
  size: null,
  products: [],
  bags: null,
  grind_type: null,
  frequency: null,
};

let filtered_products = [];

function renderStep2() {
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

  // If current step is 2, filter products based on grind type
  if (currentStep === 'step_2') {
    // Filter products based on selected grind type and size
    const filteredProducts = products_data.filter(product => {
      // Check grind type match
      const productType = product.type ? product.type.toLowerCase() : '';
      const selectedGrindType = byob_data.grind_type.toLowerCase();
      const grindTypeMatches = productType === selectedGrindType || productType.includes(selectedGrindType) || selectedGrindType.includes(productType) || !productType;
      // Check if any variant matches selected size and has inventory
      const hasMatchingVariant = product.variants.some(variant => {
        const variantSize = variant.title.toLowerCase();
        const selectedSize = byob_data.size.toLowerCase();
        const sizeMatches = variantSize === selectedSize;
        const hasInventory = variant.available && (!variant.inventory_management || variant.inventory_management === 'shopify');
        return sizeMatches && hasInventory;
      });

      return grindTypeMatches && hasMatchingVariant;
    });

    filtered_products = filteredProducts;
    renderProducts(filtered_products);

    // Update active step content
    const step2Content = document.querySelector('[data-step="2"]');
    step2Content.classList.remove('active');

    const step3Content = document.querySelector('[data-step="3"]');
    step3Content.classList.add('active');

    // Update active tab
    activeTab.classList.remove('active');
    const step3Tab = document.querySelector('[data-tab="step_3"]');
    step3Tab.classList.add('active');
  }
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Validate BYOB Data                                                      │
  └─────────────────────────────────────────────────────────────────────────┘
*/

function validateBYOBData(step) {
  switch(step) {
    case 'step_2':
      if (!byob_data.bags || !byob_data.grind_type || !byob_data.frequency) {
        console.log('Please complete all selections in Step 2');
        return false;
      }
      return true;
    case 'step_3':
      if (!byob_data.products || byob_data.products.length === 0 || byob_data.products.length < byob_data.bags) {
        console.log('Please select products in Step 3');
        return false;
      }
      return true;
    default:
      console.log('Unknown step');
      return false;
  }
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Render Products                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/
function renderProducts(filtered_products) {
  const step3Content = document.querySelector('.step-3-content');
  step3Content.classList.add('active');

  const step2Content = document.querySelector('.step-2-content');
  step2Content.classList.remove('active');

  // Update selected product count text
  const selectedProductCount = document.querySelector('[data-id="selected-product-count"]');
  if (selectedProductCount) {
    selectedProductCount.innerHTML = `You have selected <span>(${byob_data.products?.length || 0}/${byob_data.bags})</span>`;
  }

  // Render products
  const productGrid = document.querySelector('#product_grid');
  if (!productGrid) {
    console.error(`🚀 || build-your-own-box.js:262 || renderProducts || productGrid:`, productGrid);
    return;
  }

  productGrid.innerHTML = '';

  if (!filtered_products || filtered_products.length === 0) {
    productGrid.innerHTML = '<div class="no-products">No products found for the selected criteria.</div>';
    return;
  }

  filtered_products.forEach((product) => {
    let variant_id = product.variants.find(variant => variant.option1.toLowerCase() === byob_data.size.toLowerCase())?.id;
    const productCard = `
      <div class="product-card" data-product-id="${variant_id}">
        <div class="product-image">
          <img src="${product.featured_image}" alt="${product.title}" />
          <span class="badge">${product.tags[0]}</span>
        </div>
        <div class="product-details">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-subtitle">${product.description}</div>
          <button class="select-btn" onclick="selectProduct('${variant_id}')">
            SELECT
          </button>
        </div>
      </div>
    `;
    productGrid.innerHTML += productCard;
  });
}

// Function to handle product selection
function selectProduct(variant_id) {
  variant_id = parseInt(variant_id);
  const productCard = document.querySelector(`[data-product-id="${variant_id}"]`);
  const selectBtn = productCard.querySelector('.select-btn');

  // Check if product is already selected
  const isSelected = byob_data.products.some(product => product.id === variant_id);

  if (isSelected) {
    // Remove from selection
    byob_data.products = byob_data.products.filter(product => product.id !== variant_id);
    selectBtn.textContent = 'SELECT';
    selectBtn.classList.remove('selected');
    productCard.classList.remove('selected');
  } else {
    // Check if we can add more products
    if (byob_data.products.length >= byob_data.bags) {
      console.error(`🚀 || build-your-own-box.js || selectProduct || You can only select ${byob_data.bags} products. Please deselect one first.`);
      return;
    }

    // Add to selection
    byob_data.products.push({
      id: variant_id,
      quantity: 1,
      properties: {
        "Grind Type": byob_data.grind_type,
        "Frequency": byob_data.frequency
      }
    });
    selectBtn.textContent = 'SELECTED';
    selectBtn.classList.add('selected');
    productCard.classList.add('selected');
  }

  // Update selected product count
  const selectedProductCount = document.querySelector('[data-id="selected-product-count"]');
  selectedProductCount.innerHTML = `You have selected <span>(${byob_data.products.length}/${byob_data.bags})</span>`;
}

/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Function to add products to cart                                        │
  └─────────────────────────────────────────────────────────────────────────┘
*/
async function addToCart() {
  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: byob_data.products
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    // Redirect to cart page after successful addition
    window.location.href = '/cart';

  } catch (error) {
    console.error('Error adding products to cart:', error);
  }
}
