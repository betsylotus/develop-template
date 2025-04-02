import { paintBoard } from '@/utils';

export class CanvasPathEvent {
	constructor() {
		this.initPathEvent();
	}

	initPathEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('path:created', (event: any) => {
			console.log('path:created', event);
		});
	}
}
