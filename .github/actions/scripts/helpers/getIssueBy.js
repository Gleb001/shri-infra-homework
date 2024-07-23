module.exports = async function getIssueBy(github, octokit, parameters) {

    const { owner, repo } = github.context;
    const { data: issues } = await octokit.request(
        'GET /repos/{owner}/{repo}/issues',
        { owner, repo }
    );

    return issues.find(issue => {
        console.log(issue);
        for (let parameter in parameters) {
            console.log(parameter);
            if (issue[parameter] !== parameters[parameter]) return false;
        }
        return true;
    });

};