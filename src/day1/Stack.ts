type Node<T> = {
    val: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    length = 0;

    private head?: Node<T>;

    push(item: T): void {
        this.length++;

        const node: Node<T> = { val: item };

        if (!this.head) {
            this.head = node;
        } else {
            node.prev = this.head;
            this.head = node;
        }
    }

    pop(): T | undefined {
        if (!this.head) return;
        this.length--;

        const val = this.head.val;
        this.head = this.head.prev;
        return val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}
