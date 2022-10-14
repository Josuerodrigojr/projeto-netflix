import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [
	replace({
		preventAssignment: true,
		'process.browser': true,
		'process.env.NODE_ENV': JSON.stringify(mode)
	})
  ]
};