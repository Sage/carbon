import React from 'react';
import { connect } from 'utils/flux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DocumentStore from './../../../stores/document';
import DocumentActions from './../../../actions/document';
import Request from 'superagent';
import marked from 'marked';
import Spinner from 'components/spinner';
import Row from 'components/row';
import { enableMock, disableMock } from './../../../xhr-mock';
import Highlight from 'react-highlight';

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
    let content = this.getContent(),
        spinner = null;

    if (content) {
      content = (
        <div className="demo-document__content">
          <Highlight innerHTML={ true }>
            { marked(content) }
          </Highlight>
        </div>
      );
    } else {
      spinner = <Row><Spinner columnAlign="center" size="small" /></Row>;
    }

    return (
      <div className="demo-document">
        { content }

        <ReactCSSTransitionGroup
          className="demo-document__loading"
          transitionName="demo-document__loading"
          transitionAppear={ true }
          transitionAppearTimeout={ 300 }
          transitionEnterTimeout={ 300 }
          transitionLeaveTimeout={ 0 }
        >
          { spinner }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(Document, DocumentStore);
