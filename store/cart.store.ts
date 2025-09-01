import { CartCustomization, CartStore } from "@/type";
import { create } from "zustand";

function areCustomisationsEqual(
    a: CartCustomization[] = [],
    b: CartCustomization[] = []
): boolean {
    if (a.length !== b.length) return false;

    const normalize = (arr: CartCustomization[]) =>
        [...arr].sort((x, y) => x._id.localeCompare(y._id));

    return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (item) => {
        const customisations = item.customisations ?? [];

        const existing = get().items.find(
            (i) =>
                i._id === item._id &&
                areCustomisationsEqual(i.customisations ?? [], customisations)
        );

        if (existing) {
            set({
                items: get().items.map((i) =>
                    i._id === item._id &&
                    areCustomisationsEqual(i.customisations ?? [], customisations)
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                ),
            });
        } else {
            set({
                items: [...get().items, { ...item, quantity: 1, customisations }],
            });
        }
    },

    removeItem: (_id, customisations = []) => {
        set({
            items: get().items.filter(
                (i) =>
                    !(
                        i._id === _id &&
                        areCustomisationsEqual(i.customisations ?? [], customisations)
                    )
            ),
        });
    },

    increaseQty: (_id, customisations = []) => {
        set({
            items: get().items.map((i) =>
                i._id === _id &&
                areCustomisationsEqual(i.customisations ?? [], customisations)
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ),
        });
    },

    decreaseQty: (_id, customisations = []) => {
        set({
            items: get()
                .items.map((i) =>
                    i._id === _id &&
                    areCustomisationsEqual(i.customisations ?? [], customisations)
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
                .filter((i) => i.quantity > 0),
        });
    },

    clearCart: () => set({ items: [] }),

    getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

    getTotalPrice: () =>
        get().items.reduce((total, item) => {
            const base = item.price;
            const customPrice =
                item.customisations?.reduce(
                    (s: number, c: CartCustomization) => s + c.price,
                    0
                ) ?? 0;
            return total + item.quantity * (base + customPrice);
        }, 0),
}));