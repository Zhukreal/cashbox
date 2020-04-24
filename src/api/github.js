import axios from 'axios'

export const getIssues = async (org, repo, page)  => {
    const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`
    try {
        const issuesResponse = await axios.get(url)
        let pageCount = 0
        // const pageLinks = parseLink(issuesResponse.headers.link)
        //
        // if (pageLinks !== null) {
        //     pageCount = getPageCount(pageLinks)
        // }

        return { issues: issuesResponse.data}
    } catch (err) {
        throw err
    }
}