export default function pre_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}

function traverse(head: BinaryNode<number> | null, result: number[]): number[] {
    if (!head) return result;

    traverse(head.left, result);
    result.push(head.value);
    traverse(head.right, result);

    return result;
}
