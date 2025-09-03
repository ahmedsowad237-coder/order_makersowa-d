// Data for products, delivery, and discounts
        const products = [
            { name: "রাজমা খিচুড়ি", quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 250 }, { size: "1 কেজি", price: 500 }] },
            { name: "সিরিয়াল স্টেজ ১", quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 260 }, { size: "1 কেজি", price: 500 }] },
            { name: "সিরিয়াল স্টেজ ২", quantities: [{ size: "250 গ্রাম", price: 180 }, { size: "500 গ্রাম", price: 350 }, { size: "1 কেজি", price: 700 }] },
            { name: "হোমমেড ওটস(ওটমিল)", quantities: [{ size: "250 গ্রাম", price: 420 }, { size: "500 গ্রাম", price: 820 }, { size: "1 কেজি", price: 1600 }] },
            { name: "জাফরানি ফিরনি মিক্সড", quantities: [{ size: "250 গ্রাম", price: 220 }, { size: "500 গ্রাম", price: 420}, { size: "1 কেজি", price: 800}] },
            { name: "সাগুদানা", quantities: [{ size: "500 গ্রাম", price: 150}, { size: "1 কেজি", price: 300}] },
            { name: "তিন ফলের সিরিয়াল", quantities: [{ size: "250 গ্রাম", price: 320}, { size: "500 গ্রাম", price: 620}, { size: "1 কেজি", price: 1200}] },
            { name: "রাইস স্পেশাল সুজি", quantities: [{ size: "250 গ্রাম", price: 130}, { size: "500 গ্রাম", price: 260}, { size: "1 কেজি", price: 500}] },
            { name: "আয়রনসমৃদ্ধ পুষ্টিকর বিন্নি সুজি",quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 260 }, { size: "1 কেজি", price: 500}] },
            { name: "মাল্টিগ্রেইন বাদাম সুজি", quantities: [{ size: "250 গ্রাম", price: 160}, { size: "500 গ্রাম", price: 320}, { size: "1 কেজি", price: 600}] },
            { name: "বার্লি সিরিয়াল (তালবিনা)", quantities: [{ size: "250 গ্রাম", price: 220 }, { size: "500 গ্রাম", price: 420 },{ size: "1 কেজি", price: 800}] },
            { name: "তাল মিছরি", quantities: [{ size: "200 গ্রাম", price: 140}, { size: "500 গ্রাম", price: 240 }, { size: "1 কেজি", price: 440}] },
            { name: "খেজুর চিনি", quantities: [{ size: "250 গ্রাম", price: 250 }, { size: "500 গ্রাম", price: 500 }, { size: "1 কেজি", price: 1000}] },
            { name: "আলমারাই চিজ", quantities: [{ size: "8 পিস", price: 300 }, { size: "32 ফুল বক্স", price: 1200 }] },
            { name: "লাফিং কাউ চিজ", quantities: [{ size: "8 পিস", price: 300 }, { size: "32 ফুল বক্স", price: 1200 }] },
            { name: "রোলেড বেবি ওটস", quantities: [{ size: "500 গ্রাম", price: 650 }] },
            { name: "ইরানি জাফরান", quantities: [{ size: "1 গ্রাম", price: 400 }] },
            { name: "পিঙ্ক সল্ট", quantities: [{ size: "250 গ্রাম", price: 120}, { size: "500 গ্রাম", price: 240 }, { size: "1 কেজি", price: 480}] },
        ];

        const deliveryCharges = [
            { name: "ঢাকায়", price: 80 },
            { name: "ঢাকার আশেপাশে", price: 100 },
            { name: "বাংলাদেশের অন্যত্র", price: 150 }
        ];

        const discountOptions = [5, 10, 20, 30];

        // State variables
        let order = [];
        let selectedDeliveryCharge = null;
        let selectedDiscount = 0;
        let isGift = false;
        let isReturn = false;

        // DOM elements
        const productListEl = document.getElementById('productList');
        const searchInputEl = document.getElementById('searchInput');
        const clearSearchEl = document.getElementById('clearSearch');
        const deliveryChargesEl = document.getElementById('deliveryCharges');
        const discountOptionsEl = document.getElementById('discountOptions');
        const paidCheckboxEl = document.getElementById('paidCheckbox');
        const giftButtonEl = document.getElementById('giftButton');
        const returnButtonEl = document.getElementById('returnButton');
        const deleteButtonEl = document.getElementById('deleteButton');
        const copyButtonEl = document.getElementById('copyButton');
        const orderSummaryEl = document.getElementById('orderSummary');

        // Function to render products to UI
        function renderProducts(filteredProducts = products) {
            productListEl.innerHTML = '';
            filteredProducts.forEach(product => {
                const productEl = document.createElement('div');
                productEl.className = 'flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200 transition-shadow hover:shadow-md';
                productEl.innerHTML = `
                    <div class="text-gray-800 font-medium text-sm">${product.name}</div>
                    <div class="flex items-center space-x-1">
                        ${product.quantities.map(q => `
                            <button data-name="${product.name}" data-size="${q.size}" data-price="${q.price}" class="product-btn px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200 text-xs">
                                ${q.size}
                            </button>
                        `).join('')}
                    </div>
                `;
                productListEl.appendChild(productEl);
            });
            updateButtonStyles();
        }

        // Function to render delivery and discount options
        function renderOptions() {
            deliveryChargesEl.innerHTML = '';
            deliveryCharges.forEach(charge => {
                const button = document.createElement('button');
                button.textContent = charge.name;
                button.dataset.price = charge.price;
                button.className = 'px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200 delivery-btn text-xs';
                deliveryChargesEl.appendChild(button);
            });

            discountOptionsEl.innerHTML = '';
            discountOptions.forEach(discount => {
                const button = document.createElement('button');
                button.textContent = `${discount} %`;
                button.dataset.discount = discount / 100;
                button.className = 'px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200 discount-btn text-xs';
                discountOptionsEl.appendChild(button);
            });
            updateButtonStyles();
        }
        
        // Function to update button styles based on state
        function updateButtonStyles() {
            // Product buttons
            document.querySelectorAll('.product-btn').forEach(btn => {
                const productName = btn.dataset.name;
                const productSize = btn.dataset.size;
                const existingItem = order.find(item => item.name === productName && item.size === productSize);
                if (existingItem) {
                    btn.classList.add('bg-blue-500', 'text-white');
                    btn.classList.remove('bg-gray-200', 'text-gray-700');
                } else {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                }
            });

            // Delivery buttons
            document.querySelectorAll('.delivery-btn').forEach(btn => {
                const buttonPrice = parseFloat(btn.dataset.price);
                if (selectedDeliveryCharge && selectedDeliveryCharge.price === buttonPrice) {
                    btn.classList.add('bg-blue-500', 'text-white');
                    btn.classList.remove('bg-gray-200', 'text-gray-700');
                } else {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                }
            });

            // Discount buttons
            document.querySelectorAll('.discount-btn').forEach(btn => {
                const buttonDiscount = parseFloat(btn.dataset.discount);
                if (selectedDiscount === buttonDiscount) {
                    btn.classList.add('bg-blue-500', 'text-white');
                    btn.classList.remove('bg-gray-200', 'text-gray-700');
                } else {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                }
            });

            // Gift button
            if (isGift) {
                giftButtonEl.classList.add('bg-purple-500', 'text-white');
                giftButtonEl.classList.remove('bg-gray-200', 'text-gray-700');
            } else {
                giftButtonEl.classList.remove('bg-purple-500', 'text-white');
                giftButtonEl.classList.add('bg-gray-200', 'text-gray-700');
            }

            // Return button
            if (isReturn) {
                returnButtonEl.classList.add('bg-orange-500', 'text-white');
                returnButtonEl.classList.remove('bg-gray-200', 'text-gray-700');
            } else {
                returnButtonEl.classList.remove('bg-orange-500', 'text-white');
                returnButtonEl.classList.add('bg-gray-200', 'text-gray-700');
            }
        }

        // Function to render order summary
        function renderSummary() {
            let totalProductPrice = 0;
            orderSummaryEl.innerHTML = '';
            
            let summaryContent = '';
            order.forEach((item, index) => {
                summaryContent += `${index + 1}. ${item.name} - ${item.size} :: ${item.price} টাকা\n`;
                totalProductPrice += item.price;
            });
            
            // Add a gap after the product list
            if(order.length > 0) {
                summaryContent += '\n';
            }

            let deliveryPrice = selectedDeliveryCharge ? selectedDeliveryCharge.price : 0;
            let totalWithDelivery = totalProductPrice + deliveryPrice;
            let discountAmount = totalWithDelivery * selectedDiscount;
            let finalTotal = totalWithDelivery - discountAmount;
            
            if (selectedDeliveryCharge) {
                summaryContent += `ডেলিভারি চার্জ - ${selectedDeliveryCharge.name}: ${selectedDeliveryCharge.price} টাকা\n`;
            }
            if (selectedDiscount > 0) {
                summaryContent += `ডিসকাউন্ট (${selectedDiscount * 100}%): -${discountAmount.toFixed(0)} টাকা\n`;
            }
            if (isGift) {
                 summaryContent += `গিফট\n`;
            }
            if (isReturn) {
                summaryContent += `রিটার্ন\n`;
            }
            
            // Render the "মোট" and total amount on separate lines
            summaryContent += `\nমোট:\n${finalTotal.toFixed(0)} টাকা\n`;

            if (paidCheckboxEl.checked) {
                summaryContent += `\nPAID`;
            } else {
                summaryContent += `\nUNPAID`;
            }

            orderSummaryEl.textContent = summaryContent.trim();
        }

        // Function to update all UI elements
        function updateAll() {
            renderSummary();
            updateButtonStyles();
        }

        // Event Listeners
        productListEl.addEventListener('click', (e) => {
            const button = e.target.closest('.product-btn');
            if (button) {
                const productName = button.dataset.name;
                const productSize = button.dataset.size;
                const productPrice = parseFloat(button.dataset.price);

                const existingIndex = order.findIndex(item => item.name === productName && item.size === productSize);
                
                if (existingIndex === -1) {
                    order.push({ name: productName, size: productSize, price: productPrice });
                } else {
                    order.splice(existingIndex, 1);
                }
                updateAll();
            }
        });

        deliveryChargesEl.addEventListener('click', (e) => {
            const button = e.target.closest('.delivery-btn');
            if (button) {
                const chargeName = button.textContent;
                const chargePrice = parseFloat(button.dataset.price);
                
                if (selectedDeliveryCharge && selectedDeliveryCharge.name === chargeName) {
                    selectedDeliveryCharge = null;
                } else {
                    selectedDeliveryCharge = { name: chargeName, price: chargePrice };
                }
                updateAll();
            }
        });

        discountOptionsEl.addEventListener('click', (e) => {
            const button = e.target.closest('.discount-btn');
            if (button) {
                const discountValue = parseFloat(button.dataset.discount);
                
                if (selectedDiscount === discountValue) {
                    selectedDiscount = 0;
                } else {
                    selectedDiscount = discountValue;
                }
                updateAll();
            }
        });

        giftButtonEl.addEventListener('click', () => {
            isGift = !isGift;
            updateAll();
        });

        returnButtonEl.addEventListener('click', () => {
            isReturn = !isReturn;
            updateAll();
        });

        paidCheckboxEl.addEventListener('change', updateAll);

        deleteButtonEl.addEventListener('click', () => {
            order = [];
            selectedDeliveryCharge = null;
            selectedDiscount = 0;
            paidCheckboxEl.checked = false;
            isGift = false;
            isReturn = false;
            updateAll();
        });

        copyButtonEl.addEventListener('click', () => {
            const textToCopy = orderSummaryEl.textContent;
            try {
                // Clipboard API is often blocked in iframes. Using document.execCommand as a fallback.
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = textToCopy;
                tempTextArea.style.position = 'fixed';
                tempTextArea.style.left = '-9999px';
                tempTextArea.style.top = '0';
                document.body.appendChild(tempTextArea);

                tempTextArea.select();
                tempTextArea.setSelectionRange(0, 99999);
                document.execCommand('copy');
                
                document.body.removeChild(tempTextArea);

                // Update UI to show success
                copyButtonEl.textContent = 'Copied!';
                setTimeout(() => {
                    copyButtonEl.textContent = 'Copy';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        orderSummaryEl.addEventListener('click', (e) => {
            const button = e.target.closest('.delete-btn-product');
            if (button) {
                const index = parseInt(button.dataset.index, 10);
                order.splice(index, 1);
                updateAll();
            }
        });

        searchInputEl.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm) {
                clearSearchEl.classList.remove('hidden');
                const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
                renderProducts(filtered);
            } else {
                clearSearchEl.classList.add('hidden');
                renderProducts(products);
            }
        });

        clearSearchEl.addEventListener('click', () => {
            searchInputEl.value = '';
            clearSearchEl.classList.add('hidden');
            renderProducts(products);
        });

        // Initial render
        renderProducts();
        renderOptions();
        updateAll();
