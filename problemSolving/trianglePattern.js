let args = process.argv.slice(2);
function trianglePattern(n){
    let max = 2*n;
    let res = Array.from({length: n}).map(() => Array.from({length: max}).fill(''));
    let start = 1;
    let end = max;
    let curr = max;
    for(let i =1; i<n; i++){
        curr = curr - 2;
        end += curr;
    }
    function dfs(level){
        if(level == n) return;
        for(let i=level; i < n; i++){
            res[level][i]= start++;
        }
        for(let i=max -level-1; i >=n; i--){
            res[level][i]= end--;
        }
        dfs(level + 1);
    }
    dfs(0);
    let out = res.map((i, index) => `${Array.from({length: index}).fill("  ").join("")}${i.filter(i=>i).join("*")}`);
    for (let row of out){
        console.log(row)
    }
}

trianglePattern(args[0] || 1)
