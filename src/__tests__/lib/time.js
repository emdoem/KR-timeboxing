import {getMinsAndSecsFromSecs} from "../../lib/time";

describe("getMinsAndSecsFromSecs", () => {
    test("works for 30 seconds", () => {
        expect(
            getMinsAndSecsFromSecs(30)
        ).toEqual([0, 30]);
    })
    
    test("works for 140 seconds", () => {
        expect(
            getMinsAndSecsFromSecs(140)
        ).toEqual([2, 20]);
    })
})
