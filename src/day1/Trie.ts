export class Node {
    isWord = false;
    children: Node[] = [];

    constructor(public val: string) {}
}

export default class Trie {
    private abc: Node[] = Array.from(
        { length: 26 },
        (_, i) => new Node(String.fromCharCode(i)),
    );

    private getIndex(char: string): number {
        return char.charCodeAt(0) - "a".charCodeAt(0);
    }

    insert(item: string): void {
        let curr = this.abc[this.getIndex(item[0])];

        for (let i = 1; i < item.length; i++) {
            const idx = this.getIndex(item[i]);
            let next = curr.children[idx];

            if (!next) {
                next = new Node(item[i]);
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
        return JSON.stringify(this.abc, null, 2);
    }
}

const trie = new Trie();
trie.insert("foo");
trie.insert("fool");
trie.insert("foolish");
trie.insert("bar");
console.log(trie.toString());
