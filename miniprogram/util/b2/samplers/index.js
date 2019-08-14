import { random } from "./random.js"
import { perlin } from "./perlin.js"
import { bfs } from "./bfs.js"
import { dfs } from "./dfs.js"
import { best } from "./best.js"
import { prim } from "./prim.js"
import { bisect } from "./bisect.js"

class SamplerManager{
	get(sample){
		return bisect
	}
}
const samplerManager = new SamplerManager();
export { samplerManager }