export default class Map<T extends string | number, V> {
    private list: (V | undefined)[] = new Array(15);
    private length = 0;

    private hash(key: string | number): number {
        if (typeof key === "string") {
            let sum = 0;

            for (let i = 0; i < key.length; i++) {
                sum += key.charCodeAt(i);
            }

            return sum % this.list.length;
        }
        return key & this.list.length;
    }

    get(key: T): V | undefined {
        return this.list[this.hash(key)];
    }
    set(key: T, value: V): void {
        this.length++;
        this.list[this.hash(key)] = value;
    }

    delete(key: T): V | undefined {
        const hash = this.hash(key);
        const value = this.get(key);

        if (!value) return undefined;

        this.length--;
        this.list[hash] = undefined;

        return value;
    }

    size(): number {
        return this.length;
    }
}
