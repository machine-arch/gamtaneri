import { FC, useContext, useEffect, useState } from 'react';
import Styles from './mobilenav.module.css';
import { mobileContext } from '../../../context/mobile.context';
import Router from 'next/router';
import {
  ScrollContext,
  scrollContextInterface,
} from '../../../context/scroll-context';
import { localeContext } from '../../../context/locale-context';
import { scrollTo } from '../../../utils/app.util';

const MobileNav: FC = () => {
  const MOBILE_CONTEXT = useContext(mobileContext);
  const [scrollRefs, setScrollRefs] = useState(null);
  const [dictionary, setDictionary] = useState(null);
  const [localeKey, setLocaleKey] = useState('');
  const scrollContext: scrollContextInterface = useContext(ScrollContext);
  const localeContextObject: any = useContext(localeContext);

  useEffect(() => {
    setScrollRefs(scrollContext);
    setLocaleKey(localeContextObject.localeKey);
    setDictionary(localeContextObject.dictionary);
  }, [scrollContext, localeContextObject]);

  return (
    <>
      {MOBILE_CONTEXT?.state?.isOpen ? (
        <div className={Styles.mobilenav_conteiner}>
          <div className={Styles.mobilenav_body}>
            <ul className={Styles.header_menu_list}>
              <li
                className={Styles.header_menu_item}
                onClick={async () => {
                  if (window.location.pathname !== '/') await Router.push('/');
                  MOBILE_CONTEXT.dispatch({
                    type: 'SET_IS_OPEN',
                    payload: !MOBILE_CONTEXT?.state?.isOpen,
                  });
                  scrollTo(scrollRefs?.mainSection);
                }}
              >
                {dictionary ? dictionary[localeKey]['main'] : 'მთავარი'}
              </li>
              <li
                className={Styles.header_menu_item}
                onClick={async () => {
                  if (window.location.pathname !== '/') await Router.push('/');
                  MOBILE_CONTEXT.dispatch({
                    type: 'SET_IS_OPEN',
                    payload: !MOBILE_CONTEXT?.state?.isOpen,
                  });
                  scrollTo(scrollRefs.projectsSection);
                }}
              >
                {dictionary ? dictionary[localeKey]['galery'] : 'პროექტები'}
              </li>
              <li
                className={Styles.header_menu_item}
                onClick={async () => {
                  if (window.location.pathname !== '/') await Router.push('/');
                  MOBILE_CONTEXT.dispatch({
                    type: 'SET_IS_OPEN',
                    payload: !MOBILE_CONTEXT?.state?.isOpen,
                  });
                  scrollTo(scrollRefs.userSection);
                }}
              >
                {dictionary
                  ? dictionary[localeKey]['aourUsers']
                  : 'ჩვენი მომხმარებლები'}
              </li>
              <li
                className={Styles.header_menu_item}
                onClick={async () => {
                  if (window.location.pathname !== '/') await Router.push('/');
                  MOBILE_CONTEXT.dispatch({
                    type: 'SET_IS_OPEN',
                    payload: !MOBILE_CONTEXT?.state?.isOpen,
                  });
                  scrollTo(scrollRefs.aboutUs);
                }}
              >
                {dictionary
                  ? dictionary[localeKey]['aboutUs']
                  : 'ჩვენს შესახებ'}
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileNav;
