import { useRef } from "react";
import { products } from "../data/proyects";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	MotionValue,
} from "motion/react";

export default function HeroParallax() {
	const firstRow = products.slice(0, 3);
	const secondRow = products.slice(3, 6);
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const springConfig = { stiffness: 300, damping: 40, bounce: 30 };

	const translateX = useSpring(
		useTransform(scrollYProgress, [0.2, 1], [0, 1000]),
		springConfig,
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0.2, 1], [0, -1000]),
		springConfig,
	);
	1;
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig,
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig,
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig,
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-1000, 100]),
		springConfig,
	);
	return (
		<section
			id="Proyects"
			ref={ref}
			className="h-[280dvh] relative antialiased flex flex-col self-auto perspective-midrange transform-3d"
		>
			<Text />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					opacity,
				}}
				className=""
			>
				<motion.div className="flex flex-row space-x-10 mb-20">
					{firstRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className="flex flex-row  mb-20 space-x-10 ">
					{secondRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateXReverse}
							key={product.title}
						/>
					))}
				</motion.div>
			</motion.div>
		</section>
	);
}

export const Text = () => {
	return (
		<div className="pt-20 md:pt-48 ml-18 mr-4 lg:ml-48 lg:mr-16 w-full">
			{/* <h1 className="text-2xl md:text-7xl font-bold text-primary">
        Software developer
        </h1> */}
			<p className="max-w-4xl text-base font-mono md:text-2xl mt-8">
				I'm a developer who crafts primarily with TypeScript, with a passion for
				Linux and open-source software.
				<br />
				<br />
				With 4 years of experience, I specialize in cross-platform development
				with web technologies, full responsive to deploy everywere.
				<br />
				<br />I believe in a web owned by its users, and I'm dedicated to making
				it better. Forever learning, always building.
			</p>
		</div>
	);
};

export const ProductCard = ({
	product,
	translate,
}: {
	product: {
		title: string;
		link: string;
		thumbnail: string;
	};
	translate: MotionValue<number>;
}) => {
	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
			}}
			key={product.title}
			className="group/product h-96 w-120 relative shrink-0"
		>
			<a href={product.link} className="block group-hover/product:shadow-2xl ">
				<img
					src={product.thumbnail}
					height="600"
					width="600"
					className="object-cover object-top-left absolute h-full w-full inset-0"
					alt={product.title}
				/>
			</a>
			<div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
			<h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
				{product.title}
			</h2>
		</motion.div>
	);
};
