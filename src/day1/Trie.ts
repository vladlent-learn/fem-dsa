export class Node {
    isWord = false;
    children: Node[] = [];

    constructor(public val: string) {}
}

export default class Trie {
    private head = new Node("");

    private getIndex(char: string): number {
        return char.charCodeAt(0) - "a".charCodeAt(0);
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

    delete(item: string): void {}

    find(partial: string): string[] {
        const result = [];
        return [];
    }

    toString(): string {
        return JSON.stringify(this.head, null, 2);
    }
}

const trie = new Trie();
trie.insert("foo");
trie.insert("fool");
trie.insert("foolish");
trie.insert("bar");
console.log(trie.toString());
