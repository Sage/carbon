import Dispatcher from './../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';
import DocumentConstants from './../../constants/document';

let data = ImmutableHelper.parseJSON({});

class DocumentStore extends Store {
  [DocumentConstants.UPDATE_DOCUMENT](action) {
    this.data = this.data.set(action.doc, action.content);
  }
}

export default new DocumentStore('documentStore', data);
