import { paintBoard } from '@/utils';

export class CanvasSelectionEvent {
	constructor() {
		this.initSelectionEvent();
	}

	initSelectionEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('selection:created', (event: any) => {
			console.log('selection:created', event);
		});

		canvas?.on('selection:updated', (event: any) => {
			console.log('selection:updated', event);
		});

		canvas?.on('selection:cleared', (event: any) => {
			console.log('selection:cleared', event);
		});
	}
}
