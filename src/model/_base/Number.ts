export function formatCurrencyVN(price: string): string {
    const numberPrice = parseFloat(price);
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(numberPrice);
}
