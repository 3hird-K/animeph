import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://graphql.anilist.co',
  documents: [
    'app/**/*.tsx', 
    'app/**/*.ts', 
    'components/**/*.tsx', 
    'components/**/*.ts',
    'lib/**/*.ts' 
  ],
  ignoreNoDocuments: true,
  generates: {
    './graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;