import React, { useCallback, useEffect, useRef, useState } from "react";
import { BottomNav } from "./components/BottomNav";
import { StoreHeader } from "./components/StoreHeader";
import { ProductDetailsModal } from "./components/modals/ProductDetailsModal";
import {
  AboutModal,
  CheckoutModal,
  ConfirmClearModal,
  ContactModal,
  NotificationsModal,
  OffersModal,
} from "./components/modals/StoreInfoModals";
import { CartPage } from "./components/pages/CartPage";
import { CategoriesPage } from "./components/pages/CategoriesPage";
import { HomePage } from "./components/pages/HomePage";
import { MorePage } from "./components/pages/MorePage";
import { WishlistPage } from "./components/pages/WishlistPage";
import { INITIAL_NOTIFICATIONS, PAGE_ORDER, PRODUCTS } from "./data/catalog";
import {
  CartItem,
  CategoryName,
  NotificationItem,
  OrderReceipt,
  PageId,
  Product,
} from "./types/store";

const STORAGE_CART_KEY = "mj_bd_lab_cart";
const STORAGE_WISHLIST_KEY = "mj_bd_lab_wishlist";
const STORAGE_NOTIF_KEY = "mj_bd_lab_notifications";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState<CartItem[]>(() => {
    const parsed = readStorage<CartItem[]>(STORAGE_CART_KEY, []);
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item?.id === "number" && typeof item?.qty === "number" && item.qty > 0)
      : [];
  });

  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    const parsed = readStorage<number[]>(STORAGE_WISHLIST_KEY, []);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "number") : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const parsed = readStorage<NotificationItem[]>(STORAGE_NOTIF_KEY, INITIAL_NOTIFICATIONS);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_NOTIFICATIONS;
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderReceipt | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const homeSearchInputRef = useRef<HTMLInputElement | null>(null);

  // Swipe gesture state
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeStartRef = useRef<{
    x: number;
    y: number;
    time: number;
    locked: "horizontal" | "vertical" | null;
    active: boolean;
  }>({
    x: 0,
    y: 0,
    time: 0,
    locked: null,
    active: false,
  });

  // Persist cart, wishlist, and notifications in Local Storage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_NOTIF_KEY, JSON.stringify(notifications));
    } catch {
      // Ignore storage quota errors
    }
  }, [notifications]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  }, []);

  const currentIndex = PAGE_ORDER.indexOf(currentPage);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    setDragOffsetPx(0);
    setIsDragging(false);
  }, []);

  const handleSelectCategory = useCallback(
    (category: CategoryName) => {
      setSelectedCategory(category);
      navigateTo("categories");
    },
    [navigateTo]
  );

  const handleAddToCart = useCallback(
    (id: number, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === id);
        if (existing) {
          return prev.map((item) =>
            item.id === id ? { ...item, qty: item.qty + qty } : item
          );
        }
        return [...prev, { id, qty }];
      });
      const product = PRODUCTS.find((p) => p.id === id);
      showToast(product ? `${product.name} added to cart` : "Added to cart");
    },
    [showToast]
  );

  const handleChangeQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  }, []);

  const handleRemoveFromCart = useCallback(
    (id: number) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      showToast("Removed from cart");
    },
    [showToast]
  );

  const handleToggleWishlist = useCallback(
    (id: number) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        showToast(exists ? "Removed from wishlist" : "Saved to wishlist");
        return next;
      });
    },
    [showToast]
  );

  const handleAddAllWishlistToCart = useCallback(() => {
    if (wishlistIds.length === 0) return;
    setCart((prev) => {
      const next = [...prev];
      for (const id of wishlistIds) {
        const existing = next.find((item) => item.id === id);
        if (existing) {
          existing.qty += 1;
        } else {
          next.push({ id, qty: 1 });
        }
      }
      return next;
    });
    showToast("Wishlist items moved to cart");
    navigateTo("cart");
  }, [wishlistIds, showToast, navigateTo]);

  const handleOrderConfirmed = useCallback(
    (receipt: OrderReceipt) => {
      setCart([]);
      setLastOrder(receipt);
      setNotifications((prev) => [
        {
          id: `order-${Date.now()}`,
          title: `Order ${receipt.orderNumber} Confirmed`,
          message: `Preparing shipment for ${receipt.items.length} item(s).`,
          time: "Just now",
          read: false,
          targetPage: "more",
        },
        ...prev,
      ]);
      showToast(`Order ${receipt.orderNumber} confirmed`);
    },
    [showToast]
  );

  const handleClearShoppingData = useCallback(() => {
    setCart([]);
    setWishlistIds([]);
    setNotifications(INITIAL_NOTIFICATIONS);
    setLastOrder(null);
    showToast("Shopping data cleared");
  }, [showToast]);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleClickNotification = useCallback(
    (item: NotificationItem) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
      );
      setShowNotifications(false);
      if (item.targetCategory) {
        setSelectedCategory(item.targetCategory);
      }
      if (item.targetPage) {
        navigateTo(item.targetPage);
      }
    },
    [navigateTo]
  );

  // Keyboard arrow navigation across the 5 pages when not typing in an input or modal
  useEffect(() => {
    const anyModalOpen =
      Boolean(activeProduct) ||
      showNotifications ||
      showOffers ||
      showCheckout ||
      showContact ||
      showAbout ||
      showConfirmClear;

    if (anyModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight" && currentIndex < PAGE_ORDER.length - 1) {
        navigateTo(PAGE_ORDER[currentIndex + 1]);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        navigateTo(PAGE_ORDER[currentIndex - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentIndex,
    navigateTo,
    activeProduct,
    showNotifications,
    showOffers,
    showCheckout,
    showContact,
    showAbout,
    showConfirmClear,
  ]);

  // Touch & Mouse Swipe handlers
  const isInteractiveTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(
      target.closest("button, a, input, textarea, select, [role='button'], [role='tab']")
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    swipeStartRef.current = {
      x: t.clientX,
      y: t.clientY,
      time: Date.now(),
      locked: null,
      active: true,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const state = swipeStartRef.current;
    if (!state.active || e.touches.length !== 1) return;

    const t = e.touches[0];
    const dx = t.clientX - state.x;
    const dy = t.clientY - state.y;

    if (!state.locked) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy) * 1.2) {
        state.locked = "horizontal";
        setIsDragging(true);
      } else {
        state.locked = "vertical";
        state.active = false;
        return;
      }
    }

    if (state.locked === "horizontal") {
      const atStartEdge = currentIndex === 0 && dx > 0;
      const atEndEdge = currentIndex === PAGE_ORDER.length - 1 && dx < 0;
      const resisted = atStartEdge || atEndEdge ? dx * 0.25 : dx;
      setDragOffsetPx(resisted);
    }
  };

  const finishSwipe = (endX: number) => {
    const state = swipeStartRef.current;
    if (!state.active) return;

    const wasHorizontal = state.locked === "horizontal";
    const dx = endX - state.x;
    const dt = Math.max(1, Date.now() - state.time);
    const velocity = Math.abs(dx) / dt;

    swipeStartRef.current.active = false;
    swipeStartRef.current.locked = null;
    setIsDragging(false);

    if (!wasHorizontal) {
      setDragOffsetPx(0);
      return;
    }

    const threshold = 55;
    if ((dx < -threshold || (dx < -24 && velocity > 0.35)) && currentIndex < PAGE_ORDER.length - 1) {
      navigateTo(PAGE_ORDER[currentIndex + 1]);
    } else if ((dx > threshold || (dx > 24 && velocity > 0.35)) && currentIndex > 0) {
      navigateTo(PAGE_ORDER[currentIndex - 1]);
    } else {
      setDragOffsetPx(0);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.changedTouches[0];
    finishSwipe(t ? t.clientX : swipeStartRef.current.x);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if (isInteractiveTarget(e.target)) return;
    swipeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      locked: null,
      active: true,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const state = swipeStartRef.current;
    if (!state.active) return;

    const dx = e.clientX - state.x;
    const dy = e.clientY - state.y;

    if (!state.locked) {
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
      if (Math.abs(dx) > Math.abs(dy) * 1.2) {
        state.locked = "horizontal";
        setIsDragging(true);
      } else {
        state.locked = "vertical";
        state.active = false;
        return;
      }
    }

    if (state.locked === "horizontal") {
      const atStartEdge = currentIndex === 0 && dx > 0;
      const atEndEdge = currentIndex === PAGE_ORDER.length - 1 && dx < 0;
      setDragOffsetPx(atStartEdge || atEndEdge ? dx * 0.25 : dx);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    finishSwipe(e.clientX);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-[#f8f7fc] text-[#15152b] overflow-hidden">
      <StoreHeader
        currentPage={currentPage}
        onNavigate={navigateTo}
        unreadNotifications={unreadNotifications}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentPage !== "categories") {
            navigateTo("categories");
          }
        }}
        onSearchSubmit={() => navigateTo("categories")}
        onOpenNotifications={() => setShowNotifications(true)}
        searchInputRef={homeSearchInputRef}
      />

      {/* 5-Page Swipeable Viewport */}
      <main
        className="flex-1 min-h-0 overflow-hidden relative select-none sm:select-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          swipeStartRef.current.active = false;
          setIsDragging(false);
          setDragOffsetPx(0);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartRef.current.active = false;
          setIsDragging(false);
          setDragOffsetPx(0);
        }}
      >
        <div
          className="flex h-full w-[500%] will-change-transform"
          style={{
            transform: `translate3d(calc(-${currentIndex * 20}% + ${dragOffsetPx}px), 0, 0)`,
            transition: isDragging ? "none" : "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <section
            aria-label="Home"
            aria-hidden={currentPage !== "home"}
            className="w-1/5 h-full overflow-y-auto overscroll-contain custom-scroll"
          >
            <HomePage
              products={PRODUCTS}
              wishlistIds={wishlistIds}
              cartCount={cartCount}
              onNavigate={navigateTo}
              onSelectCategory={handleSelectCategory}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(id) => handleAddToCart(id, 1)}
              onOpenDetails={setActiveProduct}
              onOpenOffers={() => setShowOffers(true)}
            />
          </section>

          <section
            aria-label="Categories"
            aria-hidden={currentPage !== "categories"}
            className="w-1/5 h-full overflow-y-auto overscroll-contain custom-scroll"
          >
            <CategoriesPage
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              wishlistIds={wishlistIds}
              onSelectCategory={setSelectedCategory}
              onSearchChange={setSearchQuery}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(id) => handleAddToCart(id, 1)}
              onOpenDetails={setActiveProduct}
            />
          </section>

          <section
            aria-label="Cart"
            aria-hidden={currentPage !== "cart"}
            className="w-1/5 h-full overflow-y-auto overscroll-contain custom-scroll"
          >
            <CartPage
              cart={cart}
              products={PRODUCTS}
              onChangeQty={handleChangeQty}
              onRemoveItem={handleRemoveFromCart}
              onOpenDetails={setActiveProduct}
              onCheckout={() => setShowCheckout(true)}
              onNavigate={navigateTo}
            />
          </section>

          <section
            aria-label="Wishlist"
            aria-hidden={currentPage !== "wishlist"}
            className="w-1/5 h-full overflow-y-auto overscroll-contain custom-scroll"
          >
            <WishlistPage
              products={PRODUCTS}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={(id) => handleAddToCart(id, 1)}
              onAddAllToCart={handleAddAllWishlistToCart}
              onOpenDetails={setActiveProduct}
              onNavigate={navigateTo}
            />
          </section>

          <section
            aria-label="More"
            aria-hidden={currentPage !== "more"}
            className="w-1/5 h-full overflow-y-auto overscroll-contain custom-scroll"
          >
            <MorePage
              unreadNotifications={unreadNotifications}
              lastOrder={lastOrder}
              onOpenNotifications={() => setShowNotifications(true)}
              onOpenOffers={() => setShowOffers(true)}
              onNavigate={navigateTo}
              onOpenContact={() => setShowContact(true)}
              onOpenAbout={() => setShowAbout(true)}
              onRequestClearData={() => setShowConfirmClear(true)}
            />
          </section>
        </div>
      </main>

      <BottomNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
      />

      {/* Modals */}
      <ProductDetailsModal
        product={activeProduct}
        isWishlisted={activeProduct ? wishlistIds.includes(activeProduct.id) : false}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />

      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onClickNotification={handleClickNotification}
      />

      <OffersModal
        isOpen={showOffers}
        onClose={() => setShowOffers(false)}
        onSelectCategory={handleSelectCategory}
        onNotifyToast={showToast}
      />

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        products={PRODUCTS}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        onNotifyToast={showToast}
      />

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        onNavigate={navigateTo}
      />

      <ConfirmClearModal
        isOpen={showConfirmClear}
        onClose={() => setShowConfirmClear(false)}
        onConfirm={handleClearShoppingData}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#15152b] text-white px-4 py-2.5 rounded-full shadow-lg text-xs sm:text-sm font-medium whitespace-nowrap pointer-events-none"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
