import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index:    'src/index.ts',
    'shells/index':   'src/shells/index.ts',
    'feedback/index': 'src/feedback/index.ts',
    'entry/index':    'src/entry/index.ts',
    'decision/index': 'src/decision/index.ts',
  },
  format: ['esm'],
  dts: true,
  jsx: 'react-jsx',
  external: ['react', 'react-dom'],
  clean: true,
  treeshake: true,
})
