import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
    try {

        const token = core.getInput("token");
        const date = core.getInput("date");
        const author = core.getInput("author");
        const version = core.getInput("version");
        const commits = core.getInput("commits");
        const id_registry = core.getInput("id_registry");

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