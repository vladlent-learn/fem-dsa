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
        let oneLess = partial.slice(0, -1);
        let curr = this.head;

        for (const char of oneLess) {
            const idx = this.getIndex(char);
            let next = curr.children[idx];

            if (next) {
                curr = next;
            } else {
                return [];
            }
        }

        // TODO: Refactor
        const idx = this.getIndex(partial[partial.length - 1]);

        return this.findWords(curr.children[idx], oneLess, []);
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
console.log(trie.find("fo").sort());
trie.delete("fool");
console.log(trie.find("fo").sort());
