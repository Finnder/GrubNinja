import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { coreMaps, premiumMaps } from '../../constants/maps';
import setMap from '../../actions/setMap';

const background = '#1f1f22';
const foreground = '#2c2c2f';
const lightGrey = '#282830';
const mutedGrey = '#6c757d';
const carminePink = '#ff5252';

const styles = {
  container: provided => ({
    ...provided,
    fontSize: '11px',
    borderRadius: '4px'
  }),
  control: provided => ({
    ...provided,
    backgroundColor: background,
    borderColor: foreground,
    borderRadius: '4px',
    boxShadow: 'none',
    cursor: 'pointer',
    ':hover': {
      ...provided[':hover'],
      borderColor: foreground
    }
  }),
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: foreground
  }),
  indicatorsContainer: provided => ({
    ...provided,
    color: foreground
  }),
  valueContainer: provided => ({
    ...provided,
    outline: 'none'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: lightGrey,
    textAlign: 'left',
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    color: state.isDisabled ? carminePink : mutedGrey,
    ':active': {
      ...provided[':active'],
      backgroundColor: lightGrey,
      color: 'white'
    },
    ':hover': {
      ...provided[':hover'],
      color: 'white'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: lightGrey
  })
};

const MapSelect = ({ currentMap, setMap, mapPacks }) => {
  let ownedMaps = coreMaps; // User owns core maps by default

  // Allow user to select premium maps if they own them
  mapPacks.forEach(pack => {
    ownedMaps = [...ownedMaps, ...premiumMaps[pack]];
  });

  const handleChange = selectedOption => {
    setMap(selectedOption.value);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <Select
      className='GrubSelect'
      classNamePrefix='GrubSelectPre'
      styles={styles}
      value={currentMap}
      onChange={handleChange}
      options={ownedMaps}
      placeholder={ownedMaps.find(map => map.value === currentMap).label}
    />
  );
};

MapSelect.propTypes = {
  currentMap: PropTypes.string.isRequired,
  setMap: PropTypes.func.isRequired,
  mapPacks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  currentMap: state.game.mapId,
  mapPacks: state.user.maps
});

export default connect(
  mapStateToProps,
  { setMap }
)(MapSelect);
