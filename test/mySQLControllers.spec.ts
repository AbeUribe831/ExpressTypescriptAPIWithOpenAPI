import * as chai from "chai"
import * as mySQLController from "../controllers/mySQLControllers"
import sinon from "sinon" 
import { SQLComment } from "interfaces/mysqlComment"
import { ExegesisContext } from "exegesis"
//import { ExegesisContext } from "exegesis-express"
import { mock, instance} from "ts-mockito"
import * as mySQLCommentServices from "../services/mySQLCommentServices"

const sandbox = sinon.createSandbox()
const testBody = {
	postId: 3,
	name: "un vacero",
	email: "elvacero@gmail.com",
	body: "I don't know why he has an email"
}
let comments: SQLComment[] = [
	{
		id: 1,
		postId: 1,
		name: "bob",
		email: "bob@bobbyb.com",
		body: "some body"
	},
	{
		id: 2,
		postId: 1,
		name: "terrance",
		email: "terrance@bobbyb.com",
		body: "other body"
	}
];
let singleComment: SQLComment = {
	id: 1,
	postId: 1,
	name: "bob",
	email: "bob@bobbyb.com",
	body: "some body"
}

let contextWithParamId = {
	params: {
		path: {
			id: 1
		}
	}, 
	req: {
		body: {

		}
	},
	makeError: (_status: number, message: string) => {throw new Error(message)} 
} as unknown as ExegesisContext

afterEach(() => {
		sandbox.restore()
		contextWithParamId.params.path.id = 1	
		contextWithParamId.req.body = {}
})
describe("unit testing all controller methods for /sql-comments route in mySQLControllers.ts", () => {
	it("getAllComments success", async () => {
		const contextMock: ExegesisContext = mock(<ExegesisContext>{}) 
		const contextInstance: ExegesisContext = instance(contextMock)
		sandbox.stub(mySQLController, "getAllComments").resolves({comments})

		const value = await mySQLController.getAllComments(contextInstance)
		chai.assert.equal(comments, value.comments)
	})
	it("getAllComments throws an error", async () => {
		sandbox.stub(mySQLController, "getAllComments").rejects(new Error("some internal error"))
		try {
			chai.expect(await mySQLController.getAllComments("not needed" as any)).to.throw()
		} catch (err) {
			if (err instanceof Error)
				chai.assert.equal(err.message, "some internal error")
		}
	})

	it("getSingleComment success", async () => {
		sandbox.stub(mySQLController, "getSingleComment").resolves({ comment: singleComment })

		const resComment = await mySQLController.getSingleComment(contextWithParamId)
		chai.assert.equal(resComment.comment, singleComment)
	})
	
	it("getSingleComment throws an error", async () => {
		sandbox.stub(mySQLController, "getSingleComment").rejects(new Error("some internal error"))
		try {
			chai.expect(await mySQLController.getSingleComment(contextWithParamId)).to.throw()
		} catch (err) {
			if (err instanceof Error)
				chai.assert.equal(err.message, "some internal error")
		}
	})
	
	it("postSingleComment success and returns one SQLComment", async () => {
		const mockReturnComment = {...testBody, id: contextWithParamId.params.path.id} as SQLComment
		sandbox.stub(mySQLController, "postSingleComment").resolves(mockReturnComment)
		contextWithParamId.req.body = testBody
		const resComment = await mySQLController.postSingleComment(contextWithParamId)
		chai.assert.equal(resComment, mockReturnComment)
	})
	
	it("postSingleComment throws an error", async () => {
		contextWithParamId.req.body = testBody
		sandbox
			.stub(mySQLController, "postSingleComment")
			.rejects(new Error("some internal error"))
			try {
				chai.expect(await mySQLController.postSingleComment(contextWithParamId)).to.throw()
			} catch (err) {
			if (err instanceof Error)
				chai.assert.equal(err.message, "some internal error")
		}
	})
})

describe("integration testing all controller methods for /sql-comments route in mySQLControllers.ts", () => {
	it("getAllComments success", async() => {
		// remove params because not needed
		contextWithParamId.params.path = {} 
		sandbox
			.stub(mySQLCommentServices, "getAllSQLComments")
			.callsFake(async () => {return [comments]})
		const queriedComments = await mySQLController.getAllComments(contextWithParamId)
		chai.assert.equal(queriedComments.comments, comments)
	})
	it("getAllComments error from service method getAllSQLComments", async() => {
		// remove params because not needed
		contextWithParamId.params.path = {} 
		sandbox
			.stub(mySQLCommentServices, "getAllSQLComments")
			.callsFake(async () => {throw new Error()})
		try {
		chai.expect(await mySQLController.getAllComments(contextWithParamId)).to.throw()
		} catch(e) {
			if (e instanceof Error)
				chai.assert.equal(e.message, "error with response")
		}

	})
	it("getSingleComment success", async () => {
		sandbox
			.stub(mySQLCommentServices, "getSingleSQLComment")
			.callsFake(async () => {return [[singleComment]]})
		const resultComment = await mySQLController.getSingleComment(contextWithParamId)
		chai.assert.equal(resultComment.comment, singleComment)
		
	})
	it("getSingleComment throws error because the list is empty", async () => {
		sandbox
			.stub(mySQLCommentServices, "getSingleSQLComment")
			.withArgs(contextWithParamId.params.path.id)
			.callsFake(async () => {return [[]]})
		try {
			chai.expect(await mySQLController.getSingleComment(contextWithParamId)).to.throw()
		} catch (err) {
			if (err instanceof Error)
				chai.assert.equal(err.message, "id not in database")
		}
	})
	it("postSingleComment success", async () => {
		contextWithParamId.req.body = testBody
		const expectedBody = {...testBody, id: contextWithParamId.params.path.id} as SQLComment
		sandbox
			.stub(mySQLCommentServices, "postSingleSQLComment")
			.withArgs(contextWithParamId.req.body)
			.callsFake(async () => {return [1]})
		const resultCommnet = await mySQLController.postSingleComment(contextWithParamId)
		chai.assert.deepEqual(resultCommnet, expectedBody)
	})
	it("postSingleComment throws error because the list is empty", async () => {
		contextWithParamId.req.body = testBody
		sandbox
			.stub(mySQLCommentServices, "postSingleSQLComment")
			.withArgs(contextWithParamId.req.body)
			.callsFake(async () => {return []})
		try {
			chai.expect(await mySQLController.postSingleComment(contextWithParamId)).to.throw()
		} catch (err) {
			if (err instanceof Error)
				chai.assert.equal(err.message, "Error creating a comment")
		}
	})
})