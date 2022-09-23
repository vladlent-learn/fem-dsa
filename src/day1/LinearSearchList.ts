export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    for (const n of haystack) {
        if (n === needle) {
            return true;
        }
    }

    return false;
}
