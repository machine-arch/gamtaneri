import { NextComponentType } from 'next';
import styles from './mainsection.module.css';
import Button from '../../button/button.component';
import Image from 'next/image';
import { RefObject, useContext, createRef, useEffect, useState } from 'react';
import {
  ScrollContext,
  scrollContextInterface,
} from '../../../context/scroll-context';
import { localeContext } from '../../../context/locale-context';
import { imageLoaderProp } from '../../../utils/app.util';

const Mainsection = (props: any) => {
  const [localeKey, setLocaleKey] = useState('');
  const [dictionary, setDictionary] = useState(null);
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject?.localeKey);
    setDictionary(localeContextObject?.dictionary);
  }, [localeContextObject]);
  const mainSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);

  console.log('mainsection', dictionary);

  scrollContext.mainSection = mainSection;
  const openModalHeader = () => {
    props.setismodalopen(true);
    props.setModalKey('FORM');
  };
  return (
    <div
      className={styles.mainsection_conteiner}
      id="main_section"
      ref={mainSection}
    >
      <div className={styles.mainsection_contact_conteiner}>
        <h1 className={styles.mainsection_contact_title}>
          {dictionary?.[localeKey]['gamtanery']}
        </h1>
        <p className={styles.mainsection_contact_text}>
          {dictionary?.[localeKey]['mainsection_text']}
        </p>
        <Button
          name={
            dictionary ? dictionary[localeKey]['contactUs'] : 'დაგვიკავშირდით'
          }
          hendler={openModalHeader}
        />
      </div>
      <div className={styles.mainsection_image_conteiner}>
        <Image
          src="/images/main-grid.png"
          alt="mainsection-grid"
          width={100}
          height={100}
          layout="responsive"
          objectFit="contain"
          sizes="100vw"
          loader={imageLoaderProp}
        />
      </div>
    </div>
  );
};

export default Mainsection;
