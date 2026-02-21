import {
	motion,
	useScroll,
	// useVelocity,
	useSpring,
	useTransform,
} from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export const TracingBeam = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const [svgHeight, setSvgHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setSvgHeight(contentRef.current.offsetHeight);
		}
	}, []);

	const y1 = useSpring(
		useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]),
		{
			stiffness: 500,
			damping: 90,
		},
	);
	const y2 = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, svgHeight - 200]),
		{
			stiffness: 500,
			damping: 90,
		},
	);

	return (
		<motion.div ref={ref} className="relative w-full">
			<div className="absolute left-1 md:left-16 top-40">
				<motion.div
					transition={{
						duration: 0.2,
						delay: 0.5,
					}}
					animate={{
						boxShadow:
							scrollYProgress.get() > 0
								? "none"
								: "rgba(0, 0, 0, 0.34) 0px 3px 8px",
					}}
					className="ml-6.5 h-4 w-4 loading loading-ring duration-1000 loading-sm"
				>
					<motion.div
						transition={{
							duration: 0.2,
							delay: 0.5,
						}}
						animate={{
							backgroundColor:
								scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
							borderColor:
								scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
						}}
						className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
					/>
				</motion.div>
				<svg
					viewBox={`0 0 20 ${svgHeight + 800}`}
					width="20"
					height={svgHeight} // Set the SVG height
					className="ml-4 block"
					aria-hidden="true"
				>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="#9091A0"
						strokeOpacity="0.16"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<motion.path
						d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="2.25"
						className="motion-reduce:hidden"
						transition={{
							duration: 10,
						}}
					></motion.path>
					<defs>
						<motion.linearGradient
							id="gradient"
							gradientUnits="userSpaceOnUse"
							x1="0"
							x2="0"
							y1={y1} // set y1 for gradient
							y2={y2} // set y2 for gradient
						>
							<stop stopColor="var(--color-primary)" stopOpacity="0"></stop>
							<stop stopColor="var(--color-primary)"></stop>
							<stop offset="0.325" stopColor="var(--color-secondary)"></stop>
							<stop
								offset="1"
								stopColor="var(--color-accent)"
								stopOpacity="0"
							></stop>
						</motion.linearGradient>
					</defs>
				</svg>
			</div>
			<div ref={contentRef}>{children}</div>
		</motion.div>
	);
};
