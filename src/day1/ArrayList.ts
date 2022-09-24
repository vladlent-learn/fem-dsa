export default class ArrayList<T> {
    private arr: T[];

    length = 0;

    get capacity(): number {
        return this.arr.length;
    }

    constructor(capacity: number) {
        this.arr = new Array(capacity);
    }

    private grow() {
        const newArr = new Array(this.capacity * 2);

        for (let i = 0; i < this.arr.length; i++) {
            newArr[i] = this.arr[i];
        }

        this.arr = newArr;
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) return;
        if (this.length === this.capacity) this.grow();

        for (let i = this.length; i > idx; i--) {
            [this.arr[i], this.arr[i - 1]] = [this.arr[i - 1], this.arr[i]];
        }

        this.arr[idx] = item;
        this.length++;
    }

    append(item: T): void {
        this.insertAt(item, this.length);
    }

    remove(item: T): T | undefined {
        const idx = this.arr.findIndex((v) => v === item);

        if (idx !== -1) {
            return this.removeAt(idx);
        }

        return;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) return;
        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) return;

        const val = this.get(idx);

        for (let i = idx; i < this.length; i++) {
            this.arr[i] = this.arr[i + 1];
        }

        this.length--;

        return val;
    }
}
