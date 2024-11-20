def dfs(x, y, ship):
    stack = [(x, y)]
    visited[x][y] = True
    shipCeils = [(x, y)]

    while stack:
        cx, cy = stack.pop()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < N and 0 <= ny < M and not visited[nx][ny] and map[nx][ny] == 'X':
                visited[nx][ny] = True
                shipCeils.append((nx, ny))
                stack.append((nx, ny))

    for px, py in shipCeils:
        ceil_belongsToShip[(px, py)] = ship
    ship_NumOfCeils[ship] = len(shipCeils)

string = [int(x) for x in input().split(' ')]
N = string[0]
M = string[1]
q = string[2]

shipNum = 0

ship_NumOfCeils = {}
ceil_belongsToShip = {}
visited = [[False] * M for i in range(N)]

map = []

for i in range(N):
    map.append(input())

for i in range(N):
    for j in range(M):
        if map[i][j] == 'X' and not visited[i][j]:
            shipNum += 1
            dfs(i, j, shipNum)

results = []

for i in range(q):
    string = [int(x) for x in input().split(' ')]

    xShot = string[0] - 1
    yShot = string[1] - 1

    if map[xShot][yShot] == '.':
        results.append("MISS")
    else:
        ship = ceil_belongsToShip[xShot, yShot]
        ship_NumOfCeils[ship] -= 1

        if (ship_NumOfCeils[ship] == 0):
            results.append("DESTROY")
        else:
            results.append("HIT")

for elem in results:
    print(elem)