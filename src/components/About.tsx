import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import resumen from '../styles/customBtn.module.css';
import me from '../../public/images/about/ME.png';

interface Props {}

const About: FC<Props> = () => {
  return (
    <section id="about" className="w-full min-h-screen mt-40">
      <div className="flex justify-between items-center px-10 lg:px-52 sm:m-2 md:m-3 lg:m-4 xl:m-5">
        <h1 className="text-white lg:text-8xl md:text-5xl sm:text-3xl text-3xl items-center">About Me</h1>
        <Link href="https://docs.google.com/document/d/1VhnkfTEZcFpjd51uswrxccZlWiCBumZw/edit?usp=sharing&ouid=106059346458081499165&rtpof=true&sd=true">
          <button className={resumen.btn}>
            <span className="font-mono px-9 pb-1.5 text-base sm:text-2xl md:text-2xl">Resumen</span>
          </button>
        </Link>
      </div>
      <div className="md:flex flex-wrap justify-center text-center items-center mt-28 lg:px-20 bg-white shadow-2xl bg-opacity-5 backdrop-blur-sm">
        <div className="md:w-1/2 h-2/3 flex justify-center">
          <Image src={me} width="420" height="420" alt="me" className="" />
        </div>
        <div className="md:w-1/2 mx-auto p-6 lg:px-20">
          <p className="text-justify lg:text-lg text-base text-white">
            Hi there! I{"'"}m Armany, a have over three years of experience, I specialize in using JavaScript,
            HTML, CSS, Typescript and various frameworks such as React, Next.js, TailwindCSS, and Bootstrap to
            create dynamic and visually appealing web applications.
          </p>
          {/* <p className="text-justify lg:text-lg md:text-base text-white">
            With a strong background in both front-end and back-end development, I am experienced in working
            with Node.js, Express, Nest.js, MongoDB, MySQL, API rest and GraphQL to create robust and scalable
            solutions. Additionally, I have a deep understanding of cloud-based technologies such as AWS, and
            I am well-versed in managing servers and containers with tools such as cPanel, Nginx, VPS servers,
            and Docker.
          </p> */}
          <p className="text-justify lg:text-lg md:text-base text-white">
            I am a driven individual who is constantly seeking new challenges and opportunities to expand my
            skillset and knowledge. My passion for technology and my commitment to delivering high-quality
            solutions are what drive me to excel in this field.
          </p>
          <p className="text-justify lg:text-lg md:text-base text-white">
            Whether you{"'"}re looking for a dynamic and creative web developer to bring your ideas to life,
            or a dependable and knowledgeable team member to help you tackle complex projects, I am confident
            that I have the skills and experience to deliver results.
          </p>
          <p className="text-justify lg:text-lg md:text-base text-white">
            Thank you for visiting my portfolio website, I hope one day we can work together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;