import Dispatcher from './../../dispatcher';
import DocumentConstants from './../../constants/document';

export default {
  updateDocument: (doc, content) => {
    Dispatcher.dispatch({
      actionType: DocumentConstants.UPDATE_DOCUMENT,
      doc, content
    })
  }
}
