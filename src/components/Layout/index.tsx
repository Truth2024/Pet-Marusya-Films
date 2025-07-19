import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import { Modal } from '../Modals/ModalAuth';
import { TrailerModal } from '../Modals/TrailerModal';
export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Modal />
      <TrailerModal />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
