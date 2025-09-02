 // --- Data Model ---
        const productsData = [
            { id: 1, name: "রাজমা খিচুড়ি ", quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 500, unit: "গ্রাম", price: 250 }, { value: 1, unit: "কেজি", price: 500 }] },
            { id: 2, name: "সিরিয়াল স্টেজ ১", quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 500, unit: "গ্রাম", price: 260 }, { value: 1, unit: "কেজি", price: 500 }] },
            { id: 3, name: "সিরিয়াল স্টেজ ২", quantities: [{ value: 250, unit: "গ্রাম", price: 180 }, { value: 500, unit: "গ্রাম", price: 350 }, { value: 1, unit: "কেজি", price: 700 }] },
            { id: 4, name: "হোমমেড ওটস(ওটমিল) ", quantities: [{ value: 250, unit: "গ্রাম", price: 420 }, { value: 500, unit: "গ্রাম", price: 820 }, { value: 1, unit: "কেজি", price: 1600 }] },
            { id: 5, name: "জাফরানি ফিরনি মিক্সড", quantities: [{ value: 250, unit: "গ্রাম", price: 220 }, { value: 500, unit: "গ্রাম", price: 420}, { value: 1, unit: "কেজি", price: 800}] },
            { id: 6, name: "সাগুদানা", quantities: [{ value: 500, unit: "গ্রাম", price: 150}, { value: 1, unit: "কেজি", price: 300}] },
            { id: 7, name: "তিন ফলের সিরিয়াল", quantities: [{ value: 250, unit: "গ্রাম", price: 320}, { value: 500, unit: "গ্রাম", price: 620}, { value: 1, unit: "কেজি", price: 1200}] },
            { id: 8, name: "রাইস স্পেশাল সুজি", quantities: [{ value: 250, unit: "গ্রাম", price: 130}, { value: 2, unit: "গ্রাম", price: 260}, { value: 1, unit: "কেজি", price: 500}] },
            { id: 9, name: "আয়রনসমৃদ্ধ পুষ্টিকর বিন্নি সুজি",quantities: [{ value: 250, unit: "গ্রাম", price: 130 }, { value: 1, unit: "গ্রাম", price: 260 }, { value: 1, unit: "কেজি", price: 500}] },
            { id: 10, name: "মাল্টিগ্রেইন বাদাম সুজি", quantities: [{ value: 250, unit: "গ্রাম", price: 160}, { value: 500, unit: "গ্রাম", price: 320}, { value: 1, unit: "কেজি", price: 600}] },
            { id: 11, name: "বার্লি সিরিয়াল (তালবিনা)", quantities: [{ value: 250, unit: "গ্রাম", price: 220 }, { value: 1, unit: "গ্রাম", price: 420 },{ value: 1, unit: "কেজি", price: 800}] },
            { id: 12, name: "তাল মিছরি", quantities: [{ value: 200, unit: "গ্রাম", price: 140}, { value: 500, unit: "গ্রাম", price: 240 }, { value: 1, unit: "কেজি", price: 440}] },
            { id: 13, name: "খেজুর চিনি", quantities: [{ value: 250, unit: "গ্রাম", price: 250 }, { value: 500, unit: "গ্রাম", price: 500 }, { value: 1, unit: "কেজি", price: 1000}] },
            { id: 14, name: "আলমারাই চিজ", quantities: [{ value: 8, unit: "পিস", price: 300 }, { value: 32, unit: "ফুল বক্স", price: 1200 }] },
            { id: 15, name: "লাফিং কাউ চিজ", quantities: [{ value: 8, unit: "পিস", price: 300 }, { value: 32, unit: "ফুল বক্স", price: 1200 }] },
            { id: 16, name: "রোলেড বেবি ওটস", quantities: [{ value: 500, unit: "গ্রাম", price: 650 }] },
            { id: 17, name: "ইরানি জাফরান", quantities: [{ value: 1, unit: "গ্রাম", price: 400 }] },
            { id: 18, name: "পিঙ্ক সল্ট ", quantities: [{ value: 250, unit: "গ্রাম", price: 120}, { value: 500, unit: "গ্রাম", price: 240 }, { value: 1, unit: "কেজি", price: 480}] },
        ];

        // --- Global State ---
        let selectedItems = []; // Stores { productId, quantityValue, quantityUnit, price, name }
        let currentSearchTerm = '';
        let discount = 0;
        let deliveryCharge = 80;

        // --- DOM Elements ---
        const productListDiv = document.getElementById('productList');
        const searchInput = document.getElementById('searchProducts');
        const clearSearchBtn = document.getElementById('clearSearch');
        const selectedItemsOutput = document.getElementById('selectedItemsOutput');
        const totalAmountDiv = document.getElementById('totalAmount');
        const deleteAllBtn = document.getElementById('deleteAllBtn');
        const copyBtn = document.getElementById('copyBtn');
        const copyFeedbackDiv = document.getElementById('copyFeedback');
        const discountOptionsDiv = document.getElementById('discountOptions');
        const deliveryChargeRadios = document.querySelectorAll('input[name="deliveryCharge"]');

        // --- Functions ---

        // Renders the list of products based on the search term
        function renderProducts() {
            productListDiv.innerHTML = ''; // Clear existing products
            const filteredProducts = productsData.filter(product =>
                product.name.toLowerCase().includes(currentSearchTerm.toLowerCase())
            );

            if (filteredProducts.length === 0) {
                productListDiv.innerHTML = '<p class="text-center text-gray-600 py-4">No products found.</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200';
                productCard.innerHTML = `
                    <div class="text-lg font-medium text-gray-800">${product.name}</div>
                    <div class="flex space-x-2 quantity-options">
                        ${product.quantities.map(q => `
                            <button
                                class="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-blue-200 hover:text-blue-700 transition duration-150 product-quantity-btn"
                                data-product-id="${product.id}"
                                data-quantity-value="${q.value}"
                                data-quantity-unit="${q.unit}"
                                data-price="${q.price}"
                            >
                                ${q.value}${q.unit}
                            </button>
                        `).join('')}
                    </div>
                `;
                productListDiv.appendChild(productCard);
            });
        }

        // Renders the selected items in the output textarea and updates the total
        function renderSelectedItems() {
            let outputText = '';
            let total = selectedItems.reduce((sum, item) => sum + item.price, 0);
            let finalTotal = total;

            if (selectedItems.length === 0) {
                selectedItemsOutput.value = '';
                totalAmountDiv.innerHTML = `<p>মোট 0 টাকা</p>`;
                return;
            }

            selectedItems.forEach((item, index) => {
                outputText += `${index + 1}. ${item.name} - ${item.quantityValue}${item.quantityUnit} :: ${item.price} টাকা\n`;
            });

            // Apply fixed discount
            let discountAmount = discount;
            finalTotal = Math.max(0, total - discountAmount); // Ensure final total is not negative
            
            // Add delivery charge to the final total
            finalTotal += deliveryCharge;

            selectedItemsOutput.value = outputText;
            
            let totalContent = `
                <p>মোট: ${total} টাকা</p>
                ${discountAmount > 0 ? `<p>ডিসকাউন্ট: ${discountAmount} টাকা</p>` : ''}
                <p>ডেলিভারি চার্জ: ${deliveryCharge} টাকা</p>
                <p>সর্বমোট: ${finalTotal.toFixed(2)} টাকা</p>
            `;

            totalAmountDiv.innerHTML = totalContent;
        }

        // Adds an item to the selectedItems array
        function addItem(productId, quantityValue, quantityUnit, price) {
            const product = productsData.find(p => p.id === productId);
            if (product) {
                selectedItems.push({
                    productId: productId,
                    name: product.name,
                    quantityValue: quantityValue,
                    quantityUnit: quantityUnit,
                    price: price
                });
                renderSelectedItems();
            }
        }

        // Clears all selected items
        function clearAllItems() {
            selectedItems = [];
            discount = 0;
            
            // Reset discount buttons visual state
            document.querySelectorAll('.discount-btn').forEach(btn => btn.classList.remove('active'));

            // Reset delivery charge to default
            document.querySelector('input[name="deliveryCharge"][value="80"]').checked = true;
            deliveryCharge = 80;

            renderSelectedItems();
        }

        // Copies the text from the output textarea to the clipboard
        function copyOutputToClipboard() {
            const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
            const discountAmount = discount;
            
            let finalTotal = Math.max(0, total - discountAmount);
            finalTotal += deliveryCharge;
            
            let textToCopy = selectedItemsOutput.value + `\nমোট: ${total} টাকা`;
            if (discountAmount > 0) {
                textToCopy += `\nডিসকাউন্ট: ${discountAmount} টাকা`;
            }
            textToCopy += `\nডেলিভারি চার্জ: ${deliveryCharge} টাকা\nসর্বমোট: ${finalTotal.toFixed(2)} টাকা`;

            try {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = textToCopy;
                tempTextArea.style.position = 'fixed';
                tempTextArea.style.opacity = '0';
                document.body.appendChild(tempTextArea);

                tempTextArea.select();
                tempTextArea.setSelectionRange(0, 99999);

                document.execCommand('copy');

                document.body.removeChild(tempTextArea);

                showFeedback('Text copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showFeedback('Failed to copy text. Please copy manually.', 'error');
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
                const price = parseInt(target.dataset.price);
                addItem(productId, quantityValue, quantityUnit, price);
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

        // Event listener for fixed discount buttons
        discountOptionsDiv.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('discount-btn')) {
                // Remove active class from all buttons
                document.querySelectorAll('.discount-btn').forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                target.classList.add('active');

                // Update discount value
                discount = parseInt(target.dataset.discount) || 0;
                renderSelectedItems();
            }
        });

        // Event listener for delivery charge radio buttons
        deliveryChargeRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                deliveryCharge = parseInt(event.target.value);
                renderSelectedItems();
            });
        });

        // Initial render on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            renderSelectedItems();
        });