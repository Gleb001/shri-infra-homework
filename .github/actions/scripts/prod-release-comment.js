const github = require("@actions/github");
const core = require("@actions/core");
// const getIssueBy = require("./helpers/getIssueBy");

async function run() {

    try {
        
        const token = process.env.token;
        const date = process.env.date;
        const author = process.env.author;
        const version = process.env.version;

        const octokit = github.getOctokit(token);
        const context = github.context;

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
// async function run() {
//     try {
        
//         const {
//             token,
//             date,
//             author,
//             version
//         } = process.env;
//         const octokit = github.getOctokit(token);

//         const issue = getIssueBy(github, octokit, { title: `Release v${version}` });
//         if (issue) {
//             await octokit.rest.issues.createComment({
//                 ...github.context.repo,
//                 issue_number: issue.number,
//                 body: `
//                     # Release v${version} Deployed to Prod
    
//                     **Дата выкатки:** ${date}
//                     **Автор выкатки:** ${author}
    
//                     Релиз v${version} был успешно выкачен в прод.
//                 `,
//             });
//         } else {
//             throw new Error(`Issue with title "Release v${version}" not found`);
//         }

//     } catch (error) {
//         core.setFailed(`Action failed with error ${error.message}`);
//     }
// }

run();
