import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: './openapi.json',
        output: {
            mode: 'split',
            clean: true,
            //prettier: true,
            tslint: true,
            target: './types/index.ts',
            schemas: './types',
            client: 'fetch'
        },
        hooks: {
            //afterAllFilesWrite: 'prettier --write'
        }
    }
});
