type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class Queue<T> {
    length = 0;

    private head?: Node<T>;
    private tail?: Node<T>;

    enqueue(item: T): void {
        const node: Node<T> = { val: item };

        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
    }

    deque(): T | undefined {
        if (!this.head) return;

        const val = this.head.val;
        this.head = this.head.next;

        this.length--;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return val;
    }

    peek(): T | undefined {
        return this.head?.val;
    }
}
