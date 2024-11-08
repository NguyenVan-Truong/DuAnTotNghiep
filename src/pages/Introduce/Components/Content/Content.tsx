
import styles from './Content.module.scss';

interface ContentProps {
  data: {
    title: string;
    content: string[];
  } | null;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className={styles.container}>     
      <div className={styles.content}>
        <h2>{data.title}</h2>
        <p>
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default Content;
