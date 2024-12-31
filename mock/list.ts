import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
	{
		url: '/api/question/list',
		method: 'post',
		response: () => {
			return {
				code: 0,
				data: {
					list: [
						{
							id: '542934422715183148',
							title:
								'<p>如图，在四棱锥\\(P-ABCD\\)中，\\(PC⊥\\)平面\\(ABCD,\\vartriangle ABC\\)是边长为\\({ \\rm{ 2 } }\\sqrt[] { { \\rm{ 3 } } }\\)的等边三角形，\\(AD=2\\)，\\(∠ADC=\\frac { 2\\pi } { 3 }\\)．</p> \n<p><img type="png" style="" width="117.0px;" height="168.0px;" src="https://teaching-static.dwclass.com/document/2024/10/31/523005062940524544/0/img13.png">&nbsp;&nbsp;</p> \n<p>（1）证明：平面\\(PCD⊥\\)平面\\(PBC\\)；</p> \n<p>（2）若平面\\(PAD\\)与平面\\(PBC\\)夹角的余弦值为\\(\\frac { \\sqrt[] { 21 } } { 7 }\\)，求\\(PC\\)的长．</p>'
						},
						{
							id: '542934422715183144',
							title:
								'<p>在\\(\\vartriangle ABC\\)中，内角\\(A,B,C\\)所对的边分别为\\(a,b,c\\)．已知\\(2ccosCcosB+2bcos ^ { 2 }C=a\\)．</p> \n<p>（1）求\\(C\\)；</p> \n<p>（2）若\\(\\frac { 3 } { a ^ { 2 }+b ^ { 2 }-ab }=cosC+cosAcosB\\)，求\\(\\vartriangle ABC\\)的面积．</p>'
						},
						{
							id: '542934422715183142',
							title:
								'<p>记\\(S_{ n }\\)为等比数列\\(\\left \\{ \\begin{matrix} a_{ n } \\end{matrix} \\right \\}\\)的前<i>n</i>项和，已知\\(S_{ n } =a_{ n+1 } -1\\)．</p> \n<p>（1）求\\(\\left \\{ \\begin{matrix} a_{ n } \\end{matrix} \\right \\}\\)的通项公式；</p> \n<p>（2）设\\(b_{ n } = \\left \\{ \\begin{matrix} \\begin{matrix} a_{ n } ,n为奇数， \\\\ \\frac { 1 } { log_{ 2 } a_{ n } ⋅log_{ 2 } a_{ n+2 } },n为偶数， \\\\ \\end{matrix} \\end{matrix} \\right.\\)求数列\\(\\left \\{ \\begin{matrix} b_{ n } \\end{matrix} \\right \\}\\)的前20项和\\(T_{ 20 }\\)．</p>'
						}
					]
				}
			};
		}
	}
]);
