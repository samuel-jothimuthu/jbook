import '../styles/action-bar.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, 'down')}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

const useActions = () => {
  const dispatch = useDispatch();
  const actionsToMap = {
    moveCell: Actions.moveCell,
    deleteCell: Actions.deleteCell,
  };
  return bindActionCreators(actionsToMap, dispatch);
};

export default ActionBar;
