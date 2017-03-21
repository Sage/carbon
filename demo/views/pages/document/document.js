import React from 'react';
import { connect } from 'utils/flux';
import DocumentStore from './../../../stores/document';
import DocumentActions from './../../../actions/document';
import Request from 'superagent';
import marked from 'marked';
import Spinner from 'components/spinner';
import Row from 'components/row';
import { enableMock, disableMock } from './../../../xhr-mock';

class Document extends React.Component {
  state = { guide: '' }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate() {
    this.updateContent();
  }

  updateContent = () => {
    if (!this.getContent()) {
      disableMock();

      Request.get('/utils/generated' + this.props.route.document).end((err, res) => {
        DocumentActions.updateDocument(this.props.route.document, res.text);
        enableMock();
      });
    }
  }

  getContent = () => {
    return this.state.documentStore.get(this.props.route.document);
  }

  render() {
    let content = this.getContent();

    if (content) {
      content = marked(content);
      return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      );
    } else {
      return <Row><Spinner columnAlign="center" size="small" /></Row>;
    }
  }
}

export default connect(Document, DocumentStore);
