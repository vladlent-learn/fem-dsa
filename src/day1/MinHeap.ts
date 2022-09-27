export default class MinHeap {
    private heap: number[] = [];

    get length() {
        return this.heap.length;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value: number): void {
        this.heap.push(value);

        let idx = this.length - 1;

        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);

            if (this.heap[idx] < this.heap[parent]) {
                this.swap(idx, parent);
                idx = parent;
            } else {
                break;
            }
        }
    }

    delete(): number {
        this.swap(0, this.length - 1);

        const value = this.heap.pop() as number;

        let idx = 0;

        while (idx < this.length / 2) {
            const left = idx * 2 + 1;
            const right = idx * 2 + 2;

            if (
                this.heap[idx] > this.heap[left] ||
                this.heap[idx] > this.heap[right]
            ) {
                if (this.heap[left] < this.heap[right]) {
                    this.swap(left, idx);
                    idx = left;
                } else if (this.heap[right]) {
                    this.swap(right, idx);
                    idx = right;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        return value;
    }
}
