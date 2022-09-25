export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    return walk(maze, wall, start, end, []);
}

function walk(
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    result: Point[],
): Point[] {
    if (current.y >= maze.length || current.x >= maze[end.y].length)
        return result;
    if (current.x < 0 || current.y < 0) return result;
    if (maze[current.y][current.x] === wall) return result;
    if (result.find((p) => current.x === p.x && current.y === p.y))
        return result;

    result.push(current);

    if (current.x === end.x && current.y === end.y) return result;

    walk(maze, wall, { x: current.x - 1, y: current.y }, end, result);
    walk(maze, wall, { x: current.x + 1, y: current.y }, end, result);
    walk(maze, wall, { x: current.x, y: current.y + 1 }, end, result);

    return result;
}
