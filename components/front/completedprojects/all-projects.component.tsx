import styles from './all-projects.module.css';
import Image from 'next/image';
import { imageLoaderProp } from '../../../utils/app.util';
import { useState, useEffect, useContext, FC, useRef, Fragment } from 'react';
import { localeContext } from '../../../context/locale-context';
import router from 'next/router';
import { httpRequest } from '../../../utils/app.util';
import { dataContext } from '../../../context/data.context';

const AllProjects: FC<any> = (props: any) => {
  const { state, dispatch } = useContext<any>(dataContext);
  const { localeKey } = useContext<any>(localeContext);
  const [dictionary, setDictionary] = useState(null);
  const [searchVal, setSearchVal] = useState<string>('');
  const from = useRef(10);
  const count = useRef(10);
  const wasFatcched = useRef(false);
  const wasSearch = useRef(false);
  const [noResults, setNoResults] = useState(false);
  const localeContextObject: any = useContext(localeContext);

  useEffect(() => {
    document.addEventListener('scroll', getMooreProjects);
    setDictionary(localeContextObject?.dictionary);
  }, [localeContextObject]);

  const seeProjectDetals = (e: any) => {
    const _this = e.currentTarget;
    const itemID = _this.getAttribute('itemID');
    router.push(`/projects/${itemID}`);
  };

  const removeHTMLTags = (str: string) => {
    return str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  };

  const getMooreProjects = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !wasFatcched.current
    ) {
      wasFatcched.current = true;
      httpRequest(
        `${process.env.NEXT_PUBLIC_API_URL}client/projects/getall?from=${from.current}&count=${count.current}`,
        'GET'
      )
        .then((res) => {
          dispatch({ type: 'SET_PROJECTS', payload: res?.resource });
          from.current += count.current;
          return res;
        })
        .then((res) => {
          if (res?.count > from.current) {
            wasFatcched.current = false;
          } else {
            window.removeEventListener('scroll', () => {});
            return false;
          }
        });
    }
  };

  const controlSearchFild = (e: any) => {
    setSearchVal(e.currentTarget.value);
  };

  const searchProjects = async () => {
    if (searchVal.length < 2) return;
    httpRequest(
      `${process.env.NEXT_PUBLIC_API_URL}client/projects/search?search=${searchVal}`,
      'GET'
    )
      .then((res) => {
        dispatch({ type: 'SET_PROJECTS_ONLOAD', payload: res?.resource });
        wasSearch.current = true;
        return res;
      })
      .then((res) => {
        if (res?.resource.length === 0) {
          setNoResults(true);
          return;
        } else {
          setNoResults(false);
        }

        if (res?.count > from.current) {
          wasFatcched.current = false;
        } else {
          window.removeEventListener('scroll', () => {});
          return false;
        }
      });
  };

  const clearSearch = () => {
    httpRequest(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }client/projects/getall?from=${0}&count=${10}`,
      'GET'
    )
      .then((res) => {
        dispatch({
          type: 'SET_PROJECTS_ONLOAD',
          payload: res?.resource,
        });
        wasSearch.current = false;
        return res;
      })
      .then((res) => {
        if (res?.resource.length === 0) {
          setNoResults(true);
          return;
        } else {
          setNoResults(false);
        }

        if (res?.count > from.current) {
          wasFatcched.current = false;
        } else {
          window.removeEventListener('scroll', () => {});
          return false;
        }
      });
  };

  return (
    <Fragment>
      <div className={styles.all_projects_filter_conteiner}>
        <input
          type="text"
          name="user_filter"
          className="projects_filter"
          placeholder={dictionary?.[localeKey]?.['search_with']}
          value={searchVal}
          onChange={controlSearchFild}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              searchProjects();
            }
            if (
              (event.key === 'Backspace' || event.key === 'Delete') &&
              wasSearch.current
            ) {
              if (searchVal.length <= 1) clearSearch();
            }
          }}
          onCut={() => {
            if (wasSearch.current) {
              if (searchVal.length <= 1) clearSearch();
            }
          }}
        />
        <div className={styles.search_ico_conteiner} onClick={searchProjects}>
          <Image
            className={styles.search_ico}
            src="/images/search-ico.svg"
            alt="search icon"
            width={15}
            height={15}
            loader={imageLoaderProp}
          />
        </div>
      </div>
      {noResults ? (
        <div className={styles.no_result_conteiner}>
          <h3 className={styles.no_result_text}>
            {dictionary[localeKey]['no_results']}
          </h3>
        </div>
      ) : null}
      <div className={styles.all_projects_conteiner}>
        {state.projects.map((project: any, index: any) => {
          return (
            <div className={styles.project_card} key={project.id}>
              <div className={styles.project_card_title}>
                <h1>
                  {localeKey === 'en'
                    ? (project.project_name_eng as HTMLHeadingElement)
                    : project.project_name}
                </h1>
              </div>
              <div className={styles.project_card_image}>
                <Image
                  src={JSON.parse(project?.images)[0]}
                  alt={
                    localeKey === 'en'
                      ? project.project_name_eng
                      : project.project_name
                  }
                  width={20}
                  height={10}
                  sizes="100vw"
                  loader={imageLoaderProp}
                />
              </div>
              <div className={styles.project_card_description}>
                <p className={styles.project_card_description_text}>
                  {localeKey === 'en'
                    ? removeHTMLTags(project?.description_eng)
                    : removeHTMLTags(project?.description)}
                </p>
              </div>
              <div className={styles.project_card_button}>
                <a
                  className={styles.all_project_read_moore}
                  itemID={project.id}
                  onClick={seeProjectDetals}
                >
                  {dictionary?.[localeKey]['read_more']}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default AllProjects;
