const github = require("@actions/github");

module.exports = async function getIssueBy(octokit, parameters) {

    const { owner, repo } = github.context;
    const { data: issues } = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        { owner, repo }
    );

    return issues.find(issue => {
        for (let parameter of parameters) {
            if (issue[parameter] !== parameters[parameter]) return false;
        }
        return true;
    });

};