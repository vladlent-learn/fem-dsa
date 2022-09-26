export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a?.value !== b?.value) return false;

    const left = compare(a!.left, b!.left);
    const right = compare(a!.right, b!.right);

    return left && right;
}
