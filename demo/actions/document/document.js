import Dispatcher from './../../dispatcher';
import DocumentConstants from './../../constants/document';
import Request from 'superagent';
import { enableMock, disableMock } from './../../xhr-mock';

export default {
  updateDocument: (doc) => {
    disableMock();

    Request.get(doc).end((err, res) => {
      Dispatcher.dispatch({
        actionType: DocumentConstants.UPDATE_DOCUMENT,
        content: res.text,
        doc
      });

      enableMock();
    });
  }
}
