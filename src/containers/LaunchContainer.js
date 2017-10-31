import { connect } from 'react-redux';

// Actions
import * as OAuthActions from '@redux/oauth/actions'
import * as ABiActions from '@redux/abi/actions';

// The component we're mapping to
import SearchScreen from '@screens/SearchScreen';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  token: state.oauth.token,
  records: state.abi.records,
  loading: state.abi.loading,
});

// Just another way to declare mapStateToProps
// function mapStateToProps(state) {
//   console.debug(`LaunchContainer => ${JSON.stringify(state.oauth.token)}`);
//   return {
//     token: state.oauth.token,
//   };
// }

// Any actions to map to the component?
const mapDispatchToProps = {
  getTokenViaOAuth: OAuthActions.getTokenViaOAuth,
  getABiCatalogRecords: ABiActions.getABiCatalogRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
