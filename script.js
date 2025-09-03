     // Consolidated data for all options
        const allOptions = [
            { name: "রাজমা খিচুড়ি", type: "product", quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 250 }, { size: "1 কেজি", price: 500 }] },
            { name: "সিরিয়াল স্টেজ ১", type: "product", quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 260 }, { size: "1 কেজি", price: 500 }] },
            { name: "সিরিয়াল স্টেজ ২", type: "product", quantities: [{ size: "250 গ্রাম", price: 180 }, { size: "500 গ্রাম", price: 350 }, { size: "1 কেজি", price: 700 }] },
            { name: "হোমমেড ওটস(ওটমিল)", type: "product", quantities: [{ size: "250 গ্রাম", price: 420 }, { size: "500 গ্রাম", price: 820 }, { size: "1 কেজি", price: 1600 }] },
            { name: "জাফরানি ফিরনি মিক্সড", type: "product", quantities: [{ size: "250 গ্রাম", price: 220 }, { size: "500 গ্রাম", price: 420}, { size: "1 কেজি", price: 800}] },
            { name: "সাগুদানা", type: "product", quantities: [{ size: "500 গ্রাম", price: 150}, { size: "1 কেজি", price: 300}] },
            { name: "তিন ফলের সিরিয়াল", type: "product", quantities: [{ size: "250 গ্রাম", price: 320}, { size: "500 গ্রাম", price: 620}, { size: "1 কেজি", price: 1200}] },
            { name: "রাইস স্পেশাল সুজি", type: "product", quantities: [{ size: "250 গ্রাম", price: 130}, { size: "500 গ্রাম", price: 260}, { size: "1 কেজি", price: 500}] },
            { name: "আয়রনসমৃদ্ধ পুষ্টিকর বিন্নি সুজি", type: "product", quantities: [{ size: "250 গ্রাম", price: 130 }, { size: "500 গ্রাম", price: 260 }, { size: "1 কেজি", price: 500}] },
            { name: "মাল্টিগ্রেইন বাদাম সুজি", type: "product", quantities: [{ size: "250 গ্রাম", price: 160}, { size: "500 গ্রাম", price: 320}, { size: "1 কেজি", price: 600}] },
            { name: "বার্লি সিরিয়াল (তালবিনা)", type: "product", quantities: [{ size: "250 গ্রাম", price: 220 }, { size: "500 গ্রাম", price: 420 },{ size: "1 কেজি", price: 800}] },
            { name: "তাল মিছরি", type: "product", quantities: [{ size: "200 গ্রাম", price: 140}, { size: "500 গ্রাম", price: 240 }, { size: "1 কেজি", price: 440}] },
            { name: "খেজুর চিনি", type: "product", quantities: [{ size: "250 গ্রাম", price: 250 }, { size: "500 গ্রাম", price: 500 }, { size: "1 কেজি", price: 1000}] },
            { name: "আলমারাই চিজ", type: "product", quantities: [{ size: "8 পিস", price: 300 }, { size: "32 ফুল বক্স", price: 1200 }] },
            { name: "লাফিং কাউ চিজ", type: "product", quantities: [{ size: "8 পিস", price: 300 }, { size: "32 ফুল বক্স", price: 1200 }] },
            { name: "রোলেড বেবি ওটস", type: "product", quantities: [{ size: "500 গ্রাম", price: 650 }] },
            { name: "ইরানি জাফরান", type: "product", quantities: [{ size: "1 গ্রাম", price: 400 }] },
            { name: "পিঙ্ক সল্ট", type: "product", quantities: [{ size: "250 গ্রাম", price: 120}, { size: "500 গ্রাম", price: 240 }, { size: "1 কেজি", price: 480}] },
            { name: "ডেলিভারি চার্জ", type: "delivery", quantities: [
                { size: "ঢাকার মধ্য", price: 80 },
                { size: "ঢাকার পার্শ্ববর্তী", price: 100 },
                { size: "ঢাকার বাহিরে", price: 150 }
            ]},
            { name: "ডিসকাউন্ট", type: "discount", quantities: [
                { size: "৫%", price: 0.05 },
                { size: "১০%", price: 0.10 },
                { size: "২০%", price: 0.20 },
                { size: "৩০%", price: 0.30 }
            ]},
            { name: "PAID", type: "status", quantities: [{ size: "PAID", price: null }] },
            { name: "গিফট", type: "status", quantities: [{ size: "গিফট", price: null }] },
            { name: "রিটার্ন", type: "status", quantities: [{ size: "রিটার্ন", price: null }] }
        ];

        // State variables
        let order = [];
        let selectedDeliveryCharge = null;
        let selectedDiscount = 0;
        let isGift = false;
        let isReturn = false;
        let isPaid = false;

        // DOM elements
        const optionListEl = document.getElementById('optionList');
        const searchInputEl = document.getElementById('searchInput');
        const clearSearchEl = document.getElementById('clearSearch');
        const deleteButtonEl = document.getElementById('deleteButton');
        const copyButtonEl = document.getElementById('copyButton');
        const orderSummaryEl = document.getElementById('orderSummary');

        // Function to render all options to UI
        function renderOptions(filteredOptions = allOptions) {
            optionListEl.innerHTML = '';
            filteredOptions.forEach(option => {
                const optionEl = document.createElement('div');
                optionEl.className = 'flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 transition-shadow hover:shadow-md';
                
                if (option.type === "status" && option.name === "PAID") {
                    optionEl.innerHTML = `
                        <div class="text-gray-800 font-medium text-xs">PAID</div>
                        <label class="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" id="paidCheckbox" data-name="${option.name}" data-type="${option.type}" class="status-option form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-200">
                        </label>
                    `;
                } else {
                    optionEl.innerHTML = `
                        <div class="text-gray-800 font-medium text-xs">${option.name}</div>
                        <div class="flex items-center space-x-1">
                            ${option.quantities.map(q => `
                                <button data-name="${option.name}" data-size="${q.size}" data-price="${q.price}" data-type="${option.type}" class="option-btn px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-purple-200 hover:text-purple-800 transition-colors duration-200 text-xs">
                                    ${q.size}
                                </button>
                            `).join('')}
                        </div>
                    `;
                }
                optionListEl.appendChild(optionEl);
            });
            updateButtonStyles();
        }
        
        // Function to update button styles based on state
        function updateButtonStyles() {
            document.querySelectorAll('.option-btn').forEach(btn => {
                const buttonName = btn.dataset.name;
                const buttonType = btn.dataset.type;
                const buttonSize = btn.dataset.size;

                btn.classList.remove('bg-purple-500', 'bg-purple-600', 'bg-red-500', 'bg-green-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');

                if (buttonType === 'product') {
                    const existingItem = order.find(item => item.name === buttonName && item.size === buttonSize);
                    if (existingItem) {
                        btn.classList.add('bg-purple-500', 'text-white');
                    }
                } else if (buttonType === 'delivery') {
                    if (selectedDeliveryCharge && selectedDeliveryCharge.size === buttonSize) {
                        btn.classList.add('bg-purple-500', 'text-white');
                    }
                } else if (buttonType === 'discount') {
                    const discountValue = parseFloat(btn.dataset.price);
                    if (selectedDiscount === discountValue) {
                        btn.classList.add('bg-purple-500', 'text-white');
                    }
                } else if (buttonType === 'status') {
                    if (buttonSize === 'গিফট' && isGift) {
                        btn.classList.add('bg-green-500', 'text-white');
                    }
                    if (buttonSize === 'রিটার্ন' && isReturn) {
                        btn.classList.add('bg-red-500', 'text-white');
                    }
                }
            });

            const paidCheckboxEl = document.getElementById('paidCheckbox');
            if (paidCheckboxEl) {
                paidCheckboxEl.checked = isPaid;
            }
        }

        // Function to render order summary
        function renderSummary() {
            let totalProductPrice = 0;
            let summaryContent = '';
            
            summaryContent += '<ul class="list-none space-y-2">';
            order.forEach((item, index) => {
                summaryContent += `<li class="flex items-center justify-between">
                    <span class="flex-grow">${index + 1}. ${item.quantity}x ${item.name} - ${item.size} :: ${item.price * item.quantity} টাকা</span>
                    <button class="delete-btn text-gray-500 hover:text-red-500 focus:outline-none transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </li>`;
                totalProductPrice += item.price * item.quantity;
            });
            summaryContent += '</ul>';

            if(order.length > 0) {
                summaryContent += '\n';
            }

            let deliveryPrice = selectedDeliveryCharge ? selectedDeliveryCharge.price : 0;
            let discountAmount = totalProductPrice * selectedDiscount;
            let discountedProductPrice = totalProductPrice - discountAmount;
            let finalTotal = discountedProductPrice + deliveryPrice;
            
            if (selectedDiscount > 0) {
                summaryContent += `<div class="mt-2"><span>ডিসকাউন্ট - ${selectedDiscount * 100}% [ডেলিভারি চার্জ ডিসকাউন্ট যোগ্য নয়]</span></div>`;
                summaryContent += `<div class="flex justify-between mt-2"><span>ডিসকাউন্ট এর পূর্বে:</span><span>${totalProductPrice.toFixed(0)} টাকা</span></div>`;
                summaryContent += `<div class="flex justify-between"><span>ডিসকাউন্ট দিয়ে:</span><span>${discountedProductPrice.toFixed(0)} টাকা</span></div>`;
            }
            if (selectedDeliveryCharge) {
                summaryContent += `<div class="flex justify-between mt-2"><span>ডেলিভারি চার্জ:</span><span>${selectedDeliveryCharge.price} টাকা</span></div>`;
            }
            if (isGift) {
                 summaryContent += `<div class="mt-2 text-center text-gray-600">গিফট</div>`;
            }
            if (isReturn) {
                summaryContent += `<div class="mt-2 text-center text-gray-600">রিটার্ন</div>`;
            }
            
            summaryContent += `<div class="mt-4 pt-2 border-t border-gray-300 flex justify-between font-bold"><span>মোট: ${finalTotal.toFixed(0)} টাকা</span></div>`;

            if (isPaid) {
                summaryContent += `<div class="mt-2 text-center font-bold text-green-600">PAID</div>`;
            }

            orderSummaryEl.innerHTML = summaryContent.trim();
        }

        // Function to update all UI elements
        function updateAll() {
            renderSummary();
            updateButtonStyles();
        }

        // Event Listeners
        optionListEl.addEventListener('click', (e) => {
            const button = e.target.closest('.option-btn');
            const checkbox = e.target.closest('input[type="checkbox"]');

            if (button) {
                const optionName = button.dataset.name;
                const optionType = button.dataset.type;
                const optionSize = button.dataset.size;
                const optionPrice = parseFloat(button.dataset.price);

                if (optionType === 'product') {
                    const existingItem = order.find(item => item.name === optionName && item.size === optionSize);
                    if (existingItem) {
                        existingItem.quantity++;
                    } else {
                        order.push({ name: optionName, size: optionSize, price: optionPrice, type: optionType, quantity: 1 });
                    }
                } else if (optionType === 'delivery') {
                    selectedDeliveryCharge = selectedDeliveryCharge && selectedDeliveryCharge.size === optionSize ? null : { name: optionSize, price: optionPrice };
                } else if (optionType === 'discount') {
                    selectedDiscount = selectedDiscount === optionPrice ? 0 : optionPrice;
                } else if (optionType === 'status') {
                    if (optionSize === 'গিফট') {
                        isGift = !isGift;
                    } else if (optionSize === 'রিটার্ন') {
                        isReturn = !isReturn;
                    }
                }
                updateAll();
            }

            if (checkbox) {
                if (checkbox.dataset.name === "PAID") {
                    isPaid = checkbox.checked;
                }
                updateAll();
            }
        });

        // Event listener for removing items from the summary
        orderSummaryEl.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                const index = parseInt(deleteBtn.dataset.index);
                if (order[index].quantity > 1) {
                    order[index].quantity--;
                } else {
                    order.splice(index, 1);
                }
                updateAll();
            }
        });

        deleteButtonEl.addEventListener('click', () => {
            order = [];
            selectedDeliveryCharge = null;
            selectedDiscount = 0;
            isPaid = false;
            isGift = false;
            isReturn = false;
            updateAll();
        });

        copyButtonEl.addEventListener('click', () => {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = orderSummaryEl.innerText;
            tempTextArea.style.position = 'fixed';
            tempTextArea.style.left = '-9999px';
            tempTextArea.style.top = '0';
            document.body.appendChild(tempTextArea);

            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999);
            document.execCommand('copy');
            
            document.body.removeChild(tempTextArea);

            copyButtonEl.textContent = 'Copied!';
            setTimeout(() => {
                copyButtonEl.textContent = 'Copy';
            }, 2000);
        });

        searchInputEl.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm) {
                clearSearchEl.classList.remove('hidden');
                const filtered = allOptions.filter(p => p.name.toLowerCase().includes(searchTerm));
                renderOptions(filtered);
            } else {
                clearSearchEl.classList.add('hidden');
                renderOptions(allOptions);
            }
        });

        clearSearchEl.addEventListener('click', () => {
            searchInputEl.value = '';
            clearSearchEl.classList.add('hidden');
            renderOptions(allOptions);
        });

        // Initial render
        renderOptions();
        updateAll();
