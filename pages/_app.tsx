import '../styles/reset.css';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { ScrollProvider } from './../context/scroll-context';
import { LocaleProvider } from './../context/locale-context';
import { AuthProvider } from '../context/admin/auth.context';
import { ModalProvaider } from './../context/modal-context';
import { PagesProvaider } from './../context/pages-context';
import { EditorProvaider } from '../context/admin/editor.context';
import { ProjectsProvaider } from '../context/admin/projects.context';
import { DataProvaider } from '../context/data.context';
import { PaginationProvider } from '../context/admin/pagination.contect';
import { PriorityProvider } from '../context/admin/priority.context';
import { MobileProvider } from '../context/mobile.context';
import { UsersProvaider } from '../context/admin/users.context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvaider>
      <AuthProvider>
        <LocaleProvider>
          <ScrollProvider>
            <PagesProvaider>
              <EditorProvaider>
                <ProjectsProvaider>
                  <DataProvaider>
                    <PaginationProvider>
                      <PriorityProvider>
                        <MobileProvider>
                          <UsersProvaider>
                            <Component {...pageProps} />
                          </UsersProvaider>
                        </MobileProvider>
                      </PriorityProvider>
                    </PaginationProvider>
                  </DataProvaider>
                </ProjectsProvaider>
              </EditorProvaider>
            </PagesProvaider>
          </ScrollProvider>
        </LocaleProvider>
      </AuthProvider>
    </ModalProvaider>
  );
}

export default MyApp;
