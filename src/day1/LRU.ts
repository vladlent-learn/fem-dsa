class Node<K, T> {
    prev?: Node<K, T>;
    next?: Node<K, T>;
    constructor(public key: K, public val: T) {}
}

export default class LRU<K, V> {
    private map = new Map<K, Node<K, V>>();

    private head?: Node<K, V>;
    private tail?: Node<K, V>;

    get length() {
        return this.map.size;
    }

    constructor(public readonly capacity: number) {}

    private moveToFront(node: Node<K, V>): void {
        if (node === this.head) return;

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.next = this.head;
        node.prev = undefined;
        this.head = node;
    }

    private evict(): void {
        if (this.tail) {
            this.map.delete(this.tail.key);

            const newTail = this.tail.prev as Node<K, V>;
            newTail.next = undefined;
            this.tail.prev = undefined;
            this.tail = newTail;
        }
    }

    update(key: K, value: V): void {
        let node = this.map.get(key);

        if (node) {
            node.val = value;
            this.moveToFront(node);
            return;
        }

        if (this.capacity === this.length) {
            this.evict();
        }

        node = new Node<K, V>(key, value);

        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }

        this.map.set(key, node);
    }

    get(key: K): V | undefined {
        const node = this.map.get(key);
        if (!node) return;
        this.moveToFront(node);
        return node.val;
    }
}
