export interface Product {
	title: string;
	link: string;
	thumbnail: string;
	type: "mobile" | "desktop";
}

export const products: Product[] = [
	{
		title: "Felix Garages",
		link: "https://felixgarages.netlify.app",
		thumbnail: "/proyects/felixgarages.png",
		type: "desktop",
	},
	{
		title: "GC Corporativo Juridico",
		link: "https://gc-juridic-corp.vercel.app",
		thumbnail: "/proyects/gc_corporativo_juridico.png",
		type: "desktop",
	},
	{
		title: "Civity CMS",
		link: "https://app.civity.mx",
		thumbnail: "/proyects/civity_cms.png",
		type: "desktop",
	},
	{
		title: "Civity App",
		link: "https://app.civity.mx",
		thumbnail: "/proyects/civity_app.png",
		type: "mobile",
	},
	{
		title: "Kolonus Admin App",
		link: "https://www.kolonus.com/",
		thumbnail: "/proyects/kolonus_app.png",
		type: "mobile",
	},
	{
		title: "Vanguardia Mexicana",
		link: "https://vanguardiamexicana.org",
		thumbnail: "/proyects/vanguardiamexicana.png",
		type: "desktop",
	},
];
