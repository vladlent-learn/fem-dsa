export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const result: number[] = [];

    if (traverse(graph, source, needle, [], result)) {
        return result;
    } else {
        return null;
    }
}

function traverse(
    graph: WeightedAdjacencyList,
    current: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    if (seen[current]) return false;

    path.push(current);
    seen[current] = true;

    if (needle === current) {
        return true;
    }

    for (const node of graph[current]) {
        if (traverse(graph, node.to, needle, seen, path)) {
            return true;
        }
    }

    path.pop();

    return false;
}
