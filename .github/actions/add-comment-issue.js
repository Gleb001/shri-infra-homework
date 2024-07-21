const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    try {

        const token = process.env.token;
        const date = process.env.date;
        const author = process.env.author;
        const version = process.env.version;
        const commits = process.env.commits;
        const fix_number = process.env.fix_number;
        const id_registry = process.env.id_registry;

        const octokit = github.getOctokit(token);
        const context = github.context;

        // Поиск Issue по метке и заголовку
        const { data: issues } = await octokit.request(
            'GET /repos/{owner}/{repo}/issues',
            {
                owner: context.repo.owner,
                repo: context.repo.repo,
            }
        );

        const issue = issues.find((item) => item.title === `Release v${version}`)

        if (!issue) {
            throw new Error(`Issue for release version ${version} not found`);
        }

        await octokit.rest.issues.createComment({
            ...context.repo,
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

    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();