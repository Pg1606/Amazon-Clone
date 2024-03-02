import { getDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    const selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

    console.log(typeof(selectQuantity.value));

    cart.forEach((item) => {
        if (productId === item.productId) {
        matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += Number(selectQuantity.value);
    } else {
        cart.push({
        productId: productId,
        quantity: Number(selectQuantity.value),
        deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        } 
    });

    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            cartItem.quantity = newQuantity;
        }
    });
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
        matchingItem = item;
        }
    });

    if(!matchingItem) {
        return;
    }

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    if(!deliveryOption) {
        return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}