const CART_KEY = "maasmagic_cart";
const CUSTOMER_KEY = "maasmagic_customer";
const WHATSAPP_NUMBER = document.body?.dataset.companyWhatsappNumber?.trim() || "919605471074";

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartOverlay = document.querySelector("[data-cart-overlay]");
const cartItems = document.querySelector("[data-cart-items]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartCountEls = document.querySelectorAll("[data-cart-count]");
const whatsappOrderBtn = document.querySelector("[data-whatsapp-order]");
const orderLoadingOverlay = document.querySelector("[data-order-loading-overlay]");
const orderConfirmOverlay = document.querySelector("[data-order-confirm-overlay]");
const orderConfirmCard = document.querySelector("[data-order-confirm-card]");
const orderConfirmSuccessBtn = document.querySelector("[data-order-confirm-success]");
const orderConfirmFailureBtn = document.querySelector("[data-order-confirm-failure]");
const orderTextPreview = document.querySelector("[data-order-text-preview]");
const cartToastOverlay = document.querySelector("[data-cart-toast-overlay]");
const cartToast = document.querySelector("[data-cart-toast]");
const orderResultOverlay = document.querySelector("[data-order-result-overlay]");
const orderResultCard = document.querySelector("[data-order-result-card]");
const orderResultIcon = document.querySelector("[data-order-result-icon]");
const orderResultEyebrow = document.querySelector("[data-order-result-eyebrow]");
const orderResultTitle = document.querySelector("[data-order-result-title]");
const orderResultMessage = document.querySelector("[data-order-result-message]");
const orderResultPrimaryBtn = document.querySelector("[data-order-result-primary]");
const orderResultSecondaryBtn = document.querySelector("[data-order-result-secondary]");
const openWhatsappWebBtn = document.querySelector("[data-open-whatsapp-web]");
const copyOrderTextBtn = document.querySelector("[data-copy-order-text]");
const copyStatus = document.querySelector("[data-copy-status]");
const customerNameInput = document.querySelector("[data-customer-name]");
const customerAddressInput = document.querySelector("[data-customer-address]");
const customerPhoneInput = document.querySelector("[data-customer-phone]");
const customerPreview = document.querySelector("[data-customer-preview]");

let pendingWhatsappMessage = "";
let pendingWhatsappText = "";
let toastTimerId;

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getCustomer = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "{}");
    return {
      name: typeof raw.name === "string" ? raw.name : "",
      address: typeof raw.address === "string" ? raw.address : "",
      phone: typeof raw.phone === "string" ? raw.phone : "",
    };
  } catch {
    return { name: "", address: "", phone: "" };
  }
};

const setCustomer = (customer) => {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
};

const readCustomerFromInputs = () => {
  const name = customerNameInput instanceof HTMLInputElement ? customerNameInput.value.trim() : "";
  const address = customerAddressInput instanceof HTMLTextAreaElement ? customerAddressInput.value.trim() : "";
  const phone = customerPhoneInput instanceof HTMLInputElement ? customerPhoneInput.value.trim() : "";
  return { name, address, phone };
};

const renderCustomerPreview = (customer) => {
  if (!(customerPreview instanceof HTMLElement)) return;

  if (!customer.name && !customer.address && !customer.phone) {
    customerPreview.textContent = "No details saved yet.";
    return;
  }

  const parts = [];
  if (customer.name) parts.push(`Name: ${customer.name}`);
  if (customer.address) parts.push(`Address: ${customer.address}`);
  if (customer.phone) parts.push(`Phone: ${customer.phone}`);
  customerPreview.textContent = parts.join(" | ");
};

const hydrateCustomerInputs = () => {
  const customer = getCustomer();
  if (customerNameInput instanceof HTMLInputElement) customerNameInput.value = customer.name;
  if (customerAddressInput instanceof HTMLTextAreaElement) customerAddressInput.value = customer.address;
  if (customerPhoneInput instanceof HTMLInputElement) customerPhoneInput.value = customer.phone;
  renderCustomerPreview(customer);
};

