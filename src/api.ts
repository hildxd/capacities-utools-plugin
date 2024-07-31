import ky from 'ky'
import { CAPACITIESKEY } from './constants'

const baseUrl = 'https://api.capacities.io'
const CommonHeaders = () => ({
    Authorization: `Bearer ${window.utools.db.get(CAPACITIESKEY)?.data ?? ''}`
})

interface Space {
    id: string,
    title: string
}

interface GetSpacesResponse {
    spaces: Space[]
}

const getSpaces = async () => {
    const res = await ky(baseUrl, {
        method: 'get',
        headers: CommonHeaders()
    })
    return res.json<GetSpacesResponse>()
}

interface SearchResult {
    id: string,
    spaceId: string,
    structureId: string,
    title: string,
}

interface SearchResultResponse {
    results: SearchResult[]
}


const searchItem = async (spaceIds: Space['id'][], keyword: string) => {
    const res = await ky(`${baseUrl}/search`, {
        method: 'post',
        headers: CommonHeaders(),
        json: {
            mode: "fullText",
            searchTerm: keyword,
            spaceIds,
        }
    })
    return res.json<SearchResultResponse>()
}

interface SaveWebLinkParams {
    spaceId: string,
    url: string,
    titleOverwrite: string
    descriptionOverwrite: string
    tags: string[]
    mdText: string
}

interface SaveWebLinkResponse {
    spaceId: string,
    id: string
    structureId: string
    title: string
    description: string
    tags: string[]
}

const saveWeblink = async (params: SaveWebLinkParams) => {
    const res = await ky(`${baseUrl}/save-weblink`, {
        method: 'post',
        headers: CommonHeaders(),
        json: params
    })

    return res.json<SaveWebLinkResponse>()
}


interface SaveToDailyNoteParams {
    spaceId: string,
    mdText: string
    noTimeStamp: boolean
}

const saveToDailyNote = async (params: SaveToDailyNoteParams) => {
    const res = await ky(`${baseUrl}/save-to-daily-note`, {
        method: 'post',
        headers: CommonHeaders(),
        json: {
            ...params,
            origin: "commandPalette"
        }
    })

    return res.json<boolean>()
}

export const Api = {
    getSpaces,
    searchItem,
    saveWeblink,
    saveToDailyNote
}