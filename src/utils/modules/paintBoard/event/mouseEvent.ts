import { paintBoard } from '@/utils';

export class CanvasMouseEvent {
	constructor() {
		this.initMouseEvent();
	}

	initMouseEvent() {
		const canvas = paintBoard.canvas;

		canvas?.on('mouse:down', (event: any) => {
			console.log('mouse:down', event);
		});

		canvas?.on('mouse:move', (event: any) => {
			// console.log('mouse:move');
		});

		canvas?.on('mouse:up', (event: any) => {
			console.log('mouse:up', event);
		});

		canvas?.on('mouse:over', (event: any) => {
			// console.log('mouse:over', event);
		});

		canvas?.on('mouse:out', (event: any) => {
			// console.log('mouse:out', event);
		});

		canvas?.on('mouse:dblclick', (event: any) => {
			console.log('mouse:dblclick', event);
		});

		canvas?.on('mouse:wheel', (event: any) => {
			// console.log('mouse:wheel', event);
		});
	}
}
