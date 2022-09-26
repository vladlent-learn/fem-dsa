export default function pre_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}

function traverse(head: BinaryNode<number> | null, result: number[]): number[] {
    if (!head) return result;

    traverse(head.left, result);
    traverse(head.right, result);

    result.push(head.value);

    return result;
}
