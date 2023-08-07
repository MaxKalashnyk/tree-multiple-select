import isEqual from 'lodash.isequal';
import { Component } from 'react';
import DropdownTreeSelect, {
  DropdownTreeSelectProps,
  DropdownTreeSelectState,
} from 'react-dropdown-tree-select';

export default class Container extends Component<
  DropdownTreeSelectProps,
  DropdownTreeSelectState
> {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.data, state.data)) {
      return {
        data: props.data,
      };
    }

    return null;
  }

  shouldComponentUpdate = (nextProps) => {
    const { data } = this.state;
    return !isEqual(nextProps.data, data);
  };

  render() {
    const { data, ...rest } = this.props;
    const { data: stateData } = this.state;
    return <DropdownTreeSelect data={stateData} {...rest} />;
  }
}
