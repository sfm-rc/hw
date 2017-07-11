import React, { Component } from 'react';
import classNames from 'classnames';
import { noop, isEmpty } from 'lodash';
import { IoIosSearchStrong, IoIosClose } from 'react-icons/lib/io';
import './index.less';

class SearchBar extends Component {

  state = {
    value: this.props.value,
    prefixCls: 'hw-searchbar',
    searchIconPreCls: 'hw-search-icon',
    resetIconPreClas: 'hw-search-clear',
    showResetIcon: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onInput = (e) => {
    const { lazyTimeout } = this.props;

    const value = e.target.value;
    const V = value.replace(/(^\s*)/g, '');
    this.setState({ showResetIcon: !isEmpty(V), value: V });

    if (lazyTimeout > 0) {
      clearTimeout(this.timer);
      const self = this;
      this.timer = setTimeout(() => {
        self.props.onInput(V);
      }, lazyTimeout);
    } else {
      this.props.onInput(V);
    }
  }

  onFocus = (e) => {
    this.props.onFocus(e);
  }

  onBlur = (e) => {
    this.props.onBlur(e);
  }

  onPress = (e) => {
    const key = e.key;
    const charCode = e.charCode;
    const { lazyTimeout } = this.props;

    const value = e.target.value;
    const V = value.replace(/(^\s*)/g, '');

    this.setState({ showResetIcon: V !== '', value: V });
    if (lazyTimeout > 0) {
      clearTimeout(this.timer);
      const self = this;
      this.timer = setTimeout(() => {
        self.props.onPress(V, key, charCode);
      }, lazyTimeout);
    } else {
      this.props.onPress(V, e);
    }
  }

  onReset = (e) => {
    this.setState({ showResetIcon: false, value: '' });
    this.props.onReset(e);
  }

  render() {
    const { className, placeholder } = this.props;

    const { prefixCls, searchIconPreCls, showResetIcon, resetIconPreClas } = this.state;
    const wrapCls = classNames({
      [className]: className,
      [prefixCls]: true,
    });

    const resetCls = classNames({
      [resetIconPreClas]: true,
      [`${resetIconPreClas}-show`]: showResetIcon,
    });

    return (
      <div className={wrapCls}>
        <div className="hw-search-input">
          <input
            type="search"
            className={className}
            placeholder={placeholder}
            onChange={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyPress={this.onPress}
            value={this.state.value}
            />
          <IoIosSearchStrong size={20} className={searchIconPreCls} />
          <IoIosClose size={20} className={resetCls} onClick={this.onReset} />
        </div>
      </div>
    );
  }
}

const propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onInput: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onReset: React.PropTypes.func,
  onPress: React.PropTypes.func,
  lazyTimeout: React.PropTypes.number,
};

const defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  onInput: noop,
  onFocus: noop,
  onBlur: noop,
  onReset: noop,
  onPress: noop,
  lazyTimeout: 0,
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;
export default SearchBar;
