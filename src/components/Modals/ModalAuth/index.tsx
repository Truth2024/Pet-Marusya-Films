import { Form } from '../../Form';
import styles from './modal.module.scss';
import icon from '../../../assets/Iconblack.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAutharization } from '../../../features/thunk/selectors';
import { closeModal } from '../../../features/thunk/Authorization';
export const Modal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectAutharization);
  return (
    <div onClick={() => dispatch(closeModal())} className={`${styles.overlay} ${!isModalOpen ? styles.hidden : ''}`}>
      <div onClick={(e) => e.stopPropagation()} className={styles.window}>
        <div onClick={() => dispatch(closeModal())} className={styles.close}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={styles.icon}>
          <img width={160} height={35} src={icon} alt="" />
        </div>

        <Form />
      </div>
    </div>
  );
};
