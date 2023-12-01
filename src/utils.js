export function Randomize(options, ans) {
	return [...options, ans].sort(() => Math.random() - 0.5);
}
