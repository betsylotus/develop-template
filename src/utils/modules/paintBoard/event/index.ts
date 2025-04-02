import { CanvasEraseEvent } from './eraseEvent';
import { CanvasObjectEvent } from './objectEvent';
import { CanvasMouseEvent } from './mouseEvent';
import { CanvasSelectionEvent } from './selectionEvent';
import { CanvasPathEvent } from './pathEvent';

export class CanvasEvent {
	mouseEvent: CanvasMouseEvent;
	objectEvent: CanvasObjectEvent;
	eraseEvent: CanvasEraseEvent;
	selectionEvent: CanvasSelectionEvent;
	pathEvent: CanvasPathEvent;

	constructor() {
		this.mouseEvent = new CanvasMouseEvent();
		this.objectEvent = new CanvasObjectEvent();
		this.eraseEvent = new CanvasEraseEvent();
		this.selectionEvent = new CanvasSelectionEvent();
		this.pathEvent = new CanvasPathEvent();
	}
}
