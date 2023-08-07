import isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';

const Container = ({ data, ...rest }) => {
  const [stateData, setStateData] = useState(data);

  useEffect(() => {
    if (!isEqual(data, stateData)) {
      setStateData(data);
    }
  }, [data]);

  return <DropdownTreeSelect data={stateData} {...rest} />;
};

export default Container;
