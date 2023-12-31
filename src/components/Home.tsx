import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Element } from 'react-scroll';
import { FaArrowDown } from 'react-icons/fa';
import { BiMouse } from 'react-icons/bi';
import multiplePhoto from '../assets/multiple-photo.png';
import { fadeIn, staggerContainer, textVariant, textVariant2 } from '../utils/motion';

const Home: React.FC = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate: string[] = ['Student', 'Junior Web Developer'];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 1500;

  useEffect(() => {
    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];
      const updateText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updateText);

      if (isDeleting) {
        setDelta((prevDelta) => prevDelta / 2);
      }

      if (!isDeleting && updateText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updateText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    const ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [delta, text, loopNum, isDeleting, toRotate]);

  return (
    <motion.section
      variants={staggerContainer(0.5, 0.2)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
    >
      <Element name='home' className='relative py-3 px-[3%] md:py-4 md:px-[11%] flex md:grid flex-col gap-5 text-center md:text-left mt-40 md:mt-20 lg:mt-14 w-full md:grid-cols-2 md:gap-10 items-center justify-center'>

        <motion.div variants={textVariant(1.1)}>
          <motion.h2 variants={textVariant2} className='text-xl lg:text-3xl font-semibold lg:font-medium mt-0 mx-0 mb-5'>Hello👋, I'm</motion.h2>
          <motion.h1 variants={textVariant(1.1)} className='text-4xl lg:text-6xl font-bold lg:font-semibold mt-0 mx-0 mb-5'>Hizkia Reppi</motion.h1>
          <motion.h3 variants={textVariant2} className='text-lg lg:text-2xl font-semibold lg:font-medium mb-6'>
            {' '}
            I'm <span className='text-second'>{text}</span>
          </motion.h3>
          <Link
            to='contact'
            className='bg-second text-white shadow-btn shadow-white py-[10px] px-7 inline-block border border-solid border-transparent text-base font-normal ease transition-all duration-300 cursor-pointer hover:bg-white hover:text-second hover:shadow-second'
            smooth={true}
            duration={500}
          >
            Contact Me
          </Link>
          <div>
            <Link
              to='about'
              className='text-lg text-white mt-12 inline-flex items-center animate-upDown group cursor-pointer hover:text-second'
              smooth={true}
              duration={500}
            >
              <BiMouse className='text-second group-hover:text-white text-3xl' />
              Scroll Down
              <FaArrowDown className='text-second group-hover:text-white text-xs ml-2' />
            </Link>
          </div>
        </motion.div>
        <motion.div variants={fadeIn('left', 'tween', 0.2, 1)} className='max-w-full w-80 md:w-[500px] h-auto mt-12'>
          <img src={multiplePhoto} alt='Hizkia Reppi' />
        </motion.div>
      </Element>
    </motion.section>
  );
};

export default Home;
