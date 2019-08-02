import { random } from "./random.js"
class SamplerManager{
	get(sample){
		return random
	}
}
const samplerManager = new SamplerManager();
export { samplerManager }