const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
    try {

        const {
            token,
            date,
            author,
            version,
            commits,
            id_registry
        } = process.env;

        await github.getOctokit(token).rest.issues.create({
            ...github.context.repo,
            labels: [`release v${version}`],
            title: `Release v${version}`,
            body: (`
                # Release ${version}
                
                **Дата:** ${date}
                **Автор релиза:** ${author}
                **Номер версии:** ${version}
                
                **Список коммитов от предыдущего релизного тега:**
                ${commits}
                
                **Ссылка на docker-образ:**
                cr.yandex/${id_registry}/app:${version}
            `),
        });

    } catch (error) {
        core.setFailed(`Action failed with error ${error}`);
    }
}

run();