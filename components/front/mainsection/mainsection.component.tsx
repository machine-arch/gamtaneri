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
import Link from 'next/link';

const Mainsection = (props: any) => {
  const [localeKey, setLocaleKey] = useState('');
  const [dictionary, setDictionary] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const localeContextObject: any = useContext(localeContext);
  useEffect(() => {
    setLocaleKey(localeContextObject?.localeKey);
    setDictionary(localeContextObject?.dictionary);
  }, [localeContextObject]);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    setIsMobile(isMobileDevice);
  }, []);
  const mainSection: RefObject<HTMLDivElement> = createRef();
  const scrollContext: scrollContextInterface = useContext(ScrollContext);

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
        {isMobile ? (
          <Link
            className={styles.link}
            href={`tel:+995 ${props?.mobileNumber}`}
            passHref
          >
            <button className={styles.main_button}>
              {dictionary
                ? dictionary[localeKey]['contactUs']
                : 'დაგვიკავშირდით'}
            </button>
          </Link>
        ) : (
          <Button
            name={
              dictionary ? dictionary[localeKey]['contactUs'] : 'დაგვიკავშირდით'
            }
            hendler={openModalHeader}
          />
        )}
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
