function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  menu.classList.toggle("open");
  overlay.classList.toggle("active");
}

// Переход с каталога на главную страницу при помощи кнопки BACK
function history_back() {
    window.history.back();
}

// ВОРК НОРМ

let cart = [];

function toggleMenuCart() {
  const cartMenu = document.getElementById('sideMenuCart');
  const overlay = document.getElementById('overlay-cart');
  
  cartMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  
  // Обновляем отображение корзины только когда она открыта
  if (cartMenu.classList.contains('active')) {
    updateCartDisplay();
  }
}

function addToCart(productName, productDescription, price) {
  const existingItem = cart.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      description: productDescription,
      price: price,
      quantity: 1
    });
  }
  
  updateCartDisplay();
}

function updateCartItemQuantity(index, change) {
  cart[index].quantity += change;
  
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartQuantityElement = document.getElementById('cartQuantity');
  const cartTotalElement = document.getElementById('cartTotal');
  const cartHeader = document.querySelector('.cart-header h2');
  
  // Очищаем контейнер
  cartItemsContainer.innerHTML = '';
  
  // Добавляем товары
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-description">${item.description}</div>
        <div class="cart-item-price">${item.price}</div>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
  
  // Обновляем общее количество и сумму
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
  
  cartQuantityElement.textContent = totalQuantity;
  cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
  cartHeader.textContent = `CART (${totalQuantity})`;
}

// Добавляем обработчики для кнопок "Add to Cart"
document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.herb-price-display-style').textContent;
      const productPrice = productCard.querySelector('.product-price-info').textContent;
      
      // Для примера используем фиксированное описание, можно добавить реальное описание в HTML
      addToCart(productName, "Product description", productPrice);
    });
  });
});

