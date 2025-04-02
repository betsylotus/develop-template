import { Canvas, FabricObject, Line, PencilBrush } from 'fabric';
import type { FabricObjectProps } from 'fabric';

import { CanvasEvent } from './event';

import { useBoardStore } from '@/stores';
import { ActionMode } from '@/constants';

// import 'fabric/src/mixins/eraser_brush.mixin.js';

class PaintBoard {
	canvas: Canvas | null = null;
	event: CanvasEvent | null = null;

	constructor() {}

	initCanvas(canvasEl: HTMLCanvasElement) {
		return new Promise(async (resolve, reject) => {
			this.canvas = new Canvas(canvasEl, {
				// 画布鼠标框选时的背景色
				selectionColor: 'rgba(255, 106, 0, 0.1)',

				// 以中心点为缩放原点
				centeredScaling: true
			});

			FabricObject.prototype.set({
				borderColor: '#FF6A00',
				cornerColor: '#FF6A00',
				cornerStyle: 'circle',
				borderDashArray: [3, 3],
				transparentCorners: false,
				cornerSize: 12
			});

			Line.prototype.set({
				strokeLineJoin: 'round'
			});

			// 线条结尾的画笔风格
			Line.prototype.set({
				strokeLineCap: 'round'
			});

			// 初始化事件
			this.event = new CanvasEvent();

			this.handleMode();

			await this.initCanvasStorage();

			console.log(
				'FabricObject.prototype.objectCaching',
				FabricObject.prototype.objectCaching
			);

			resolve(true);
		});
	}

	// 初始化存储
	initCanvasStorage() {
		return new Promise((resolve, reject) => {
			if (!this.canvas) {
				return;
			}

			this.canvas.setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});

			FabricObject.prototype.set({
				objectCaching: true
			});

			resolve(true);
		});
	}

	// 处理画布模式
	handleMode(mode: string = useBoardStore().mode) {
		if (!this.canvas) {
			return;
		}

		let isDrawingMode = false;
		let selection = false;

		const objectSet: Partial<FabricObjectProps> = {
			selectable: false,
			hoverCursor: 'default'
		};

		switch (mode) {
			case ActionMode.FREE_DRAW:
				isDrawingMode = true;

				const pencilBrush = new PencilBrush(this.canvas);
				this.canvas.freeDrawingBrush = pencilBrush;
				this.canvas.freeDrawingBrush.width = 10;
				this.canvas.freeDrawingBrush.color = '#FF6A00';

				this.canvas.discardActiveObject();

				break;

			case ActionMode.SHAPE_DRAW:
				isDrawingMode = false;
				selection = true;

				break;

			case ActionMode.SELECT:
				selection = true;

				objectSet.selectable = true;
				objectSet.hoverCursor = undefined;

				break;

			default:
				break;
		}

		this.canvas.isDrawingMode = isDrawingMode;
		this.canvas.selection = selection;

		FabricObject.prototype.set(objectSet);

		this.canvas.requestRenderAll();
	}
}

export const paintBoard = new PaintBoard();
