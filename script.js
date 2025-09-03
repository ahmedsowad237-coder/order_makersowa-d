// --- Data Model ---
        const productsData = [
            { id: 1, name: "রাজমা খিচুড়ি", quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 500, unit: "গ্রাম", price: 250 }, { value: 1, unit: "কেজি", price: 500 }] },
            { id: 2, name: "সিরিয়াল স্টেজ ১", quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 500, unit: "গ্রাম", price: 260 }, { value: 1, unit: "কেজি", price: 500 }] },
            { id: 3, name: "সিরিয়াল স্টেজ ২", quantities: [{ value: 250, unit: "গ্রাম", price: 220 }, { value: 500, unit: "গ্রাম", price: 350 }, { value: 1, unit: "কেজি", price: 700 }] },
            { id: 4, name: "হোমমেড ওটস(ওটমিল)", quantities: [{ value: 250, unit: "গ্রাম", price: 420 }, { value: 500, unit: "গ্রাম", price: 820 }, { value: 1, unit: "কেজি", price: 1600 }] },
            { id: 5, name: "জাফরানি ফিরনি মিক্সড", quantities: [{ value: 250, unit: "গ্রাম", price: 220 }, { value: 500, unit: "গ্রাম", price: 420}, { value: 1, unit: "কেজি", price: 800}] },
            { id: 6, name: "সাগুদানা", quantities: [{ value: 500, unit: "গ্রাম", price: 150}, { value: 1, unit: "কেজি", price: 300}] },
            { id: 7, name: "তিন ফলের সিরিয়াল", quantities: [{ value: 250, unit: "গ্রাম", price: 320}, { value: 500, unit: "গ্রাম", price: 620}, { value: 1, unit: "কেজি", price: 1200}] },
            { id: 8, name: "রাইস স্পেশাল সুজি", quantities: [{ value: 250, unit: "গ্রাম", price: 130}, { value: 500, unit: "গ্রাম", price: 260}, { value: 1, unit: "কেজি", price: 500}] },
            { id: 9, name: "আয়রনসমৃদ্ধ পুষ্টিকর বিন্নি সুজি",quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 500, unit: "গ্রাম", price: 260 }, { value: 1, unit: "কেজি", price: 500}] },
            { id: 10, name: "মাল্টিগ্রেইন বাদাম সুজি", quantities: [{ value: 250, unit: "গ্রাম", price: 160}, { value: 500, unit: "গ্রাম", price: 320}, { value: 1, unit: "কেজি", price: 600}] },
            { id: 11, name: "বার্লি সিরিয়াল (তালবিনা)", quantities: [{ value: 250, unit: "গ্রাম", price: 220 }, { value: 500, unit: "গ্রাম", price: 420 },{ value: 1, unit: "কেজি", price: 800}] },
            { id: 12, name: "তাল মিছরি", quantities: [{ value: 200, unit: "গ্রাম", price: 140}, { value: 500, unit: "গ্রাম", price: 240 }, { value: 1, unit: "কেজি", price: 440}] },
            { id: 13, name: "খেজুর চিনি", quantities: [{ value: 250, unit: "গ্রাম", price: 250 }, { value: 500, unit: "গ্রাম", price: 500 }, { value: 1, unit: "কেজি", price: 1000}] },
            { id: 14, name: "আলমারাই চিজ", quantities: [{ value: 8, unit: "পিস", price: 300 }, { value: 32, unit: "ফুল বক্স", price: 1200 }] },
            { id: 15, name: "লাফিং কাউ চিজ", quantities: [{ value: 8, unit: "পিস", price: 300 }, { value: 32, unit: "ফুল বক্স", price: 1200 }] },
            { id: 16, name: "রোলেড বেবি ওটস", quantities: [{ value: 500, unit: "গ্রাম", price: 650 }] },
            { id: 17, name: "ইরানি জাফরান", quantities: [{ value: 1, unit: "গ্রাম", price: 400 }] },
            { id: 18, name: "পিঙ্ক সল্ট", quantities: [{ value: 250, unit: "গ্রাম", price: 120}, { value: 500, unit: "গ্রাম", price: 240 }, { value: 1, unit: "কেজি", price: 480}] },
            { id: 19, name: "ডেলিভারি চার্জ", quantities: [{ value: 80, unit: "টাকা (ঢাকার মধ্যে)", price: 80 }, { value: 100, unit: "টাকা (ঢাকার পার্শ্ববর্তী)", price: 100 }, { value: 150, unit: "টাকা (ঢাকার বাহিরে)", price: 150 }] },
            { id: 20, name: "ডিসকাউন্ট", quantities: [{ value: 5, unit: "%", price: null }, { value: 10, unit: "%", price: null }, { value: 15, unit: "%", price: null }] },
            { id: 21, name: "গিফট", quantities: [{ value: 0, unit: "", price: 0 }] }
        ];

        // --- Global State ---
        let selectedItems = []; // Stores { id: uniqueId, productId, quantityValue, quantityUnit, price, name }
        let currentSearchTerm = '';
        
        // --- DOM Elements ---
        const productListDiv = document.getElementById('productList');
        const searchInput = document.getElementById('searchProducts');
        const clearSearchBtn = document.getElementById('clearSearch');
        const selectedItemsList = document.getElementById('selectedItemsList');
        const totalAmountDiv = document.getElementById('totalAmount');
        const deleteAllBtn = document.getElementById('deleteAllBtn');
        const copyBtn = document.getElementById('copyBtn');
        const copyFeedbackDiv = document.getElementById('copyFeedback');

        // --- Functions ---
        
        // Renders the list of products based on the search term
        function renderProducts() {
            productListDiv.innerHTML = '';
            const filteredProducts = productsData.filter(product =>
                product.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
            );

            if (filteredProducts.length === 0) {
                productListDiv.innerHTML = '<p class="text-center text-gray-600 py-4">কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি।</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200';
                
                const quantitiesHtml = product.id === 21 ? 
                    `<span class="text-sm font-semibold text-gray-500">নির্বাচন করুন</span>` :
                    product.quantities.map(q => `
                        <button
                            class="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-blue-200 hover:text-blue-700 transition duration-150 product-quantity-btn"
                            data-product-id="${product.id}"
                            data-quantity-value="${q.value}"
                            data-quantity-unit="${q.unit}"
                            data-price="${q.price}"
                        >
                            ${q.unit === '৳' ? `${q.unit}${q.value}` : `${q.value}${q.unit}`}
                        </button>
                    `).join('');

                productCard.innerHTML = `
                    <div class="text-lg font-medium text-gray-800">${product.name}</div>
                    <div class="flex space-x-2 quantity-options">
                        ${quantitiesHtml}
                    </div>
                `;
                productListDiv.appendChild(productCard);
            });
        }

        // Renders the selected items in the list and updates the total
        function renderSelectedItems() {
            selectedItemsList.innerHTML = '';
            let subtotalWithoutDelivery = 0;
            let finalTotal = 0;
            let discountAmount = 0;

            const productsAndGift = selectedItems.filter(item => item.name !== "ডেলিভারি চার্জ" && item.name !== "ডিসকাউন্ট");
            const deliveryChargeItem = selectedItems.find(item => item.name === "ডেলিভারি চার্জ");
            const discountItem = selectedItems.find(item => item.name === "ডিসকাউন্ট");
            
            productsAndGift.forEach(item => {
                subtotalWithoutDelivery += item.price;
            });

            if (discountItem) {
                discountAmount = (subtotalWithoutDelivery * discountItem.quantityValue) / 100;
            }

            const totalAfterDiscount = subtotalWithoutDelivery - discountAmount;
            finalTotal = totalAfterDiscount;
            
            if (deliveryChargeItem) {
                finalTotal += deliveryChargeItem.price;
            }

            // Generate the list of selected items
            productsAndGift.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.className = 'flex items-center justify-between';
                
                let itemText;
                if (item.name === "গিফট") {
                    itemText = `গিফট`;
                } else {
                    itemText = `${index + 1}. ${item.name} - ${item.quantityValue}${item.quantityUnit} :: ${item.price} টাকা`;
                }

                listItem.innerHTML = `
                    <span class="text-xs font-medium text-gray-700 flex-grow">${itemText}</span>
                    <button class="remove-item-btn text-red-500 hover:text-red-700 transition duration-150 ml-2" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </button>
                `;
                selectedItemsList.appendChild(listItem);
            });

            // Add other special items
            if (deliveryChargeItem) {
                const listItem = document.createElement('div');
                listItem.className = 'flex items-center justify-between';
                const deliveryDetails = deliveryChargeItem.quantityUnit.replace('টাকা', '').trim();
                listItem.innerHTML = `
                    <span class="text-xs font-medium text-gray-700 flex-grow">ডেলিভারি চার্জ - ${deliveryDetails} :: ${deliveryChargeItem.price} টাকা</span>
                    <button class="remove-item-btn text-red-500 hover:text-red-700 transition duration-150 ml-2" data-id="${deliveryChargeItem.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </button>
                `;
                selectedItemsList.appendChild(listItem);
            }

            if (discountItem) {
                const listItem = document.createElement('div');
                listItem.className = 'flex items-center justify-between';
                listItem.innerHTML = `
                    <span class="text-xs font-medium text-gray-700 flex-grow">ডিসকাউন্ট - ${discountItem.quantityValue}%</span>
                    <button class="remove-item-btn text-red-500 hover:text-red-700 transition duration-150 ml-2" data-id="${discountItem.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </button>
                `;
                selectedItemsList.appendChild(listItem);
            }
            
            // Update total display
            totalAmountDiv.innerHTML = `
                
                ${discountItem ? `<p class="text-sm text-red-500">ডিসকাউন্ট: -${Math.round(discountAmount)} টাকা</p>` : ''}
                ${deliveryChargeItem ? `<p class="text-sm text-blue-500">ডেলিভারি চার্জ: +${deliveryChargeItem.price} টাকা</p>` : ''}
                <p class="text-lg font-bold text-gray-800 mt-2">মোট: ${Math.round(finalTotal)} টাকা</p>
            `;
        }

        // Adds an item to the selectedItems array
        function addItem(productId, quantityValue, quantityUnit, price) {
            const product = productsData.find(p => p.id === productId);
            if (!product) return;

            // Handle unique items (Delivery, Discount, Gift)
            if (product.name === "ডেলিভারি চার্জ" || product.name === "ডিসকাউন্ট" || product.name === "গিফট") {
                selectedItems = selectedItems.filter(item => item.productId !== productId);
            }

            const uniqueId = Date.now() + Math.random(); // Create a unique ID for each item
            
            selectedItems.push({
                id: uniqueId,
                productId: productId,
                name: product.name,
                quantityValue: quantityValue,
                quantityUnit: quantityUnit,
                price: price
            });
            renderSelectedItems();
        }

        // Removes an item from the selectedItems array by unique ID
        function removeItem(id) {
            selectedItems = selectedItems.filter(item => item.id !== id);
            renderSelectedItems();
        }

        // Clears all selected items
        function clearAllItems() {
            selectedItems = [];
            renderSelectedItems();
        }

        // Copies the text from the output to the clipboard
        function copyOutputToClipboard() {
            let outputLines = [];
            let subtotalWithoutDelivery = 0;
            let finalTotal = 0;
            let discountAmount = 0;

            const productsAndGift = selectedItems.filter(item => item.name !== "ডেলিভারি চার্জ" && item.name !== "ডিসকাউন্ট");
            const deliveryChargeItem = selectedItems.find(item => item.name === "ডেলিভারি চার্জ");
            const discountItem = selectedItems.find(item => item.name === "ডিসকাউন্ট");

            productsAndGift.forEach((item, index) => {
                if (item.name === "গিফট") {
                    outputLines.push("গিফট");
                } else {
                    outputLines.push(`${index + 1}. ${item.name} - ${item.quantityValue}${item.quantityUnit} :: ${item.price} টাকা`);
                    subtotalWithoutDelivery += item.price;
                }
            });

            if (productsAndGift.length > 0 && (deliveryChargeItem || discountItem)) {
                outputLines.push("");
            }

            if (deliveryChargeItem) {
                const deliveryDetails = deliveryChargeItem.quantityUnit.replace('টাকা', '').trim();
                outputLines.push(`ডেলিভারি চার্জ - ${deliveryDetails} :: ${deliveryChargeItem.price} টাকা`);
            }

            if (discountItem) {
                discountAmount = (subtotalWithoutDelivery * discountItem.quantityValue) / 100;
                outputLines.push("");
                outputLines.push(`ডিসকাউন্ট - ${discountItem.quantityValue}% [ডেলিভারি চার্জ ডিসকাউন্ট যোগ্য নয়]`);
                outputLines.push(`ডিসকাউন্ট এর পূর্বে: ${subtotalWithoutDelivery} টাকা`);
                outputLines.push(`ডিসকাউন্ট দিয়ে: ${Math.round(subtotalWithoutDelivery - discountAmount)} টাকা`);
                finalTotal = subtotalWithoutDelivery - discountAmount;
            } else {
                finalTotal = subtotalWithoutDelivery;
            }

            if (deliveryChargeItem) {
                outputLines.push(`ডেলিভারি চার্জ এডের পরে: ${Math.round(finalTotal + deliveryChargeItem.price)} টাকা`);
                finalTotal += deliveryChargeItem.price;
            }
            
            if (discountItem || deliveryChargeItem || productsAndGift.length > 0) {
                outputLines.push("");
                outputLines.push(`মোট: ${Math.round(finalTotal)} টাকা`);
            }

            const outputText = outputLines.join('\n');

            try {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = outputText.trim();
                tempTextArea.style.position = 'fixed';
                tempTextArea.style.opacity = '0';
                document.body.appendChild(tempTextArea);

                tempTextArea.select();
                tempTextArea.setSelectionRange(0, 99999);

                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                showFeedback('কপি সফল!', 'success');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showFeedback('কপি করতে ব্যর্থ হয়েছেন।', 'error');
            }
        }

        // Displays a feedback message (e.g., "Copied!")
        function showFeedback(message, type) {
            copyFeedbackDiv.textContent = message;
            copyFeedbackDiv.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');

            if (type === 'success') {
                copyFeedbackDiv.classList.add('bg-green-100', 'text-green-800');
            } else {
                copyFeedbackDiv.classList.add('bg-red-100', 'text-red-800');
            }
            copyFeedbackDiv.classList.remove('hidden');

            setTimeout(() => {
                copyFeedbackDiv.classList.add('hidden');
            }, 3000);
        }

        // --- Event Listeners ---

        // Event delegation for quantity buttons
        productListDiv.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('product-quantity-btn')) {
                const productId = parseInt(target.dataset.productId);
                const quantityValue = parseInt(target.dataset.quantityValue);
                const quantityUnit = target.dataset.quantityUnit;
                const price = target.dataset.price ? parseInt(target.dataset.price) : null;
                addItem(productId, quantityValue, quantityUnit, price);
            }
        });

        // Event delegation for remove buttons in the selected list
        selectedItemsList.addEventListener('click', (event) => {
            const target = event.target.closest('.remove-item-btn');
            if (target) {
                const itemId = parseFloat(target.dataset.id);
                if (!isNaN(itemId)) {
                    removeItem(itemId);
                }
            }
        });
        
        // Search input event
        searchInput.addEventListener('keyup', (event) => {
            currentSearchTerm = event.target.value.trim();
            renderProducts();
        });

        // Clear search button event
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            renderProducts();
        });

        // Delete All button event
        deleteAllBtn.addEventListener('click', clearAllItems);

        // Copy button event
        copyBtn.addEventListener('click', copyOutputToClipboard);

        // Initial render on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            renderSelectedItems();
        });
