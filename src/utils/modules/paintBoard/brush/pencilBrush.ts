import { PencilBrush } from 'fabric';
import { paintBoard } from '@/utils';

export const renderPencil = () => {
	const canvas = paintBoard.canvas;
	if (canvas) {
		const pencilBrush = new PencilBrush(canvas);
		canvas.freeDrawingBrush = pencilBrush;

		canvas.freeDrawingBrush.width = 10;
		canvas.freeDrawingBrush.color = '#FF6A00';
	}
};
