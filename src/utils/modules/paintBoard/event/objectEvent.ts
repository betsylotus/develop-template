import { paintBoard } from '@/utils';

export class CanvasObjectEvent {
	constructor() {
		this.initObjectEvent();
	}

	initObjectEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('object:modified', (event: any) => {
			console.log('object:modified', event);
		});
	}
}
