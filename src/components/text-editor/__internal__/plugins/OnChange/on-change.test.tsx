import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { render, act } from '@testing-library/react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useEffect } from 'react';
import OnChangePlugin from './on-change.plugin';

const mockOnChange = jest.fn();

type MockEditorWithUpdatesProps = {
  updates: Array<() => void>;
  delay?: number;
};

const MockEditorWithUpdates = ({ updates, delay = 20 }: MockEditorWithUpdatesProps) => {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    updates.forEach((updateFn, index) => {
      setTimeout(() => {
        editor.update(updateFn);
      }, index * delay);
    });
  }, [editor, updates, delay]);
  
  return null;
};

type MockEditorProps = {
  updates: Array<() => void>;
};

const MockEditor = ({ updates }: MockEditorProps) => {
  const config = {
    namespace: 'test-editor',
    nodes: []
  };
  
  return (
    <LexicalComposer initialConfig={config}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={mockOnChange} />
      <MockEditorWithUpdates updates={updates} />
    </LexicalComposer>
  );
};

describe('OnChangePlugin', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call onChange when text content changes', async () => {
    const updates = [() => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      const textNode = $createTextNode('Hello world');
      paragraph.append(textNode);
      root.append(paragraph);
    }];

    render(<MockEditor updates={updates} />);

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should pass the correct editor state to the onChange callback', async () => {
    const expectedText = 'Test content for onChange';

    const updates = [() => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      const textNode = $createTextNode(expectedText);
      paragraph.append(textNode);
      root.append(paragraph);
    }];

    render(<MockEditor updates={updates} />);

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    const [[editorState]] = mockOnChange.mock.calls;
    const serializedState = JSON.stringify(editorState);
    
    expect(serializedState).toContain(expectedText);
    expect(mockOnChange).toHaveBeenCalledTimes(1);  
  });

  it('should not fire when updated with empty text content', async () => {
    const updates = [() => {
      const root = $getRoot();
      root.clear();
    }];

    render(<MockEditor updates={updates} />);

    await act(async () => {
      jest.advanceTimersByTime(50);
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});