import { random } from "./random.js"
import { noise } from "./noise.js"
import { bfs } from "./bfs.js"
import { dfs } from "./dfs.js"
import { best } from "./best.js"
class SamplerManager{
	get(sample){
		return bfs
	}
}
const samplerManager = new SamplerManager();
export { samplerManager }