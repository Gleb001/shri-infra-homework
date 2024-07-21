const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    try {

        const token = process.env.token;
        const date = process.env.date;
        const author = process.env.author;
        const version = process.env.version;
        const commits = process.env.commits;
        const id_registry = process.env.id_registry;

        const octokit = new github.GitHub(token);
        const context = github.context;

        // await octokit.issues.create({
        //     owner: context.repo.owner,
        //     repo: context.repo.repo,
        //     labels: [`release v${version}`],
        //     title: `Release v${version}`,
        //     body: `
        //     # Release v${version}

        //     **Дата:** ${date}
        //     **Автор релиза:** ${author}
        //     **Номер версии:** ${version}

        //     **Список коммитов от предыдущего релизного тега:**
        //     ${commits}

        //     **Ссылка на docker-образ:**
        //     cr.yandex/${id_registry}/app:${version}
        //     `,
        // });
        await octokit.issues.create({
            ...context.repo,
            labels: [`release v${version}`],
            title: `Release v${version}`,
            body: (`
            # Release ${{ version }}

            **Дата:** ${{ date }}
            **Автор релиза:** ${{ author }}
            **Номер версии:** ${{ version }}

            **Список коммитов от предыдущего релизного тега:**
            ${{ commits }}

            **Ссылка на docker-образ:**
            cr.yandex/${{ id_registry }}/app:${{ version }}
        `),
        });

    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();