const persistCustomerFromInputs = () => {
  const customer = readCustomerFromInputs();
  setCustomer(customer);
  renderCustomerPreview(customer);
  return customer;
};

const formatMoney = (value) => `₹${value}`;

const getCartTotal = (cart) => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const getCartCount = (cart) => cart.reduce((sum, item) => sum + item.qty, 0);

const openCart = () => {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.remove("translate-x-full", "pointer-events-none");
  cartOverlay.classList.remove("pointer-events-none", "opacity-0");
  cartOverlay.classList.add("bg-slate-900/30", "backdrop-blur-[1px]");
};

const closeCart = () => {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.add("translate-x-full", "pointer-events-none");
  cartOverlay.classList.add("pointer-events-none", "opacity-0");
  cartOverlay.classList.remove("bg-slate-900/30", "backdrop-blur-[1px]");
};

const showOverlay = (overlay) => {
  if (!(overlay instanceof HTMLElement)) return;
  overlay.classList.remove("pointer-events-none", "opacity-0");
};

const hideOverlay = (overlay) => {
  if (!(overlay instanceof HTMLElement)) return;
  overlay.classList.add("pointer-events-none", "opacity-0");
};

const showOrderLoading = () => showOverlay(orderLoadingOverlay);
const hideOrderLoading = () => hideOverlay(orderLoadingOverlay);

const hideOrderResult = () => hideOverlay(orderResultOverlay);

const showOrderResult = ({ tone, eyebrow, title, message, primaryLabel, secondaryLabel }) => {
  if (orderResultOverlay instanceof HTMLElement) {
    orderResultOverlay.classList.remove("pointer-events-none", "opacity-0");
  }

  if (orderResultCard instanceof HTMLElement) {
    orderResultCard.dataset.tone = tone;
  }

  if (orderResultEyebrow instanceof HTMLElement) {
    orderResultEyebrow.textContent = eyebrow;
  }

  if (orderResultTitle instanceof HTMLElement) {
    orderResultTitle.textContent = title;
  }

  if (orderResultMessage instanceof HTMLElement) {
    orderResultMessage.textContent = message;
  }

  if (orderResultPrimaryBtn instanceof HTMLElement) {
    orderResultPrimaryBtn.textContent = primaryLabel;
  }

  if (orderResultSecondaryBtn instanceof HTMLElement) {
    orderResultSecondaryBtn.textContent = secondaryLabel;
  }

  if (orderResultIcon instanceof HTMLElement) {
    orderResultIcon.innerHTML =
      tone === "failure"
        ? '<div class="order-result-hero-inner grid h-20 w-20 place-items-center rounded-full bg-white text-4xl text-rose-600 shadow-lg"><i class="fa-solid fa-triangle-exclamation"></i></div>'
        : '<div class="order-result-hero-inner grid h-20 w-20 place-items-center rounded-full bg-white text-4xl text-emerald-600 shadow-lg"><i class="fa-solid fa-check"></i></div>';
  }

  showOverlay(orderResultOverlay);
};

const showOrderConfirm = () => {
  if (copyStatus instanceof HTMLElement) {
    copyStatus.textContent = "";
  }
  if (orderTextPreview instanceof HTMLTextAreaElement) {
    orderTextPreview.value = pendingWhatsappText;
  }
  showOverlay(orderConfirmOverlay);
};

const hideOrderConfirm = () => hideOverlay(orderConfirmOverlay);

