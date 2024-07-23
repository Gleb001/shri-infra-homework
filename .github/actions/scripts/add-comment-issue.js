const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    try {

        const octokit = github.getOctokit(token);
        const {
            token,
            date,
            author,
            version,
            commits,
            fix_number,
            id_registry
        } = process.env;

        const issue = getIssueBy(github, octokit, { title: `Release v${version}` });
        if (issue) {
            await octokit.rest.issues.createComment({
                ...github.context.repo,
                issue_number: issue.number,
                body: (`
                    # Fix Release v${version}_fix${fix_number}
    
                    **Дата фикса:** ${date}
                    **Автор фикса:** ${author}
                    
                    **Список коммитов от предыдущего релизного тега:**
                    ${commits}
                    
                    **Ссылка на docker-образ:**
                    cr.yandex/${id_registry}/app:${version}_fix${fix_number}
                `),
            });
        } else {
            throw new Error(`Issue for release version ${version} not found`);
        }

    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();