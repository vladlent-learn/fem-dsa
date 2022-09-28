class Node {
    isWord = false;
    children: (Node | undefined)[] = [];

    constructor(public val: string) {}
}

export default class Trie {
    private head = new Node("");

    private getIndex(char: string): number {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }

    private getNode(str: string): Node | undefined {
        let curr = this.head;

        for (const char of str) {
            const idx = this.getIndex(char);
            let next = curr.children[idx];

            if (next) {
                curr = next;
            } else {
                return undefined;
            }
        }

        return curr;
    }

    private findWords(
        head: Node | undefined,
        partial: string,
        result: string[],
    ): string[] {
        if (!head) return result;

        const newPartial = partial + head.val;

        if (head.isWord) {
            result.push(newPartial);
        }

        for (const child of head.children) {
            this.findWords(child, newPartial, result);
        }

        return result;
    }

    private deleteNode(parent: Node, partial: string[]): void {
        const isLast = partial.length === 1;
        const char = partial.shift() as string;

        let node = parent.children[this.getIndex(char)];

        if (!node) return;

        const hasChildren = node.children.filter(Boolean);

        if (!isLast) {
            this.deleteNode(node, partial);
        } else if (hasChildren) {
            node.isWord = false;
        }

        if (!hasChildren) {
            parent.children = [];
        }
    }

    insert(item: string): void {
        let curr = this.head;

        for (const char of item) {
            const idx = this.getIndex(char);
            let next = curr.children[idx];

            if (!next) {
                next = new Node(char);
                curr.children[idx] = next;
            }

            curr = next;
        }

        curr.isWord = true;
    }

    delete(item: string): void {
        this.deleteNode(this.head, item.split(""));
    }

    find(partial: string): string[] {
        return this.findWords(this.getNode(partial), partial.slice(0, -1), []);
    }
}
