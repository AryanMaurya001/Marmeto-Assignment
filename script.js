function fetchData() {
    const apiUrl =
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const productData = data.product;
  
        const price = parseFloat(
          productData.price.replace("$", "").replace(",", "")
        );
        const compareAtPrice = parseFloat(
          productData.compare_at_price.replace("$", "").replace(",", "")
        );
        const percentageOff =
          ((compareAtPrice - price) / compareAtPrice) * 100;
  
        document.querySelector(".product-vendor").textContent =
          productData.vendor;
        document.querySelector(".product-title").textContent =
          productData.title;
        document.querySelector(".price").textContent = productData.price;
        document.querySelector(".compare-at-price").textContent =
          productData.compare_at_price;
        document.querySelector(".product-description").innerHTML =
          productData.description;
  
        document.getElementById("main-product-image").src ="./images/1.jpeg"
          // productData.images[0].src;
  
        const percentageOffElement = document.querySelector(".percentage-off");
        if (!isNaN(percentageOff) && percentageOff > 0) {
          percentageOffElement.textContent = `${percentageOff.toFixed(0)}% Off`;
        } else {
          percentageOffElement.textContent = "No discount";
        }
        const thumbnailsContainer = document.querySelector(".thumbnails");
        thumbnailsContainer.innerHTML = "";
        const thumbnailFileNames = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"];
        
        thumbnailFileNames.forEach((fileName) => {
            const img = document.createElement("img");
            img.src = "images/" + fileName;
            img.alt = "Thumbnail";
            img.classList.add("thumbnail");
            img.addEventListener("click", () => {
                document.getElementById("main-product-image").src = "images/" + fileName;
            });
            thumbnailsContainer.appendChild(img);
        });
        // const thumbnailsContainer = document.querySelector(".thumbnails");
        // thumbnailsContainer.innerHTML = "";
        // productData.images.forEach((image) => {
        //   const img = document.createElement("img");
        //   img.src = image.src;
        //   img.alt = "Thumbnail";
        //   img.classList.add("thumbnail");
        //   img.addEventListener("click", () => {
        //     document.getElementById("main-product-image").src = "./images";
        //   });
        //   thumbnailsContainer.appendChild(img);
        // });
  
        function populateColorOptions() {
          const colorContainer = document.querySelector(".c-container");
          colorContainer.innerHTML = "";
          productData.options[0].values.forEach((color, index) => {
            const colorDiv = document.createElement("div");
            const colorName = Object.keys(color)[0];
            colorDiv.style.backgroundColor = color[colorName];
            colorDiv.classList.add("color");
            colorDiv.dataset.color = colorName;
  
            colorDiv.addEventListener("click", () =>
              handleColorSelection(colorDiv, index)
            );
  
            colorContainer.appendChild(colorDiv);
  
            // Initially select the first color
            if (index === 0) {
              colorDiv.classList.add("selected");
              colorDiv.style.border = "2px solid black";
            }
          });
        }
  
        function populateSizeOptions() {
          const sizeContainer = document.querySelector(".size-selector");
          sizeContainer.innerHTML = "";
          productData.options[1].values.forEach((size, index) => {
            const sizeDiv = document.createElement("div");
            sizeDiv.classList.add("size-type-container");
  
            const input = document.createElement("input");
            const label = document.createElement("label");
            input.type = "radio";
            input.id = size.toLowerCase();
            input.name = "size";
            input.value = size;
            label.htmlFor = size.toLowerCase();
            label.textContent = size;
  
            sizeDiv.appendChild(input);
            sizeDiv.appendChild(label);
  
            sizeContainer.appendChild(sizeDiv);
  
            // Initially select the first size
            if (index === 0) {
              input.checked = true;
            }
          });
        }
  
        function handleColorSelection(selectedColorDiv) {
          const allColors = document.querySelectorAll(".color");
          allColors.forEach((color) => {
            color.classList.remove("selected");
            color.style.border = "none";
          });
          selectedColorDiv.classList.add("selected");
          selectedColorDiv.style.border = "2px solid black";
        }
  
        function handleSizeSelection() {
          updateAddToCartMessage();
        }
  
        function updateAddToCartMessage() {
          const selectedColor = document.querySelector(".color.selected");
          const selectedSize = document.querySelector('input[name="size"]:checked');
          const addToCartMessage = document.querySelector(".add-to-cart-message");
  
          if (selectedColor && selectedSize) {
            const color = selectedColor.dataset.color;
            const size = selectedSize.value;
  
            const addedProductDetails = document.getElementById(
              "addedProductDetails"
            );
            addedProductDetails.textContent = `Embrace Sideboard with Color ${color}, Size ${size} added to cart`;
  
            addedProductDetails.style.background = "#E7F8B7";
            addedProductDetails.style.color = "#000000";
            addedProductDetails.style.fontFamily = "Inter";
            addedProductDetails.style.fontSize = "14px";
            addedProductDetails.style.fontWeight = "600";
            addedProductDetails.style.lineHeight = "28px";
            addedProductDetails.style.letterSpacing = "0";
            addedProductDetails.style.textAlign = "center";
            addedProductDetails.style.marginTop = '10px';
  
            addToCartMessage.style.display = "block";
          } else {
            addToCartMessage.style.display = "none";
          }
        }
  
  
        const colors = document.querySelectorAll(".color");
        const sizeInputs = document.querySelectorAll('input[name="size"]');
        const addToCartButton = document.querySelector(".add-to-cart-btn");
  
        colors.forEach((color, index) => {
          color.addEventListener("click", () =>
            handleColorSelection(color, index)
          );
        });
  
        sizeInputs.forEach((size) => {
          size.addEventListener("change", handleSizeSelection);
        });
  
        populateColorOptions();
        populateSizeOptions();
        addToCartButton.addEventListener("click", updateAddToCartMessage);
  
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  fetchData()
  
  function decrementValue() {
    let quantityElement = document.getElementById("quantityValue");
    let currentValue = parseInt(quantityElement.textContent);
    if (currentValue > 1) {
      quantityElement.textContent = currentValue - 1;
    }
  }
  
  // Function to increment the value
  function incrementValue() {
    let quantityElement = document.getElementById("quantityValue");
    let currentValue = parseInt(quantityElement.textContent);
  
    quantityElement.textContent = currentValue + 1;
  }
  