import { paintBoard } from '@/utils';

export class CanvasPathEvent {
	constructor() {
		this.initPathEvent();
	}

	initPathEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('path:created', (event: any) => {
			const { path } = event;
			path && (path.erasable = true);

			console.log('path:created', event);
		});
	}
}
