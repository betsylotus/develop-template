import { paintBoard } from '@/utils';

export class CanvasEraseEvent {
	constructor() {
		this.initEraseEvent();
	}

	initEraseEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('erasing:start', (event: any) => {
			console.log('erasing:start', event);
		});

		canvas?.on('erasing:end', (event: any) => {
			console.log('erasing:end', event);
		});
	}
}
