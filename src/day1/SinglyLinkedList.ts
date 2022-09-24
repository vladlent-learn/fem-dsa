type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number = 0;

    private head?: Node<T>;
    private tail?: Node<T>;

    private getNode(idx: number): Node<T> | undefined {
        if (idx > this.length - 1) return;

        let current = this.head;

        for (let i = 0; i < idx; i++) {
            current = current?.next;
        }

        return current;
    }

    private removeHead(): T | undefined {
        if (this.length === 0) return;

        let val = this.head?.val;

        if (this.length === 1) {
            this.head = this.tail = undefined;
        } else {
            this.head = this.head?.next;
        }

        this.length--;

        return val;
    }

    private removeNode(prev: Node<T>, node: Node<T>): T | undefined {
        this.length--;
        const val = node.val;
        prev.next = node.next;
        return val;
    }

    prepend(item: T): void {
        const node: Node<T> = { val: item };

        if (this.length === 0) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length - 1) return;

        if (idx === 0) {
            this.prepend(item);
        } else if (idx === this.length - 1) {
            this.append(item);
        } else {
            const node: Node<T> = { val: item };
            const prev = this.getNode(idx - 1) as Node<T>;

            node.next = prev.next;
            prev.next = node;
            this.length++;
        }
    }

    append(item: T): void {
        if (this.length === 0) {
            this.prepend(item);
        } else {
            const node: Node<T> = { val: item };
            this.tail!.next = node;
            this.tail = node;
            this.length++;
        }
    }

    remove(item: T): T | undefined {
        if (item === this.head?.val) return this.removeHead();

        let current = this.head;

        while (current && current.next) {
            if (current.next?.val === item) {
                return this.removeNode(current, current.next);
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
        if (idx === 0) return this.removeHead();

        let prev = this.head;

        for (let i = 0; i < idx - 1; i++) {
            prev = prev?.next;
        }

        return this.removeNode(prev as Node<T>, prev!.next as Node<T>);
    }

    toString() {
        const res = [];

        let current = this.head;

        while (current) {
            res.push(current.val);
            current = current.next;
        }

        return res.join("->");
    }
}
