const{create,upState,checkWin,p1,p2,n}=require ("./game");

describe("upState",()=>{
    test("ok",()=>{
        const state=[[p1,n,n],[n,n,n],[n,n,n]];
        const [newState,success]=upState(p2,[1,1],state);
        expect(success).toBe(true);
        expect(newState).toEqual([[p1,n,n],[n,p2,n],[n,n,n]]);
    });

    test("no",()=>{
        const state=[[p1,n,n],[n,p2,n],[n,n,n]];
        const [newState,success]=upState(p1,[0,0],state);
        expect(success).toBe(false);
        expect(newState).toEqual([[p1,n,n],[n,p2,n],[n,n,n]]);
    });

    test("outer",()=>{
        const state=[[p1,n,n],[n,p2,n],[n,n,n]];
        const [newState,success]=upState(p1,[4,3],state);
        expect(success).toBe(false);
        expect(newState).toEqual([[p1,n,n],[n,p2,n],[n,n,n]]);
    });
})

describe("checkWin",()=>{
    test("1",()=>{
        expect(checkWin([[p1,p1,p1],[n,n,n],[n,n,n]])).toBe(p1);
    });
    test("2",()=>{
        expect(checkWin([[n,n,n],[p1,p1,p1],[n,n,n]])).toBe(p1);
    });
    test("3",()=>{
        expect(checkWin([[n,n,n],[n,n,n],[p1,p1,p1]])).toBe(p1);
    });
    test("4",()=>{
        expect(checkWin([[p1,n,n],[n,p1,n],[n,n,p1]])).toBe(p1);
    });
    test("5",()=>{
        expect(checkWin([[p1,n,p2],[p1,p2,n],[p1,n,p2]])).toBe(p1);
    });
    test("6",()=>{
        expect(checkWin([[p1,n,p2],[p1,p2,p2],[n,p1,p2]])).toBe(p2);
    });
    test("no winner",()=>{
        expect(checkWin([[n,n,n],[n,n,n],[p1,p1,p2]])).toBe(null);
    });
    test("no winner2",()=>{
        expect(checkWin([[n,p1,n],[p2,n,n],[p1,n,p2]])).toBe(null);
    });
    test("no winner3",()=>{
        expect(checkWin([[p1,p2,p1],[p2,p1,p2],[p2,p1,p2]])).toBe("平手");
    });

})