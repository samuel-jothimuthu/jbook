import '../styles/cell-list.css';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions';
import { useSelector } from 'react-redux';
import StateReader from '../helpers/state-readers';
import CellListItem from './cell-list-item';
import { Cell } from '../state';
import AddCell from './add-cell';
import React, { useEffect } from 'react';

const CellList: React.FC = () => {
  const cells = useSelector(StateReader.CellsStateReader.getCellsList);
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell: Cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

const useActions = () => {
  const dispatch = useDispatch();
  const actionsToMap = {
    fetchCells: Actions.fetchCells,
  };
  return bindActionCreators(actionsToMap, dispatch);
};

export default CellList;
