import { createUseStyles } from "react-jss";
import MyGroupsStore from "../stores/myGroupsStore";

const useStyles = createUseStyles({
  icon: {
    width: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  link: {
    color: '#000',
  },
});

const SidebarGroupEntry = props => {
  const store = MyGroupsStore.useContainer();
  const s = useStyles();

  return <div className='row mb-3 me-1 ms-1'>
    <div className='col-3 pe-0'>
      {
        store.icons && <img className={s.icon} src={store.icons[props.group.id]}></img>
      }
    </div>
    <div className='col-9 ps-1'>
      <p className='mb-0 mt-3 fw-600'>
        <a className={s.link} href={`/My/Groups.aspx?gid=${props.group.id}`}>
          {props.group.name}
        </a>
      </p>
    </div>
  </div>
}

export default SidebarGroupEntry;