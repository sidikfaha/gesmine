const sqlite = require("sqlite3").verbose()

class BD {

	private readonly source: string

	constructor() {
		this.source = "../../../db/main.sqlite"
	}

	protected getConnection() {
		return new sqlite.Database(this.source)
	}

	public insert(statement: string, args?: []): number {
		return this.getConnection().run(statement, args, (error: any) => {
			if (error)
				return 1
			return 0
		})
	}

	public select(sql: string, args?: []) : [] {
		return this.getConnection().all(sql, args, (error: any, rows: []|any) => {
			if (error)
				return error
			return rows
		})
	}
}

export default new BD();