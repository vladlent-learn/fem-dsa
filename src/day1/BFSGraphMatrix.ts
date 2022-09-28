import Queue from "@code/Queue";

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const q = new Queue<number>();

    q.enqueue(source);
    seen[source] = true;

    while (q.length) {
        const curr = q.deque() as number;

        if (curr === needle) break;

        const adj = graph[curr];
        for (let i = 0; i < adj.length; i++) {
            if (adj[i] === 0 || seen[i]) continue;

            q.enqueue(i);
            seen[i] = true;
            prev[i] = curr;
        }
    }

    if (prev[needle] === -1) return null;

    const result = [];
    let current = needle;

    while (prev[current] !== -1) {
        result.push(current);
        current = prev[current];
    }

    return [source, ...result.reverse()];
}
