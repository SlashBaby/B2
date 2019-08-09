const _popRandom = array => {
    const n = array.length,
        i = Math.random() * n | 0, // Math.foor
        t = array[i];
    array[i] = array[n - 1], array[n - 1] = t;
    return array.pop();
}

const _infoByIndex = (index, width, data) => ({
    x: index % width,
    y: index / width | 0,
    r: data[index * 4 + 0],
    g: data[index * 4 + 1],
    b: data[index * 4 + 2],
    a: data[index * 4 + 3]
})

const bfs = (_cnt, _width, _height, pixelsData) => {
    const res = [],
        step = 10,
        width = Math.ceil(_width / step),
        height = Math.ceil(_height / step),
        cnt = width * height,
        visited = new Array(cnt),
        q = [],
        p = 0;

    q.push(p)
    while (q.length != 0) {
        const index = _popRandom(q);
        res.push(_infoByIndex(index * step * step, _width, pixelsData));

        let next;
        if (!visited[next = index + 1] && next < cnt) {
            q.push(next);
            visited[next] = true;
        }

        if (!visited[next = index - 1] && next >= 0) {
            q.push(next);
            visited[next] = true;
        }

        if (!visited[next = index + width] && next < cnt) {
            q.push(next);
            visited[next] = true;
        }
        if (!visited[next = index - width] && next >= 0) {
            q.push(next);
            visited[next] = true;
        }
    }
    return res.reverse();
}

export { bfs }