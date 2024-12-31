export interface MathItem {
	title: string;
	[key: string]: any;
}

export interface MathContentProps {
	items: MathItem[];
}
