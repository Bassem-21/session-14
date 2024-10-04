const menu = document.getElementById('show-form');
        const drinksContainer = document.getElementById('drinks-container').querySelector('ul');
        const sandwichesContainer = document.getElementById('sandwiches-container').querySelector('ul');

        function showForm() {
            menu.classList.remove('hidden');
        }

        function hideForm() {
            menu.classList.add('hidden');
            resetForm();
        }

        document.getElementById('add-item-button').addEventListener('click', addItem);

        function addItem() {
            const itemType = document.getElementById('item-type').value;
            const itemName = document.getElementById('item-name').value;
            const itemPrice = document.getElementById('item-price').value;
            const itemDetails = document.getElementById('details').value;
            const itemImage = document.getElementById('add-image').files[0];

            let isValid = true;

            document.querySelectorAll('.error').forEach(error => error.classList.add('hidden'));

            if (!itemType) {
                document.getElementById('type-error').classList.remove('hidden');
                isValid = false;
            }

            if (!itemName) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }

            if (!itemImage) {
                document.getElementById('image-error').classList.remove('hidden');
                isValid = false;
            }

            if (!itemPrice || itemPrice <= 0) {
                document.getElementById('price-error').classList.remove('hidden');
                isValid = false;
            }

            if (!itemDetails) {
                document.getElementById('details-error').classList.remove('hidden');
                isValid = false;
            }

            if (!isValid) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const newItem = {
                    name: itemName,
                    price: itemPrice,
                    description: itemDetails,
                    image: e.target.result
                };

                if (itemType === 'drinks') {
                    addItemToContainer(drinksContainer, newItem);
                } else {
                    addItemToContainer(sandwichesContainer, newItem);
                }

                hideForm();
            };

            reader.readAsDataURL(itemImage);
        }

        function addItemToContainer(container, item) {
            const itemHtml = `
                <li>
                    <button class="remove-item" onclick="removeItem(this)">X</button>
                    <img src="${item.image}">
                    <b>${item.name}</b>
                    <b>$${item.price}</b>
                    <p>${item.description}</p>
                </li>`;
            container.innerHTML += itemHtml;
        }

        function removeItem(button) {
            const itemLi = button.parentElement; 
            itemLi.remove(); 
        }

        function resetForm() {
            document.getElementById('item-type').value = '';
            document.getElementById('item-name').value = '';
            document.getElementById('add-image').value = '';
            document.getElementById('item-price').value = '';
            document.getElementById('details').value = '';
            document.getElementById('image-preview').style.display = 'none';
            document.querySelectorAll('.error').forEach(error => error.classList.add('hidden'));
        }

        document.getElementById('item-type').addEventListener('change', () => hideError('type-error'));
        document.getElementById('item-name').addEventListener('input', () => hideError('name-error'));
        document.getElementById('add-image').addEventListener('change', () => hideError('image-error'));
        document.getElementById('item-price').addEventListener('input', () => hideError('price-error'));
        document.getElementById('details').addEventListener('input', () => hideError('details-error'));

        function hideError(errorId) {
            document.getElementById(errorId).classList.add('hidden');
        }

        document.getElementById('add-image').addEventListener('change', function (event) {
            const file = event.target.files[0];
            const preview = document.getElementById('image-preview');

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            } else {
                preview.style.display = 'none';
            }
        });