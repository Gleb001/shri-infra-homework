const github = require("@actions/github");
const core = require("@actions/core");
const getIssueBy = require("./helpers/getIssueBy");

async function run() {
    try {
        
        const octokit = github.getOctokit(token);
        const {
            token,
            date,
            author,
            version
        } = process.env;

        const issue = getIssueBy(octokit, { title: `Release v${version}` });
        if (issue) {
            await octokit.rest.issues.createComment({
                ...github.context,
                issue_number: issue.number,
                body: `
                    # Release v${version} Deployed to Prod
    
                    **Дата выкатки:** ${date}
                    **Автор выкатки:** ${author}
    
                    Релиз v${version} был успешно выкачен в прод.
                `,
            });
        } else {
            throw new Error(`Issue with title "Release v${version}" not found`);
        }

    } catch (error) {
        core.setFailed(`Action failed with error ${error.message}`);
    }
}

run();
