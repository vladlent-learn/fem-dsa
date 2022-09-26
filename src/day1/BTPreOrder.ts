export default function pre_order_search(head: BinaryNode<number>): number[] {
    return traverse(head, []);
}

function traverse(head: BinaryNode<number> | null, result: number[]): number[] {
    if (!head) return result;

    result.push(head.value);

    traverse(head.left, result);
    traverse(head.right, result);

    return result;
}
