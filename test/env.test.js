require("dotenv").config()

describe("test env", () => {
    it("should be host", () => {
        let host = process.env.host;
        expect(host).toBe("http://139.59.246.216/")
    })
})