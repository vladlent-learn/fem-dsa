import Queue from "@code/Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = new Queue<BinaryNode<number>>();

    queue.enqueue(head);

    while (queue.length !== 0) {
        const curr = queue.deque();

        if (curr?.value === needle) return true;

        if (curr?.left) queue.enqueue(curr.left);
        if (curr?.right) queue.enqueue(curr.right);
    }

    return false;
}
