Common steps in a CI setup:
- understanding the specifics of a project (language, testing framework, build system, structure);
- choose an suitable CI tool: Jenkins, Travis CI, CircleCI, GitLab CI/CD, GitHub Actions;
- configure the pipeline of a project;
- choose code review tool: Review Board, GitHub;
- choose test environment;

The most popular CI tool are Jenkins (free of charge for open-source projects), alternatively for the same purpose could be used for instance Travis CI (prices start form $73 per month), CircleCI (has free of charge tariff for 6000 build minutes and no more than 5 users), GitLab CI/CD (has free 30-day trial), TeamCity, Bamboo, Buddy, Codeship, GoCD, Wercker, Semaphore, NeverCode, Spinnaker, Buildbot.

To consider which setup for CI/CD is better it is crucial to understand how important is security for a project? If is it important, but not crucial - cloud-based environment will suit; if security is crucial - self-hosted or hybrid environment will be suitable, because in self-hosted/hybrid environment team can control secrets and store them in own infrastructure, in self-hosted setup there are a lot of setting and this variant is time consuming in comparison with other versions of the CI/CD setup. Golden mean is hybrid CI/CD.