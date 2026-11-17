import { defineCliConfig } from 'sanity/cli';
// project.basePath : le Studio est servi sur /studio (ses fichiers aussi : /studio/static/…)
export default defineCliConfig({ api: { projectId: 'bh9d2sfy', dataset: 'production' }, project: { basePath: '/studio' } });
