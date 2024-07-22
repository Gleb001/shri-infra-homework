const github = require("@actions/github");

module.exports = async function getIssueBy(octokit, parameters) {

    const { data: issues } = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        ...github.context
    );

    return issues.find(issue => {
        for (let parameter of parameters) {
            if (issue[parameter] !== parameters[parameter]) return false;
        }
        return true;
    });

};