const showToast = (message, tone = "success") => {
  if (!(cartToast instanceof HTMLElement)) return;

  if (cartToastOverlay instanceof HTMLElement) {
    cartToastOverlay.classList.remove("pointer-events-none", "opacity-0");
  }

  cartToast.innerHTML =
    tone === "error"
      ? `<div class="flex items-center gap-4"><span class="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg"><i class="fa-solid fa-circle-exclamation text-2xl"></i></span><div class="min-w-0 flex-1"><p class="text-xs font-extrabold uppercase tracking-[0.3em] text-rose-700">Cart update</p><p class="mt-2 text-2xl font-black leading-tight text-rose-950 sm:text-3xl">${message}</p><p class="mt-3 text-sm font-semibold text-rose-700">Review the cart, adjust quantities, or retry checkout.</p></div></div>`
      : `<div class="flex items-center gap-4"><span class="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg"><i class="fa-solid fa-circle-check text-2xl"></i></span><div class="min-w-0 flex-1"><p class="text-xs font-extrabold uppercase tracking-[0.3em] text-emerald-700">Added to cart</p><p class="mt-2 text-2xl font-black leading-tight text-emerald-950 sm:text-3xl">${message}</p><p class="mt-3 text-sm font-semibold text-emerald-700">Open the cart to review, then continue shopping or checkout.</p></div></div>`;
  cartToast.classList.remove(
    "pointer-events-none",
    "opacity-0",
    "cart-toast-visible",
    "border-rose-200",
    "bg-rose-50/95",
    "text-rose-800",
    "border-emerald-200",
    "bg-emerald-50/95",
    "text-emerald-800"
  );

  if (tone === "error") {
    cartToast.classList.add("border-rose-200", "bg-rose-50/95");
  } else {
    cartToast.classList.add("border-emerald-200", "bg-emerald-50/95");
  }

  cartToast.classList.add("cart-toast-visible");

  window.clearTimeout(toastTimerId);
  toastTimerId = window.setTimeout(() => {
    cartToast.classList.remove("cart-toast-visible");
    cartToast.classList.add("pointer-events-none", "opacity-0");
    if (cartToastOverlay instanceof HTMLElement) {
      cartToastOverlay.classList.add("pointer-events-none", "opacity-0");
    }
  }, 1000);
};

const showAddedState = (buttonEl) => {
  if (!(buttonEl instanceof HTMLElement)) return;
  const originalHtml = buttonEl.innerHTML;
  buttonEl.innerHTML = '<i class="fa-solid fa-check"></i> Added';
  buttonEl.classList.remove("bg-slate-900", "hover:bg-slate-800");
  buttonEl.classList.add("bg-emerald-600", "hover:bg-emerald-700");

  window.setTimeout(() => {
    buttonEl.innerHTML = originalHtml;
    buttonEl.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
    buttonEl.classList.add("bg-slate-900", "hover:bg-slate-800");
  }, 1100);
};

const initScrollAnimations = () => {
  const animated = Array.from(document.querySelectorAll("[data-animate]"));
  if (!animated.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  // Mobile should prioritize immediate readability and interaction over delayed reveals.
  if (prefersReducedMotion || isSmallScreen || !("IntersectionObserver" in window)) {
    animated.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Reveal sections that are already near the viewport to avoid blank gaps after hero.
  animated.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 1.08) {
      el.classList.add("is-visible");
    }
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        target.classList.add("is-visible");
        obs.unobserve(target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -4% 0px",
      threshold: 0.05,
    }
  );

  animated.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      observer.observe(el);
    }
  });
};

const updateCartCount = (cart) => {
  const totalQty = getCartCount(cart);
  cartCountEls.forEach((el) => {
    el.textContent = String(totalQty);
  });
};

const renderCart = () => {
  const cart = getCart();

  if (cartTotal) {
    cartTotal.textContent = formatMoney(getCartTotal(cart));
  }

  updateCartCount(cart);

  if (!cartItems) return;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="text-sm text-slate-500">Your cart is empty. Add products to get started.</p>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="mb-3 rounded-lg border border-stone-200 p-3">
        <div class="flex items-start gap-3">
          <img src="${item.image}" alt="${item.name}" class="h-14 w-14 rounded-md border border-stone-200 object-contain p-1" />
          <div class="flex-1">
            <p class="text-sm font-bold text-slate-900">${item.name}</p>
            <p class="text-xs text-slate-500">${formatMoney(item.price)} each</p>
            <div class="mt-2 flex items-center gap-2">
              <button class="rounded border border-stone-300 px-2 py-1 text-xs" data-cart-action="decrease" data-slug="${item.slug}">-</button>
              <span class="min-w-6 text-center text-sm font-semibold">${item.qty}</span>
              <button class="rounded border border-stone-300 px-2 py-1 text-xs" data-cart-action="increase" data-slug="${item.slug}">+</button>
              <button class="ml-auto text-xs font-semibold text-rose-600" data-cart-action="remove" data-slug="${item.slug}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
};

