import { random } from "./random.js"
import { bfs } from "./bfs.js"
import { dfs } from "./dfs.js"
class SamplerManager{
	get(sample){
		return random
	}
}
const samplerManager = new SamplerManager();
export { samplerManager }