interface Node<T> {
    val: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    private head?: Node<T>;
    private tail?: Node<T>;

    length = 0;

    private getNode(idx: number): Node<T> | undefined {
        if (idx > this.length - 1) return;

        let current = this.head;

        for (let i = 0; i < idx; i++) {
            current = current?.next;
        }

        return current;
    }

    private removeNode(node: Node<T>): T | undefined {
        if (this.length === 0) return;

        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
            return node.val;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        return node.val;
    }

    prepend(item: T): void {
        const node: Node<T> = { val: item };

        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) return;

        if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length) {
            this.append(item);
        } else {
            const prev = this.getNode(idx - 1) as Node<T>;
            prev.next = { val: item, prev, next: prev.next };
            this.length++;
        }
    }
    append(item: T): void {
        if (this.length === 0) {
            this.prepend(item);
        } else {
            const node: Node<T> = { val: item, prev: this.tail };
            this.tail!.next = node;
            this.tail = node;
            this.length++;
        }
    }
    remove(item: T): T | undefined {
        let current = this.head;

        while (current) {
            if (current.val === item) {
                return this.removeNode(current);
            }
            current = current.next;
        }

        return;
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.val;
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length - 1) return;
        return this.removeNode(this.getNode(idx) as Node<T>);
    }
}