const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const existing = cart.find((item) => item.slug === product.slug);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  setCart(cart);
  renderCart();
  showToast(`Added ${product.name} to cart`);
};

const updateQty = (slug, delta) => {
  const cart = getCart();
  const item = cart.find((entry) => entry.slug === slug);
  if (!item) return;

  item.qty += delta;
  const next = cart.filter((entry) => entry.qty > 0);
  setCart(next);
  renderCart();
};

const removeItem = (slug) => {
  const cart = getCart().filter((item) => item.slug !== slug);
  setCart(cart);
  renderCart();
};

const buildWhatsappMessage = () => {
  const cart = getCart();
  if (!cart.length) return "";
  const customer = persistCustomerFromInputs();

  let message = "Hi, I want to order:%0A%0A";

  cart.forEach((item, index) => {
    const lineTotal = item.price * item.qty;
    message += `${index + 1}. ${item.name} - ${item.qty} x ₹${item.price} = ₹${lineTotal}%0A`;
  });

  message += `%0ATotal: ₹${getCartTotal(cart)}%0A%0AName: ${encodeURIComponent(customer.name || "")}%0AAddress: ${encodeURIComponent(customer.address || "")}%0APhone: ${encodeURIComponent(customer.phone || "")}%0A`;
  return message;
};

const buildWhatsappPlainText = () => {
  const cart = getCart();
  if (!cart.length) return "";
  const customer = persistCustomerFromInputs();

  const lines = ["Hi, I want to order:", ""];

  cart.forEach((item, index) => {
    const lineTotal = item.price * item.qty;
    lines.push(`${index + 1}. ${item.name} - ${item.qty} x ₹${item.price} = ₹${lineTotal}`);
  });

  lines.push("");
  lines.push(`Total: ₹${getCartTotal(cart)}`);
  lines.push("");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Address: ${customer.address}`);
  lines.push(`Phone: ${customer.phone}`);

  return lines.join("\n");
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const hidden = mobileMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(!hidden));
  });
}

document.querySelectorAll("[data-open-cart]").forEach((button) => {
  button.addEventListener("click", openCart);
});

document.querySelectorAll("[data-close-cart]").forEach((button) => {
  button.addEventListener("click", closeCart);
});

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const addBtn = target.closest("[data-add-to-cart]");
  if (addBtn instanceof HTMLElement) {
    const slug = addBtn.dataset.productSlug;
    const name = addBtn.dataset.productName;
    const price = Number(addBtn.dataset.productPrice || 0);
    const image = addBtn.dataset.productImage || "/productmockup.jpg";
    const qtyInputId = addBtn.dataset.qtyInput;

    let qty = 1;
    if (qtyInputId) {
      const qtyInput = document.getElementById(qtyInputId);
      if (qtyInput instanceof HTMLInputElement) {
        qty = Math.max(1, Number(qtyInput.value || "1"));
      }
    }

    if (!slug || !name || !price) return;
    addToCart({ slug, name, price, image }, qty);
    showAddedState(addBtn);
    return;
  }

  const actionBtn = target.closest("[data-cart-action]");
  if (actionBtn instanceof HTMLElement) {
    const action = actionBtn.dataset.cartAction;
    const slug = actionBtn.dataset.slug;
    if (!action || !slug) return;

    if (action === "increase") updateQty(slug, 1);
    if (action === "decrease") updateQty(slug, -1);
    if (action === "remove") removeItem(slug);
  }
});

if (whatsappOrderBtn) {
  whatsappOrderBtn.addEventListener("click", () => {
    const customer = persistCustomerFromInputs();
    if (!customer.name || !customer.address || !customer.phone) {
      openCart();
      if (customerPreview instanceof HTMLElement) {
        customerPreview.textContent = "Please add name, address, and phone before checkout.";
      }
      return;
    }

    const message = buildWhatsappMessage();
    if (!message) return;

    pendingWhatsappMessage = message;
    pendingWhatsappText = buildWhatsappPlainText();

    showOrderLoading();

    window.setTimeout(() => {
      hideOrderLoading();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${pendingWhatsappMessage}`;
      const newTab = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!newTab) {
        showToast("Popup blocked. Use the WhatsApp Web button below.", "error");
      }
      showOrderConfirm();
    }, 1000);
  });
}

