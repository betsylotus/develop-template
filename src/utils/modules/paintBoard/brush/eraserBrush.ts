import { EraserBrush, ClippingGroup } from '@erase2d/fabric';
import { paintBoard } from '@/utils';

export const renderEraser = () => {
	const canvas = paintBoard.canvas;
	if (canvas) {
		const eraserBrush = new EraserBrush(canvas);
		canvas.freeDrawingBrush = eraserBrush;

		canvas.freeDrawingBrush.width = 30;

		eraserBrush.on('start', (event) => {
			console.log('eraserBrush -- start', event);
		});

		eraserBrush.on('end', async (event) => {
			console.log('eraserBrush -- end', event);

			event.preventDefault();

			const { path, targets } = event.detail;

			console.log('path', path);
			console.log('targets', targets);
		});
	}
};
