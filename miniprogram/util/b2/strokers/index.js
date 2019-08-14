import { point } from "./point.js"
import { line } from "./line.js"
import { color } from "./color.js"
import { arc } from "./arc.js"
import { rect } from "./rect.js"
import { curve } from "./curve.js"
class StrokerManager{
	get(stroke){
		if(stroke === '红房间'){
			return color
		}else if(stroke === '长颈圣母'){
			return arc
		}else if(stroke === '奥菲利亚'){
			return point
		}else if(stroke === '星月夜'){
			return line
		}else if(stroke === 'IKB79'){
			return rect
		}else{
			return line
		}
	}
}
const strokerManager = new StrokerManager();
export { strokerManager }