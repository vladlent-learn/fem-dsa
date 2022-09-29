export default function dijkstra_list(
    source: number,
    sink: number,
    list: WeightedAdjacencyList,
): number[] {
    const prev: number[] = new Array(list.length).fill(-1);
    const seen: boolean[] = new Array(list.length).fill(false);
    const distances: number[] = new Array(list.length).fill(Infinity);

    distances[source] = 0;

    while (hasUnvisited(seen)) {
        const loIdx = getLowestUnvisited(seen, distances);
        seen[loIdx] = true;

        for (const edge of list[loIdx]) {
            if (seen[edge.to]) continue;

            const dist = distances[loIdx] + edge.weight;

            if (dist < distances[edge.to]) {
                distances[edge.to] = dist;
                prev[edge.to] = loIdx;
            }
        }
    }

    const result: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        result.push(curr);
        curr = prev[curr];
    }

    result.push(source);

    return result.reverse();
}

function hasUnvisited(seen: boolean[]): boolean {
    return seen.some((v) => !v);
}

function getLowestUnvisited(seen: boolean[], distances: number[]): number {
    let idx = -1;
    let lowest = Infinity;

    for (let i = 0; i < seen.length; i++) {
        if (!seen[i] && distances[i] < lowest) {
            idx = i;
            lowest = distances[i];
        }
    }

    return idx;
}
