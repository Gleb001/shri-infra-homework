// helpers ================================================== //
function getIssueBody(autor, version) {
    const { ID_REGISTRY, COMMIT_LIST } = process.env;
    return (`
        ### Release Information
        - **Release Version**: v${version}
        - **Release Date**: ${new Date().toISOString().split('T')[0]}
        - **Released by**: @${autor}

        ### Commit List
        ${COMMIT_LIST}

        ### Docker Image
        - cr.yandex/${ID_REGISTRY}/app:v${version}
    `)
}

// main ===================================================== //
module.exports = async ({ github, context }) => {

    const { runNumber, actor, repo } = context;
    const { owner } = repo;

    const { data: issue } = await github.issues.create({
      owner: owner,
      repo: repo.repo,
      title: `Release v${runNumber}`,
      body: getIssueBody(actor, runNumber),
      labels: ['release']
    });
  
    return issue.html_url;

};