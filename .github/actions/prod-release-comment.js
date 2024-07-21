const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    try {
        
        const token = process.env.token;
        const date = process.env.date;
        const author = process.env.author;
        const version = process.env.version;

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

        const issue = issues.find(issue => issue.title === `Release v${version}`);

        if (!issue) {
            throw new Error(`Issue with title "Release v${version}" not found`);
        }

        console.log(`Found issue: ${issue.number}`);

        // Добавление комментария
        await octokit.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: issue.number,
            body: `
                # Release v${version} Deployed to Prod

                **Дата выкатки:** ${date}
                **Автор выкатки:** ${author}

                Релиз v${version} был успешно выкачен в прод.
            `,
        });

    } catch (error) {
        core.setFailed(`Action failed with error ${error.message}`);
    }
}

run();
