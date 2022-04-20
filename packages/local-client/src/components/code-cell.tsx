import '../styles/code-cell.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import StateReader from '../helpers/state-readers';
import { cumulativeCodeHelper } from '../helpers/cells';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundles = useSelector(StateReader.BundlesStatereader.getBundlesState);
  const bundle = bundles[cell.id];

  const cells = useSelector(StateReader.CellsStateReader.getCellState);
  const cumulativeCode = cumulativeCodeHelper(cells, cell);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n')]);

  return (
    <Resizable direction="veritcal">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

const useActions = () => {
  const dispatch = useDispatch();
  const actionsToMap = {
    updateCell: Actions.updateCell,
    createBundle: Actions.createBundle,
  };

  return bindActionCreators(actionsToMap, dispatch);
};

export default CodeCell;