if (orderConfirmSuccessBtn instanceof HTMLElement) {
  orderConfirmSuccessBtn.addEventListener("click", () => {
    setCart([]);
    renderCart();
    hideOrderConfirm();
    closeCart();
    showOrderResult({
      tone: "success",
      eyebrow: "Success",
      title: "Order sent successfully",
      message: "Great. You can keep shopping and checkout more items from the menu.",
      primaryLabel: "Browse more items",
      secondaryLabel: "Close",
    });
  });
}

if (orderConfirmFailureBtn instanceof HTMLElement) {
  orderConfirmFailureBtn.addEventListener("click", () => {
    hideOrderConfirm();
    openCart();
    showToast("Order not sent. Please retry from cart.", "error");
  });
}

if (orderResultPrimaryBtn instanceof HTMLElement) {
  orderResultPrimaryBtn.addEventListener("click", () => {
    const tone = orderResultCard instanceof HTMLElement ? orderResultCard.dataset.tone : "success";
    hideOrderResult();

    if (tone === "failure") {
      showOrderConfirm();
      return;
    }

    const menuSection = document.getElementById("menu");
    if (menuSection instanceof HTMLElement) {
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (orderResultSecondaryBtn instanceof HTMLElement) {
  orderResultSecondaryBtn.addEventListener("click", () => {
    const tone = orderResultCard instanceof HTMLElement ? orderResultCard.dataset.tone : "success";
    hideOrderResult();

    if (tone === "failure") {
      openCart();
    }
  });
}

if (openWhatsappWebBtn instanceof HTMLElement) {
  openWhatsappWebBtn.addEventListener("click", () => {
    if (!pendingWhatsappMessage) return;
    window.open(`https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${pendingWhatsappMessage}`, "_blank", "noopener,noreferrer");
  });
}

if (copyOrderTextBtn instanceof HTMLElement) {
  copyOrderTextBtn.addEventListener("click", async () => {
    if (!pendingWhatsappText) return;

    try {
      await navigator.clipboard.writeText(pendingWhatsappText);
      if (copyStatus instanceof HTMLElement) {
        copyStatus.textContent = "Order text copied. Paste it into WhatsApp chat.";
      }
      showToast("Order text copied");
    } catch {
      if (copyStatus instanceof HTMLElement) {
        copyStatus.textContent = "Could not copy automatically. Please retry.";
      }
      showToast("Copy failed. Please retry.", "error");
    }
  });
}

[customerNameInput, customerAddressInput, customerPhoneInput].forEach((field) => {
  if (!(field instanceof HTMLElement)) return;
  field.addEventListener("input", () => {
    persistCustomerFromInputs();
  });
});

if (orderConfirmOverlay instanceof HTMLElement) {
  orderConfirmOverlay.addEventListener("click", (e) => {
    if (e.target === orderConfirmOverlay) {
      hideOrderConfirm();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    hideOrderLoading();
    hideOrderConfirm();
    hideOrderResult();
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});

renderCart();
hydrateCustomerInputs();
initScrollAnimations();
