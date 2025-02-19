/// <reference types="react-scripts" />

declare module '*.md' {
	const value: string; // markdown is just a string
	export default value;
}

declare module '*.txt' {
	const value: string; // markdown is just a string
	export default value;
}