export class GistsService implements app.storage.IKeyValueStorage {
    private readonly version: string = '2022-11-28'
    private readonly accept: string = 'application/vnd.github+json'
    private token: string = ''
    private gistsId: string = ''
    private gistsName: string = ''

    constructor(config: app.storage.GistsConfigType) {
        this.token = config.token
        this.gistsId = config.id
        this.gistsName = config.name
    }

    async getData(): Promise<app.NoteType[]> {
        try {
            const response = await fetch(`https://api.github.com/gists/${this.gistsId}`, {
                method: 'GET',
                headers: {
                    'Accept': this.accept,
                    'Authorization': `Bearer ${this.token}`,
                    'X-GitHub-Api-Version': this.version
                }
            })
            const responseData = await response.json()
            const data = JSON.parse(responseData.files[this.gistsName].content)
            return data as app.NoteType[]
        } catch(error) {
            console.error(error)
            return []
        }
    }
    async setData(data: app.NoteType[]): Promise<void> {
        try {
            await fetch(`https://api.github.com/gists/${this.gistsId}`, {
                method: 'PATCH',
                headers: {
                    'Accept': this.accept,
                    'Authorization': `Bearer ${this.token}`,
                    'X-GitHub-Api-Version': this.version
                },
                body: JSON.stringify({
                    files: {
                        [this.gistsName]: {
                            content: JSON.stringify(data)
                        }
                    }
                })
            })
        } catch(error) {
            console.error(error)
        }
    }
}